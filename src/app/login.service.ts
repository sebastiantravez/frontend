import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './modelos/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario: User | undefined
  uri = "http://localhost:8080/api"

  constructor(public http: HttpClient) {

  }


  login(username: string, password: string) {
    return this.http.post<User>(this.uri + '/users/login?username=' + username + '&password=' + password, null)
  }

  guardarPersona(username: string, email: string, password: string, file: any) {
    return this.http.post<any>(this.uri + '/users/registrar?username=' + username + '&email=' + email + '&password=' + password, file)
  }

}