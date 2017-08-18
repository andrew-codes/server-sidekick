[![build status](https://travis-ci.org/andrew-codes/server-sidekick.svg?branch=master)](https://travis-ci.org/andrew-codes/server-sidekick)

# Server SideKick

This is the August 2017 hack week project from VersionOne; only one week, only one rule: deliver and demo your project.

This suite of apps are used to monitor, in real-time, pipeline/build statuses from Continuum in order to provide alerts to QA, DevOps, and Release Managers when a pipeline requires intervention.
 
 ## Technical Achievements
The native app, web app, and web server all share the same modules powering their features. The only difference between them are the actual UI components themselves. All state management, server interactions, etc. is all the same code for all three.

# Prerequisites

- [nodejs@^6.11.0](https://nodejs.org/en/download/)
- npm@^5.0.0
- [dotnet Core 2.0 Preview 2](https://www.microsoft.com/net/core/preview)
- Bash (not minqw; use Linux shell on Windows version@16.04)

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
`npm run api/run`

## Running Web App
`npm run web/run` (run UI web server only)

## Running Native App
`npm run native/run`

## Validating/Testing

- `npm validate` - will run all tests and lint all JS files
- `npm test` - runs all tests
- `npm run test/single @pkgname` - will run only tests for provided package
- `npm lint` - lints all JS files


