import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import NoFailureIcon from 'material-ui-icons/Done';
import ErrorIcon from 'material-ui-icons/Error';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import VolumeOff from 'material-ui-icons/VolumeOff';
import {createStyleSheet, withStyles} from 'material-ui/styles';
import {green, red} from 'material-ui/colors';

import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';

const listItemStyleSheet = createStyleSheet({
    errorIcon: {
        fill: red['600'],
    },
    mutedIcon: {
        fill: 'blue',
    },
    noFailureIcon: {
        fill: green['600'],
    },
    root: {
        '&:hover': {
            background: 'rgba(0,0,0,0.1)',
        },
        transition: 'background-color 150ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms',
    }
});

const StatusListItem = ({
                            id,
                            classes,
                            lastRetrieval,
                            muted,
                            name,
                            onFavorited,
                            onMuted,
                            hasFailure,
                        }) => (
    <ListItem className={classes.root}>
        {hasFailure && <ErrorIcon className={!muted ? classes.errorIcon : ''} />}
        {!hasFailure && <NoFailureIcon className={classes.noFailureIcon} />}
        <ListItemText
            primary={name}
            secondary={`last updated ${lastRetrieval.format('MM/DD/YYYY hh:mm:ss')}`}
        />
        <ListItemSecondaryAction>
            <IconButton
                aria-label="Mute"
                onClick={(evt) => onMuted(id)}
            >
                <VolumeOff className={muted ? classes.mutedIcon :  ''} />
            </IconButton>
            <IconButton
                aria-label="Favorite"
                onClick={evt => onFavorited(id)}
            >
                <FavoriteBorderIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

export default withStyles(listItemStyleSheet)(StatusListItem);
