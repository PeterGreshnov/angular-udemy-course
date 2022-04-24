import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import * as RecipesActions from '../recipes/store/recipe.actions';
import * as fromApp from '../store/app.reducrer';


@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://ng-recipe-book-8c011-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchRecipes() {
      return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-8c011-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
    .pipe(
      map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    tap((recipes) => {
      // this.recipeService.setRecipes(recipes);
      this.store.dispatch(new RecipesActions.SetReceipes(recipes));
    })
    );
  }
}
