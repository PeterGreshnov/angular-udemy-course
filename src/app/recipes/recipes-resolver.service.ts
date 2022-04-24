import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducrer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private recipeService: RecipeService,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      // return this.dataStorageSevice.fetchRecipes();
      this.store.dispatch(new RecipeActions.FetchReceipes());
      return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
    } else {
      return recipes;
    }
  }
}
