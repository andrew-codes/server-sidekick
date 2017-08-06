[![build status](https://travis-ci.org/andrew-codes/hack-week-august-2017.svg?branch=master)](https://travis-ci.org/andrew-codes/hack-week-august-2017)

This is a sample application to aid in bootstrapping other projects, as well as keeping current with technology trends and best practices.  This bootstrap reference app contains a SPA and a native iOS/Android application. This structure is particularly well suited for web apps that want to share code to a native app.

# Prerequisites

- nodejs@^6
- npm@^5

# Getting Started

```bash
npm install
npm run bootstrap
```

## Running API Server
Ensure you [setup your env](packages/api/README.md) first.

- `npm run api/run`

## Running Web App

- `npm run web/run` (run UI web server only)
- `npm run web/start` (run with API server)

## Running Native App

- `npm run native`
- `npm run native/ios`
- `npm run native/android`
- `npm run native/eject`
- `npm run native/start` (run with API server)

## Validating/Testing

- `npm validate` - will run all tests and lint all JS files
- `npm test` - runs all tests
- `npm run test/single @pkgname` - will run only tests for provided package
- `npm lint` - lints all JS files


