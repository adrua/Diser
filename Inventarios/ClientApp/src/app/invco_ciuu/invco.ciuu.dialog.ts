import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, switchMap, startWith } from 'rxjs/operators';

import { INVCOCiuuService } from './invco.ciuu.service';
import { INVCO_CiuuModel } from './invco.ciuu.model';

@Component({
  templateUrl: './invco.ciuu.dialog.html',
  // styleUrls: ['./invco.ciuu.dialog.css'],
  providers: [INVCOCiuuService]
})
export class INVCO_Ciuu_Dialog {
    selectedINVCO_Ciuu: INVCO_CiuuModel;
    
    INVCO_CiuuForm: FormGroup;

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private INVCO_CiuuService: INVCOCiuuService,
                public dialogRef: MatDialogRef<INVCO_Ciuu_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: INVCO_CiuuModel) {

        this.selectedINVCO_Ciuu = data;
    }

    ngOnInit() {
        this.INVCO_CiuuForm = this.builder.group({
            'compania': [ this.selectedINVCO_Ciuu.compania, Validators.required ],        
            'invcoCiuuCodigoCiiu': [ this.selectedINVCO_Ciuu.invcoCiuuCodigoCiiu, [ Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoCiuuAgrupacion': [ this.selectedINVCO_Ciuu.invcoCiuuAgrupacion, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoCiuuCiudad': [ this.selectedINVCO_Ciuu.invcoCiuuCiudad, [ Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoCiuuSectorEconomico': [ this.selectedINVCO_Ciuu.invcoCiuuSectorEconomico, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoCiuuNombreHomologaCarteraCcial': [ this.selectedINVCO_Ciuu.invcoCiuuNombreHomologaCarteraCcial, [ Validators.maxLength(51) ] ],
            'invcoCiuuHomologaDeceval': [ this.selectedINVCO_Ciuu.invcoCiuuHomologaDeceval, [ Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9\.]+$') ] ],
            'codHomologaCarteraCcial': [ this.selectedINVCO_Ciuu.codHomologaCarteraCcial, [ Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoCiuuHomologaRedeban': [ this.selectedINVCO_Ciuu.invcoCiuuHomologaRedeban, [ Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoCiuuHomologacionSecDeceval': [ this.selectedINVCO_Ciuu.invcoCiuuHomologacionSecDeceval, [ Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoCiuuCodigoAct': [ this.selectedINVCO_Ciuu.invcoCiuuCodigoAct, [ Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoCiuuNombreAct': [ this.selectedINVCO_Ciuu.invcoCiuuNombreAct, [ Validators.required, Validators.maxLength(30) ] ],
            'invcoCiuuActivo': [ this.selectedINVCO_Ciuu.invcoCiuuActivo, [ Validators.required ] ],
            'estado': [ this.selectedINVCO_Ciuu.estado, Validators.required ]
        }, { 
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    let validationErrors = {

                    };

                    return validationErrors;
                } 
        });
        
        this.INVCO_CiuuForm.valueChanges.subscribe((data) => {

            this.INVCO_CiuuForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: INVCO_CiuuModel) {
        this._proc = true;
        if (this.INVCO_CiuuForm.valid) {
            this.INVCO_CiuuService.saveINVCO_Ciuu(formData).subscribe((data: any) => {
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
    
    onDelete(formData: INVCO_CiuuModel) {
        this._proc = true;
        if (this.INVCO_CiuuForm.valid) {
            this.INVCO_CiuuService.deleteINVCO_Ciuu(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = !!data.error;
                this.resultError = null;

                if (!this._status) {
                    this.dialogRef.close({ 
                        data: formData,
                        delete: true         
                    });
                } else {
                    this.resultError = data.error.map((x) => x.Message).join('');  
                }
            });

        }
    }
}
