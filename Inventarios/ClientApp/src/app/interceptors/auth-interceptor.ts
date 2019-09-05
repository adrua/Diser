import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    var authToken = sessionStorage.getItem("token");

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    var authReq;

    if(authToken && authToken.length > 10) {
        authReq = req.clone({ 
            setHeaders: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${authToken}` 
            } 
        });
    } else {
        authReq = req.clone();
    }

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => {
              if(event instanceof HttpResponse) {
                authToken = event.headers.get("Authorization");
                if(authToken) {
                    sessionStorage.setItem("token", authToken); 
                }
              }
              return event;
          },
          // Operation failed; error is an HttpErrorResponse
          error => error
        ));
  }
}