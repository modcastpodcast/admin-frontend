import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import App from './app/App';
import "./index.scss";
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://730b85d36361482f862e3fb0ed12c2db@o431389.ingest.sentry.io/5382334",
    release: `modpod-live-admin@${process.env.REACT_APP_GIT_SHA}`
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
