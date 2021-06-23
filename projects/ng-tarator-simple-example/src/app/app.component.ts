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

  public state: State;

  constructor(private storeService: StoreService<State>, private actionService: ActionService) {
    this.state = storeService.getState();
  }

  onButtonClick(button: string) {
    switch (button) {
      case 'component':
        this.storeService.apply(this.actionService.newComponent);
        break;
      case 'material':
        this.storeService.apply(this.actionService.angularMaterial);
        break;
      case 'pwa':
        this.storeService.apply(this.actionService.addPwaSupport);
        break;
      case 'dependency':
        this.storeService.apply(this.actionService.addDependency);
        break;
      case 'test':
        this.storeService.apply(this.actionService.runAndWatchTests);
        break;
      case 'build':
        this.storeService.apply(this.actionService.buildForProduction)
        break;
    }
  }

  openGitHub() {
    this.storeService.apply(this.actionService.openGitHub)
  }
}
