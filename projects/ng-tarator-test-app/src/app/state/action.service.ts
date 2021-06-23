import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StrictAction } from 'ng-tarator';
import { SimpleAction } from 'projects/ng-tarator/src/public-api';
import { timer } from 'rxjs';
import { concatMap, map, throttleTime } from 'rxjs/operators';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private httpClient: HttpClient) { 

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

  loadQuestions = new StrictAction(
    () => timer(5000).pipe(concatMap(() => this.httpClient.get<any[]>('http://localhost:4200/assets/questions.json'))),
    (state: State, od: any[]) => {
      console.log(od);
      state.allQuestions = od;
    }
  );
}
