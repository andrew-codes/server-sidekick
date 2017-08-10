if (typeof process !== 'undefined') {
    require('isomorphic-fetch');
}

export const getBuildsSeedState = (numberOfItems = 20) => fetch(`http://hackweek.dev.corp.versionone.net:5000/api/Status/continuum?count=${encodeURIComponent(numberOfItems.toString())}`)
    .then(response => response.json())
    .then(data => ({
            builds: {
                entities: (data.continuumStatus || [])
                    .reduce((output, item) => ({
                        ...output,
                        [item.instanceId]: {
                            ...item,
                            lastRetrieval: (new Date()).toString(),
                            notified: true,
                        },
                    }), {}),
            },
        })
    );

export const fetchBuildDetails = (instanceId) => fetch(`http://hackweek.dev.corp.versionone.net:5000/api/Status/pipelineInstance/${encodeURIComponent(instanceId)}`)
    .then(response => response.json());
