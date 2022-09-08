import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router:Router,private http:HttpClient) { }


  login(credentials: Credential):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      };
    return this.http.post(environment.URL + 'login',JSON.stringify(credentials),httpOptions).pipe(
      map((response:any) => {
        if(response && response.token){
          localStorage.setItem('token', response.token);
          return true;
        }else return false;
      })
    )

  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  isLoggedIn(){
    let jwtHelper = new JwtHelperService()
    let token = localStorage.getItem('token')

    if(!token)
      return false

    let expirationDate = jwtHelper.getTokenExpirationDate(token!)
    let isExpired = jwtHelper.isTokenExpired(token)

    return !isExpired
  }



  get currentUser(){
    let token = localStorage.getItem('token')
    if(!token) return null;
    return new JwtHelperService().decodeToken(token)
  }
}


