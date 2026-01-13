import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./modules/chat/chat.page').then(m => m.ChatPage),
    canActivate: [authGuard]
  }
];
