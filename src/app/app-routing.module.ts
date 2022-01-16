import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './features/register/register.component';
import { ResetComponent } from './features/reset/reset.component';

const routes: Routes = [
  {path: 'reset', component: ResetComponent},
  {path: 'register', component: RegisterComponent},
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
