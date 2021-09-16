import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe = {name:'1',description:'2',imagePath:'3', ingredients: [new Ingredient('Ingredient',1)]};
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

}
