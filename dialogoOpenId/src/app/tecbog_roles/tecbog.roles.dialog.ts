import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, switchMap, startWith } from 'rxjs/operators';

import { TECBOGRolesService } from './tecbog.roles.service';
import { TECBOG_RolesModel } from './tecbog.roles.model';

@Component({
  templateUrl: './tecbog.roles.dialog.html',
  // styleUrls: ['./tecbog.roles.dialog.css'],
  providers: [TECBOGRolesService]
})
export class TECBOG_Roles_Dialog {
    selectedTECBOG_Roles: TECBOG_RolesModel;
    
    TECBOG_RolesForm: FormGroup;

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private TECBOG_RolesService: TECBOGRolesService,
                public dialogRef: MatDialogRef<TECBOG_Roles_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: TECBOG_RolesModel) {

        this.selectedTECBOG_Roles = data;
    }

    ngOnInit() {
        this.TECBOG_RolesForm = this.builder.group({
            'compania': [ this.selectedTECBOG_Roles.compania, Validators.required ],        
            'tecbogRolesaplicacionCodigo': [ this.selectedTECBOG_Roles.tecbogRolesaplicacionCodigo, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesCodigoRol': [ this.selectedTECBOG_Roles.tecbogRolesCodigoRol, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesRolNombre': [ this.selectedTECBOG_Roles.tecbogRolesRolNombre, [ Validators.required, Validators.maxLength(93) ] ],
            'tecbogRolesRolEstado': [ this.selectedTECBOG_Roles.tecbogRolesRolEstado, [ Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesAutorizaPlanilla': [ this.selectedTECBOG_Roles.tecbogRolesAutorizaPlanilla, [ Validators.required ] ],
            'tecbogRolesFuncAutorizado': [ this.selectedTECBOG_Roles.tecbogRolesFuncAutorizado, [ Validators.required ] ],
            'tecbogRolesSwAnulacion': [ this.selectedTECBOG_Roles.tecbogRolesSwAnulacion, [ Validators.required ] ],
            'tecbogRolesAutorizacionIngreso': [ this.selectedTECBOG_Roles.tecbogRolesAutorizacionIngreso, [ Validators.required ] ],
            'tecbogRolesBloqueoIngreso': [ this.selectedTECBOG_Roles.tecbogRolesBloqueoIngreso, [ Validators.required ] ],
            'tecbogRolesCrearCliente': [ this.selectedTECBOG_Roles.tecbogRolesCrearCliente, [ Validators.required ] ],
            'tecbogRolesHoraBloqueo': [ this.selectedTECBOG_Roles.tecbogRolesHoraBloqueo, [ Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesMinutoBloqueo': [ this.selectedTECBOG_Roles.tecbogRolesMinutoBloqueo, [ Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesAdmonPortafolio': [ this.selectedTECBOG_Roles.tecbogRolesAdmonPortafolio, [ Validators.required ] ],
            'tecbogRolesSimulacion': [ this.selectedTECBOG_Roles.tecbogRolesSimulacion, [ Validators.required ] ],
            'tecbogRolesExtracto': [ this.selectedTECBOG_Roles.tecbogRolesExtracto, [ Validators.required ] ],
            'tecbogRolesCrearInver': [ this.selectedTECBOG_Roles.tecbogRolesCrearInver, [ Validators.required ] ],
            'tecbogRolesCambioEmpresa': [ this.selectedTECBOG_Roles.tecbogRolesCambioEmpresa, [ Validators.required ] ],
            'tecbogRolesPuedeFuturos': [ this.selectedTECBOG_Roles.tecbogRolesPuedeFuturos, [ Validators.required ] ],
            'tecbogRolesAutorizacionAdmon': [ this.selectedTECBOG_Roles.tecbogRolesAutorizacionAdmon, [ Validators.required ] ],
            'tecbogRolesValorEfectivo': [ this.selectedTECBOG_Roles.tecbogRolesValorEfectivo, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesSaldoCajero': [ this.selectedTECBOG_Roles.tecbogRolesSaldoCajero, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesCambioContrib': [ this.selectedTECBOG_Roles.tecbogRolesCambioContrib, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesTiempoEspera': [ this.selectedTECBOG_Roles.tecbogRolesTiempoEspera, [ Validators.required ] ],
            'tecbogRolesUsrInter': [ this.selectedTECBOG_Roles.tecbogRolesUsrInter, [ Validators.required ] ],
            'tecbogRolesAdmonInforme': [ this.selectedTECBOG_Roles.tecbogRolesAdmonInforme, [ Validators.required ] ],
            'tecbogRolesHoraIngreso': [ this.selectedTECBOG_Roles.tecbogRolesHoraIngreso, [ Validators.required ] ],
            'tecbogRolesTipoSeguridad': [ this.selectedTECBOG_Roles.tecbogRolesTipoSeguridad, [ Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesModiComprobante': [ this.selectedTECBOG_Roles.tecbogRolesModiComprobante, [ Validators.required ] ],
            'tecbogRolesRetFechCompro': [ this.selectedTECBOG_Roles.tecbogRolesRetFechCompro, [ Validators.required ] ],
            'tecbogRolesTipoHsystem': [ this.selectedTECBOG_Roles.tecbogRolesTipoHsystem, [ Validators.required, Validators.maxLength(2) ] ],
            'tecbogRolesDv11Menu': [ this.selectedTECBOG_Roles.tecbogRolesDv11Menu, [ Validators.required ] ],
            'tecbogRolesAplicacion1': [ this.selectedTECBOG_Roles.tecbogRolesAplicacion1, [ Validators.required ] ],
            'tecbogRolesAplicacion2': [ this.selectedTECBOG_Roles.tecbogRolesAplicacion2, [ Validators.required ] ],
            'tecbogRolesAplicacion3': [ this.selectedTECBOG_Roles.tecbogRolesAplicacion3, [ Validators.required ] ],
            'tecbogRolesAplicacion4': [ this.selectedTECBOG_Roles.tecbogRolesAplicacion4, [ Validators.required ] ],
            'tecbogRolesAplicacion5': [ this.selectedTECBOG_Roles.tecbogRolesAplicacion5, [ Validators.required ] ],
            'tecbogRolesAplicacion6': [ this.selectedTECBOG_Roles.tecbogRolesAplicacion6, [ Validators.required ] ],
            'tecbogRolesAplicacion7': [ this.selectedTECBOG_Roles.tecbogRolesAplicacion7, [ Validators.required ] ],
            'tecbogRolesPantalla': [ this.selectedTECBOG_Roles.tecbogRolesPantalla, [ Validators.required, Validators.maxLength(6) ] ],
            'tecbogRolesBloqueoMovto': [ this.selectedTECBOG_Roles.tecbogRolesBloqueoMovto, [ Validators.required ] ],
            'tecbogRolesConsultaSaldo': [ this.selectedTECBOG_Roles.tecbogRolesConsultaSaldo, [ Validators.required ] ],
            'tecbogRolesIndEjecutivo': [ this.selectedTECBOG_Roles.tecbogRolesIndEjecutivo, [ Validators.required ] ],
            'tecbogRolesTipoFirma': [ this.selectedTECBOG_Roles.tecbogRolesTipoFirma, [ Validators.required, Validators.maxLength(3) ] ],
            'tecbogRolesCambioContabilidad': [ this.selectedTECBOG_Roles.tecbogRolesCambioContabilidad, [ Validators.required ] ],
            'tecbogRolesSaldoMe': [ this.selectedTECBOG_Roles.tecbogRolesSaldoMe, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesEditaIdbAutomatico': [ this.selectedTECBOG_Roles.tecbogRolesEditaIdbAutomatico, [ Validators.required ] ],
            'tecbogRolesGeneraBitacora': [ this.selectedTECBOG_Roles.tecbogRolesGeneraBitacora, [ Validators.required ] ],
            'tecbogRolesModificaParImptos': [ this.selectedTECBOG_Roles.tecbogRolesModificaParImptos, [ Validators.required ] ],
            'tecbogRolesModificaClientes': [ this.selectedTECBOG_Roles.tecbogRolesModificaClientes, [ Validators.required ] ],
            'tecbogRolesAdministradorUsuarios': [ this.selectedTECBOG_Roles.tecbogRolesAdministradorUsuarios, [ Validators.required ] ],
            'tecbogRolesCambioEdoPagoProv': [ this.selectedTECBOG_Roles.tecbogRolesCambioEdoPagoProv, [ Validators.required ] ],
            'tecbogRolesNivelCartera': [ this.selectedTECBOG_Roles.tecbogRolesNivelCartera, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesNivelDpf': [ this.selectedTECBOG_Roles.tecbogRolesNivelDpf, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesAdministraPuc': [ this.selectedTECBOG_Roles.tecbogRolesAdministraPuc, [ Validators.required ] ],
            'tecbogRolesAplicativo': [ this.selectedTECBOG_Roles.tecbogRolesAplicativo, [ Validators.required ] ],
            'tecbogRolesCrearUsuarios': [ this.selectedTECBOG_Roles.tecbogRolesCrearUsuarios, [ Validators.required ] ],
            'tecbogRolesModiFecProgramda': [ this.selectedTECBOG_Roles.tecbogRolesModiFecProgramda, [ Validators.required ] ],
            'tecbogRolesAsignaTitulo': [ this.selectedTECBOG_Roles.tecbogRolesAsignaTitulo, [ Validators.required ] ],
            'tecbogRolesCambioSucTesoreria': [ this.selectedTECBOG_Roles.tecbogRolesCambioSucTesoreria, [ Validators.required ] ],
            'tecbogRolesIndChequeras': [ this.selectedTECBOG_Roles.tecbogRolesIndChequeras, [ Validators.required ] ],
            'tecbogRolesConsultaClientes': [ this.selectedTECBOG_Roles.tecbogRolesConsultaClientes, [ Validators.required ] ],
            'tecbogRolesParametrosCaja': [ this.selectedTECBOG_Roles.tecbogRolesParametrosCaja, [ Validators.required ] ],
            'tecbogRolesTransaccionesCaja': [ this.selectedTECBOG_Roles.tecbogRolesTransaccionesCaja, [ Validators.required ] ],
            'tecbogRolesEfecOperaTeso': [ this.selectedTECBOG_Roles.tecbogRolesEfecOperaTeso, [ Validators.required ] ],
            'tecbogRolesNroModificaciones': [ this.selectedTECBOG_Roles.tecbogRolesNroModificaciones, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesSwEjecutaDepurador': [ this.selectedTECBOG_Roles.tecbogRolesSwEjecutaDepurador, [ Validators.required ] ],
            'tecbogRolesSwCodigosDepurador': [ this.selectedTECBOG_Roles.tecbogRolesSwCodigosDepurador, [ Validators.required ] ],
            'tecbogRolesSwModifCuentas': [ this.selectedTECBOG_Roles.tecbogRolesSwModifCuentas, [ Validators.required ] ],
            'tecbogRolesSwUsuarioDwh': [ this.selectedTECBOG_Roles.tecbogRolesSwUsuarioDwh, [ Validators.required ] ],
            'tecbogRolesCambioSucAhorro': [ this.selectedTECBOG_Roles.tecbogRolesCambioSucAhorro, [ Validators.required ] ],
            'tecbogRolesCorreoElectronico': [ this.selectedTECBOG_Roles.tecbogRolesCorreoElectronico, [ Validators.required ] ],
            'tecbogRolesNumeroCelular': [ this.selectedTECBOG_Roles.tecbogRolesNumeroCelular, [ Validators.required ] ],
            'tecbogRolesIndIngresoLibranza': [ this.selectedTECBOG_Roles.tecbogRolesIndIngresoLibranza, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesPerfilLibranza': [ this.selectedTECBOG_Roles.tecbogRolesPerfilLibranza, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesPerfilTableros': [ this.selectedTECBOG_Roles.tecbogRolesPerfilTableros, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndModifParAhoSuc': [ this.selectedTECBOG_Roles.tecbogRolesIndModifParAhoSuc, [ Validators.required ] ],
            'tecbogRolesIndAutorizaCondManejo': [ this.selectedTECBOG_Roles.tecbogRolesIndAutorizaCondManejo, [ Validators.required ] ],
            'tecbogRolesIndEliminaCondManejo': [ this.selectedTECBOG_Roles.tecbogRolesIndEliminaCondManejo, [ Validators.required ] ],
            'tecbogRolesIndModificaCondManejo': [ this.selectedTECBOG_Roles.tecbogRolesIndModificaCondManejo, [ Validators.required ] ],
            'tecbogRolesIndParManejoFirmasSuc': [ this.selectedTECBOG_Roles.tecbogRolesIndParManejoFirmasSuc, [ Validators.required ] ],
            'tecbogRolesIndModFirmas': [ this.selectedTECBOG_Roles.tecbogRolesIndModFirmas, [ Validators.required ] ],
            'tecbogRolesIndAutFirmas': [ this.selectedTECBOG_Roles.tecbogRolesIndAutFirmas, [ Validators.required ] ],
            'tecbogRolesIndInsertFirmas': [ this.selectedTECBOG_Roles.tecbogRolesIndInsertFirmas, [ Validators.required ] ],
            'tecbogRolesPerfilProvisionAtm': [ this.selectedTECBOG_Roles.tecbogRolesPerfilProvisionAtm, [ Validators.required ] ],
            'tecbogRolesCodigoEmpleado': [ this.selectedTECBOG_Roles.tecbogRolesCodigoEmpleado, [ Validators.required, Validators.maxLength(9) ] ],
            'tecbogRolesCodZona': [ this.selectedTECBOG_Roles.tecbogRolesCodZona, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesTipoAsesor': [ this.selectedTECBOG_Roles.tecbogRolesTipoAsesor, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesAplicaIncentivos': [ this.selectedTECBOG_Roles.tecbogRolesAplicaIncentivos, [ Validators.required ] ],
            'tecbogRolesTipoFirmaTeso': [ this.selectedTECBOG_Roles.tecbogRolesTipoFirmaTeso, [ Validators.required, Validators.maxLength(3) ] ],
            'tecbogRolesFechaModDato': [ this.selectedTECBOG_Roles.tecbogRolesFechaModDato, [ Validators.required ] ],
            'tecbogRolesUsuarioModDat': [ this.selectedTECBOG_Roles.tecbogRolesUsuarioModDat, [ Validators.required, Validators.maxLength(9) ] ],
            'tecbogRolesFechaModClave': [ this.selectedTECBOG_Roles.tecbogRolesFechaModClave, [ Validators.required ] ],
            'tecbogRolesModalidadAsesor': [ this.selectedTECBOG_Roles.tecbogRolesModalidadAsesor, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesCdtsTesoreria': [ this.selectedTECBOG_Roles.tecbogRolesCdtsTesoreria, [ Validators.required ] ],
            'tecbogRolesIndSeguimientoUsuarios': [ this.selectedTECBOG_Roles.tecbogRolesIndSeguimientoUsuarios, [ Validators.required ] ],
            'tecbogRolesNoAutorImpresiones': [ this.selectedTECBOG_Roles.tecbogRolesNoAutorImpresiones, [ Validators.required ] ],
            'tecbogRolesPerfilPqr': [ this.selectedTECBOG_Roles.tecbogRolesPerfilPqr, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesProfileBaseDatos': [ this.selectedTECBOG_Roles.tecbogRolesProfileBaseDatos, [ Validators.required, Validators.maxLength(6) ] ],
            'tecbogRolesRolBaseDatos': [ this.selectedTECBOG_Roles.tecbogRolesRolBaseDatos, [ Validators.required, Validators.maxLength(6) ] ],
            'tecbogRolesIndAdministrarUsuarios': [ this.selectedTECBOG_Roles.tecbogRolesIndAdministrarUsuarios, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndAdministrarRoles': [ this.selectedTECBOG_Roles.tecbogRolesIndAdministrarRoles, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndCrearUsuarios': [ this.selectedTECBOG_Roles.tecbogRolesIndCrearUsuarios, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndCrearRoles': [ this.selectedTECBOG_Roles.tecbogRolesIndCrearRoles, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndAdministrarAlertas': [ this.selectedTECBOG_Roles.tecbogRolesIndAdministrarAlertas, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndTipoSegXTECBOGRolesModulo': [ this.selectedTECBOG_Roles.tecbogRolesIndTipoSegXTECBOGRolesModulo, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndGeneraReportesGrales': [ this.selectedTECBOG_Roles.tecbogRolesIndGeneraReportesGrales, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndGeneraReportesLog': [ this.selectedTECBOG_Roles.tecbogRolesIndGeneraReportesLog, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesMontoMaxOrdengiroCxp': [ this.selectedTECBOG_Roles.tecbogRolesMontoMaxOrdengiroCxp, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesFiltroReportesCdts': [ this.selectedTECBOG_Roles.tecbogRolesFiltroReportesCdts, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesRolBaseDatosCaja': [ this.selectedTECBOG_Roles.tecbogRolesRolBaseDatosCaja, [ Validators.required, Validators.maxLength(6) ] ],
            'tecbogRolesTipoFirmaWfc': [ this.selectedTECBOG_Roles.tecbogRolesTipoFirmaWfc, [ Validators.required, Validators.maxLength(3) ] ],
            'tecbogRolesNivelInformes': [ this.selectedTECBOG_Roles.tecbogRolesNivelInformes, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndAnalistaAprobacion': [ this.selectedTECBOG_Roles.tecbogRolesIndAnalistaAprobacion, [ Validators.required, Validators.maxLength(6) ] ],
            'tecbogRolesIndCambioZona': [ this.selectedTECBOG_Roles.tecbogRolesIndCambioZona, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesDiasPassword': [ this.selectedTECBOG_Roles.tecbogRolesDiasPassword, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesNivel': [ this.selectedTECBOG_Roles.tecbogRolesNivel, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesHorario': [ this.selectedTECBOG_Roles.tecbogRolesHorario, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndAdministraNominaAho': [ this.selectedTECBOG_Roles.tecbogRolesIndAdministraNominaAho, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesUsuarioOficinaCxcCxp': [ this.selectedTECBOG_Roles.tecbogRolesUsuarioOficinaCxcCxp, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesAutorAnulaChq': [ this.selectedTECBOG_Roles.tecbogRolesAutorAnulaChq, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesAutReimpChq': [ this.selectedTECBOG_Roles.tecbogRolesAutReimpChq, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndCierre': [ this.selectedTECBOG_Roles.tecbogRolesIndCierre, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesIndAnalistaAprobacionActivo': [ this.selectedTECBOG_Roles.tecbogRolesIndAnalistaAprobacionActivo, [ Validators.required, Validators.maxLength(6) ] ],
            'tecbogRolesValorAsignacionInicial': [ this.selectedTECBOG_Roles.tecbogRolesValorAsignacionInicial, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'tecbogRolesValorAsignacionFinal': [ this.selectedTECBOG_Roles.tecbogRolesValorAsignacionFinal, [ Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9\.]+$') ] ],
            'estado': [ this.selectedTECBOG_Roles.estado, Validators.required ]
        }, { 
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    let validationErrors = {

                    };

                    return validationErrors;
                } 
        });
        
        this.TECBOG_RolesForm.valueChanges.subscribe((data) => {

            this.TECBOG_RolesForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: TECBOG_RolesModel) {
        this._proc = true;
        if (this.TECBOG_RolesForm.valid) {
            this.TECBOG_RolesService.saveTECBOG_Roles(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = !!data.error;
                this.resultError = null;

                if (!this._status) {
                    this.dialogRef.close({ 
                        data: formData          
                    });
                } else {
                    this.resultError = data.error.map((x) => x.Message).join('');  
                }
            });

        }
    }
    
}
