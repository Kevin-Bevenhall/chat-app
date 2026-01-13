import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MessageService } from '../../shared/services/message.service';
import { IonContent, IonHeader, IonButton, IonToolbar, IonGrid, IonCol, IonRow, IonList, IonItem, IonFooter, IonTextarea, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  imports: [IonIcon, IonFooter, IonItem, IonList, IonRow, IonCol, IonGrid, IonToolbar, IonButton, IonHeader, IonContent, IonTextarea, IonContent, FormsModule, DatePipe]
})
export class ChatPage implements AfterViewInit {
  dummy = viewChild.required<ElementRef<HTMLElement>>('dummy');
  messageList = viewChild<ElementRef<HTMLElement>>('messageList');
  router = inject(Router);
  authService = inject(AuthService);
  messageService = inject(MessageService);
  userService = inject(UserService);

  message = signal('');

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  sendMessage(event?: Event) {
    if (event) {
      const kbEvent = event as KeyboardEvent;
      if (kbEvent.shiftKey) return;
      kbEvent.preventDefault();
    }

    if (!this.message().trim()) return;
    this.messageService.addMessage(this.message()).subscribe({
      next: () => {
        this.message.set('');
        setTimeout(() => {
          this.scrollToBottom();
        })
      }
    })
  }

  scrollToBottom() {
    this.dummy().nativeElement.scrollIntoView();
  }


}
