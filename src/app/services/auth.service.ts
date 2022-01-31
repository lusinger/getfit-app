import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { LoginRequest } from '../interfaces/login-request';
import { RegisterRequest } from '../interfaces/register-request';
import { AuthResponse } from '../interfaces/auth-response';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

interface ResetQuery{
  mail?: string;
  access?: string;
  newPassword?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  user: User | null = null;

  constructor(private http: HttpClient,) { }

  refreshToken(mail: string): Observable<AuthResponse>{
    const params = new HttpParams()
      .set('mail', mail);
    return this.http.get<AuthResponse>(`${environment.serverUrl}/refresh/token`, {
      headers: this.defaultHeader,
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
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
      withCredentials: true,
    });
  }

  loadUser(): Observable<AuthResponse>{
    return this.http.get<AuthResponse>(`${environment.serverUrl}/user`, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  deleteUser(id: number): Observable<AuthResponse>{
    const params = new HttpParams()
      .set('id', id);

    return this.http.delete<AuthResponse>(`${environment.serverUrl}/delete/user`, {
      headers: this.defaultHeader,
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  updateUser(user: {data: any, id: number}): Observable<AuthResponse>{
    return this.http.put<AuthResponse>(`${environment.serverUrl}/update/user`, user, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    })
  }

  register(registerData: RegisterRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.serverUrl}/register`, registerData, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json'
    });
  }

  resetPassword(query: ResetQuery): Observable<AuthResponse>{
    return this.http.put<AuthResponse>(`${environment.serverUrl}/reset`, query, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  logout(): Observable<AuthResponse>{
    return this.http.get<AuthResponse>(`${environment.serverUrl}/logout`, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  setUser(user: User): void{
    this.user = user;
  }

  getUser(): User | null{
    if(this.user !== null){
      return this.user;
    }else{
      return null;
    }
  }
}
 