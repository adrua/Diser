import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public user: Object;
    constructor(private http: HttpClient,private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'username': username,
        'password': password});
      let options = { headers: headers };

        return this.http.post<any>(`${config.apiUrl}/security/authenticate`, null , options)
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              let user_response = user;
              if (user_response && user_response.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user_response));
                  this.currentUserSubject.next(user_response);
              }

              return user;
          }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    valid() {
        let result: Observable<Object>;
        result = this.http.post<any>(`${config.apiUrl}/security/valid`, null);
        return result;
/*
        return this.http
        .post<any>(`${config.apiUrl}/security/valid`, null)
        .subscribe(resp => {
            return resp
        });
*/
    }

}
