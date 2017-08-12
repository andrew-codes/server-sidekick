import AppBar from 'material-ui/AppBar';
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {createStyleSheet, withStyles} from 'material-ui/styles';

const styleSheet = createStyleSheet({
    children: {
      flex: 1,
    },
    title: {
        paddingLeft: '10px',
    },
    toolbar: {
        display: 'flex',
        paddingRight: 0,
    }
});

const ApplicationBar = ({
                            children,
                            classes,
                            failed,
                            title,
                        }) => (
    <AppBar
        color={failed ? 'accent' : 'primary'}
        position="fixed"
    >
        <Toolbar
            className={classes.toolbar}
        >
            <img src="/static/hackweek-serversidekick-icon.png" />
            <Typography
                className={classes.title}
                color="inherit"
                type="title"
            >
                {title}
            </Typography>
            {Boolean(children) && (
                <div className={classes.children}>
                    {children}
                </div>
            )}
        </Toolbar>
    </AppBar>
);

export default withStyles(styleSheet)(ApplicationBar);
