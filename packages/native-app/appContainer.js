import React, {Component} from 'react';
//import {ActionCreators} from './actions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PipelineInstancesList from './components/PipelineInstancesList/PipelineInstancesList';

class AppContainer extends Component {
    render() {
        return (
            <PipelineInstancesList
                pipelineInstances={this.props.pis}
            />
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(ActionCreators, dispatch)
// }

function mapStateToProps(state) {
    return {
        pis: [
            {label: "one", progress: .4, key: 1},
            {label: "two", progress: .7, key: 2},
            {label: "three", progress: .25, key: 3},
            {label: "four", progress: 1, key: 4},
        ],
    };
}

export default connect(mapStateToProps)(AppContainer);
