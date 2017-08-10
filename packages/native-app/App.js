import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import AppContainer from './appContainer'
import createStore from './createStore';
import { NavigatorIOS } from 'react-native';

const store = createStore({
    builds: {
        entities: {},
    },
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <NavigatorIOS
              initialRoute={{
                component: AppContainer,
                title: 'Something Awesome',
              }}
              style={{flex: 1}}
            />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ContinuumStatusMobile', () => App);
