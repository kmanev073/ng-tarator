import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './containers/app/app.component';
import { HomeComponent } from './containers/home/home.component';
import { TestComponent } from './containers/test/test.component';
import { TaratorState } from 'ng-tarator';
import { State } from './state/state';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: TaratorState, useValue: new State() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
