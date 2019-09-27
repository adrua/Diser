import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User , Modules } from '@/_models';
import { UserService, AuthenticationService , ModulesService } from '@/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'cartera.component.html' })
export class CarteraComponent {

    constructor(private modulesService: ModulesService,private authenticationService: AuthenticationService,private router: Router) { }

    ngOnInit() {
        this.authenticationService.valid().pipe(first()).subscribe(valid => {
          if (valid == null){
            this.authenticationService.logout();
            this.router.navigate(['/login']);
          }
        });
    }
}
