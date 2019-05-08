import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { ICombineReducersState, rootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
export const store: Store<ICombineReducersState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
