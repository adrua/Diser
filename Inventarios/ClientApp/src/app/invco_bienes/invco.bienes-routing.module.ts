import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { INVCO_Bienes_Table } from './invco.bienes.table';

const routes: Routes = [
  {
    path: '',
    component: INVCO_Bienes_Table
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class INVCOBienesRoutingModule { }
