import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import Routers from './router/Routers';
import appStore from './store/index';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

useStrict(true);
ReactDOM.render(
  <Provider {...appStore}>
    <App>
      <Routers />
    </App>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
