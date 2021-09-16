import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingridient.model';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Cookies', 
      'A nice and easy way to bake some Cookies', 
      'https://ih1.redbubble.net/avatar.2847441.140x140.jpg', 
      [
        new Ingredient('Granny', 1),
        new Ingredient('Cookies', 100)
    ]),
    new Recipe('Burgers', 
    'Beef burger! Yummy!', 
    'https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg',
    [
      new Ingredient('Beef', 1),
      new Ingredient('Lettuce', 3),
      new Ingredient('Buns', 2),
      new Ingredient('Onion', 1)
    ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  

}
