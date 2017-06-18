const npsUtils = require('nps-utils');

const concurrent = npsUtils.concurrent;
const series = npsUtils.series;
const rimraf = npsUtils.rimraf;
const hiddenFromHelp = true;

module.exports = {
    scripts: {
        install: {
            default: concurrent.nps('install.native', 'install.web', 'install.server'),
            native: 'cd app/server yarn',
            server: 'cd app/native yarn',
            web: 'cd app/web yarn',
        },
        lint: 'eslint .',
        build: {
            default: 'echo "build me"',
            clean: rimraf('dist'),
        },
        test: {
            common: "cross-env NODE_ENV=test jest app/common --coverage",
            default: concurrent.nps('test.native', 'test.web', 'test.server', 'test.common'),
            native: {
                default: 'cross-env NODE_ENV=test jest app/native --coverage',
            },
            server: 'cross-env NODE_ENV=test jest app/server --coverage',
            web: {
                default: 'cross-env NODE_ENV=test jest app/web --coverage --config=app/web/.jestrc',
                update: 'cross-env NODE_ENV=test jest app/web -u --config=app/web/.jestrc',
            }
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
