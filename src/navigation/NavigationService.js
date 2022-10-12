import {CommonActions, DrawerActions, StackActions} from '@react-navigation/native';

/**
 * @typedef {Object} NavigationNavigateActionPayload
 * @property {string} routeName
 * @property {Object} params optional key value object
 * @property {'Navigation/NAVIGATE'} action The action to run inside the sub-router (optional)
 * @property {string} key optional
 */

let _navigator;

export function init(navigatorRef) {
  _navigator = navigatorRef
}

/**
 * Navigate to route
 * @param routeName
 * @param {NavigationNavigateActionPayload} params
 */
export function navigate(routeName, params) {
  _navigator.dispatch(
      CommonActions.navigate({
          name: routeName,
          params: params
    })
  );
}

/**
 * Push route to stack
 * @param {NavigationNavigateActionPayload} params
 */
export function push(params) {
  _navigator.dispatch(StackActions.push(params))
}

/**
 * Navigate back to previous route in history
 */
export function back() {
  _navigator.dispatch(CommonActions.goBack())
}

export function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

export function toggleDrawer() {
  _navigator.dispatch(DrawerActions.toggleDrawer());
}

/**
 * Navigate to the top route of stack
 */
export function popToTop() {
  _navigator.dispatch(StackActions.popToTop())
}

export function clearNavigation() {
  const navigateAction = CommonActions.navigate({
    name: 'AuthLoading',
    key: null,
    index: 0,
    action: CommonActions.navigate({ name: 'AuthLoading' }),
  });
  _navigator.dispatch(navigateAction);
}

function navigateAndReset(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      index: 0,
      key:null,
      actions: [
        CommonActions.navigate({
          name: routeName,
          params: params,
        }),
      ],
    })
  );
}




export function getCurrentRoute(route) {
  if (!route) {
    if (!_navigator || !_navigator.state) return
    route = _navigator.state.nav
  }
  if (route.routes && route.routes.length) {
    return getCurrentRoute(route.routes[route.index])
  } else {
    return route
  }
}

export default {
  back,
  getCurrentRoute,
  init,
  navigate,
  popToTop,
  push,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  clearNavigation,
  navigateAndReset,
}