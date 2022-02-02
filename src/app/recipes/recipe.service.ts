import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'


@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) { }

  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Cookies',
  //     'A nice and easy way to bake some Cookies',
  //     'https://ih1.redbubble.net/avatar.2847441.140x140.jpg',
  //     [
  //       new Ingredient('Granny', 1),
  //       new Ingredient('Cookies', 100)
  //   ]),
  //   new Recipe(
  //   'Burgers',
  //   'Beef burger! Yummy!',
  //   'https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg',
  //   [
  //     new Ingredient('Beef', 1),
  //     new Ingredient('Lettuce', 3),
  //     new Ingredient('Buns', 2),
  //     new Ingredient('Onion', 1)
  //   ])
  // ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }


}
