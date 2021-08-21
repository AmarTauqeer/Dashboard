import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  category: [],
};
export const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CATEGORY:
      return { ...state, category: [...payload] };

    case ActionTypes.SELECTED_CATEGORY:
      return { ...state, ...payload };

    case ActionTypes.ADD_CATEGORY:
      return { ...state, category: [...state.category, payload] };
    case ActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter((x) => x.id !== payload),
      };

    case ActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        category: state.category.map((x) =>
          x.id === payload.id ? payload : x
        ),
      };

    default:
      return state;
  }
};
