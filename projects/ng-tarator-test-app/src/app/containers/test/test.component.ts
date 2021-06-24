import { Component, OnInit } from '@angular/core';
import { StoreService } from 'ng-tarator';
import { ActionService } from '../../state/action.service';
import { State } from '../../state/state';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  state: State;

  constructor(private readonly storeService: StoreService<State>, private readonly actionService: ActionService) { 
    this.state = storeService.getState();
  }

  onSelectAnswer(questionId: string, answerId: string) {
    this.storeService.apply(this.actionService.selectAnswer, {
      questionId,
      answerId
    })
  }

  onSubmitTest() {
    this.storeService.apply(this.actionService.submitTest);
  }
}
