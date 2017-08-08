import fetch from 'isomorphic-fetch';

export const getBuildsSeedState = (numberOfItems = 20) =>
    fetch('http://hackweek:5000/api/Status/continuum')
        .then(response => response.json())
        .then(data => ({
                builds: {
                    entities: (data.continuumStatus || [])
                        .reduce((output, item) => ({
                            ...output,
                            [item.instanceId]: item,
                        }), {}),
                },
            })
        );
