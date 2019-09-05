import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { INVCO_CiuuModel } from './invco.ciuu.model';


const httpOptions = {
  params: null,
  headers: new HttpHeaders({
    'Content-Type': 'application/json' // ,
//    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class INVCOCiuuService {
    private INVCOCiuuUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.INVCOCiuuUrl = `${environment.authorizationServiceUrl}/Administracion/ActividadesCiuu`;
    }

    getINVCO_Ciuu(row: INVCO_CiuuModel): Observable<INVCO_CiuuModel> {
        const params = {
            compania: row.compania.toString(),
            invcoCiuuCodigoCiiu: row.invcoCiuuCodigoCiiu.toString()
        };

        return this.http.get<INVCO_CiuuModel>(this.INVCOCiuuUrl, { params }).pipe(
            retry(3),
            tap(() => this.log('fetched INVCO_Ciuu')),
            catchError((error) => this.handleError('getINVCO_Ciuu', error))
        );
    }

    getINVCO_CiuuList(
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

        const sUrl = `${this.INVCOCiuuUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'  ,
            'Authorization': `Bearer ${window["token"]}`
          });

        return this.http.get<any>(sUrl, { params, headers }).pipe(
            retry(3),
            tap(row => this.log('fetched INVCO_Ciuu')),
            catchError((error) => this.handleError('getINVCO_CiuuList', error))
        );
    }

    addINVCO_Ciuu(row: INVCO_CiuuModel): Observable<INVCO_CiuuModel> {
        httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json'  ,
            'Authorization': `Bearer ${window["token"]}`
          });

          let crow = INVCO_CiuuModel.clone(row);
          return this.http.put<INVCO_CiuuModel>(this.INVCOCiuuUrl, crow, httpOptions).pipe(
            retry(3),
            tap((rrow: INVCO_CiuuModel) => this.log(`added INVCO_Ciuu w/ id=${rrow.invcoCiuuCodigoCiiu}`)),
            catchError((error) => this.handleError('addINVCO_Ciuu', error))
        );
    }

    updateINVCO_Ciuu(row: any): Observable<INVCO_CiuuModel> {
        httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json'  ,
            'Authorization': `Bearer ${window["token"]}`
          });

        let crow = INVCO_CiuuModel.clone(row);

        
        return this.http.post<INVCO_CiuuModel>(this.INVCOCiuuUrl, crow, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update INVCO_Ciuu id=${row.invcoCiuuCodigoCiiu}`)),
            catchError((error) => this.handleError('updateINVCO_Ciuu', error))
        );
    }

    saveINVCO_Ciuu(row: INVCO_CiuuModel): Observable<INVCO_CiuuModel> {
        if (row.estado === 'N') {
            return this.addINVCO_Ciuu(row);
        } else {
            return this.updateINVCO_Ciuu(row);
        }
    }

    deleteINVCO_Ciuu(row: INVCO_CiuuModel): Observable<INVCO_CiuuModel> {
        const sUrl = `${this.INVCOCiuuUrl}`;
        httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json'  ,
            'Authorization': `Bearer ${window["token"]}`
          });

          let crow = INVCO_CiuuModel.clone(row);
          httpOptions.params = crow;
          return this.http.delete(sUrl,  httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter INVCO_Ciuu id=${row.invcoCiuuCodigoCiiu}`)),
            catchError((error) => this.handleError('deleteINVCO_Ciuu', error))
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

    /** Log a INVCO_CiuuService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`INVCO_CiuuService: ${message}`);
        console.log(`INVCO_CiuuService: ${message}`);
    }

}
