import AppBar from 'material-ui/AppBar';
import createPalette from 'material-ui/styles/palette';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {createMuiTheme, createStyleSheet, MuiThemeProvider, withStyles} from 'material-ui/styles';
import {green, red} from 'material-ui/colors';

const styleSheet = createStyleSheet({
    root: {
        marginTop: 30,
        width: '100%',
    },
});

const withoutUnacknowledgedFailuresTheme = createMuiTheme({
    palette: createPalette({
        primary: green,
        accent: red,
        type: 'light',
    }),
});
const withUnacknowledgedFailuresTheme = createMuiTheme({
    palette: createPalette({
        primary: red,
        accent: red,
        type: 'light',
    }),
});

const ApplicationBar = ({title, hasUnacknowledgedFailures}) => (
    <MuiThemeProvider
        theme={hasUnacknowledgedFailures ? withUnacknowledgedFailuresTheme : withoutUnacknowledgedFailuresTheme}
    >
        <AppBar
            color="primary"
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
    </MuiThemeProvider>
);

export default withStyles(styleSheet)(ApplicationBar);
