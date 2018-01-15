import { combineReducers } from "redux";
import categories from "./categories-reducer";
import crud from "./crud-reducer";

const rootReducer = combineReducers({
  categories: categories,
  crud: crud
});

export default rootReducer;
