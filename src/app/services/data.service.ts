import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';
import { Item } from '../interfaces/item';
import { environment } from 'src/environments/environment';

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
}
