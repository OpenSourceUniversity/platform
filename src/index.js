import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import App from './app';
import './styles/global.scss';
// Redux Store
import store from './store';

const MOUNT_NODE = document.getElementById('root');

render(
  (
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  ), MOUNT_NODE,
);
