import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverrideAction, StoreService } from 'ng-tarator';
import { SimpleAction } from 'projects/ng-tarator/src/public-api';
import { forkJoin } from 'rxjs';
import { QuestionBackend } from '../models-backend/question.backend';
import { Question } from '../models/question';
import { QuestionStatus } from '../models/question-status';
import { Test } from '../models/test';
import { TestStatus } from '../models/test-status';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private readonly storeService: StoreService<State>, private httpClient: HttpClient) { 

  }

  navigationStart = new SimpleAction(
    (state: State) => state.appLoading = true    
  );

  navigationEnd = new SimpleAction(
    (state: State) => state.appLoading = false
  );

  navigationCancel = new SimpleAction(
    (state: State) => state.appLoading = false
  );

  navigationError = new SimpleAction(
    (state: State) => state.appLoading = false
  );

  initHome = new OverrideAction(
    () => this.storeService.apply(this.loadAllQuestions),
    (state: State) => {
      this.storeService.apply(this.loadHasOldTest);
    }
  );

  loadAllQuestions = new OverrideAction(
    () => this.httpClient.get<QuestionBackend[]>('http://40bt.kaloyanmanev.com/assets/questions.json'),
    (state: State, observableData: QuestionBackend[]) => {
      state.allQuestions = observableData.map(question => ({
        id: question.Id,
        text: question.Text,
        hasImage: question.Image,
        correctAnswerId: question.Answers.find(answer => answer.Correct)?.Id as string,
        answers: question.Answers.map(answer => ({
          id: answer.Id,
          text: answer.Text,
          hasImage: answer.Image,
          isCorrect: answer.Correct
        }))
      })); 
    }
  );

  loadHasOldTest = new SimpleAction(
    (state: State) => state.hasCurrentTest = 'currentTest' in localStorage
  );

  clearOldTest = new SimpleAction(
    (state: State) => {
      localStorage.removeItem('currentTest');
      state.hasCurrentTest = false;
      state.currentTest = new Test();
    }
  );

  initTest = new OverrideAction(
    () => this.storeService.apply(this.initHome),
    (state: State) => state.hasCurrentTest ? 
      this.storeService.apply(this.loadOldTest) :
      this.storeService.apply(this.generateNewTest)
  );

  loadOldTest = new SimpleAction(
    (state: State) => state.currentTest = JSON.parse(localStorage['currentTest']) as Test
  );

  generateNewTest = new SimpleAction(
    (state: State) => {            
      const questionStats: QuestionStatus[] = 'questionStats' in localStorage ? JSON.parse(localStorage['questionStats']) as QuestionStatus[] : [];
      const allQuestionStats = questionStats.concat(state.allQuestions
        .filter(question => questionStats.some(questionStatus => questionStatus.questionId === question.id) === false)
        .map(question => new QuestionStatus(question.id)));
      
      allQuestionStats.sort((a, b) => a.timesCorrect - b.timesCorrect);

      state.currentTest.questions = allQuestionStats.slice(0, 60)
        .map(questionStat => state.allQuestions.find(question => question.id === questionStat.questionId) as Question)
        .map(question => ({ 
          ...question,
          answers: question.answers.sort(() => Math.random() - 0.5)
        }));

      state.currentTest.questions = state.currentTest.questions.sort(() => Math.random() - 0.5);
    }
  );

  selectAnswer = new SimpleAction(
    (state: State, data: { questionId: string, answerId: string }) => {
      state.currentTest.questionAnswers[data.questionId] = data.answerId;
      
      if (Object.keys(state.currentTest.questionAnswers).length === 60) {
        state.currentTest.readyToSubmit = true;
      }
      
      localStorage.setItem('currentTest', JSON.stringify(state.currentTest));
    }
  );

  submitTest = new SimpleAction(
    (state: State) => {
      const questionStats: QuestionStatus[] = 'questionStats' in localStorage ? JSON.parse(localStorage['questionStats']) as QuestionStatus[] : [];
      const testStats: TestStatus[] = 'testStats' in localStorage ? JSON.parse(localStorage['testStats']) as TestStatus[] : [];

      const testStatus = new TestStatus();

      state.currentTest.questions.forEach(question => {
        let questionStatus = questionStats.find(questionStatus => questionStatus.questionId === question.id);
        questionStatus = questionStatus ? questionStatus : new QuestionStatus(question.id);
        questionStatus.timesAnswered++;

        if (state.currentTest.questionAnswers[question.id] === question.correctAnswerId) {
          //correct answer
          questionStatus.timesCorrect++;
        } else {
          //wrong answer
          questionStatus.timesCorrect--;
          testStatus.mistakesCount++;
        }

        if (questionStats.some(questionStatus => questionStatus.questionId === question.id) === false) {
          questionStats.push(questionStatus);
        }
      });

      if (testStatus.mistakesCount > 9) {
        testStatus.passed = false;
      }

      state.currentTest.submitted = true;
      state.currentTest.mistakes = testStatus.mistakesCount;

      testStats.push(testStatus);
      localStorage.setItem('testStats', JSON.stringify(testStats));
      localStorage.setItem('questionStats', JSON.stringify(questionStats));
      localStorage.setItem('currentTest', JSON.stringify(state.currentTest));
    }
  );
}