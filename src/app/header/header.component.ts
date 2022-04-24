import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducrer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  private recipeSub!: Subscription;
  recipes: Recipe[] = [];
  collapsed = true;
  isAuthenticated = false;

  constructor(
    private dataStorage: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe((user) => {
      // this.isAuthenticated = !user ? false : true;  - this is a direct way of writing this expression;
      // and here is another option:
      this.isAuthenticated = !!user; // if !user = true (there is NO user) - then we get isAuthenticated = false;
      console.log('Not user', !user);
      console.log('NOT Not user', !!user);
      this.recipes = this.recipeService.getRecipes();
      console.log('Recipes', this.recipes, 'recipes.length()', this.recipes.length);

      this.recipeSub = this.recipeService.recipesChanged.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          console.log('Recipes', this.recipes, 'recipes.length()', this.recipes.length);
        }
      )
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveRecipes() {
    this.dataStorage.storeRecipes();
  }

  onFetchRecipes() {
    this.store.dispatch(new RecipeActions.FetchReceipes());
    // this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
