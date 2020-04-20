import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import { reducer } from "./reducer";
export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

const middleware = [routerMiddleware(history), sagaMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(
  combineReducers({ router: connectRouter(history), app: reducer }),
  {},
  composedEnhancers
);
