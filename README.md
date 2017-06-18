This is a sample application to aid in bootstrapping other projects, as well as keeping current with technology trends and best practices.  This bootstrap reference app contains a SPA and a native iOS/Android application. This structure is particularly well suited for web apps that want to share code to a native app.

# Prerequisites

- nodejs@^6
- yarn

# Getting Started

```bash
yarn
yarn run bootstrap
```

## Running Native App

- `yarn run native`
- `yarn run native/ios`
- `yarn run native/android`
- `yarn run native/eject`

## Validating/Testing

- `yarn validate` - will run all tests and lint all JS files
- `yarn test` - runs all tests
- `yarn run test/single @pkgname` - will run only tests for provided package
- `yarn lint` - lints all JS files


