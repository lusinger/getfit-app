import { TestBed } from '@angular/core/testing';
import { StateMachineService } from '../services/state-machine.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let state: StateMachineService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGuard);
    state = TestBed.inject(StateMachineService);
    router = TestBed.inject(Router);

    router.navigate(['login']);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false initialy', () => {
    
  });
});
