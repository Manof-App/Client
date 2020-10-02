import { Injectable } from '@angular/core';
import { Need } from '../../models/Need';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NeedService {
  needsCollection: AngularFirestoreCollection<Need>;
  needDoc: AngularFirestoreDocument<Need>;
  needs: Observable<Need[]>;
  need: Observable<Need>;

  constructor(private afs: AngularFirestore) {
    this.needsCollection = this.afs.collection('needs');
  }

  // Add new activity to firebase
  saveNeedToFireBase(newNeed: Need) {
    this.needsCollection.doc(newNeed.activityId).set(newNeed);
  }

  // Get All Needs Related To A Specific Activity From FireStore
  getNeed(id: string): Observable<Need> {
    return (this.need = this.needsCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        })
      ),
      map((needs) => needs.find((doc) => doc.activityId === id))
    ));
  }
}
