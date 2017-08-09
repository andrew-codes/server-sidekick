import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {builds} from 'v1-status-state-modules';
import {connect} from 'react-redux'
import PipelineInstancesList from './components/PipelineInstancesList/PipelineInstancesList';
import Notifications from './components/Notifications/Notifications'


class AppContainer extends Component {
    componentDidMount() {
        this.props.fetchBuilds();
    }

    render() {
        return (
            <Notifications/>
        )
    }
}

function mapStateToProps(state) {
    return {
        pis: builds.selectors.getFilteredBuilds(state),
    };
}

function dispatchToProps(dispatch) {
    return {
        fetchBuilds: bindActionCreators(builds.actionCreators.fetchBuilds, dispatch),
    };
}

export default connect(mapStateToProps, dispatchToProps)(AppContainer);
