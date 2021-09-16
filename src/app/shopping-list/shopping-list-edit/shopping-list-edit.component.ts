import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('amountInput', { static: true })
  amountInput!: ElementRef;

  onAddIngredient(nameInput: HTMLInputElement) {
    if (nameInput.value && this.amountInput.nativeElement.value) 
    {
      const ingName: string = nameInput.value;
      const ingAmount: number = this.amountInput.nativeElement.value;
      const newIngredient: Ingredient = new Ingredient(ingName, ingAmount);
      
      this.shoppingListService.addIngredient(newIngredient);
    }

  }
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

}
