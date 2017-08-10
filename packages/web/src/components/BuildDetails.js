import React from 'react';
import RefreshIcon from 'material-ui-icons/Refresh';
import Typography from 'material-ui/Typography';
import {createStyleSheet, withStyles} from 'material-ui/styles';
import {grey} from 'material-ui/colors';
import ApplicationBar from './ApplicationBar';

const stylesheet = createStyleSheet({
    '@keyframes spin': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
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
});

const BuildDetails = ({
                          build,
                          pending,
                          classes,
                      }) => (
    <div>
        <ApplicationBar
            title={`${build.name}: ${build.pipelineName}`}
            failed={build.severity === 3}
        />
        <div className={classes.content}>
            {pending && <RefreshIcon className={classes.refreshIcon} />}
            {!pending && (
                <div>
                    <div>Phase: <span>{build.phase}</span></div>
                    <div>Stage: <span>{build.stage}</span></div>
                    <div>Progress: <span>{(100*build.stepIndex/build.totalSteps)}%</span></div>
                    <div>All data available: <span>{JSON.stringify(build)}</span></div>
                </div>
            )}
        </div>
    </div>
);

export default withStyles(stylesheet)(BuildDetails);
