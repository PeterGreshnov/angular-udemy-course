import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducrer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {

  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://ng-recipe-book-8c011-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map( recipes => {
        return new RecipesActions.SetReceipes(recipes);
      })
    );
  });

  storeRecipes$ = createEffect(
    () => {
    return this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http
        .put(
          'https://ng-recipe-book-8c011-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          recipesState.recipes
        );
      })
    );
  },
  {dispatch: false})

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
