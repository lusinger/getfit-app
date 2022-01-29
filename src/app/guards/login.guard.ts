import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import { StateMachineService } from '../services/state-machine.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private state: StateMachineService,
    private router: Router){};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.state.getApplicationState() === 'loged in'){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
