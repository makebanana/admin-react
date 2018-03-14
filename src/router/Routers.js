import React from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import Index from '../pages/Index';
import Login from '../pages/Login';

const Routes = () => (
  <Router history={createBrowserHistory()}>
    <div>
      <Switch>
        <PrivateRoute path="/" component={Index} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
