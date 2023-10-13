import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY, Observable, catchError, filter, take } from 'rxjs';
import { Email } from './email';
import { EmailService } from './email.service';

export const EmailResolverService: ResolveFn<Email> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  emailService: EmailService = inject(EmailService),
  router: Router = inject(Router)

): Observable<Email> => {
  return emailService.getEmail(route.params['id'])
  .pipe(
    catchError(() => {
      router.navigateByUrl('/inbox/not-found');

      return EMPTY;
    }),
    filter<Email>((email: Email) => !!email),
    take(1)
  );
}
