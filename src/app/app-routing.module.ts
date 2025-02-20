import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {AuthForwardGuard} from "./core/auth/auth-forward.guard";
import {AuthGuard} from "./core/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent, title: 'Айтилогия Quiz'},
      {
        path: '',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
        canActivate: [AuthForwardGuard]
      },
      {
        path: '',
        loadChildren: () => import('./views/test/test.module').then(m => m.TestModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
