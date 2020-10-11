import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
import { Assignment } from '../../models/Assignment';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  baseUrl: string = environment.apiURL;

  private data = new BehaviorSubject<any>({
    activityId: '-1',
    startDate: new Date(),
  });

  currentData: any = this.data.asObservable();

  constructor(private httpClient: HttpClient) {}

  changeData(data: { activityId: string; startDate: {} }) {
    this.data.next(data);
  }

  // Create assignment
  createAssignments(assignments: Assignment[]): Observable<Assignment[]> {
    // console.log(assignment);
    return this.httpClient.post<Assignment[]>(this.baseUrl + '/assignments', assignments);
  }

  // Get all assignments related to a specific activity
  getAssignments(relatedActivityId: string): Observable<Assignment[]> {
    return this.httpClient.get<Assignment[]>(`${this.baseUrl}/assignments/${relatedActivityId}`);
  }
}
