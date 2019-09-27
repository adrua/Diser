import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { TECBOG_RolesModel } from './tecbog.roles.model';

@Injectable({ providedIn: 'root' })
export class TECBOGRolesService {
    private TECBOGRolesUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.TECBOGRolesUrl = `${environment.dataServiceUrl}/api/TECBOG_RolesDataServices_27785_DLG`;
    }

    getTECBOG_Roles(row: TECBOG_RolesModel): Observable<TECBOG_RolesModel> {
        const params = {
            compania: row.compania.toString(),
            tecbogRolesaplicacionCodigo: row.tecbogRolesaplicacionCodigo.toString(),
            tecbogRolesCodigoRol: row.tecbogRolesCodigoRol.toString()
        };

        return this.http.get<TECBOG_RolesModel>(this.TECBOGRolesUrl, { params }).pipe(
            retry(3),
            tap(() => this.log('fetched TECBOG_Roles')),
            catchError((error) => this.handleError('getTECBOG_Roles', error))
        );
    }

    getTECBOG_RolesList(
                filter: {
                    value: any,
                    condition: string,
                    column: string
                },
                pageSize: number = 10,
                pageIndex: number = 0,
                sortExpr: string = ''): Observable<any> {
                
        const params: any = {
            term: filter.value || '',
            condition: filter.condition || 'like',
            column: filter.column || '',
            pageSize: pageSize.toString(),
            pageIndex: pageIndex.toString()
        };

        if (sortExpr) {
              params.sort = sortExpr;
        }

        const sUrl = `${this.TECBOGRolesUrl}/Search`;

        return this.http.get<any>(sUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched TECBOG_Roles')),
            catchError((error) => this.handleError('getTECBOG_RolesList', error))
        );
    }

    addTECBOG_Roles(row: TECBOG_RolesModel): Observable<TECBOG_RolesModel> {
        return this.http.post<TECBOG_RolesModel>(this.TECBOGRolesUrl, row).pipe(
            retry(3),
            tap((rrow: TECBOG_RolesModel) => this.log(`added TECBOG_Roles w/ id=${rrow.tecbogRolesaplicacionCodigo}`)),
            catchError((error) => this.handleError('addTECBOG_Roles', error))
        );
    }

    updateTECBOG_Roles(row: TECBOG_RolesModel): Observable<TECBOG_RolesModel> {
    
        return this.http.put<TECBOG_RolesModel>(this.TECBOGRolesUrl, row).pipe(
            retry(3),
            tap(_ => this.log(`update TECBOG_Roles id=${row.tecbogRolesaplicacionCodigo}`)),
            catchError((error) => this.handleError('updateTECBOG_Roles', error))
        );
    }

    saveTECBOG_Roles(row: TECBOG_RolesModel): Observable<TECBOG_RolesModel> {
        if (row.estado === 'N') {
            return this.addTECBOG_Roles(row);
        } else {
            return this.updateTECBOG_Roles(row);
        }
    }

    deleteTECBOG_Roles(row: TECBOG_RolesModel): Observable<TECBOG_RolesModel> {
        const sUrl = `${this.TECBOGRolesUrl}/${row.compania}/${row.tecbogRolesaplicacionCodigo}/${row.tecbogRolesCodigoRol}`;

        return this.http.delete(sUrl).pipe(
            retry(3),
            tap(_ => this.log(`filter TECBOG_Roles id=${row.tecbogRolesaplicacionCodigo}`)),
            catchError((error) => this.handleError('deleteTECBOG_Roles', error))
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

    /** Log a TECBOG_RolesService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`TECBOG_RolesService: ${message}`);
        console.log(`TECBOG_RolesService: ${message}`);
    }

}
