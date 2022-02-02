import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingridient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(
      stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
    // this.subscription = this.shoppingListService.startedEditing
    //   .subscribe(
    //     (i: number) => {
    //       this.editedItemIndex = i;
    //       this.editMode = true;
    //       this.editedItem = this.shoppingListService.getIngredient(i);

    //     }
    //   );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }



  onAddIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
        // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
        this.store.dispatch(new ShoppingListActions.UpdateIngredient( newIngredient ))
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
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
