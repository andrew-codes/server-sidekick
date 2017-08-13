[![build status](https://travis-ci.org/andrew-codes/hack-week-august-2017.svg?branch=master)](https://travis-ci.org/andrew-codes/hack-week-august-2017)

This is a sample application to aid in bootstrapping other projects, as well as keeping current with technology trends and best practices.  This bootstrap reference app contains a SPA and a native iOS/Android application. This structure is particularly well suited for web apps that want to share code to a native app.

# Prerequisites

- [nodejs@^6.11.0](https://nodejs.org/en/download/)
- npm@^5.0.0
- [dotnet Core 2.0 Preview 2](https://www.microsoft.com/net/core/preview#windowscmd)
- Bash (use Linux shell on Windows version@16.04)

# Getting Started

```bash
npm install
npm run bootstrap
```

## Running API Server
Ensure you [setup your env](packages/api/README.md) first. Ensure the environment variable `ASPNETCORE_ENVIRONMENT=Development` is set.

### Checkout the latest API submodule
```bash
# after initial git clone in the repo folder
cd packages/api
git submodule update --init --recursive #updates API git submodule
git checkout hackweek # and checks out the hack week branch
cd ../.. # back to root directory
```

### Run API
- `npm run api/run`

## Running Web App

- `npm run web/run` (run UI web server only)
- `npm run web/start` (run with API server)

## Running Native App
```bash
npm run native/run
```
 
Alternatively, you can run the these two commands in separate shell instances from the `./packages/native-app` 
 directory.
 
```
npm run haul
react-native run-ios
```

## Validating/Testing

- `npm validate` - will run all tests and lint all JS files
- `npm test` - runs all tests
- `npm run test/single @pkgname` - will run only tests for provided package
- `npm lint` - lints all JS files


