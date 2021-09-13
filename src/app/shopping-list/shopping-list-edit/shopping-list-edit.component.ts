import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingridient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('amountInput', { static: true })
  amountInput!: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddIngredient(nameInput: HTMLInputElement) {
    if (nameInput.value && this.amountInput.nativeElement.value) 
    {
      const ingName: string = nameInput.value;
      const ingAmount: number = this.amountInput.nativeElement.value;
      const newIngredient: Ingredient = new Ingredient(ingName, ingAmount);
      
      this.ingredientAdded.emit(newIngredient);
    }

  }
  constructor() { }

  ngOnInit(): void {
  }

}
