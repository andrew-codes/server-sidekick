export default (html, initialState = {}) =>
    `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
  </head>
  <body style="margin: auto 0;">
  <div id="root">${html}</div>
  <script>
    window.__PRELOADED_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}
  </script>
  <script src="/dist/client/index.js"></script>
  </body>
  </html>
`;
