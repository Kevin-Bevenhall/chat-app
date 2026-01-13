import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyB44dXOUuXz0WtGfbcyrsU88WvOY6aGgII",
  authDomain: "kb-chat-app-f96d2.firebaseapp.com",
  databaseURL: "https://kb-chat-app-f96d2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kb-chat-app-f96d2",
  storageBucket: "kb-chat-app-f96d2.firebasestorage.app",
  messagingSenderId: "147202241630",
  appId: "1:147202241630:web:9ddc162e3ff8f236a370cf"
};

const app = initializeApp(firebaseConfig);

export const AUTH = new InjectionToken('Firebase auth', {
  providedIn: 'root',
  factory: () => {
    return getAuth();
  }
});

export const FIRESTORE = new InjectionToken('Firebase firestore', {
  providedIn: 'root',
  factory: () => {
    return getFirestore();
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideIonicAngular({}),
  ]
};
