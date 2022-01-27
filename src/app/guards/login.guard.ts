import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService){};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.auth.isLoggedIn === true){
      return true;
    }else{
      return false;
    }
  }
}
