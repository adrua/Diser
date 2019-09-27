import { NgModule } from '@angular/core';
import { SharedModule } from '../app.shared.module';

import { INVCOCiuuRoutingModule } from './invco.ciuu-routing.module';
import { INVCO_Ciuu_Table } from './invco.ciuu.table';
import { INVCO_Ciuu_Dialog } from './invco.ciuu.dialog';

@NgModule({
  imports: [
    INVCOCiuuRoutingModule,
    SharedModule
  ],
  declarations: [
    INVCO_Ciuu_Table,
    INVCO_Ciuu_Dialog
  ],
  entryComponents: [
    INVCO_Ciuu_Dialog
  ]
})
export class INVCOCiuuModule { }
