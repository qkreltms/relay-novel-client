import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
// roboto 폰트
import 'typeface-roboto';

ReactDOM.render(

  <Provider store={store} >
    <App />
  </Provider>
,
  document.getElementById("root"),
);

serviceWorker.unregister();
