import { inject, Injectable } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { authState } from 'rxfire/auth';
import { from, of, switchMap } from 'rxjs';
import { AUTH, FIRESTORE } from '../../app.config';
import { DbUser } from '../models/dbUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(AUTH);
  private firestore = inject(FIRESTORE);

  private authState$ = authState(this.auth);
  user = toSignal(this.authState$);

  signIn() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap(userCredential => {
        const user = userCredential.user;
        const docRef = doc(this.firestore, "users", user.uid);
        return from(getDoc(docRef)).pipe(
          switchMap(snap => {
            const entry: Omit<DbUser, 'uid'> = {
              email: user.email ?? '',
              username: user.displayName ?? '',
              photoUrl: user.photoURL ?? ''
            };
            if (!snap.exists()) {
              return from(setDoc(docRef, entry));
            } else {
              return of(null);
            }
          })
        )
      })
    );
  }

  signOut() {
    return from(signOut(this.auth));
  }
}
