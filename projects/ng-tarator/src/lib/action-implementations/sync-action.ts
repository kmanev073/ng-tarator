import { Observable, Subject } from "rxjs";
import { concatMap, takeUntil } from "rxjs/operators";
import { Action } from "../interfaces/action.interface";

export class SyncAction<S = any, D = any, O = any> implements Action {

  private readonly subject: Subject<D> = new Subject<D>();

  private shouldSubscribe = true;
  
  private executedCount = 0;

  private finishedCount = 0;

  private generator: ((state: S, data?: D) => Observable<any>); 

  private subscriber: ((state: S, observableData: O, data?: D) => void);

  constructor(generator: (state: S, data?: D) => Observable<O>, subscriber: (state: S, observableData: O, data?: D) => void) {
    this.generator = generator;
    this.subscriber = subscriber;
  }

  execute(state: S, callback: () => void, data?: D): void {
    if (this.shouldSubscribe) {
      this.shouldSubscribe = false;
      const unsubscribeSubject: Subject<void> = new Subject<void>();

      this.subject
        .pipe(
          concatMap(data => this.generator(state, data)),
          takeUntil(unsubscribeSubject)
        )
        .subscribe((observableData: O) => {
          try {
            this.subscriber(state, observableData, data);
          } catch (error) {
            console.log('An error occurred in tarator sync action (possible inconsistent state):', error);
          }

          callback();
          this.finishedCount++;  
          if (this.executedCount === this.finishedCount) {
            this.cleanUp();
            unsubscribeSubject.next();
          }
        },
        error => {
          console.log('Error occurred in tarator sync action observable (possible inconsistent state):', error);
          this.cleanUp();
        },
        () => unsubscribeSubject.complete()
      );
    }

    this.executedCount++;
    this.subject.next(data);
  }

  private cleanUp(): void {
    this.executedCount = 0;
    this.finishedCount = 0;
    this.shouldSubscribe = true;
  }
}