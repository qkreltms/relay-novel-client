import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { ICombineReducersState, rootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
const store: Store<ICombineReducersState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
