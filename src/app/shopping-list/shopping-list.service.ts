import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingridient.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

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

  getIngredient(index: number) {
    return this.ingridients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingridients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingridients.slice());
  }

  deleteIngredient(index: number) {
    this.ingridients.splice(index, 1);
    this.ingredientsChanged.next(this.ingridients.slice());
  }

}
