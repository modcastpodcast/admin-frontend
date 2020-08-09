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

console.log("%c ModPod Admin", "color: #ff006e; font-size: 10em;");
console.log("%cWelcome to the ModPod Administration system", "color: #8338EC; font-size: 3em;");
console.log("%cTo report a bug, please provide the below information:", "color: #FB5607; font-size: 2em;");
console.log(`%c Environment: ${process.env.NODE_ENV}`, "color: #FB5607;");
console.log(`%c Location: ${document.location}`, "color: #FB5607;");
console.log(`%c Build version: modpod-live-admin@${process.env.REACT_APP_GIT_SHA}`, "color: #FB5607;");
console.log("%cIf you want to chat about React, Python, TypeScript, Rust or Elixir, join us on Discord at https://modpod.live/modpod-web!", "color: #3A86FF; font-size: 2em;");

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
