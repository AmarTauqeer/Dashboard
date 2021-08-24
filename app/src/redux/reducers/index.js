import { categoryReducer } from "./CategoryReducer";
import { userReducer } from "./UserReducer";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  allCategories: categoryReducer,
  allUsers: userReducer,
});
