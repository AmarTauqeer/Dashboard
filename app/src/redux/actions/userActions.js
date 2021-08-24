import { ActionTypes } from "../constants/actionTypes";

export const setUser = (users) => {
  return {
    type: ActionTypes.SET_USER,
    payload: users,
  };
};

export const addUser = (user) => {
  return {
    type: ActionTypes.ADD_USER,
    payload: user,
  };
};

export const selectedUser = (user) => {
  return {
    type: ActionTypes.SELECTED_USER,
    payload: user,
  };
};

export const removeSelectedUser = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_USER,
  };
};
