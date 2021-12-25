import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

import { Ingredient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangeSub!: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) {}

  // it is considered to be a good practice to initialize all the values in the ngOnInit section
  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();

    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
  }

  onSelectItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }

  // we don't need this anymore because new ingredients are added at the shopping list edit component via ShoppingListService call
  // onIngredientAdded(ingredient: Ingredient) {
  //   this.shoppingListService.addIngredient(ingredient);
  // }
}
