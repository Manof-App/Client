import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Activity } from '../../models/Activity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  baseUrl: string = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  // Create activity
  createActivity(): Observable<Activity> {
    return this.httpClient.post<Activity>(this.baseUrl + '/activities', {});
  }

  // Delete activity
  deleteActivity(activity: Activity): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/activities/${activity._id}`
    );
  }

  // Update activity
  updateActivity(activity: Activity): Observable<Activity> {
    return this.httpClient.patch<Activity>(
      `${this.baseUrl}/activities/${activity._id}`,
      activity
    );
  }

  // Get a single activity
  getActivity(_id: string): Observable<Activity> {
    return this.httpClient.get<Activity>(`${this.baseUrl}/activities/${_id}`);
  }

  // Get all activities
  getAllActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.baseUrl + '/allActivities');
  }

  // Get all activities by criteria
  getActivitiesByCategoryState(
    category: string,
    categoryState: string
  ): Observable<Activity[]> {
    let searchParams = new HttpParams().set(
      'sortBy',
      `${category}:${categoryState}`
    );
    return this.httpClient.get<Activity[]>(`${this.baseUrl}/activities`, {
      params: searchParams,
    });
  }
}
