import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModulosTable } from './modulos/modulos.table';
import { TECBOG_Roles_Table } from './tecbog_roles/tecbog.roles.table';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, 
  },
  {
    path: 'roles',
    component: TECBOG_Roles_Table, 
  },
  {
    path: 'modulos',
    component: ModulosTable, 
  },
  { path: '', 
    component: HomeComponent, 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/