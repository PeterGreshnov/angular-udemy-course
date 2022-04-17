import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducrer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';

  // defining user property like that - causes the app think that the user is authenticated
  // user = new BehaviorSubject<User>(new User('','','', new Date()));

  private tokenExpirationTimer: any;

  // user = new BehaviorSubject<User | null>(null);

  constructor(
    private store: Store<fromApp.AppState>
  ) {}


  setLogoutTimer(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
