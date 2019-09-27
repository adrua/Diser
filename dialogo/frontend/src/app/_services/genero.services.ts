import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Genero, User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class GeneroService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    get() {

        return this.http.get<any>(`${config.apiUrl}/Administracion/Genero/get`, null)
            .pipe(map(data => {
                if (data) {
                  if(data['Status'] == 403){
                    return null;
                  }
                }
                else{
                  return null;
                }
                return data;
            }));
        /*return  this.http.get(`${config.apiUrl}/Administracion/Genero/get`).subscribe((res : any[])=>{
                console.log(res);
                if (res) {
                  if(res['Status'] == 403){
                    return null;
                  }
                }
                else{
                  return null;
                }
                return modules_response;
                });   */ 
    }
    create(genero: Genero ) {

        return this.http.post<any>(`${config.apiUrl}/Administracion/Genero/create`, genero)
            .pipe(map(genero => {
                let modules_response = JSON.parse(genero);
                if (modules_response) {
                  if(modules_response.Status == 403){
                    return null;
                  }
                }
                else{
                  return null;
                }
                return modules_response;
            }));
    }
}
