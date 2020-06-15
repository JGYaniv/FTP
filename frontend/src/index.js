import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import configureStore from './store/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter> 
      <App/>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);


