import { render } from 'react-dom';
import React from 'react';
import App from './app.js';

const MOUNT_NODE = document.getElementById('root');

render(<App />, MOUNT_NODE);
