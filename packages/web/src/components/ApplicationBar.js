import AppBar from 'material-ui/AppBar';
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {createStyleSheet, withStyles} from 'material-ui/styles';

const styleSheet = createStyleSheet({
    title: {
        paddingLeft: '10px',
    },
});

const ApplicationBar = ({
                            classes,
                            failed,
                            title,
                        }) => (
    <AppBar
        color={failed ? 'accent' : 'primary'}
        position="fixed"
    >
        <Toolbar>
            <img src="/static/hackweek-serversidekick-icon.png" />
            <Typography
                className={classes.title}
                color="inherit"
                type="title"
            >
                {title}
            </Typography>
        </Toolbar>
    </AppBar>
);

export default withStyles(styleSheet)(ApplicationBar);
