import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';

import { INVCO_Personas_Dialog } from './invco.personas.dialog';
import { INVCOPersonasService } from './invco.personas.service';
import { INVCO_PersonasModel } from './invco.personas.model';

export const CONDITIONS_LIST = [
  { value: "nono", label: "Nono" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
  { value: "is-equal", label: "Is equal" },
  { value: "is-not-equal", label: "Is not equal" }
];

export const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
  "is-empty": function (value, filterdValue) {
    return value === "";
  },
  "is-not-empty": function (value, filterdValue) {
    return value !== "";
  },
  "is-equal": function (value, filterdValue) {
    return value == filterdValue;
  },
  "is-not-equal": function (value, filterdValue) {
    return value != filterdValue;
  }
};

@Component({
  selector: 'invco-personas-table',
  templateUrl: './invco.personas.table.html',
  // styleUrls: ['./invco.personas.table.css'],
  providers: [INVCOPersonasService]
})
export class INVCO_Personas_Table implements AfterViewInit  {
    rows: INVCO_PersonasModel[] = [];
    selectedRow: INVCO_PersonasModel;
    
    public displayedColumns: string[] = ['invcoPersonaId', 'invcoPersonaApellidos', 'invcoPersonaNombre', 'invcoPersonaDireccion', 'govcoCiudadNombre', 'invcoPersonaTelefono', 'invcoPersonaEMail', 'invcoAreaDescripcion', 'invcoPersonaEstado'];

    public conditionsList = CONDITIONS_LIST;
    public searchValue: any = {};
    public searchCondition: any = {};
    private _filterMethods = CONDITIONS_FUNCTIONS;
    public _pageSize = 10;

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild('filter', { static: false }) filter: ElementRef;

    _proc: boolean = false;
    _status: boolean = false;

    constructor(public dialog: MatDialog,
                private INVCO_PersonasService: INVCOPersonasService) { }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        
        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              let sortExpr = '';
              if (this.sort.active) {
                sortExpr = `${this.sort.active} ${this.sort.direction}`;
              }
              return this.INVCO_PersonasService.getINVCO_PersonasList(this.filter.nativeElement.value || '', this.paginator.pageSize, this.paginator.pageIndex, sortExpr);
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = data.rowsCount;
        
              return data.rows;
            }),
            catchError(() => {
              this.isLoadingResults = false;
              // Catch if the API has reached its rate limit. Return empty data.
              this.isRateLimitReached = true;
              return observableOf([]);
            })
          ).subscribe(data => this.rows = data);
    }

    add(): void {
      this.selectedRow = new INVCO_PersonasModel();

      this.openDialog();
    }

    edit(): void {
      if(this.selectedRow) {
        this.openDialog();
      }
    }

    refresh() {
      this.ngAfterViewInit();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(INVCO_Personas_Dialog, {
          data: this.selectedRow
        });
        
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            Object.assign(this.selectedRow, result.data);
            if (this.selectedRow.estado === 'N') {
              this.selectedRow.estado = 'C';
              this.rows.push(this.selectedRow);
              this.rows = [...this.rows];
            } 
          }  
        });
    }

    onSelect(event, row: INVCO_PersonasModel) {
        this.selectedRow = row;
        this.openDialog();
    }
    
    onTotals(data: any) {
        Object.assign(this.selectedRow, data);
    }

    applyFilter(e) {
        let evt = new PageEvent();
        evt.pageIndex = 1;
        this.paginator.page.emit(evt);
    }

    clearColumn(e) { }

    exportCsv(e) { }

}
