import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {builds} from 'v1-status-state-modules';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';
import ApplicationBar from './ApplicationBar';
import BrowserTabFavicon from './BrowserTabFavicon';
import Home from './containers/Home';
import NotFound from './Router/NotFound';
import Notify from './Notify';

class App extends Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const {
            hasUnacknowledgedFailures,
            markNotified,
            unNotifiedBuilds,
        } = this.props;
        const faviconSrc = !hasUnacknowledgedFailures ? "/static/pass.ico" : "/static/fail.ico";
        return (
            <div>
                <BrowserTabFavicon src={faviconSrc} />
                <Notify
                    builds={unNotifiedBuilds}
                    markNotified={markNotified}
                />
                <ApplicationBar
                    title="Builds"
                    hasUnacknowledgedFailures={hasUnacknowledgedFailures}
                />
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

const stateToProps = (state) => ({
    hasUnacknowledgedFailures: builds.selectors.hasUnacknowledgedFailures(state),
    unNotifiedBuilds: builds.selectors.getUnNotifiedFailedBuilds(state),
});
const dispatchToProps = (dispatch) => ({
    markNotified: bindActionCreators(builds.actionCreators.markNotified, dispatch),
});
export default connect(stateToProps, dispatchToProps)(App);
