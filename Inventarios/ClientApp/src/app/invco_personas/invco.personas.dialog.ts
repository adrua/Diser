import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, switchMap, startWith } from 'rxjs/operators';

import { INVCOPersonasService } from './invco.personas.service';
import { INVCO_PersonasModel } from './invco.personas.model';

@Component({
  templateUrl: './invco.personas.dialog.html',
  // styleUrls: ['./invco.personas.dialog.css'],
  providers: [INVCOPersonasService]
})
export class INVCO_Personas_Dialog {
    selectedINVCO_Personas: INVCO_PersonasModel;
    
    INVCO_PersonasForm: FormGroup;
    GOVCOCiudadNombreCtrl: FormControl = new FormControl();
    filteredGOVCOCiudadNombre: Array<any> = [];
    INVCOAreaDescripcionCtrl: FormControl = new FormControl();
    filteredINVCOAreaDescripcion: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private INVCO_PersonasService: INVCOPersonasService,
                public dialogRef: MatDialogRef<INVCO_Personas_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: INVCO_PersonasModel) {

        this.selectedINVCO_Personas = data;
    }

    ngOnInit() {
        this.INVCO_PersonasForm = this.builder.group({
            'compania': [ this.selectedINVCO_Personas.compania, Validators.required ],        
            'invcoPersonaId': [ this.selectedINVCO_Personas.invcoPersonaId, [ Validators.required ] ],
            'invcoPersonaApellidos': [ this.selectedINVCO_Personas.invcoPersonaApellidos, [ Validators.required, Validators.maxLength(33) ] ],
            'invcoPersonaNombre': [ this.selectedINVCO_Personas.invcoPersonaNombre, [ Validators.required, Validators.maxLength(36) ] ],
            'invcoPersonaDireccion': [ this.selectedINVCO_Personas.invcoPersonaDireccion, [ Validators.required, Validators.maxLength(250) ] ],
            'govcoPaisId': [ this.selectedINVCO_Personas.govcoPaisId, [ Validators.required, Validators.maxLength(4) ] ],
            'govcoDepartamentoId': [ this.selectedINVCO_Personas.govcoDepartamentoId, [ Validators.required, Validators.maxLength(3) ] ],
            'govcoCiudadId': [ this.selectedINVCO_Personas.govcoCiudadId, [ Validators.required, Validators.maxLength(6) ] ],
            'invcoPersonaTelefono': [ this.selectedINVCO_Personas.invcoPersonaTelefono, [ Validators.required, Validators.maxLength(20) ] ],
            'invcoPersonaEMail': [ this.selectedINVCO_Personas.invcoPersonaEMail, [ Validators.required, Validators.maxLength(150) ] ],
            'invcoAreaId': [ this.selectedINVCO_Personas.invcoAreaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoPersonaEstado': [ this.selectedINVCO_Personas.invcoPersonaEstado, [ Validators.required, Validators.maxLength(2) ] ],
            'estado': [ this.selectedINVCO_Personas.estado, Validators.required ]
        }, { 
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    let validationErrors = {

                    };

                    return validationErrors;
                } 
        });
        
        this.GOVCOCiudadNombreCtrl.setValue(this.selectedINVCO_Personas.relaciones.govcoCiudadNombre);
        this.GOVCOCiudadNombreCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.INVCO_PersonasService.filterGOVCOCiudadNombre(data))
            ).subscribe((data) => this.filteredGOVCOCiudadNombre = data);

        this.INVCOAreaDescripcionCtrl.setValue(this.selectedINVCO_Personas.relaciones.invcoAreaDescripcion);
        this.INVCOAreaDescripcionCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.INVCO_PersonasService.filterINVCOAreaDescripcion(data))
            ).subscribe((data) => this.filteredINVCOAreaDescripcion = data);

        this.INVCO_PersonasForm.valueChanges.subscribe((data) => {

            this.INVCO_PersonasForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: INVCO_PersonasModel) {
        this._proc = true;
        if (this.INVCO_PersonasForm.valid) {
            this.INVCO_PersonasService.saveINVCO_Personas(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = !!data.error;
                this.resultError = null;

                if (!this._status) {

                    formData.relaciones = {
                        govcoCiudadNombre: this.GOVCOCiudadNombreCtrl.value,
                        invcoAreaDescripcion: this.INVCOAreaDescripcionCtrl.value
                    };
                    
                    this.dialogRef.close({ 
                        data: formData          
                    });
                } else {
                    this.resultError = data.error.map((x) => x.Message).join('');  
                }
            });

        }
    }
    
    onSelect_GOVCOCiudadNombre(opt: any){
        this.INVCO_PersonasForm.patchValue({
            govcoPaisId: opt.govcoPaisId,
            govcoDepartamentoId: opt.govcoDepartamentoId,
            govcoCiudadId: opt.govcoCiudadId
        });
    }
    
    onSelect_INVCOAreaDescripcion(opt: any){
        this.INVCO_PersonasForm.patchValue({
            invcoAreaId: opt.invcoAreaId
        });
    }
    
}
