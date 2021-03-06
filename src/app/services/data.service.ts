import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, retry, throwError, catchError, Subject, BehaviorSubject, startWith } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sections } from '../types/types';
import { Entry, AuthResponse, Recipe, Item } from '../interfaces/interfaces';

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
    return this.http.get<Item>(`${environment.serverUrl}/api/item:${id}`, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  };

  getItems = (search?: string, start?: number, end?: number): Observable<AuthResponse> => {
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

    return this.http.get<AuthResponse>(`${environment.serverUrl}/api/item/items`, {
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

    return this.http.get<Entry>(`${environment.serverUrl}/api/entry/:${id}`, {
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

    return this.http.get<Entry[]>(`${environment.serverUrl}/api/entry/entries`, {
      headers: this.defaultHeader,
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

//#region assigned to handle Entry data...
  handleUpdateEntryErrors = (error: HttpErrorResponse) => {
    switch(error.status){
      case 0:
        console.log('[Client] failed to reach server');
        break;
      default:
        console.error('[Client] undefined error occured');
    }
    return throwError(() => new Error(`${error.message}`));
  }

  updateEntry = (entry: Entry): Observable<AuthResponse> => {
    return this.http.put<AuthResponse>(`${environment.serverUrl}/api/entry/update`, entry, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    }).pipe(catchError(this.handleUpdateEntryErrors));
  }
  
  deleteEntry = (id: number): Observable<AuthResponse> => {
    const params = new HttpParams()
      .set('id', id);

    return this.http.delete<AuthResponse>(`${environment.serverUrl}/api/entry/delete`, {
      headers: this.defaultHeader,
      params: params,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    }).pipe(catchError(this.handleUpdateEntryErrors));
  }

  addEntries = (entries: Entry[]): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(`${environment.serverUrl}/api/entry/create`, entries, {
      headers: this.defaultHeader,
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }
//#endregion

  /* addImage = (file: FormData): Observable<AuthResponse> => {
    const header = new HttpHeaders({
      'Content-Type': 'image/jpeg'
    });

    return this.http.post<AuthResponse>(`${environment.serverUrl}/add/image`, file, {
      headers: header,
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
  } */

}
