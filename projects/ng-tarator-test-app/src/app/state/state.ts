import { Question } from "../models/question";
import { Test } from "../models/test";

export class State {
  appLoading: boolean = false;
  allQuestions: Question[] = [];
  hasCurrentTest: boolean = false;
  currentTest: Test = new Test();
}