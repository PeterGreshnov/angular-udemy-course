import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingridient.model'
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingredient[] = [];
  private igChangeSub!: Subscription;
  

  constructor(private shoppingListService: ShoppingListService) { }

  // it is considered to be a good practice to initialize all the values in the ngOnInit section
  ngOnInit(): void {
      this.ingridients = this.shoppingListService.getIngredients();
      this.igChangeSub = this.shoppingListService.ingredientsChanged
        .subscribe(
          (ingridients: Ingredient[]) => {
            this.ingridients = ingridients;
          }
        );
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

  onSelectItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }

  // we don't need this anymore because new ingredients are added at the shopping list edit component via ShoppingListService call
  // onIngredientAdded(ingredient: Ingredient) {
  //   this.shoppingListService.addIngredient(ingredient);
  // }

}
