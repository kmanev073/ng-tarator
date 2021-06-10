import { Action } from "../interfaces/action.interface";

export class SimpleAction<S = any, D = any> implements Action{
    
  private effect: ((state: S, data: D) => void);

  constructor(effect: (state: S, data: D) => void) {
    this.effect = effect;
  }

  execute(state: any, callback: () => void, data?: any): void {
    try {
      this.effect(state, data);
    } catch (exception) {
      console.log('An exception was thrown in tarator simple action (possible inconsistent state):', exception);
    }
    callback();
  }
}