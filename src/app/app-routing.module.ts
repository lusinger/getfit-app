import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ResetComponent } from './features/reset/reset.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'login'},
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
