import { Component } from '@angular/core';
import { StoreService } from 'ng-tarator';
import { ActionService } from './state/action.service';
import { State } from './state/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ng-tarator-simple-example';

  public state: State;

  constructor(public storeService: StoreService<State>, public actionService: ActionService) {
    this.state = storeService.getState();
  }
}
