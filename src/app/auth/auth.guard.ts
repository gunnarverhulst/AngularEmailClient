import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { skipWhile, take, tap } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  let router = new Router();
  return inject(AuthService).signedin$
  .pipe(
    skipWhile(value => value === null),
    take(1),
    tap((authenticated) => {
      if(!authenticated){
        router.navigateByUrl('/');
      }
    })

  );
};
