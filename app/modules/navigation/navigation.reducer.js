// refer https://reactnavigation.org/docs/redux-integration.html
import {AppNavigator} from './navigation';

const initialNavState =
  AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('InitialRoute'));

export default function navigation(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}
