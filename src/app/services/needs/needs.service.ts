import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Need } from '../../models/Need';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NeedService {
  baseUrl: string = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  // Create need
  createNeed(need: Need): Observable<Need> {
    return this.httpClient.post<Need>(`${this.baseUrl}/needs`, need);
  }

  // Delete need
  deleteNeed(need: Need): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/officials/${need._id}`
    );
  }

  // Update need
  updateNeed(need: Need): Observable<Need> {
    console.log(need);
    return this.httpClient.patch<Need>(
      `${this.baseUrl}/needs/${need.relatedActivityId}`,
      need
    );
  }

  // Get need
  getNeed(relatedActivityId: string): Observable<Need> {
    return this.httpClient.get<Need>(
      `${this.baseUrl}/needs/${relatedActivityId}`
    );
  }
}
