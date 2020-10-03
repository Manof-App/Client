import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Official } from '../../models/Official';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfficialsService {
  officialsCollection: AngularFirestoreCollection<Official>;
  officialDoc: AngularFirestoreDocument<Official>;
  officials: Observable<Official[]>;
  official: Observable<Official>;

  baseURl: string = environment.apiURL;

  constructor(private afs: AngularFirestore, private httpClient: HttpClient) {
    this.officialsCollection = this.afs.collection('officials');
  }

  // Add or update an activity to firestore
  saveOfficialToFireStore(officials: Official, activityId: string) {
    this.officialsCollection.doc(activityId).set(officials);
  }

  // Get all officials per an activity from fire store
  getOfficialsPerActivity(activityId: string): Observable<Official> {
    return this.officialsCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        })
      ),
      map((dataList) => dataList.find((doc) => doc.id === activityId))
    );
  }

  getOfficials(_id: string): Observable<Official[]> {
    return this.httpClient.get<Official[]>(`${this.baseURl}/officials/_id`);
  }
}
