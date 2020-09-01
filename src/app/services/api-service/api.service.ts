import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient) { }
  get(URL: string, AUTHORIZATION: string, params: any = null) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTHORIZATION}`
      }),
      params: params
    };
    return this.http.get(URL, httpOptions);
  }
  post(URL: string, AUTHORIZATION: string, BODY: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTHORIZATION}`
      })
    };
    return this.http.post(URL, JSON.stringify(BODY), httpOptions);
  }
  put(URL: string, AUTHORIZATION: string, BODY: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTHORIZATION}`
      })
    };
    return this.http.put(URL, JSON.stringify(BODY), httpOptions);
  }
  delete(URL: string, AUTHORIZATION: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTHORIZATION}`
      })
    };
    return this.http.delete(URL, httpOptions);
  }
  patch(URL: string, AUTHORIZATION: string, BODY: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTHORIZATION}`
      })
    };
    return this.http.patch(URL, JSON.stringify(BODY), httpOptions);
  }
}
