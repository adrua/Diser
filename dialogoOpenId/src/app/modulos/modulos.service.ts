import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { ModulosModel } from './modulos.model';

@Injectable({ providedIn: 'root' })
export class ModulosService {
    private modulosUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.modulosUrl = `${environment.dataServiceUrl}/AdministracionSOA-1.0/Modulos`;
    }

    getModulos(row: ModulosModel): Observable<ModulosModel> {
        const params = {
            aplicacion_codigo: row.aplicacionCodigo.toString(),
            modulo_codigo: row.moduloCodigo.toString()
        };

        return this.http.get<ModulosModel>(this.modulosUrl, { params }).pipe(
            retry(3),
            tap(() => this.log('fetched Modulos')),
            catchError((error) => this.handleError('getModulos', error))
        );
    }

    getModulosList(
                filter: {
                    value: any,
                    condition: string,
                    column: string
                },
                pageSize: number = 10,
                pageIndex: number = 1,
                sortColumn: string = '',
                sortMode: string = ''): Observable<any> {
                
        const params: any = {
            term: filter.value,
            condition: filter.condition,
            column: filter.column,
            pageSize: pageSize.toString(),
            pageIndex: pageIndex.toString(),
            sortColumn: sortColumn,
            sortMode: sortMode
        };

        if (sortColumn) {
              params.sortColumn = sortColumn;
              params.sortMode = sortMode;
        }

        const sUrl = `${this.modulosUrl}/Page`;

        return this.http.get<any>(sUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched Modulos')),
            catchError((error) => this.handleError('getModulosList', error))
        );
    }

    addModulos(row: ModulosModel): Observable<ModulosModel> {
        return this.http.post<ModulosModel>(this.modulosUrl, row).pipe(
            retry(3),
            tap((rrow: ModulosModel) => this.log(`added Modulos w/ id=/${row.aplicacionCodigo}/${row.moduloCodigo}`)),
            catchError((error) => this.handleError('addModulos', error))
        );
    }

    updateModulos(row: ModulosModel): Observable<ModulosModel> {

        return this.http.put<ModulosModel>(this.modulosUrl, row).pipe(
            retry(3),
            tap(_ => this.log(`update Modulos id=/${row.aplicacionCodigo}/${row.moduloCodigo}`)),
            catchError((error) => this.handleError('updateModulos', error))
        );
    }

    saveModulos(row: ModulosModel): Observable<ModulosModel> {
        if (row._estado === 'N') {
            return this.addModulos(row);
        } else {
            return this.updateModulos(row);
        }
    }

    deleteModulos(row: ModulosModel): Observable<ModulosModel> {
        const sUrl = `${this.modulosUrl}/${row.aplicacionCodigo}/${row.moduloCodigo}`;

        return this.http.delete(sUrl).pipe(
            retry(3),
            tap(_ => this.log(`filter Modulos id=/${row.aplicacionCodigo}/${row.moduloCodigo}`)),
            catchError((error) => this.handleError('deleteModulos', error))
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

    /** Log a ModulosService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`ModulosService: ${message}`);
        console.log(`ModulosService: ${message}`);
    }

}
