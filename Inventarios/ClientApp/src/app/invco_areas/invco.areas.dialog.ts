import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, switchMap, startWith } from 'rxjs/operators';

import { INVCOAreasService } from './invco.areas.service';
import { INVCO_AreasModel } from './invco.areas.model';

@Component({
  templateUrl: './invco.areas.dialog.html',
  // styleUrls: ['./invco.areas.dialog.css'],
  providers: [INVCOAreasService]
})
export class INVCO_Areas_Dialog {
    selectedINVCO_Areas: INVCO_AreasModel;
    
    INVCO_AreasForm: FormGroup;

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private INVCO_AreasService: INVCOAreasService,
                public dialogRef: MatDialogRef<INVCO_Areas_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: INVCO_AreasModel) {

        this.selectedINVCO_Areas = data;
    }

    ngOnInit() {
        this.INVCO_AreasForm = this.builder.group({
            'compania': [ this.selectedINVCO_Areas.compania, Validators.required ],        
            'invcoAreaId': [ this.selectedINVCO_Areas.invcoAreaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoAreaDescripcion': [ this.selectedINVCO_Areas.invcoAreaDescripcion, [ Validators.required, Validators.maxLength(33) ] ],
            'invcoAreaEstado': [ this.selectedINVCO_Areas.invcoAreaEstado, [ Validators.required, Validators.maxLength(2) ] ],
            'estado': [ this.selectedINVCO_Areas.estado, Validators.required ]
        }, { 
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    let validationErrors = {

                    };

                    return validationErrors;
                } 
        });
        
        this.INVCO_AreasForm.valueChanges.subscribe((data) => {

            this.INVCO_AreasForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: INVCO_AreasModel) {
        this._proc = true;
        if (this.INVCO_AreasForm.valid) {
            this.INVCO_AreasService.saveINVCO_Areas(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = !!data.error;
                this.resultError = null;

                if (!this._status) {
                    formData.invcoAreaId = data.invcoAreaId;
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
