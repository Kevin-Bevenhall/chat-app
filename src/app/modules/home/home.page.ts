import { Component, effect, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonSegmentContent, IonSegmentView, IonButton, IonInput, IonList, IonItem } from "@ionic/angular/standalone";
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonSegmentContent, IonSegmentView, IonButton, IonInput, IonList, IonItem],
})
export class HomePage {
private authService = inject(AuthService);
private router = inject(Router);

constructor() {
  effect(() => {
    if (this.authService.user()) {
      this.router.navigate(['chat']);
    }
  })
}

signIn() {
  this.authService.signIn().subscribe({
    next: () => this.router.navigate(['/chat'], { replaceUrl: true })
  })
}
}
