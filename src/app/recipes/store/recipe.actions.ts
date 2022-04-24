import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipes';
export const DELETE_RECIPE = '[Recipes] Delete Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';

export class SetReceipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchReceipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddReceipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateReceipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number, newRecipe: Recipe}) {}
}

export class DeleteReceipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class StoreReceipes implements Action {
  readonly type = STORE_RECIPES;

}

export type RecipesActions =
  | SetReceipes
  | FetchReceipes
  | AddReceipe
  | UpdateReceipe
  | DeleteReceipe
  | StoreReceipes;
