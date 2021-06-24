import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
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
  
  //TODO: pass action name
  public readonly stateChanged: Observable<void> = this.stateChangedSubject.asObservable();

  private readonly stateLog: string[] = [];
  
  constructor(@Inject(TaratorState) private readonly state: S, @Inject(TaratorStateLogLength) private readonly stateLogLength: number = 0) {
    if (stateLogLength) {
      this.stateLogLength = stateLogLength;
    }

    if (stateLogLength) {
      this.stateLog.push(JSON.stringify(state));
    }
  }

  apply<D = any>(action: Action<S, D>, data?: D): Observable<void> {
    const resultSubject: ReplaySubject<void> = new ReplaySubject();

    try {
      action.execute(this.state, () => {
        this.afterActionApplied();
        resultSubject.next();
        resultSubject.complete();
      }, data);
    } catch (error) {
      console.log('An error occurred while executing tarator action (possible inconsistent state):', error);
      resultSubject.error(error);
    }

    return resultSubject.asObservable();
  }

  getState(): S {
    return this.state;
  }

  private afterActionApplied = () => {
    if (this.stateLogLength) {
      if (this.stateLog.length >= this.stateLogLength){
        this.stateLog.shift();
      }
      this.stateLog.push(JSON.stringify(this.state)); 
    }

    this.stateChangedSubject.next();
  }
}