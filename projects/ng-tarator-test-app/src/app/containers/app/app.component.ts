import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { StoreService } from 'ng-tarator';
import { ActionService } from '../../state/action.service';
import { State } from '../../state/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public state: State;

  constructor(private readonly storeService: StoreService<State>, private readonly actionService: ActionService, private readonly router: Router) {
    this.state = this.storeService.getState();
    this.router.events.subscribe((e: Event) => 
      this.navigationInterceptor(e)
    )
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.storeService.apply(this.actionService.navigationStart);
    } else if (event instanceof NavigationEnd) {
      this.storeService.apply(this.actionService.navigationEnd);
    } else if (event instanceof NavigationCancel) {
      this.storeService.apply(this.actionService.navigationCancel);
    } else if (event instanceof NavigationError) {
      this.storeService.apply(this.actionService.navigationError);
    }
  }
}
