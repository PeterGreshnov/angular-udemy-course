import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;
  
  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // for our own observables (not managed by Angular) we will have to clean subscriptions (unsubscribe) on Destroy
        this.route.params
          .subscribe(
            (params: Params) => {
              this.id = +params['id'];
              this.recipe = this.recipeService.getRecipe(this.id);
            }
          );
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditNavigate(){
    // one way - easy :
    // this.router.navigate(['edit'], {relativeTo: this.route});

    // this is another implementation option: construct almost the entire URL
    this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route});
  }

}
