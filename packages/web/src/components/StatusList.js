import React from 'react';
import List, {ListSubheader} from 'material-ui/List';
import StatusListItem from './StatusListItem';

const StatusList = ({
                        builds,
                        title,
                    }) => (
        <List
            subheader={<ListSubheader>{title}</ListSubheader>}
        >
            {builds.map((build, index) => (
                <StatusListItem
                    hasFailure={build.severity === 3}
                    key={index}
                    lastRetrieval={build.lastRetrieval}
                    name={build.name}
                    onSecondaryActionClick={console.log}
                />
            ))
            }
        </List>
    )
;

export default StatusList;
