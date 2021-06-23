import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StrictAction } from 'ng-tarator';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private httpClient: HttpClient) { 

  }

  loadQuestions = new StrictAction(
    () => this.httpClient.get<any[]>('http://localhost:4200/assets/questions.json'),
    (state: State, od: any[]) => state.allQuestions = od
  );
}
