import { Component } from '@angular/core';
import { moduloModel } from './modulos/modulo.model'
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { funcionalidadesService } from './modulos/funcionalidades.service';
import { funcionalidadesModel } from './modulos/funcionalidades.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [funcionalidadesService]
})

export class AppComponent {
  title = 'Dialogo Seguridad - Gestion';
  opened = true;

  get isLogin(): boolean { return JSON.parse(sessionStorage.getItem("isLoginAuthenticationFront") || 'false'); }

  modulos : Array<moduloModel> = [];
  selectedModulo: moduloModel = null;

  grupos: Array<string> = [];
  selectedGrupos: string = "";
  _gruposShow = false;

  funcionalidades: Array<funcionalidadesModel> = [];
  filteredFuncionalidades: funcionalidadesModel[];
  selectedFuncionalidades: funcionalidadesModel = null;

  loadingModules = true;
  loadingFuncionalidades = false;

  get usuario(): any {
    var _usuario;
    try {
      _usuario = jwt_decode(sessionStorage.getItem("token"));
    } catch(error) {
      _usuario = {};
    }
    return _usuario;
  }

  constructor(private funcionalidadesService: funcionalidadesService,
              private router: Router) {
    window["appComponent"] = this;
  }

  ngOnInit() {
    this.router.navigateByUrl('');
  }
  
  logged() {
    this.loadingModules = true;
    this.router.navigateByUrl('').then(e => {
      if (!e) {
        console.log("Navigation has failed!");
      }
    });
  }

  public setModulos(modulos : Array<moduloModel> ) {
    this.loadingModules = false;
    this.selectedModulo = null;
    this.modulos = modulos;
  }

  selectModulo(e, modulo: moduloModel) {
    if(this.selectedModulo === modulo) {
      this.selectedModulo._funcionalidadesShow = !this.selectedModulo._funcionalidadesShow;
    } else {
      if(this.selectedModulo) {
        this.selectedModulo._funcionalidadesShow = false;
      }

      this.selectedModulo = modulo;
      modulo._funcionalidades = true;
      this.loadingFuncionalidades = true; 
      this.funcionalidadesService.getFuncionalidades(modulo).subscribe((data) => {
        this.funcionalidades = data; 
        this.loadingFuncionalidades = false;
        modulo._funcionalidades = true;
        modulo._funcionalidadesShow = true;
        this.selectedGrupos = null;
        this._gruposShow = false;

        this.grupos = [...new Set(this.funcionalidades.map((x) => x.grupo))]; 
        this.selectedGrupos = "";

      });
    }
  }

  selectGrupo(e, grupo: string) {
    if(this.selectedGrupos === grupo) {
      this._gruposShow = !this._gruposShow;
    } else {
      this._gruposShow = true;
      this.selectedGrupos = grupo;
      this.filteredFuncionalidades = this.funcionalidades.filter((x) => x.grupo === this.selectedGrupos);
    }
  }

  selectFuncionalidad(e, modulo: moduloModel,funcionalidad: funcionalidadesModel) {
    window["funcionalidadActiva"] = { modulo, funcionalidad };
    if (funcionalidad.ventanaObjeto === null) {
      this.router.navigateByUrl(`/app${modulo.rutaEjecutable}/${funcionalidad.ventanaNombre}`);
    } else {
      this.router.navigateByUrl(`/app${modulo.rutaEjecutable}/${funcionalidad.ventanaNombre}/${funcionalidad.ventanaObjeto}`);
    }
  }
}
