import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipeSelected!: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeRecieved(recipe:Recipe){
    console.log("Recipe recieved in the Recipes component", recipe);
    this.recipeSelected = recipe;
  }

}
