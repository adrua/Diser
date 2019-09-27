import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { INVCO_BienesModel } from './invco.bienes.model';


const httpOptions = {
  params: null,
  headers: new HttpHeaders({
    'Content-Type': 'application/json'  ,
    'Authorization': window["token"]
  })
};

@Injectable({ providedIn: 'root' })
export class INVCOBienesService {
    private INVCOBienesUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.INVCOBienesUrl = `${environment.dataServiceUrl}/Administracion/ActividadesCiuu/`;
        
    }

    getINVCO_Bienes(row: INVCO_BienesModel): Observable<INVCO_BienesModel> {
        const params = {
            compania: row.compania.toString(),
            invcoBienId: row.invcoBienId.toString()
        };

        return this.http.get<INVCO_BienesModel>(this.INVCOBienesUrl, { params }).pipe(
            retry(3),
            tap(() => this.log('fetched INVCO_Bienes')),
            catchError((error) => this.handleError('getINVCO_Bienes', error))
        );
    }

    getINVCO_BienesList(
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

        const sUrl = `${this.INVCOBienesUrl}/Search`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'  ,
            'Authorization': `Bearer ${window["token"]}`
          });

        return this.http.get<any>(sUrl, { params, headers: headers }).pipe(
            retry(3),
            tap(row => this.log('fetched INVCO_Bienes')),
            catchError((error) => this.handleError('getINVCO_BienesList', error))
        );
    }

    addINVCO_Bienes(row: INVCO_BienesModel): Observable<INVCO_BienesModel> {
        return this.http.post<INVCO_BienesModel>(this.INVCOBienesUrl, row, httpOptions).pipe(
            retry(3),
            tap((rrow: INVCO_BienesModel) => this.log(`added INVCO_Bienes w/ id=${rrow.invcoBienId}`)),
            catchError((error) => this.handleError('addINVCO_Bienes', error))
        );
    }

    updateINVCO_Bienes(row: INVCO_BienesModel): Observable<INVCO_BienesModel> {
        // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

        return this.http.put<INVCO_BienesModel>(this.INVCOBienesUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update INVCO_Bienes id=${row.invcoBienId}`)),
            catchError((error) => this.handleError('updateINVCO_Bienes', error))
        );
    }

    saveINVCO_Bienes(row: INVCO_BienesModel): Observable<INVCO_BienesModel> {
        if (row.estado === 'N') {
            return this.addINVCO_Bienes(row);
        } else {
            return this.updateINVCO_Bienes(row);
        }
    }

    deleteINVCO_Bienes(row: INVCO_BienesModel): Observable<INVCO_BienesModel> {
        const sUrl = `${this.INVCOBienesUrl}/${row.compania}/${row.invcoBienId}`;

        return this.http.delete(sUrl, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter INVCO_Bienes id=${row.invcoBienId}`)),
            catchError((error) => this.handleError('deleteINVCO_Bienes', error))
        );
    }

    filterINVCOAreaDescripcion(val: string): Observable<any> {
        let sUrl = `${this.INVCOBienesUrl}/INVCO_Areas`;
        let params = { term: (val)?val:''};

        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter INVCO_Bienes id=${val}`)),
            catchError((error) => this.handleError('filterINVCO_Bienes', error))
        );
    }

    filterINVCOPersonaNombreCompleto(val: string): Observable<any> {
        let sUrl = `${this.INVCOBienesUrl}/INVCO_Personas`;
        let params = { term: (val)?val:''};

        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter INVCO_Bienes id=${val}`)),
            catchError((error) => this.handleError('filterINVCO_Bienes', error))
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
        // this.messageService.add(`INVCO_BienesService: ${message}`);
        console.log(`INVCO_BienesService: ${message}`);
    }

}
