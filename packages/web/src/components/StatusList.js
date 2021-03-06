import React from 'react';
import List, {ListSubheader} from 'material-ui/List';
import StatusListItem from './StatusListItem';

const StatusList = ({
                        builds,
                        onFavorited,
                        onMuted,
                        onSelected,
                        title,
                    }) => (
        <List
            subheader={<ListSubheader>{title}</ListSubheader>}
        >
            {builds.map((build, index) => (
                <StatusListItem
                    failed={build.severity === 3}
                    pending={build.severity === 6}
                    id={build.instanceId}
                    key={index}
                    lastRetrieval={build.lastRetrieval}
                    muted={build.muted}
                    name={`${build.name}: ${build.pipelineName}`}
                    onFavorited={onFavorited}
                    onMuted={onMuted}
                    onSelected={onSelected}
                />
            ))
            }
        </List>
    )
;

export default StatusList;
