import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { LoginRequest } from '../interfaces/login-request';
import { RegisterRequest } from '../interfaces/register-request';
import { AuthResponse } from '../interfaces/auth-response';

import { environment } from 'src/environments/environment';

interface PWReset{
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient,) { }

  login(loginData: LoginRequest): Observable<AuthResponse>{
    const params = new HttpParams()
      .set('user', loginData.user)
      .set('password', loginData.password);
    
    return this.http.get<AuthResponse>(`${environment.serverUrl}/login`, {
      headers: this.defaultHeader, 
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  loadUser(): Observable<AuthResponse>{
    return this.http.get<AuthResponse>(`${environment.serverUrl}/loaduser`, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  register(registerData: RegisterRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.serverUrl}/register`, registerData, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json'
    });
  }

  resetPwRequest(query: any): Observable<AuthResponse>{
    let resetParams = new HttpParams();
    if('mail' in query){
      resetParams = new HttpParams().set('mail', query.mail);
    }else if('access' in query){
      resetParams = new HttpParams().set('access', query.access);
    }

    return this.http.get<AuthResponse>(`${environment.serverUrl}/requestpwreset`, {
      headers: this.defaultHeader,
      params: resetParams,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  };

  resetPassword(reset: PWReset): Observable<AuthResponse>{
    return this.http.put<AuthResponse>(`${environment.serverUrl}/resetpassword`, reset, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  toggleLogin(): void{
    this.isLoggedIn = !this.isLoggedIn;
  }
}
 