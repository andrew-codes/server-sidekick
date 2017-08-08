import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import AppContainer from './appContainer'
import configureStore from './createStore';

const store = configureStore({
    builds: {
        entities: {}
    }
});

export default class App extends Component {
    render() {
        const pis = [
            {label: "one", progress: .4, key: 1},
            {label: "two", progress: .7, key: 2},
            {label: "three", progress: .25, key: 3},
            {label: "four", progress: 1, key: 4},
        ];
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('continuumStatus', () => App);
