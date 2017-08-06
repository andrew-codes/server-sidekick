import React from 'react';
import {Route, Switch} from 'react-router';
import Home from './Home';
import NotFound from './Router/NotFound';

export default () => (
    <Switch>
        <Route
            component={Home}
            exact={true}
            path="/"
        />
        <NotFound />
    </Switch>
);
