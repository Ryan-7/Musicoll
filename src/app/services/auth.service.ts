import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  registerUser(email, password) {
  //  this.httpClient.post('http://localhost:3000/api/users/register', {email: email, password: password}, {observe: 'response'})
  }

  login(email, password) {
    // this.httpClient.post('http://localhost:3000/api/users/login, {email: email, password: password}, {responseType: 'text', observe: 'response })
  }

  logout() {
  //  this.httpClient.delete('http://localhost:3000/users/logout', {headers: new HttpHeaders().set('x-auth', localStorage.getItem('musicollAuth')), responseType: 'text'})
  }

}
