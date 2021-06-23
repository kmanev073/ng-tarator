import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { HomeResolver } from './containers/home/home.resolver';
import { TestComponent } from './containers/test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { HomeResolver } },
  { path: 'test', component: TestComponent },
  { path: '**', component: HomeComponent, resolve: { HomeResolver }  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
