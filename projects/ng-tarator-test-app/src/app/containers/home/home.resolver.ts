import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { StoreService } from "ng-tarator";
import { Observable } from "rxjs";
import { ActionService } from "../../state/action.service";
import { State } from "../../state/state";

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<void> {
  constructor(private readonly storeService: StoreService<State>, private readonly actionService: ActionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    return this.storeService.apply(this.actionService.loadQuestions);
  }
}