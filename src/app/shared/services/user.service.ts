import { inject, Injectable } from '@angular/core';
import { AUTH, FIRESTORE } from '../../app.config';
import { authState } from 'rxfire/auth';
import { filter, Observable, of, switchMap } from 'rxjs';
import { User } from 'firebase/auth';
import { collection, doc } from 'firebase/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { DbUser } from '../models/dbUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(FIRESTORE);
  private auth = inject(AUTH);

  private users$ = this.getUsers();
  users = toSignal(this.users$);

  dbUser$: Observable<DbUser | null> = authState(this.auth).pipe(
    switchMap(user => {
      if (!user) return of(null);
      const docRef = doc(this.firestore, "users", user.uid);
      return docData(docRef) as Observable<DbUser>;
    })
  );

  dbUser = toSignal(this.dbUser$);

  getUsers(): Observable<DbUser[]> {
    const colRef = collection(this.firestore, "users");
    return collectionData(colRef, { idField: 'uid' }) as Observable<DbUser[]>;
  }
}
