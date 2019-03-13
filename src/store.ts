import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { ICombineReducersState, rootReducer } from "./reducers";

export const store: Store<ICombineReducersState> = createStore(rootReducer, compose(applyMiddleware(thunk)));
