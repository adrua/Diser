import { NgModule } from '@angular/core';
import { SharedModule } from '../app.shared.module';

import { INVCOPersonasRoutingModule } from './invco.personas-routing.module';
import { INVCO_Personas_Table } from './invco.personas.table';
import { INVCO_Personas_Dialog } from './invco.personas.dialog';

@NgModule({
  imports: [
    INVCOPersonasRoutingModule,
    SharedModule
  ],
  declarations: [
    INVCO_Personas_Table,
    INVCO_Personas_Dialog
  ],
  entryComponents: [
    INVCO_Personas_Dialog
  ]
})
export class INVCOPersonasModule { }
