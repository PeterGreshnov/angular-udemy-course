import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingridient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() { }

  ingridients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  addIngredient(ingredient: Ingredient) {
      this.ingridients.push(ingredient);
      this.ingredientsChanged.next(this.ingridients.slice());
  }
  
  addIngredients(ingredients: Ingredient[]) {
    this.ingridients.push(...ingredients);
    this.ingredientsChanged.next(this.ingridients.slice());

  }

  getIngredients() {
    return this.ingridients.slice();
  }

}
