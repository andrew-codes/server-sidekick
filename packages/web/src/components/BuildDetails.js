import Button from 'material-ui/Button';
import React, {Component} from 'react';
import RefreshIcon from 'material-ui-icons/Refresh';
import Typography from 'material-ui/Typography';
import {createStyleSheet, withStyles} from 'material-ui/styles';
import {grey} from 'material-ui/colors';
import ApplicationBar from './ApplicationBar';

const stylesheet = createStyleSheet(theme => ({
    '@keyframes spin': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
    },
    button: {
        margin: theme.spacing.unit,
    },
    content: {
        display: 'flex',
        height: 'calc(100vh - 100px)',
        padding: '80px 20px 20px',
    },
    refreshIcon: {
        alignSelf: 'center',
        animation: 'spin 1s linear infinite',
        fill: grey['400'],
        flex: 1,
        justifySelf: 'center',
        height: '120px',
        width: '120px',
    },
}));

class BuildDetails extends Component {
    componentWillUpdate(nextProps) {
        const {
            build,
            fetchBuildDetails
        } = nextProps;
        if (build.severity === 6 && !build.pending) {
            fetchBuildDetails(build.instanceId);
        }
    }

    render() {
        const {
            build,
            classes,
            onManualActionOverride,
            pending,
        }
            = this.props;
        return (
            <div>
                <ApplicationBar
                    title={`${build.name}: ${build.pipelineName}`}
                    failed={build.severity === 3}
                />
                <div className={classes.content}>
                    {pending && <RefreshIcon className={classes.refreshIcon} />}
                    {!pending && (
                        <div>
                            <div>Instance ID: <span>{build.instanceId}</span></div>
                            <div>Phase: <span>{build.phase}</span></div>
                            <div>Stage: <span>{build.stage}</span></div>
                            <div>Progress: <span>{(100 * build.stepIndex / build.totalSteps)}%</span></div>
                            {Boolean(build.severity === 6 && build.pending) && (
                                <div>
                                    <Typography component="h3">
                                        Pending
                                    </Typography>
                                    <Typography component="h4">
                                        {build.pending.title}
                                    </Typography>
                                    <Typography component="p">
                                        {build.pending.question}
                                    </Typography>
                                    <Button
                                        className={classes.button}
                                        color="primary"
                                        onClick={() => {
                                            onManualActionOverride(true);
                                        }}
                                        raised
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        color="accent"
                                        onClick={() => {
                                            onManualActionOverride(false);
                                        }}
                                        raised
                                    >
                                        No
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(stylesheet)(BuildDetails);
