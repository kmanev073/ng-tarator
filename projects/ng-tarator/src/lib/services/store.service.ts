import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Action } from '../interfaces/action.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService<S = any> {
  
  private readonly stateSubject: BehaviorSubject<S>;
  
  readonly state: Observable<S>;

  constructor(@Optional() private readonly stateObject: Object) {
    this.stateSubject = new BehaviorSubject<S>(stateObject as S);
    this.state = this.stateSubject.asObservable();
  }

  private callback(state: S): void {
    this.stateSubject.next(state)
  }

  apply<D = any>(action: Action<S, D>, data?: D) {
    try {
      action.execute(this.stateObject as S, () => this.callback(this.stateObject as S), data);
    } catch (exception) {
      console.log('An exception was thrown while executing tarator action (possible inconsistent state):', exception);
    }
  }
}