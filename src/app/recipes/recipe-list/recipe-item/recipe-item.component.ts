import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import * as fromApp from '../../../store/app.reducrer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  recipe!: Recipe;
  @Input() recipeId!: number;

  constructor(
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store
    .select('recipes')
    .pipe(
      map((recipesState) => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.recipeId;
        });
      })
    )
    .subscribe((recipe) => {
      this.recipe = recipe;
    });
    // this.recipe = this.recipeService.getRecipe(this.recipeId);
  }
}
