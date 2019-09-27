import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { loginModel } from './login.model';

const httpOptions = {
  observe: null,
  params: null,
  headers: new HttpHeaders({
    'Content-Type': 'application/json'  ,
    'username': '',
    'passord': ''
  })
};

@Injectable({ providedIn: 'root' })
export class loginService {
    private loginUrl = '';  // URL to web api
    public isLogin = false;
    public token = '';

    constructor(private http: HttpClient) {
        this.loginUrl = `${environment.loginServiceUrl}/Authentication`;
    }

    login(row: loginModel): Observable<HttpResponse<loginModel>> {
      httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json'  ,
        'username': row.username,
        'password': row.password
      });

      httpOptions.observe = "response";

      const sUrl = `${this.loginUrl}/Login`;

      return this.http.post<loginModel>(sUrl, {}, httpOptions).pipe(
          retry(3),
          tap((resp: HttpResponse<loginModel>) => {
            this.log(`login w/ id=${resp.body.username}`);
            return resp;
        }),
          catchError((error) => this.handleError('login', error))
      );
    }

    private handleError(operation = 'operation', result?: any) {

          // TODO: send the error to remote logging infrastructure
          console.log(result.error); // log to console instead

          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${result.message}`);

          // Let the app keep running by returning an empty result.
          return of(result);
    }

    /** Log a INVCO_BienesService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`loginService: ${message}`);
        console.log(`LoginService: ${message}`);
    }

}
