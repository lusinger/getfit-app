import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';
import { Item } from '../interfaces/item';
import { Recipe } from '../interfaces/recipe';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response';

import { Entry } from '../interfaces/entry';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
  ) { }

  getItem = (id: number): Observable<Item> => {
    return this.http.get<Item>(`${environment.serverUrl}/item:${id}`, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  };

  getItems = (search?: string, start?: number, end?: number): Observable<Item[]> => {
    let params = new HttpParams();
    if(search !== undefined){
      params = new HttpParams()
        .set('search', search);
    }
    if(start !== undefined && search !== undefined){
      params = new HttpParams()
        .set('search', search)
        .set('start', start);
    }
    if(end !== undefined && start !== undefined && search !== undefined){
      params = new HttpParams()
        .set('search', search)
        .set('start', start)
        .set('end', end);
    }

    return this.http.get<Item[]>(`${environment.serverUrl}/items`, {
      headers: this.defaultHeader,
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  };

  getEntry = (id: number): Observable<Entry> => {
    const params = new HttpParams()
      .set('id', id);

    return this.http.get<Entry>(`${environment.serverUrl}/entry.${id}`, {
      headers: this.defaultHeader,
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  } 
  
  getEntries = (date: Date): Observable<Entry[]> => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const params = new HttpParams()
      .set('year', year)
      .set('month', month)
      .set('date', day);

    return this.http.get<Entry[]>(`${environment.serverUrl}/entries`, {
      headers: this.defaultHeader,
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  addEntries = (entries: Entry[]): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(`${environment.serverUrl}/create/entries`, entries, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  addRecipe = (data: {entries: Entry[], recipe: Recipe}): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(`${environment.serverUrl}/create/recipe`, data, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    })
  }

  deleteEntry = (id: number): Observable<AuthResponse> => {
    const params = new HttpParams()
      .set('id', id);

    return this.http.delete<AuthResponse>(`${environment.serverUrl}/delete/entry`, {
      headers: this.defaultHeader,
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    })
  }
}
