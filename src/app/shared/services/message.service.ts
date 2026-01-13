import { inject, Injectable } from '@angular/core';
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { EMPTY, from, map, Observable, of, throwError } from 'rxjs';
import { FIRESTORE } from '../../app.config';
import { ChatMessage, ChatMessageWrite } from '../models/chatMessage';
import { AuthService } from './auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firestore = inject(FIRESTORE);
  private authService = inject(AuthService);

  private messages$ = this.getMessages();
  messages = toSignal(this.messages$);

  addMessage(content: string) {
    const user = this.authService.user();
    if (!user) {
      return throwError(() => new Error('Only signed in users may send messages'))
    }

    const message: Omit<ChatMessageWrite, 'id'> = {
      author: {
        username: user.displayName ?? 'Anonymous',
        uid: user.uid,
        photoUrl: user.photoURL ?? ''
      },
      content,
      createdAt: serverTimestamp()
    };

    const colRef = collection(this.firestore, "messages");
    return from(addDoc(colRef, message));
  }

  private getMessages() {
    const q = query(
      collection(this.firestore, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(10),
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map(messages => [...messages].reverse())
    ) as Observable<ChatMessage[]>;

  }
}
