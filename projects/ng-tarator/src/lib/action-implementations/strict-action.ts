import { Observable, Subject } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { Action } from "../interfaces/action.interface";

export class StrictAction<S = any, D = any, O = any> implements Action {

  private readonly subject: Subject<D> = new Subject<D>();

  private shouldSubscribe = true;
  
  private generator: ((state: S, data?: D) => Observable<any>); 

  private subscriber: ((state: S, observableData: O, data?: D) => void);

  constructor(generator: (state: S, data?: D) => Observable<O>, subscriber: (state: S, observableData: O, data?: D) => void) {
    this.generator = generator;
    this.subscriber = subscriber;
  }

  execute(state: S, callback: () => void, data?: D): void {
    if (this.shouldSubscribe) {
      this.shouldSubscribe = false;
      
      this.subject
        .pipe(
          exhaustMap(data => this.generator(state, data)),      
          take(1)
        )
        .subscribe(
          (observableData: O) => {
            try {
              this.subscriber(state, observableData, data);
            } catch (error) {
              console.log('An error occurred in tarator strict action (possible inconsistent state):', error);
            }

            callback();
            this.shouldSubscribe = true;     
          },
          error => {
            console.log('Error occurred in tarator strict action observable (possible inconsistent state):', error)
            this.shouldSubscribe = true;
          }
        );
    }

    this.subject.next(data);
  }
}