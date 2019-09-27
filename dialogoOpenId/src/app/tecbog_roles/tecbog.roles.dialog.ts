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
            'tecbogRolesRolEstado': [ this.selectedTECBOG_Roles.tecbogRolesRolEstado, [ Validators.required ] ],
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
