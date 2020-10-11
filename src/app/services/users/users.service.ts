import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../models/User';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  // Get current logged in user
  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/me`);
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users/all`);
  }

  deleteUser(user: User): Observable<void> {
    const userEmail = user.email;
    return this.httpClient.delete<void>(`${this.baseUrl}/users/${userEmail}`);
  }

  updateUser(updates: any): Observable<User> {
    return this.httpClient.patch<User>(`${this.baseUrl}/users/me`, updates);
  }
}
