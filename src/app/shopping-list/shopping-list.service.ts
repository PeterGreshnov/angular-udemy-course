import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingridient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  constructor() { }

  ingridients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  addIngredient(ingredient: Ingredient) {
      this.ingridients.push(ingredient);
      this.ingredientsChanged.emit(this.ingridients.slice());
  }
  
  addIngredients(ingredients: Ingredient[]) {
    this.ingridients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingridients.slice());

  }

  getIngredients() {
    return this.ingridients.slice();
  }

}
