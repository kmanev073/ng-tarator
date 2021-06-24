import { Question } from "./question";

export class Test {
  questions: Question[] = [];
  questionAnswers: { [id: string]: string } = {};
  readyToSubmit: boolean = false;
  submitted: boolean = false;
  mistakes: number = 0;
}