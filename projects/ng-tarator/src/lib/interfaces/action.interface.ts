export interface Action<S = any, D = any> {
  execute(state: S, callback: () => void, data?: D): void;
}