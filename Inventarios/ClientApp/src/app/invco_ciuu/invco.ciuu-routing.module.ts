import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { INVCO_Ciuu_Table } from './invco.ciuu.table';

const routes: Routes = [
  {
    path: '',
    component: INVCO_Ciuu_Table
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class INVCOCiuuRoutingModule { }
