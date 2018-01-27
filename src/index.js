import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import 'regenerator-runtime/runtime'
// Styles
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "../scss/style.scss";
// Temp fix for reactstrap
import "../scss/core/_dropdown-menu-right.scss";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import monitorApp from "./saga/monitorApp"
import rootReducer from './reducers/';
import App from "./App";

const sagaMiddleware = createSagaMiddleware();
const appEnhancer = [sagaMiddleware, createLogger(), thunkMiddleware];
// const appEnhancer = [createLogger(), thunkMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(...appEnhancer)
);

const store = createStore(rootReducer, undefined, enhancer);
sagaMiddleware.run(monitorApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
