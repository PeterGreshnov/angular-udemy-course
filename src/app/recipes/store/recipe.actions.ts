import { Action } from "@ngrx/store";

import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';


export class SetReceipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchReceipes implements Action {
  readonly type = FETCH_RECIPES;

}

export type RecipesActions = SetReceipes;
