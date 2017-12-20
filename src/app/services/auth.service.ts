import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable() 
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  // Must set responseType to text or Angular tries to parse non-existent JSON and throws an error... 
  signup(userInfo) {
    return this.httpClient.post('http://localhost:3000/api/users/register', userInfo, {observe: 'response', responseType: 'text'});
  }

  login(userInfo) {
    return this.httpClient.post('http://localhost:3000/api/users/login', userInfo, {observe: 'response', responseType: 'text'})
  }

  logout() {
    return this.httpClient.delete('http://localhost:3000/api/users/logout', {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth')), responseType: 'text'})
  }

}
  