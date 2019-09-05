import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { httpInterceptorProviders } from './interceptors';
import { appMaterialModule } from './app.material.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
 imports:      [ 
    CommonModule,
    appMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
 ],
 exports: [ 
    appMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CommonModule, 
    FormsModule 
  ]
})
export class SharedModule {

  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('es');
  }
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [httpInterceptorProviders, TranslateService]
    }
  }
}