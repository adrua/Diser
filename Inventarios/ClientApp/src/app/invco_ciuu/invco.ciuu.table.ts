import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';

import { INVCO_Ciuu_Dialog } from './invco.ciuu.dialog';
import { INVCOCiuuService } from './invco.ciuu.service';
import { INVCO_CiuuModel } from './invco.ciuu.model';

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
  selector: 'invco-ciuu-table',
  templateUrl: './invco.ciuu.table.html',
  // styleUrls: ['./invco.ciuu.table.css'],
  providers: [INVCOCiuuService]
})
export class INVCO_Ciuu_Table implements AfterViewInit  {
    rows: INVCO_CiuuModel[] = [];
    selectedRow: INVCO_CiuuModel;
    
    public displayedColumns: string[] = ['invcoCiuuCodigoCiiu', 'invcoCiuuAgrupacion', 'invcoCiuuCiudad', 'invcoCiuuSectorEconomico', 'invcoCiuuNombreHomologaCarteraCcial', 'invcoCiuuHomologaDeceval', 'codHomologaCarteraCcial', 'invcoCiuuHomologaRedeban', 'invcoCiuuHomologacionSecDeceval', 'invcoCiuuCodigoAct', 'invcoCiuuNombreAct', 'invcoCiuuActivo'];

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
                private INVCO_CiuuService: INVCOCiuuService) { }

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
              return this.INVCO_CiuuService.getINVCO_CiuuList(this.filter.nativeElement.value || '', this.paginator.pageSize, this.paginator.pageIndex, sortExpr);
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = data.length;
              var rows = data.slice(0, 5).map((row) => new INVCO_CiuuModel(row));
              return rows;
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
      this.selectedRow = new INVCO_CiuuModel();

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
        const dialogRef = this.dialog.open(INVCO_Ciuu_Dialog, {
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

    onSelect(event, row: INVCO_CiuuModel) {
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
