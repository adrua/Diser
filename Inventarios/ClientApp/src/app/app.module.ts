import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    INVCO_Areas_Table,
    INVCO_Areas_Dialog,
    INVCO_Personas_Table,
    INVCO_Personas_Dialog,
    INVCO_Bienes_Table,
    INVCO_Bienes_Dialog,
    INVCO_Ciuu_Table,
    INVCO_Ciuu_Dialog,
    LoginComponent
  ],
  entryComponents: [
    INVCO_Areas_Dialog,
    INVCO_Personas_Dialog,
    INVCO_Bienes_Dialog,
    INVCO_Ciuu_Dialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    appMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'ciuu', component: INVCO_Ciuu_Table },
      { path: 'areas', component: INVCO_Areas_Table },
      { path: 'personas', component: INVCO_Personas_Table },
      { path: 'bienes', component: INVCO_Bienes_Table }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
