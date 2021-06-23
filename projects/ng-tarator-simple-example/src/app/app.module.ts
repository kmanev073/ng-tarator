import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaratorState } from 'ng-tarator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { State } from './state/state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: TaratorState, useValue: new State() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
