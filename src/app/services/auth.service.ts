import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { LoginRequest } from '../interfaces/login-request';
import { AuthResponse } from '../interfaces/auth-response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient,) { }

  private handleLoginErrors(error: HttpErrorResponse){
    switch(error.status){
      case 0:
        console.log('client or network error');
        break;
      case 200:
        console.log('successful login');
        break;
      case 401:
        console.log('login not authorized');
        break;
    }
    return throwError(() => new Error('error occured'));
  }

  login(loginData: LoginRequest): Observable<AuthResponse>{
    const params = new HttpParams()
      .set('user', loginData.user)
      .set('password', loginData.password);
    
    return this.http.get<AuthResponse>(`${environment.serverUrl}/login`, {
      headers: this.defaultHeader, 
      params: params,
      observe: 'body',
      responseType: 'json',
    }).pipe(catchError(this.handleLoginErrors));
  }
}
 