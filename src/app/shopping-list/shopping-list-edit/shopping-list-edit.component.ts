import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (i: number) => {
          this.editedItemIndex = i;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(i);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  onAddIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
        // this.shoppingListService.addIngredient(newIngredient);
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

    }
    form.reset();
    this.editMode=false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
