import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Action } from '../interfaces/action.interface';

export const TaratorState = new InjectionToken<any>('TaratorState', {
  providedIn: 'root',
  factory: () => {}
});

export const TaratorStateLogLength = new InjectionToken<any>('TaratorStateLogLength', {
  providedIn: 'root',
  factory: () => 0
});

@Injectable({
  providedIn: 'root'
})
export class StoreService<S = any> {
  
  private readonly stateChangedSubject: Subject<void> = new Subject();
  
  public readonly stateChanged: Observable<void> = this.stateChangedSubject.asObservable();

  private readonly stateLog: string[] = [];
  
  constructor(@Inject(TaratorState) private readonly stateObject: S, @Inject(TaratorStateLogLength) private readonly stateLogLength: number = 0) {
    if (stateLogLength) {
      this.stateLogLength = stateLogLength;
    }

    if (stateLogLength) {
      this.stateLog.push(JSON.stringify(stateObject));
    }
  }

  apply<D = any>(action: Action<S, D>, data?: D) {
    try {
      action.execute(this.stateObject, this.afterActionApplied, data);
    } catch (exception) {
      console.log('An exception was thrown while executing tarator action (possible inconsistent state):', exception);
    }
  }

  public afterActionApplied = () => {
    if (this.stateLogLength) {
      if (this.stateLog.length >= this.stateLogLength){
        this.stateLog.shift();
      }
      this.stateLog.push(JSON.stringify(this.stateObject)); 
    }

    this.stateChangedSubject.next();
  }
}