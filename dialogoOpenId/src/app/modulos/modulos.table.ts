import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';

import { ModulosDialog } from './modulos.dialog';
import { ModulosService } from './modulos.service';
import { ModulosModel } from './modulos.model';

export const CONDITIONS_LIST = [
  { value: "like", label: "Contains" },
  { value: "not like", label: "Not Contains" },
  { value: "=", label: "Is equal" },
  { value: "<>", label: "Is not equal" }
];

export const CONDITIONS_LIST_NUMBER = [
  { value: ">", label: "Greater Than" },
  { value: ">=", label: "Greater or Equal" },
  { value: "<", label: "Less Than" },
  { value: "<=", label: "Less or Equal" },
  { value: "=", label: "Is equal" },
  { value: "<>", label: "Is not equal" }
];

@Component({
  selector: 'modulos-table',
  templateUrl: './modulos.table.html',
  // styleUrls: ['./modulos.table.css'],
  providers: [ModulosService]
})
export class ModulosTable implements AfterViewInit  {
    rows: ModulosModel[] = [];
    selectedRow: ModulosModel;
    
    public displayedColumns: string[] = ['modulo_nombre', 'modulo_descripcion'];

    public conditionsList = CONDITIONS_LIST;
    public conditionsListNumber = CONDITIONS_LIST_NUMBER;
    public searchValue: any = {};
    public searchCondition: any = {};
    public _pageSize = 10;

    filter = { 
      column:  "",
      condition:  "==",
      value: null
    };

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    _proc: boolean = false;
    _status: boolean = false;

    constructor(public dialog: MatDialog,
                private modulosService: ModulosService) { }

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
              return this.modulosService.getModulosList(
                    this.filter, 
                    this.paginator.pageSize, 
                    this.paginator.pageIndex + 1, 
                    this.sort.active, 
                    this.sort.direction);
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = data.count;
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

    onAdd(): void {
      this.selectedRow = new ModulosModel();

      this.openDialog();
    }

    onEdit(): void {
      if(this.selectedRow) {
        this.openDialog();
      }
    }

    onRefresh() {
      this.ngAfterViewInit();
    }

    onSelect(event, row: ModulosModel) {
        this.selectedRow = row;
        this.openDialog();
    }
    
    onTotals(data: any) {
        Object.assign(this.selectedRow, data);
    }

    onApplyFilter(e: Event, columnDB: string, columnModel: string) {
        this.filter.column = columnDB;
        this.filter.condition = this.searchCondition[columnModel];
        this.filter.value = this.searchValue[columnModel];

        let evt = new PageEvent();
        evt.pageIndex = 0;
        this.paginator.page.emit(evt);
    }

    onClearColumn(e: Event) { }

    onExportCsv(e: Event) { }
    
    onCopyRows(e: Event) {
        var result = this.displayedColumns + '\n';
        this.rows.forEach((row) => result += new ModulosModel(row).toClipboard() + '\n');    
        (<any>navigator).clipboard.writeText(result).then(() => console.log('write to clipboard OK'), () => console.log('write to clipboard failed') );
    }

    onPasteRows(e: Event) {
        (<any>navigator).clipboard.readText().then((text: string) => {
            this.rows = [];
            let results = text.split('\n'); 
            let inserts = results.filter((line) => line.length > 0).map((line) => {
                var row = new ModulosModel();
                this.rows.push(row.fromClipboard(line));
                //return this.modulosService.addModulos(row);
            });                       
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ModulosDialog, {
          data: this.selectedRow
        });
        
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            Object.assign(this.selectedRow, result.data);
            if (this.selectedRow._estado === 'N') {
              this.selectedRow._estado = 'C';
              this.rows.push(this.selectedRow);
              this.rows = [...this.rows];
            } 
          }  
        });
    }
}
