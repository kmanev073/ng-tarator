import { Injectable } from '@angular/core';
import { SimpleAction } from 'ng-tarator';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor() { 

  }

  newComponent = new SimpleAction(
    (state: State) => state.command = 'ng generate component xyz'
  );

  angularMaterial = new SimpleAction(
    (state: State) => state.command = 'ng add @angular/material'
  );

  addPwaSupport = new SimpleAction(
    (state: State) => state.command = 'ng add @angular/pwa'
  );

  addDependency = new SimpleAction(
    (state: State) => state.command = 'ng add _____'
  );

  runAndWatchTests = new SimpleAction(
    (state: State) => state.command = 'ng test'
  );

  buildForProduction = new SimpleAction(
    (state: State) => state.command = 'ng build'
  );

  openGitHub = new SimpleAction(
    () => window.open('https://github.com/kmanev073/ng-tarator', "_blank")
  );
}
