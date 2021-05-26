import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingridient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomotoes', 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
