import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { INVCO_Personas_Table } from './invco.personas.table';

const routes: Routes = [
  {
    path: '',
    component: INVCO_Personas_Table
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class INVCOPersonasRoutingModule { }
