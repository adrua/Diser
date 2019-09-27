import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { INVCO_Areas_Table } from './invco.areas.table';

const routes: Routes = [
  {
    path: '',
    component: INVCO_Areas_Table
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class INVCOAreasRoutingModule { }
