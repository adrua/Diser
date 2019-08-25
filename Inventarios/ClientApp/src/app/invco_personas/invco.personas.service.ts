import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { INVCO_PersonasModel } from './invco.personas.model';


const httpOptions = {
  params: null,
  headers: new HttpHeaders({
    'Content-Type': 'application/json' // ,
//    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class INVCOPersonasService {
    private INVCOPersonasUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.INVCOPersonasUrl = `${environment.dataServiceUrl}/api/INVCO_PersonasDataServices_27740_DISER`;
    }

    getINVCO_Personas(row: INVCO_PersonasModel): Observable<INVCO_PersonasModel> {
        const params = {
            compania: row.compania.toString(),
            invcoPersonaId: row.invcoPersonaId.toString()
        };

        return this.http.get<INVCO_PersonasModel>(this.INVCOPersonasUrl, { params }).pipe(
            retry(3),
            tap(() => this.log('fetched INVCO_Personas')),
            catchError((error) => this.handleError('getINVCO_Personas', error))
        );
    }

    getINVCO_PersonasList(
                val: string,
                pageSize: number = 10,
                pageIndex: number = 0,
                sortExpr: string = ''): Observable<any> {
        const params: any = {
            term: val,
            pageSize: pageSize.toString(),
            pageIndex: pageIndex.toString()
        };

        if (sortExpr) {
              params.sort = sortExpr;
        }

        const sUrl = `${this.INVCOPersonasUrl}/Search`;

        return this.http.get<any>(sUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched INVCO_Personas')),
            catchError((error) => this.handleError('getINVCO_PersonasList', error))
        );
    }

    addINVCO_Personas(row: INVCO_PersonasModel): Observable<INVCO_PersonasModel> {
        return this.http.post<INVCO_PersonasModel>(this.INVCOPersonasUrl, row, httpOptions).pipe(
            retry(3),
            tap((rrow: INVCO_PersonasModel) => this.log(`added INVCO_Personas w/ id=${rrow.invcoPersonaId}`)),
            catchError((error) => this.handleError('addINVCO_Personas', error))
        );
    }

    updateINVCO_Personas(row: INVCO_PersonasModel): Observable<INVCO_PersonasModel> {
        // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

        return this.http.put<INVCO_PersonasModel>(this.INVCOPersonasUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update INVCO_Personas id=${row.invcoPersonaId}`)),
            catchError((error) => this.handleError('updateINVCO_Personas', error))
        );
    }

    saveINVCO_Personas(row: INVCO_PersonasModel): Observable<INVCO_PersonasModel> {
        if (row.estado === 'N') {
            return this.addINVCO_Personas(row);
        } else {
            return this.updateINVCO_Personas(row);
        }
    }

    deleteINVCO_Personas(row: INVCO_PersonasModel): Observable<INVCO_PersonasModel> {
        const sUrl = `${this.INVCOPersonasUrl}/${row.compania}/${row.invcoPersonaId}`;

        return this.http.delete(sUrl, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter INVCO_Personas id=${row.invcoPersonaId}`)),
            catchError((error) => this.handleError('deleteINVCO_Personas', error))
        );
    }

    filterGOVCOCiudadNombre(val: string): Observable<any> {
        let sUrl = `${this.INVCOPersonasUrl}/GOVCO_Ciudades`;
        let params = { term: (val)?val:''};

        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter INVCO_Personas id=${val}`)),
            catchError((error) => this.handleError('filterINVCO_Personas', error))
        );
    }

    filterINVCOAreaDescripcion(val: string): Observable<any> {
        let sUrl = `${this.INVCOPersonasUrl}/INVCO_Areas`;
        let params = { term: (val)?val:''};

        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter INVCO_Personas id=${val}`)),
            catchError((error) => this.handleError('filterINVCO_Personas', error))
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

    /** Log a INVCO_PersonasService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`INVCO_PersonasService: ${message}`);
        console.log(`INVCO_PersonasService: ${message}`);
    }

}
