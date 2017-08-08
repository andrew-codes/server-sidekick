import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import ApplicationBar from './ApplicationBar';
import Home from './containers/Home';
import NotFound from './Router/NotFound';

class App extends Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return (
            <div>
                <ApplicationBar title="Builds" />
                <Switch>
                    <Route
                        component={Home}
                        exact={true}
                        path="/"
                    />
                    <NotFound />
                </Switch>
            </div>
        );
    }
}

export default App;
