import { ActionTypes } from "../constants/actionTypes";

export const setCategory = (categories) => {
  return {
    type: ActionTypes.SET_CATEGORY,
    payload: categories,
  };
};

export const addCategory = (category) => {
  return {
    type: ActionTypes.ADD_CATEGORY,
    payload: category,
  };
};

export const updateCategory = (category) => {
  return {
    type: ActionTypes.UPDATE_CATEGORY,
    payload: category,
  };
};

export const deleteCategory = (id) => {
  return {
    type: ActionTypes.DELETE_CATEGORY,
    payload: id,
  };
};

export const selectedCategory = (category) => {
  return {
    type: ActionTypes.SELECTED_CATEGORY,
    payload: category,
  };
};

export const removeSelectedCategory = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_CATEGORY,
  };
};
