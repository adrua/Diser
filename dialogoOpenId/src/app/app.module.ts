import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './app.shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { TECBOG_Roles_Table } from './tecbog_roles/tecbog.roles.table';
import { TECBOG_Roles_Dialog } from './tecbog_roles/tecbog.roles.dialog';

import { ModulosTable } from './modulos/modulos.table';
import { ModulosDialog } from './modulos/modulos.dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    TECBOG_Roles_Table,
    TECBOG_Roles_Dialog,
    ModulosTable, 
    ModulosDialog
  ],
  entryComponents: [ 
    TECBOG_Roles_Dialog,
    ModulosDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
