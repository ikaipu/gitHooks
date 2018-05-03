import PropTypes from 'prop-types';
// refer https://reactnavigation.org/docs/redux-integration.html
import React from 'react';
import {addNavigationHelpers, NavigationActions, StackNavigator} from 'react-navigation';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import Home from '../../containers/home';
import Anonymous from '../../containers/anonymous';
import InitialRoute from './initial.route';

export const navigateTo = (routeName, navigation, params) => {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName, params})],
  });

  navigation.dispatch(actionToDispatch);
};

export const AppNavigator = StackNavigator({
  InitialRoute: {
    screen: InitialRoute,
  },
  Home: {
    screen: Home,
  },
  Anonymous: {
    screen: Anonymous,
  },
});

const App = props => (
  <AppNavigator navigation={addNavigationHelpers({
    dispatch: props.dispatch,
    state: props.navigation,
    addListener: createReduxBoundAddListener('root'),
  })} />
);

App.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => (
  {
    navigation: store.navigation,
  });

export default connect(mapStateToProps)(App);

