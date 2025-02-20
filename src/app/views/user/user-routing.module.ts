import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'signup', component: SignupComponent, title: 'Регистрация'},
  {path: 'login', component: LoginComponent, title: 'Вход в систему'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
