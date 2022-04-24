import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducrer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  recipes: Recipe[] = [];
  collapsed = true;
  isAuthenticated = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe((user) => {
      // this.isAuthenticated = !user ? false : true;  - this is a direct way of writing this expression;
      // and here is another option:
      this.isAuthenticated = !!user; // if !user = true (there is NO user) - then we get isAuthenticated = false;
    });
  }

  ngOnDestroy() {
    if (this.userSub){
    this.userSub.unsubscribe();
  }
  }

  onSaveRecipes() {
    // this.dataStorage.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreReceipes());
  }

  onFetchRecipes() {
    this.store.dispatch(new RecipeActions.FetchReceipes());
    // this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
