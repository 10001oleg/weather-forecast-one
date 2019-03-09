import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleWare = applyMiddleware(ReduxThunk, logger)(
  createStore
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleWare(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
