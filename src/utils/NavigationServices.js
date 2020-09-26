import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';


let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (_navigator)
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
}

function goBack(routeName, params) {
  if (_navigator)
    _navigator.dispatch(
      NavigationActions.back({
        routeName,
        params,
      })
    );
}

function replace(routeName, params) {
  if (_navigator)
    _navigator.dispatch(
      StackActions.replace({
        routeName,
        params,
      })
    );
}

function logout() {
  if (_navigator)
    _navigator.dispatch(
      StackActions.popToTop()
    )
}

function closeDrawer() {
  _navigator.dispatch(
    DrawerActions.closeDrawer()
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  closeDrawer,
  setTopLevelNavigator,
  replace,
  logout
};