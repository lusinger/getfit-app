import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { UserPanelComponent } from './features/user-panel/user-panel.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'userpanel', component: UserPanelComponent, canActivate: [LoginGuard]},
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
