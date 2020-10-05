import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { User } from '../../../models/User';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiURL;
  authToken: any;

  constructor(private httpClient: HttpClient) {}

  // Handle user login
  login(user: User): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/users/login', user);
  }

  // Handle user registration
  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/users/register', user);
  }

  loggedIn() {
    return !!localStorage.getItem('auth_token');
  }

  logout(): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/users/logout', null);
  }

  // Add user token to local storage
  addToken(userData: any) {
    this.authToken = userData.token;
    localStorage.setItem('auth_token', JSON.stringify(this.authToken));
  }

  // Get user token from local storage
  getToken(): any {
    if (!localStorage.getItem('auth_token')) {
      this.authToken = {};
    } else {
      this.authToken = JSON.parse(localStorage.getItem('auth_token'));
    }
    return this.authToken;
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
