import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  user: [],
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return { ...state, user: [...payload] };

    case ActionTypes.SELECTED_USER:
      return { ...state, user: payload };

    case ActionTypes.REMOVE_SELECTED_USER:
      return initialState;

    case ActionTypes.ADD_USER: {
      return { ...state, user: [...state.user, payload] };
    }
    default:
      return state;
  }
};
