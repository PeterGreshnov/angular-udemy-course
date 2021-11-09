import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    //
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const ifAuth = !!user;
        // this is a modern way of specifying the redirect URL in case if the user is not authenticated (instead of returning false):
        if (ifAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })

      // this is an older way of doing that 'redirect if not authenticated' manually

      // , tap(
      //   isAuth => {
      //     if (!isAuth) {
      //       this.router.navigate(['/auth']);
      //     }
      //   }
      // )
    );
  }
}
