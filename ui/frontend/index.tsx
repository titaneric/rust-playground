import 'core-js';
import 'regenerator-runtime/runtime';

import { merge } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as url from 'url';

import {
  Action,
  editCode,
  enableFeatureGate,
  gotoPosition,
  performCratesLoad,
  performVersionsLoad,
  reExecuteWithBacktrace,
  changeScreenIs1600Px,
} from './actions';
import { configureRustErrors } from './highlighting';
import localStorage from './local_storage';
import PageSwitcher from './PageSwitcher';
import Theme from './Theme';
import playgroundApp from './reducers';
import { State } from './reducers';
import Router from './Router';
import sessionStorage from './session_storage';

const baseUrl = url.resolve(window.location.href, '/');
const windowWidth = window.matchMedia('screen and (min-width: 1600px)');

const initialGlobalState = {
  configuration: {
    screenIs1600Px: windowWidth.matches,
  },
  globalConfiguration: {
    baseUrl,
  },
};
const initialAppState = playgroundApp(undefined, { type: '@@APP_INIT' });
const initialState = merge(initialAppState, initialGlobalState);

const middlewares = applyMiddleware<ThunkDispatch<State, {}, Action>, {}>(thunk);
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
  middlewares,
  localStorage,
  sessionStorage,
);
const store = createStore(playgroundApp, initialState, enhancers);

configureRustErrors({
  enableFeatureGate: featureGate => store.dispatch(enableFeatureGate(featureGate)),
  gotoPosition: (line, col) => store.dispatch(gotoPosition(line, col)),
  reExecuteWithBacktrace: () => store.dispatch(reExecuteWithBacktrace()),
  getChannel: () => store.getState().configuration.channel,
});

store.dispatch(performCratesLoad());
store.dispatch(performVersionsLoad());

windowWidth.addEventListener('change', v => {
  store.dispatch(changeScreenIs1600Px(v.matches));
});

window.rustPlayground = {
  setCode: code => {
    store.dispatch(editCode(code));
  },
};

ReactDOM.render(
  <Provider store={store}>
    <Theme>
      <Router store={store} reducer={playgroundApp}>
        <PageSwitcher />
      </Router>
    </Theme>
  </Provider>,
  document.getElementById('playground'),
);
