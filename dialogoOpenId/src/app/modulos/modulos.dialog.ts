import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, switchMap, startWith } from 'rxjs/operators';

import { ModulosService } from './modulos.service';
import { ModulosModel } from './modulos.model';

@Component({
  templateUrl: './modulos.dialog.html',
  // styleUrls: ['./modulos.dialog.css'],
  providers: [ModulosService]
})
export class ModulosDialog {
    selectedModulos: ModulosModel;
    
    modulosForm: FormGroup;

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private modulosService: ModulosService,
                public dialogRef: MatDialogRef<ModulosDialog>,
                @Inject(MAT_DIALOG_DATA) public data: ModulosModel) {

        this.selectedModulos = data;
    }

    ngOnInit() {
        this.modulosForm = this.builder.group({
            'aplicacionCodigo': [ this.selectedModulos.aplicacionCodigo, [Validators.required] ],
            'moduloCodigo': [ this.selectedModulos.moduloCodigo, [Validators.required] ],
            'moduloNombre': [ this.selectedModulos.moduloNombre, [Validators.maxLength(255)] ],
            'moduloDescripcion': [ this.selectedModulos.moduloDescripcion, [Validators.maxLength(255)] ],
            '_estado': [ this.selectedModulos._estado, Validators.required ]
        }, { 
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    let validationErrors = {

                    };

                    return validationErrors;
                } 
        });

        this.modulosForm.valueChanges.subscribe((data) => {

            this.modulosForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: ModulosModel) {
        this._proc = true;
        if (this.modulosForm.valid) {
            this.modulosService.saveModulos(formData).subscribe((data: any) => {
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
    
    onDelete(formData: ModulosModel) {
        this._proc = true;
        if (this.modulosForm.valid) {
            this.modulosService.deleteModulos(formData).subscribe((data: any) => {
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
