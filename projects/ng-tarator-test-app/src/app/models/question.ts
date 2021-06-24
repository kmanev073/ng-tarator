import { Answer } from "./answer";

export class Question {
  id: string = '';
  text: string = '';
  hasImage: boolean = false;
  correctAnswerId = '';
  answers: Answer[] = [];
}