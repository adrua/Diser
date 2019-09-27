import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'invco/ciuu',
    loadChildren: () => import('./invco_ciuu/invco.ciuu.module').then(mod => mod.INVCOCiuuModule)
  },
  {
    path: 'login',
    component: LoginComponent, 
  },
  {
    path: 'invco/areas',
    loadChildren: () => import('./invco_areas/invco.areas.module').then(mod => mod.INVCOAreasModule)
  },
  {
    path: 'invco/bienes',
    loadChildren: () => import('./invco_bienes/invco.bienes.module').then(mod => mod.INVCOBienesModule)
  },
  {
    path: 'invco/personas',
    loadChildren: () => import('./invco_personas/invco.personas.module').then(mod => mod.INVCOPersonasModule)
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