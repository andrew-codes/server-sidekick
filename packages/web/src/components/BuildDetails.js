import Button from 'material-ui/Button';
import React, {Component} from 'react';
import RefreshIcon from 'material-ui-icons/Refresh';
import Typography from 'material-ui/Typography';
import {createStyleSheet, withStyles} from 'material-ui/styles';
import {grey} from 'material-ui/colors';
import {LinearProgress} from 'material-ui/Progress';
import ApplicationBar from './ApplicationBar';
import {fetchBuildDetails} from '../../../js-api/src/index';

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
    refreshIconContainer: {
        display: 'flex',
        alignContent: 'center',
        marginTop: '60px',
    }
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
                    <Typography
                        component="h2"
                        type="headline"
                    >
                        Instance ID: <span>{build.instanceId}</span>
                    </Typography>
                    {pending && (<div className={classes.refreshIconContainer}>
                            <RefreshIcon className={classes.refreshIcon} />
                        </div>
                    )}
                    {!pending && (
                        <div>
                            <LinearProgress
                                color="primary"
                                mode="determinate"
                                value={(100 * (build.totalSkipped + build.totalSuccess) / build.totalSteps)}
                            />
                            {build.phase && (
                                <Typography
                                    component="h3"
                                    type="subheading"
                                >
                                    Phase: <span>{build.phase}</span>
                                </Typography>
                            )}
                            {build.stage && (
                                <Typography
                                    component="h3"
                                    type="subheading"
                                >
                                    Stage: <span>{build.stage}</span>
                                </Typography>
                            )}
                            <Typography
                                component="h3"
                                type="subheading"
                            >
                                Total Skipped Steps: <span>{build.totalSkipped}</span>
                            </Typography>
                            <Typography
                                component="h3"
                                type="subheading"
                            >
                                Total Successful Steps: <span>{build.totalSuccess}</span>
                            </Typography>
                            <Typography
                                component="h3"
                                type="subheading"
                            >
                                Total Steps: <span>{build.totalSteps}</span>
                            </Typography>
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
