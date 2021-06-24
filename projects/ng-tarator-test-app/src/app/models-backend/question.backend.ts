import { AnswerBackend } from "./answer.backend";

export class QuestionBackend {
  Id: string = '';
  Text: string = '';
  Image: boolean = false;
  Answers: AnswerBackend[] = [];
}