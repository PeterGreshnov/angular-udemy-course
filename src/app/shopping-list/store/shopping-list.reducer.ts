import { Ingredient } from '../../shared/ingridient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState =  {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 4)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        // ...state (... - 'spread' operator) - that syntax pulls all the previous content of the 'state' (copies it)
        // so that we altering (and eventually returning in the end) the COPY of the old state, and not altering the old state itself
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    default:
      return state;
  }
}
