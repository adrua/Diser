import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, switchMap, startWith } from 'rxjs/operators';

import { INVCOBienesService } from './invco.bienes.service';
import { INVCO_BienesModel } from './invco.bienes.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  templateUrl: './invco.bienes.dialog.html',
  // styleUrls: ['./invco.bienes.dialog.css'],
  providers: [INVCOBienesService, CurrencyPipe]
})
export class INVCO_Bienes_Dialog {
    selectedINVCO_Bienes: INVCO_BienesModel;
    
    INVCO_BienesForm: FormGroup;
    INVCOAreaDescripcionCtrl: FormControl = new FormControl();
    filteredINVCOAreaDescripcion: Array<any> = [];
    INVCOPersonaNombreCompletoCtrl: FormControl = new FormControl();
    filteredINVCOPersonaNombreCompleto: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

  constructor(private builder: FormBuilder,
              private currencyMask: CurrencyPipe,
                private INVCO_BienesService: INVCOBienesService,
                public dialogRef: MatDialogRef<INVCO_Bienes_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: INVCO_BienesModel) {

        this.selectedINVCO_Bienes = data;
    }

    ngOnInit() {
        this.INVCO_BienesForm = this.builder.group({
            'compania': [ this.selectedINVCO_Bienes.compania, Validators.required ],        
            'invcoBienId': [ this.selectedINVCO_Bienes.invcoBienId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoBienNombre': [ this.selectedINVCO_Bienes.invcoBienNombre, [ Validators.required, Validators.maxLength(72) ] ],
            'invcoBienDescripcion': [ this.selectedINVCO_Bienes.invcoBienDescripcion, [ Validators.required, Validators.maxLength(62) ] ],
            'invcoBienTipo': [ this.selectedINVCO_Bienes.invcoBienTipo, [ Validators.required, Validators.maxLength(2) ] ],
            'invcoBienSerial': [ this.selectedINVCO_Bienes.invcoBienSerial, [ Validators.required, Validators.maxLength(18) ] ],
            'invcoBienValorCompra': [ this.selectedINVCO_Bienes.invcoBienValorCompra, [ Validators.required, Validators.maxLength(18), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoBienFechaCompra': [ this.selectedINVCO_Bienes.invcoBienFechaCompra, [ Validators.required ] ],
            'invcoBienEstadoActual': [ this.selectedINVCO_Bienes.invcoBienEstadoActual, [ Validators.required, Validators.maxLength(2) ] ],
            'invcoAreaId': [ this.selectedINVCO_Bienes.invcoAreaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9\.]+$') ] ],
            'invcoPersonaId': [ this.selectedINVCO_Bienes.invcoPersonaId, [ Validators.required, Validators.maxLength(16), Validators.pattern('^[0-9\.]+$') ] ],
            'estado': [ this.selectedINVCO_Bienes.estado, Validators.required ]
        }, { 
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    let validationErrors = {

                    };

                    return validationErrors;
                } 
        });
        
        this.INVCOAreaDescripcionCtrl.setValue(this.selectedINVCO_Bienes.relaciones.invcoAreaDescripcion);
        this.INVCOAreaDescripcionCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.INVCO_BienesService.filterINVCOAreaDescripcion(data))
            ).subscribe((data) => this.filteredINVCOAreaDescripcion = data);

        this.INVCOPersonaNombreCompletoCtrl.setValue(this.selectedINVCO_Bienes.relaciones.invcoPersonaNombreCompleto);
        this.INVCOPersonaNombreCompletoCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.INVCO_BienesService.filterINVCOPersonaNombreCompleto(data))
            ).subscribe((data) => this.filteredINVCOPersonaNombreCompleto = data);

        this.INVCO_BienesForm.valueChanges.subscribe((data) => {
          if (data.invcoBienValorCompra) {
            this.INVCO_BienesForm.patchValue({
              //invcoBienValorCompra: this.currencyMask.transform(data.invcoBienValorCompra)
            }, { emitEvent: false, onlySelf: true });
          }
        });
    }

    onSubmit(formData: INVCO_BienesModel) {
        this._proc = true;
        if (this.INVCO_BienesForm.valid) {
            this.INVCO_BienesService.saveINVCO_Bienes(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = !!data.error;
                this.resultError = null;

                if (!this._status) {
                    formData.invcoBienId = data.invcoBienId;

                    formData.relaciones = {
                        invcoAreaDescripcion: this.INVCOAreaDescripcionCtrl.value,
                        invcoPersonaNombreCompleto: this.INVCOPersonaNombreCompletoCtrl.value
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
    
    onSelect_INVCOAreaDescripcion(opt: any){
        this.INVCO_BienesForm.patchValue({
            invcoAreaId: opt.invcoAreaId
        });
    }
    
    onSelect_INVCOPersonaNombreCompleto(opt: any){
        this.INVCO_BienesForm.patchValue({
            invcoPersonaId: opt.invcoPersonaId
        });
    }
    
}
