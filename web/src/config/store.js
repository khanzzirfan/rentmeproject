import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import promise from "redux-promise-middleware";
//log - collapsed for non errors
let logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});
//log for development only
let middleware = [promise(), thunk];
if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, logger];
}
//store config
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
