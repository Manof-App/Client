import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Official } from '../../models/Official';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfficialsService {
  baseUrl: string = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  // Create official
  writeOfficial(official: Official): Observable<Official> {
    console.log(official);
    return this.httpClient.post<Official>(
      this.baseUrl + '/officials',
      official
    );
  }

  // Delete official
  deleteOfficial(official: Official): Observable<void> {
    const id = official._id;
    return this.httpClient.delete<void>(`${this.baseUrl}/officials/${id}`);
  }

  // Update official
  updateOfficial(official: Official): Observable<Official> {
    const id = official._id;
    return this.httpClient.patch<Official>(`${this.baseUrl}`, `/${id}`);
  }

  // Get a single official
  getOfficial(relatedActivityId: string): Observable<Official> {
    const id = relatedActivityId;
    return this.httpClient.get<Official>(`${this.baseUrl}/officials/${id}`);
  }

  // Get all officials related to a specific activity
  getOfficials(relatedActivityId: string): Observable<Official[]> {
    const id = relatedActivityId;
    return this.httpClient.get<Official[]>(`${this.baseUrl}/officials/${id}`);
  }
}
