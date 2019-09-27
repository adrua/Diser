import { NgModule } from '@angular/core';
import { SharedModule } from '../app.shared.module';

import { INVCOBienesRoutingModule } from './invco.bienes-routing.module';
import { INVCO_Bienes_Table } from './invco.bienes.table';
import { INVCO_Bienes_Dialog } from './invco.bienes.dialog';

@NgModule({
  imports: [
    INVCOBienesRoutingModule,
    SharedModule
  ],
  declarations: [
    INVCO_Bienes_Table,
    INVCO_Bienes_Dialog
  ],
  entryComponents: [
    INVCO_Bienes_Dialog
  ]
})
export class INVCOBienesModule { }
