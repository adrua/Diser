import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './app.shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { appMaterialModule } from './app.material.module';
import { INVCO_Areas_Table } from './invco_areas/invco.areas.table';
import { INVCO_Areas_Dialog } from './invco_areas/invco.areas.dialog';
import { INVCO_Personas_Table } from './invco_personas/invco.personas.table';
import { INVCO_Personas_Dialog } from './invco_personas/invco.personas.dialog';
import { INVCO_Bienes_Dialog } from './invco_bienes/invco.bienes.dialog';
import { INVCO_Bienes_Table } from './invco_bienes/invco.bienes.table';
import { INVCO_Ciuu_Table } from './invco_ciuu/invco.ciuu.table';
import { INVCO_Ciuu_Dialog } from './invco_ciuu/invco.ciuu.dialog';
import { LoginComponent } from './login/login.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent
  ],
  entryComponents: [ ],
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
