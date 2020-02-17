import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import {AppComponent} from './app.component';
import {UserFormComponent} from './softwise-form/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'softwise', component: UserFormComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
