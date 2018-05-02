// refer https://reactnavigation.org/docs/redux-integration.html
import React, {Component} from 'react';
import {AppState, AsyncStorage, NetInfo} from 'react-native';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import Navigation from './modules/navigation/navigation';
import reducers from './reducers';

const debugWrapper = composeWithDevTools({realtime: true, port: 8000});


export const logger = () => function (next) {
  return (action) => {
    console.log(`--- ${action.type} ---`);
    console.log('action: %O', action);
    console.log('before: %O', store.getState());
    next(action);
    console.log('after: %O', store.getState());
  };
};

const reducer = persistCombineReducers({
  key: 'primary',
  storage: AsyncStorage,
  whitelist: [],
  debug: true,
}, reducers);

// createReactNavigationReduxMiddleware must be run
// before createReduxBoundAddListener on navigation.js
const store = createStore(
  reducer,
  debugWrapper(applyMiddleware(...[
    thunk, logger, createReactNavigationReduxMiddleware(
      'root',
      state => state.nav,
    )
  ])),
);

const persistor = persistStore(
  store,
  null,
);

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    window.onunhandledrejection = (promise, reason) => {
      console.error('Unhandled rejection is', promise, reason);
    };
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // it is called when the app become active
    } else if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      // it is called when the app become inactive or background
    }
    this.setState({appState: nextAppState});
  };

  handleConnectivityChange = (connectInfo) => {
    if (connectInfo === 'none') {
      // it is called when the app connection become offline
    } else {
      // it is called if the app connection become offline

    }
  };
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
