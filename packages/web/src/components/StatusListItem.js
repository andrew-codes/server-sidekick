import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import NoFailureIcon from 'material-ui-icons/CheckCircle';
import ErrorIcon from 'material-ui-icons/Error';
import IconButton from 'material-ui/IconButton';
import PendingIcon from 'material-ui-icons/QueryBuilder';
import React from 'react';
import VolumeOff from 'material-ui-icons/VolumeOff';
import {blue, green, red} from 'material-ui/colors';
import {createStyleSheet, withStyles} from 'material-ui/styles';

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
    pending: {
        fill: blue['600'],
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
                            onSelected,
                            pending,
                            failed,
                        }) => (
    <ListItem
        className={classes.root}
        onClick={(e) => onSelected(id)}
    >
        {failed && <ErrorIcon className={!muted ? classes.errorIcon : ''} />}
        {pending && <PendingIcon className={classes.pending} />}
        {!failed && !pending && <NoFailureIcon className={classes.noFailureIcon} />}
        <ListItemText
            primary={name}
            secondary={`last updated ${lastRetrieval.format('MM/DD/YYYY hh:mm:ss')}`}
        />
        <ListItemSecondaryAction>
            <IconButton
                aria-label="Mute"
                onClick={(evt) => onMuted(id)}
            >
                <VolumeOff className={muted ? classes.mutedIcon : ''} />
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
