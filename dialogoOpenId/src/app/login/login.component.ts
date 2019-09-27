import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { loginModel } from './login.model';
import { loginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [loginService]
})
export class LoginComponent {
  selectedLogin: loginModel;
  loginForm: FormGroup;

  @Output() logged: EventEmitter<any> = new EventEmitter();

  _proc: boolean = false;
  _status: boolean = false;
  resultError: string = null;

  constructor(private builder: FormBuilder,
      private loginService: loginService,
      private router: Router) {
        this.selectedLogin = new loginModel();
}

ngOnInit() {
    this.loginForm = this.builder.group({
        'username': [ this.selectedLogin.username, Validators.required ],        
        'password': [ this.selectedLogin.password, Validators.required ]
    }, { 
            validators: (formGroup: FormGroup): ValidationErrors | null => {
                const data = formGroup.getRawValue();
                let validationErrors = {

                };

                return validationErrors;
            } 
    });
    
  }

  onSubmit(formData: loginModel) {
    this._proc = true;
    if (this.loginForm.valid) {
        this.loginService.login(formData).subscribe((resp) => {
            this._proc = false;
            this._status = resp.body.status !== 200;
            this.resultError = null;

            if (this._status) {
                this.resultError = 'login error ' + resp.status;  
            } else {
              sessionStorage.setItem("isLoginAuthenticationFront", "true");
              this.logged.emit(null);
            }
        });

    }
}

}
