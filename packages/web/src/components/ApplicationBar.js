import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {createStyleSheet, withStyles} from 'material-ui/styles';

const styleSheet = createStyleSheet({
    root: {
        marginTop: 30,
        width: '100%',
    },
});

const ApplicationBar = ({
                            hasUnacknowledgedFailures,
                            title,
                        }) => (
    <AppBar
        color={hasUnacknowledgedFailures ? 'accent' : 'primary'}
        position="static"
    >
        <Toolbar>
            <IconButton
                aria-label="Menu"
                color="contrast"
            >
                <MenuIcon />
            </IconButton>
            <Typography
                color="inherit"
                type="title"
            >
                {title}
            </Typography>
        </Toolbar>
    </AppBar>
);

export default withStyles(styleSheet)(ApplicationBar);
