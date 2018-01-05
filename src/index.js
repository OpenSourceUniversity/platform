import 'semantic-ui-css/semantic.min.css';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import App from './app';

const MOUNT_NODE = document.getElementById('root');

render(
  (
    <HashRouter>
      <App />
    </HashRouter>
  ), MOUNT_NODE,
);
