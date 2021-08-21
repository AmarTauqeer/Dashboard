import { categoryReducer } from "./CategoryReducer";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  allCategories: categoryReducer,
});
