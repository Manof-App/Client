import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ActivityAssignments } from '../../models/ActivityAssignments';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignmentsCollection: AngularFirestoreCollection<ActivityAssignments>;
  assignmentsDoc: AngularFirestoreDocument<ActivityAssignments>;
  assignments: Observable<ActivityAssignments[]>;
  assignment: Observable<ActivityAssignments>;

  private data = new BehaviorSubject<any>({
    activityId: '-1',
    startDate: {},
  });

  currentData: any = this.data.asObservable();

  constructor(private afs: AngularFirestore) {
    this.assignmentsCollection = this.afs.collection('assignments');
  }

  changeData(data: { activityId: string; startDate: {} }) {
    this.data.next(data);
  }

  saveAssignmentsToFireBase(
    activityId: string,
    assignments: ActivityAssignments
  ) {
    this.assignmentsCollection.doc(activityId).set(assignments);
  }

  // Get A Single Assignment From FireStore
  getActivityAssignments(id: string): Observable<ActivityAssignments> {
    return (this.assignment = this.assignmentsCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        })
      ),
      map((assignments) => assignments.find((doc) => doc.id === id))
    ));
  }
}
