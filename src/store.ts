import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { ICombineReducersState, rootReducer } from "./reducers";
const enhancer = window["devToolsExtension"]
  ? window["devToolsExtension"]()(createStore)
  : createStore;
// TODO: production 모드에서는 데브틀 비활성화하기
export const store: Store<ICombineReducersState> = enhancer(
  rootReducer,
  compose(applyMiddleware(thunk))
);
