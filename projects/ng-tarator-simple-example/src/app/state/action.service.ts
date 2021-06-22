import { Injectable } from '@angular/core';
import { SimpleAction } from 'ng-tarator';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor() { 

  }

  newComponentClicked = new SimpleAction(
    (state: State) => state.command = 'ng generate component xyz'
  );

  angularMaterialClicked = new SimpleAction(
    (state: State) => state.command = 'ng add @angular/material'
  );

  addPwaSupportClicked = new SimpleAction(
    (state: State) => state.command = 'ng add @angular/pwa'
  );

  addDependencyClicked = new SimpleAction(
    (state: State) => state.command = 'ng add _____'
  );

  runAndWatchTestsClicked = new SimpleAction(
    (state: State) => state.command = 'ng test'
  );

  buildForProductionClicked = new SimpleAction(
    (state: State) => state.command = 'ng build'
  );
}
