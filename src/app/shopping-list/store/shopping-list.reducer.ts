import { Ingredient } from '../../shared/ingridient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

// Removing AppState from that file and moving it to the global app.reducer
// export interface AppState {
//   shoppingList: State;
// }

const initialState: State =  {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 4)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        // ...state (... - 'spread' operator) - that syntax pulls all the previous content of the 'state' (copies it)
        // so that we altering (and eventually returning in the end) the COPY of the old state, and not altering the old state itself
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];

      //this is a 'merge' using ... 'spread' operator -
      // more here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals
      // and here - https://www.javascripttutorial.net/object/javascript-merge-objects/
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        //copy existing state first:
        ...state,
        //override ingredients with a new array (https://www.javascripttutorial.net/object/javascript-merge-objects/):
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
          ...state,
          ingredients: state.ingredients.filter((ig, igIndex) => {
            return igIndex != state.editedIngredientIndex;
          })
        };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]} /// by {... } - we're copying the ingredient, instead of referencing it
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    default:
      return state;
  }
}
