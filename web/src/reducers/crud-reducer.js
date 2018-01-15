import * as types from "../actions/action-types";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null
};

export default function crudReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SUBMIT_PENDING:
      return { ...state, isLoading: true };
    case types.FETCH_SUBMIT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: action.payload
      };
    case types.FETCH_SUBMIT_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      };
    default:
      return state;
  }
}
