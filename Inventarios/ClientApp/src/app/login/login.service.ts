import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { loginModel } from './login.model';

const httpOptions = {
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
        this.loginUrl = `${environment.authorizationServiceUrl}/security/authenticate`;
    }

    login(row: loginModel): Observable<loginModel> {
        httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json'  ,
            'username': row.username,
            'password': row.password
          });
          
        return this.http.post<loginModel>(this.loginUrl, {}, httpOptions).pipe(
            retry(3),
            tap((rrow: loginModel) => this.log(`login w/ id=${rrow.username}`)),
            catchError((error) => this.handleError('login', error))
        );
    }

    private handleError(operation = 'operation', result?: any) {

          // TODO: send the error to remote logging infrastructure
          console.error(result.error); // log to console instead

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
