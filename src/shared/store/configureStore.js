import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { appReducer } from "./modules";

export const store = createStore(
  combineReducers({ app: appReducer }),
  {},
  applyMiddleware(thunk)
);
