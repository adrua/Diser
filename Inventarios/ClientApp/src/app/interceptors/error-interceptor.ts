import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const error = err.message || err.statusText;
            if (err.status ===200){ return }            
            if (err.status === 401|| err.status === 412 || err.status === 403) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("isLogin");
                console.log('Http Error: ' + error);
                this.router.navigate(['']);
            }
            return throwError(error);
        }))
    }
}