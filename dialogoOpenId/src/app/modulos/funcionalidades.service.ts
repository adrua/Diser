import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment';

import { funcionalidadesModel } from './funcionalidades.model';
import { moduloModel } from './modulo.model';

@Injectable({ providedIn: 'root' })
export class funcionalidadesService {
    private rolUrl = '';  // URL to web api

    get usuario(): any {
      return jwt_decode(sessionStorage.getItem("token"))
    }
      
    constructor(private http: HttpClient) {
        this.rolUrl = `${environment.loginServiceUrl}/Authorization/ModuloRolFuncionalidad`;
    }

    getFuncionalidades(modulo: moduloModel): Observable<funcionalidadesModel[]> {

      const _rolUrl = `${this.rolUrl}/${this.usuario.rol}/${modulo.moduloCodigo}`;

      return this.http.get<funcionalidadesModel[]>(_rolUrl).pipe(
          retry(3),
          tap((data) => this.log(`funcionalidadess`)),
          catchError((error) => this.handleError('funcionalidades', error))
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
        console.log(`funcionalidadesService: ${message}`);
    }

}
