import { Injectable } from '@angular/core';
import { Activity } from '../../models/Activity';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  baseUrl: string = environment.apiURL;

  activitiesCollection: AngularFirestoreCollection<Activity>;
  activityDoc: AngularFirestoreDocument<Activity>;
  activities: Observable<Activity[]>;
  activity: Observable<Activity>;

  constructor(private afs: AngularFirestore, private httpClient: HttpClient) {
    // Reference Database Location
    this.activitiesCollection = this.afs.collection('activities');
  }

  // Add New Activity Or Edit & Save Existed One To Firebase
  addActivityToFireBase(newActivity: Activity) {
    this.activitiesCollection.doc(newActivity._id).set(newActivity);
  }

  // Get All Activities From FireStore
  getActivities(): Observable<Activity[]> {
    return (this.activities = this.activitiesCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Activity;
          data._id = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  // Get A Single Activity From FireStore
  getActivity(id: string): Observable<Activity> {
    return (this.activity = this.activitiesCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        })
      ),
      map((activities) => activities.find((doc) => doc.id === id))
    ));
  }

  getAllActivities(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/allActivities');
  }

  getActivitiesByCategoryState(
    category: string,
    categoryState: string
  ): Observable<Activity> {
    let params = new HttpParams().set('sortBy', `${category}:${categoryState}`);
    console.log(params);
    return this.httpClient.get<Activity>(`${this.baseUrl}/activities`, {
      params: params,
    });
  }
}
