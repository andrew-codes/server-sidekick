import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import DoneIcon from 'material-ui-icons/Done';
import ErrorIcon from 'material-ui-icons/Error';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';

const StatusListItem = ({
                            lastRetrieval,
                            name,
                            onSecondaryActionClick,
                            hasFailure,
                        }) => (
    <ListItem>
        {hasFailure && <ErrorIcon />}
        {!hasFailure && <DoneIcon />}
        <ListItemText
            primary={name}
            secondary={`last updated ${lastRetrieval.format('MM/DD/YYYY hh:mm:ss')}`}
        />
        <ListItemSecondaryAction>
            <IconButton
                aria-label="Favorite"
                onClick={onSecondaryActionClick}
            >
                <FavoriteBorderIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

export default StatusListItem;
