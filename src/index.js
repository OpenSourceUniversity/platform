import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import '../semantic/dist/semantic.min.css';
import './styles/global.scss';
import App from './app';
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
