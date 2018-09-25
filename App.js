import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigator';
import store from './src/store';

export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
            <AppNavigator/>
        </Provider>
    );
  }
}
