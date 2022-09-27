import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://private-a6bca-citadu.apiary-mock.com/ads';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  headerOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    }),
  };

  public get(): Observable<any> {
    return this.http.get(API_URL, this.headerOptions).pipe(map((res) => res));
  }
}
// /api/users
