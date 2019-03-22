import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { ICombineReducersState, rootReducer } from "./reducers";
const enhancer = window["devToolsExtension"]
  ? window["devToolsExtension"]()(createStore)
  : createStore;

export const store: Store<ICombineReducersState> = enhancer(
  rootReducer,
  compose(applyMiddleware(thunk))
);
