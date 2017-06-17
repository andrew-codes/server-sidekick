const npsUtils = require('nps-utils');

const concurrent = npsUtils.concurrent;
const series = npsUtils.series;
const rimraf = npsUtils.rimraf;
const hiddenFromHelp = true;

module.exports = {
    scripts: {
        lint: 'eslint .',
        build: {
            default: 'echo "build me"',
            clean: rimraf('dist'),
        },
        test: {
            default: 'cross-env NODE_ENV=test jest --coverage',
            update: 'cross-env NODE_ENV=test jest -u',
        },
        validate: {
            description: 'Will run tasks to ensure things look good before committing or on a clean install',
            script: concurrent.nps('lint', 'test'),
        },
        validateAndBuild: {
            hiddenFromHelp,
            script: concurrent.nps('validate', 'build'),
        }
    },
    options: {
        silent: false,
    },
};
