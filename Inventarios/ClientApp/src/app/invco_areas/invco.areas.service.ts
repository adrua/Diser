import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { INVCO_AreasModel } from './invco.areas.model';

@Injectable({ providedIn: 'root' })
export class INVCOAreasService {
  private INVCOAreasUrl = '';  // URL to web api

  constructor(private http: HttpClient) {
    this.INVCOAreasUrl = `${environment.dataServiceUrl}/api/INVCO_AreasDataServices_27730_DISER`;
  }

  getINVCO_Areas(row: INVCO_AreasModel): Observable<INVCO_AreasModel> {
    const params = {
      compania: row.compania.toString(),
      invcoAreaId: row.invcoAreaId.toString()
    };

    return this.http.get<INVCO_AreasModel>(this.INVCOAreasUrl, { params }).pipe(
      retry(3),
      tap(() => this.log('fetched INVCO_Areas')),
      catchError((error) => this.handleError('getINVCO_Areas', error))
    );
  }

  getINVCO_AreasList(
    filter: {
      value: any,
      condition: string,
      column: string
    },
    pageSize: number = 10,
    pageIndex: number = 0,
    sortExpr: string = ''): Observable<any> {

    const params: any = {
      term: filter.value,
      condition: filter.condition,
      column: filter.column,
      pageSize: pageSize.toString(),
      pageIndex: pageIndex.toString()
    };

    if (sortExpr) {
      params.sort = sortExpr;
    }

    const sUrl = `${this.INVCOAreasUrl}/Search`;

    return this.http.get<any>(sUrl, { params }).pipe(
      retry(3),
      tap(row => this.log('fetched INVCO_Areas')),
      catchError((error) => this.handleError('getINVCO_AreasList', error))
    );
  }

  addINVCO_Areas(row: INVCO_AreasModel): Observable<INVCO_AreasModel> {
    return this.http.post<INVCO_AreasModel>(this.INVCOAreasUrl, row).pipe(
      retry(3),
      tap((rrow: INVCO_AreasModel) => this.log(`added INVCO_Areas w/ id=${rrow.invcoAreaId}`)),
      catchError((error) => this.handleError('addINVCO_Areas', error))
    );
  }

  updateINVCO_Areas(row: INVCO_AreasModel): Observable<INVCO_AreasModel> {

    return this.http.put<INVCO_AreasModel>(this.INVCOAreasUrl, row).pipe(
      retry(3),
      tap(_ => this.log(`update INVCO_Areas id=${row.invcoAreaId}`)),
      catchError((error) => this.handleError('updateINVCO_Areas', error))
    );
  }

  saveINVCO_Areas(row: INVCO_AreasModel): Observable<INVCO_AreasModel> {
    if (row.estado === 'N') {
      return this.addINVCO_Areas(row);
    } else {
      return this.updateINVCO_Areas(row);
    }
  }

  deleteINVCO_Areas(row: INVCO_AreasModel): Observable<INVCO_AreasModel> {
    const sUrl = `${this.INVCOAreasUrl}/${row.compania}/${row.invcoAreaId}`;

    return this.http.delete(sUrl).pipe(
      retry(3),
      tap(_ => this.log(`filter INVCO_Areas id=${row.invcoAreaId}`)),
      catchError((error) => this.handleError('deleteINVCO_Areas', error))
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

  /** Log a INVCO_AreasService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`INVCO_AreasService: ${message}`);
    console.log(`INVCO_AreasService: ${message}`);
  }

}
