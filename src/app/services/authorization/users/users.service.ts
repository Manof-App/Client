import { Injectable } from '@angular/core';
import { User } from '../../../models/User';
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
export class UsersService {
  usersCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor(private afs: AngularFirestore) {
    // Reference Database Location
    this.usersCollection = this.afs.collection('users');
  }

  // Add New user Or Edit & Save Existed One To Firebase
  addUserToFireBase(user: User) {
    this.usersCollection.doc(user.email).set(user);
  }

  // Get all users from fireStore
  getAllUsers(): Observable<User[]> {
    return (this.users = this.usersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as User;
          data.email = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  updateUser(user: User, newRole: string) {
    this.usersCollection.ref
      .where('email', '==', user.email)
      .get()
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          doc.ref.update({
            role: newRole,
          });
        });
      });
  }

  // Get A Single user From FireStore
  getUser(email: string): Observable<User> {
    return (this.user = this.usersCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        })
      ),
      map((users) => users.find((doc) => doc.id === email))
    ));
  }
}
