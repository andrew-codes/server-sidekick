if (typeof process !== 'undefined') {
    require('isomorphic-fetch');
}

export const getBuildsSeedState = (numberOfItems = 20) => {
    return fetch(`http://hackweek.dev.corp.versionone.net/:5000/api/Status/continuum?count=${encodeURIComponent(numberOfItems.toString())}`)
        .then(response => response.json())
        .then(data => ({
                builds: {
                    entities: (data.continuumStatus || [])
                        .reduce((output, item) => ({
                            ...output,
                            [item.instanceId]: {
                                ...item,
                                lastRetrieval: (new Date()).toString(),
                            },
                        }), {}),
                },
            })
        );
}
