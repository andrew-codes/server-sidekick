import fetch from 'isomorphic-fetch';

export const getBuildsSeedState = (numberOfItems = 20) =>
    fetch('http://hackweek:5000/api/Status/continuum')
        .then(response => response.json())
        .then(data => ({
                builds: {
                    entities: data.item2
                        .reduce((output, item) => ({
                            ...output,
                            [item.instanceId]: item,
                        }), {}),
                },
            })
        );
