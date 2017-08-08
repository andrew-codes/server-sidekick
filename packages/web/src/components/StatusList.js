import React from 'react';
import List, {ListSubheader} from 'material-ui/List';
import StatusListItem from './StatusListItem';

const StatusList = ({
                        builds,
                        onFavorited,
                        onMuted,
                        title,
                    }) => (
        <List
            subheader={<ListSubheader>{title}</ListSubheader>}
        >
            {builds.map((build, index) => (
                <StatusListItem
                    hasFailure={build.severity === 3}
                    id={build.instanceId}
                    key={index}
                    lastRetrieval={build.lastRetrieval}
                    name={build.name}
                    onFavorited={onFavorited}
                    onMuted={onMuted}
                />
            ))
            }
        </List>
    )
;

export default StatusList;
