import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User , Modules } from '@/_models';
import { UserService, AuthenticationService , ModulesService } from '@/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    users: User[] = [];
    modules: Modules[] = [];
    constructor(private modulesService: ModulesService,private authenticationService: AuthenticationService,private router: Router) { }

    ngOnInit() {
        this.modulesService.getModules().pipe(first()).subscribe(modules => {
            this.modules = modules["data"];
        });

    }

    public selectModule(modulo){
        if (modulo.modulo_codigo)
        {
          this.router.navigate([modulo.ruta_ejecutable]);
        }
    }
}
