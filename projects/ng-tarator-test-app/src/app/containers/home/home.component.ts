import { Component } from '@angular/core';
import { StoreService } from 'ng-tarator';
import { ActionService } from '../../state/action.service';
import { State } from '../../state/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  state: State;

  constructor(private readonly storeService: StoreService<State>, private readonly actionService: ActionService) {
    this.state = storeService.getState();
  }

  newTestClick() {
    this.storeService.apply(this.actionService.clearOldTest);
  }
}
