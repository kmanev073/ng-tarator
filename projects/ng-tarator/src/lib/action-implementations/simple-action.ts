import { Action } from "../interfaces/action.interface";

export class SimpleAction<S = any, D = any> implements Action{
    
  private effect: ((state: S, data: D) => void);

  constructor(effect: (state: S, data: D) => void) {
    this.effect = effect;
  }

  execute(state: any, callback: () => void, data?: any): void {
    try {
      this.effect(state, data);
    } catch (error) {
      console.log('An error occurred in tarator simple action (possible inconsistent state):', error);
    }
    callback();
  }

  static id: SimpleAction = new SimpleAction(() => {});
}