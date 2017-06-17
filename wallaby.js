module.exports = function(wallaby) {
    return {
        compilers: {
            '**/*.js': wallaby.compilers.babel(),
        },
        env: {
            type: 'node',
            runner: 'node',
        },
        files: [
            'src/**/*.js',
            '!src/**/__tests__/*.js',
        ],
        testFramework: 'jest',
        tests: [
            'src/**/__tests__/*.js',
        ],
    }
};
