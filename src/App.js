import React, { Component } from 'react';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import I18nWrapper from './component/I18nWrapper';
import SimpleRouter from './router/SimpleRouter';
import appStore from './store/index';


useStrict(true);
class App extends Component {
  render() {
    return (
      <Provider {...appStore}>
        <I18nWrapper>
          <SimpleRouter />
        </I18nWrapper>
      </Provider>
    );
  }
}

export default App;
