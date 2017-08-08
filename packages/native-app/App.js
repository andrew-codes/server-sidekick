import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import AppContainer from './appContainer'
import createStore from './createStore';

const store = createStore({
    builds: {
        entities: {},
    },
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ContinuumStatusMobile', () => App);
