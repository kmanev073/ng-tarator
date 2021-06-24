export class QuestionStatus {
  questionId: string = '';
  timesCorrect: number = 0;
  timesAnswered: number = 0;

  constructor(questionId: string) {
    this.questionId = questionId;
  }
}