import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {builds} from 'v1-status-state-modules';
import {connect} from 'react-redux';
import {createStyleSheet, withStyles} from 'material-ui/styles';
import {Route, Switch} from 'react-router';
import ApplicationBar from './ApplicationBar';
import BrowserTabFavicon from './BrowserTabFavicon';
import Home from './containers/Home';
import NotFound from './Router/NotFound';
import Notify from './Notify';

const stylesheet = createStyleSheet({
    body: {
        paddingTop: '60px',
    },
});

class App extends Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const {
            classes,
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
                    failed={hasUnacknowledgedFailures}
                />
                <div className={classes.body}>
                    <Switch>
                        <Route
                            component={Home}
                            exact={true}
                            path="/"
                        />
                        <NotFound />
                    </Switch>
                </div>
            </div>
        );
    }
}

const stateToProps = (state) => ({
    hasUnacknowledgedFailures: builds.selectors.hasUnacknowledgedFailures(state),
    unNotifiedBuilds: builds.selectors.getUnNotifiedFailedBuilds(state),
});
const dispatchToProps = (dispatch) => ({
    markNotified: bindActionCreators(builds.actions.creators.markNotified, dispatch),
});
export default connect(stateToProps, dispatchToProps)(withStyles(stylesheet)(App));
