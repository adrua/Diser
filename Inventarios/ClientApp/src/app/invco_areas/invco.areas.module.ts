import { NgModule } from '@angular/core';
import { SharedModule } from '../app.shared.module';

import { INVCOAreasRoutingModule } from './invco.areas-routing.module';
import { INVCO_Areas_Table } from './invco.areas.table';
import { INVCO_Areas_Dialog } from './invco.areas.dialog';

@NgModule({
  imports: [
    INVCOAreasRoutingModule,
    SharedModule
  ],
  declarations: [
    INVCO_Areas_Table,
    INVCO_Areas_Dialog
  ],
  entryComponents: [
    INVCO_Areas_Dialog
  ]
})
export class INVCOAreasModule { }
