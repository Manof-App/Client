import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Activity } from '../../models/Activity';
import { ActivityEditing } from '../../models/ActivityEditing';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  baseUrl: string = environment.apiURL;

  private editable = new BehaviorSubject<ActivityEditing>({
    isEditAndCreate: false,
    isOnlyEdit: false,
  });

  constructor(private httpClient: HttpClient) {}

  // Create activity
  createActivity(activity: Activity): Observable<Activity> {
    return this.httpClient.post<Activity>(this.baseUrl + '/activities', activity);
  }

  // Delete activity
  deleteActivity(activity: Activity): Observable<void> {
    const id = activity._id;
    return this.httpClient.delete<void>(`${this.baseUrl}/activities/${id}`);
  }

  // Update activity
  updateActivity(activity: Activity): Observable<Activity> {
    console.log(activity);
    const id = activity._id;
    return this.httpClient.patch<Activity>(`${this.baseUrl}/activities/${id}`, activity);
  }

  // Get a single activity
  getActivity(id: string): Observable<Activity> {
    return this.httpClient.get<Activity>(`${this.baseUrl}/activities/${id}`);
  }

  // Get all activities
  getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.baseUrl + '/allActivities');
  }

  // Get all activities by criteria
  getActivitiesByCategoryState(searchParams?: HttpParams): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/activities`, {
      params: searchParams,
    });
  }

  // Set activity editing state
  setEditingStates(isEdit: ActivityEditing): void {
    return this.editable.next(isEdit);
  }

  // Get activity editing state
  getEditingState(): Observable<ActivityEditing> {
    return this.editable.asObservable();
  }
}
