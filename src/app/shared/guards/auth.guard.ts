import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authState } from 'rxfire/auth';
import { first, map, take } from 'rxjs';
import { AUTH } from '../../app.config';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AUTH);
  const router = inject(Router);

  return authState(auth).pipe(
    first(),
    map(user => {
      if (user) {
        return true;
      }

      return router.parseUrl('home');
    })
  )
};

