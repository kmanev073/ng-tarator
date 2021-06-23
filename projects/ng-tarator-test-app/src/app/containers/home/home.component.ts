import { Component } from '@angular/core';
import { StoreService } from 'ng-tarator';
import { ActionService } from '../../state/action.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private readonly storeService: StoreService, private readonly actionService: ActionService) { 
    this.storeService.apply(this.actionService.loadQuestions);
  }

}
