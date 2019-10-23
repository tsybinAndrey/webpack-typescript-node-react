// this is needed to work with generators, promises etc
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './index.css';

// Load the favicon
import '!file-loader?name=[name].[ext]!./assets/favicon.ico';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
