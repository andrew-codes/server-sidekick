import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import Done from 'material-ui-icons/Done';
import Error from 'material-ui-icons/Error';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import {createStyleSheet, withStyles} from 'material-ui/styles';
import {green, red} from 'material-ui/colors';

import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';

const styleSheetError = createStyleSheet({
    root: {
        fill: red['600'],
    },
});
const styleSheetOk = createStyleSheet({
    root: {
        fill: green['600'],
    },
});
const ErrorIcon = withStyles(styleSheetError)(Error);
const NoFailureIcon = withStyles(styleSheetOk)(Done);

const StatusListItem = ({
                            lastRetrieval,
                            name,
                            onSecondaryActionClick,
                            hasFailure,
                        }) => (
    <ListItem>
        {hasFailure && <ErrorIcon />}
        {!hasFailure && <NoFailureIcon />}
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
