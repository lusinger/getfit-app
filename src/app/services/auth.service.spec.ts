import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthResponse, LoginRequest } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it('should get statusCode 200', (done: DoneFn) => {
    const service: AuthService = TestBed.inject(AuthService);
    const httpServer: HttpTestingController = TestBed.inject(HttpTestingController);

    const response: AuthResponse = {
      statusCode: 200,
      message: 'successful login',
      payload: 20
    }

    const user: LoginRequest = {
      user: 'testname',
      password: 'admin',
    }

    service.login(user).subscribe({
      next: (data: AuthResponse) => {
        expect(data).toBeTruthy();
        expect(data.statusCode).toEqual(200);
        expect(data.message).toEqual('successful login');
        expect(data.payload).toEqual(20);
        done();
      }
    });

    const mockRequest = httpServer.expectOne(`${environment.serverUrl}/login?user=testname&password=admin`);
    mockRequest.flush(response);
  })
});
