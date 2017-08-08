import React from 'react';
import Switch from 'material-ui/Switch';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';

const StatusListItem = ({
                            name,
                            onSecondaryActionClick
                        }) => (
    <ListItem>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
            <Switch
                onClick={onSecondaryActionClick}
                checked={false}
            />
        </ListItemSecondaryAction>
    </ListItem>
);

export default StatusListItem;
