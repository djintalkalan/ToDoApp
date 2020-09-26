import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import MySwitchNavigator from './src/routes/MySwitchNavigator';
import colors from './src/utils/colors';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor={colors.colorsPrimary} barStyle="light-content" />
          <MySwitchNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App