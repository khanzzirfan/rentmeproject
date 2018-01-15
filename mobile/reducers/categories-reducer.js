import * as types from '../actions/action-types';

const initialState = {
  payload: {},
  isLoading: false,
  isError: false,
  errorMessage: null
}

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CATEGORIES_PENDING:
      return { ...state, isLoading: true }
    case types.FETCH_CATEGORIES_FULFILLED:
      return { ...state, isLoading: false, payload: action.payload }
    case types.FETCH_CATEGORIES_REJECTED:
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload }
    default:
      return state;
  }
}
