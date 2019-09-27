import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';

import { TECBOG_Roles_Dialog } from './tecbog.roles.dialog';
import { TECBOGRolesService } from './tecbog.roles.service';
import { TECBOG_RolesModel } from './tecbog.roles.model';

export const CONDITIONS_LIST = [
  { value: "contains({0})", label: "Contains" },
  { value: "!contains({0})", label: "Not Contains" },
  { value: "=", label: "Is equal" },
  { value: "!=", label: "Is not equal" }
];

export const CONDITIONS_LIST_NUMBER = [
  { value: ">", label: "Greater Than" },
  { value: ">=", label: "Greater or Equal" },
  { value: "<", label: "Less Than" },
  { value: "<=", label: "Less or Equal" },
  { value: "=", label: "Is equal" },
  { value: "!=", label: "Is not equal" }
];

@Component({
  selector: 'tecbog-roles-table',
  templateUrl: './tecbog.roles.table.html',
  // styleUrls: ['./tecbog.roles.table.css'],
  providers: [TECBOGRolesService]
})
export class TECBOG_Roles_Table implements AfterViewInit {
    rows: TECBOG_RolesModel[] = [];
    selectedRow: TECBOG_RolesModel;
    
    public displayedColumns: string[] = ['tecbogRolesaplicacionCodigo', 'tecbogRolesCodigoRol', 'tecbogRolesRolNombre', 'tecbogRolesRolEstado', 'tecbogRolesAutorizaPlanilla', 'tecbogRolesFuncAutorizado', 'tecbogRolesSwAnulacion', 'tecbogRolesAutorizacionIngreso', 'tecbogRolesBloqueoIngreso', 'tecbogRolesCrearCliente', 'tecbogRolesHoraBloqueo', 'tecbogRolesMinutoBloqueo', 'tecbogRolesAdmonPortafolio', 'tecbogRolesSimulacion', 'tecbogRolesExtracto', 'tecbogRolesCrearInver', 'tecbogRolesCambioEmpresa', 'tecbogRolesPuedeFuturos', 'tecbogRolesAutorizacionAdmon', 'tecbogRolesValorEfectivo', 'tecbogRolesSaldoCajero', 'tecbogRolesCambioContrib', 'tecbogRolesTiempoEspera', 'tecbogRolesUsrInter', 'tecbogRolesAdmonInforme', 'tecbogRolesHoraIngreso', 'tecbogRolesTipoSeguridad', 'tecbogRolesModiComprobante', 'tecbogRolesRetFechCompro', 'tecbogRolesTipoHsystem', 'tecbogRolesDv11Menu', 'tecbogRolesAplicacion1', 'tecbogRolesAplicacion2', 'tecbogRolesAplicacion3', 'tecbogRolesAplicacion4', 'tecbogRolesAplicacion5', 'tecbogRolesAplicacion6', 'tecbogRolesAplicacion7', 'tecbogRolesPantalla', 'tecbogRolesBloqueoMovto', 'tecbogRolesConsultaSaldo', 'tecbogRolesIndEjecutivo', 'tecbogRolesTipoFirma', 'tecbogRolesCambioContabilidad', 'tecbogRolesSaldoMe', 'tecbogRolesEditaIdbAutomatico', 'tecbogRolesGeneraBitacora', 'tecbogRolesModificaParImptos', 'tecbogRolesModificaClientes', 'tecbogRolesAdministradorUsuarios', 'tecbogRolesCambioEdoPagoProv', 'tecbogRolesNivelCartera', 'tecbogRolesNivelDpf', 'tecbogRolesAdministraPuc', 'tecbogRolesAplicativo', 'tecbogRolesCrearUsuarios', 'tecbogRolesModiFecProgramda', 'tecbogRolesAsignaTitulo', 'tecbogRolesCambioSucTesoreria', 'tecbogRolesIndChequeras', 'tecbogRolesConsultaClientes', 'tecbogRolesParametrosCaja', 'tecbogRolesTransaccionesCaja', 'tecbogRolesEfecOperaTeso', 'tecbogRolesNroModificaciones', 'tecbogRolesSwEjecutaDepurador', 'tecbogRolesSwCodigosDepurador', 'tecbogRolesSwModifCuentas', 'tecbogRolesSwUsuarioDwh', 'tecbogRolesCambioSucAhorro', 'tecbogRolesCorreoElectronico', 'tecbogRolesNumeroCelular', 'tecbogRolesIndIngresoLibranza', 'tecbogRolesPerfilLibranza', 'tecbogRolesPerfilTableros', 'tecbogRolesIndModifParAhoSuc', 'tecbogRolesIndAutorizaCondManejo', 'tecbogRolesIndEliminaCondManejo', 'tecbogRolesIndModificaCondManejo', 'tecbogRolesIndParManejoFirmasSuc', 'tecbogRolesIndModFirmas', 'tecbogRolesIndAutFirmas', 'tecbogRolesIndInsertFirmas', 'tecbogRolesPerfilProvisionAtm', 'tecbogRolesCodigoEmpleado', 'tecbogRolesCodZona', 'tecbogRolesTipoAsesor', 'tecbogRolesAplicaIncentivos', 'tecbogRolesTipoFirmaTeso', 'tecbogRolesFechaModDato', 'tecbogRolesUsuarioModDat', 'tecbogRolesFechaModClave', 'tecbogRolesModalidadAsesor', 'tecbogRolesCdtsTesoreria', 'tecbogRolesIndSeguimientoUsuarios', 'tecbogRolesNoAutorImpresiones', 'tecbogRolesPerfilPqr', 'tecbogRolesProfileBaseDatos', 'tecbogRolesRolBaseDatos', 'tecbogRolesIndAdministrarUsuarios', 'tecbogRolesIndAdministrarRoles', 'tecbogRolesIndCrearUsuarios', 'tecbogRolesIndCrearRoles', 'tecbogRolesIndAdministrarAlertas', 'tecbogRolesIndTipoSegXTECBOGRolesModulo', 'tecbogRolesIndGeneraReportesGrales', 'tecbogRolesIndGeneraReportesLog', 'tecbogRolesMontoMaxOrdengiroCxp', 'tecbogRolesFiltroReportesCdts', 'tecbogRolesRolBaseDatosCaja', 'tecbogRolesTipoFirmaWfc', 'tecbogRolesNivelInformes', 'tecbogRolesIndAnalistaAprobacion', 'tecbogRolesIndCambioZona', 'tecbogRolesDiasPassword', 'tecbogRolesNivel', 'tecbogRolesHorario', 'tecbogRolesIndAdministraNominaAho', 'tecbogRolesUsuarioOficinaCxcCxp', 'tecbogRolesAutorAnulaChq', 'tecbogRolesAutReimpChq', 'tecbogRolesIndCierre', 'tecbogRolesIndAnalistaAprobacionActivo', 'tecbogRolesValorAsignacionInicial', 'tecbogRolesValorAsignacionFinal'];

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
    
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    _proc: boolean = false;
    _status: boolean = false;

    constructor(public dialog: MatDialog,
                private TECBOG_RolesService: TECBOGRolesService) { }

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
              return this.TECBOG_RolesService.getTECBOG_RolesList(this.filter, this.paginator.pageSize, this.paginator.pageIndex + 1, sortExpr);
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
      this.selectedRow = new TECBOG_RolesModel();

      this.openDialog();
    }

    edit(): void {
      if (this.selectedRow) {
        this.openDialog();
      }
    }

    refresh() {
      this.ngAfterViewInit();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(TECBOG_Roles_Dialog, {
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

    onSelect(event, row: TECBOG_RolesModel) {
        this.selectedRow = row;
        this.openDialog();
    }
    
    onTotals(data: any) {
        Object.assign(this.selectedRow, data);
    }

    applyFilter(e) {
        this.filter.column = e;
        this.filter.value = this.searchValue[e];
        this.filter.condition = this.searchCondition[e];
        
        let evt = new PageEvent();
        evt.pageIndex = 1;
        this.paginator.page.emit(evt);
    }

    clearColumn(e) { }

    exportCsv(e) { }

}
