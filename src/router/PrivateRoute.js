import React, { Component } from 'react';
import {
  Route,
  withRouter,
  Redirect
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('loginStore') @withRouter @observer

export default class PrivateRoute extends Component {
  render() {
    const { component: warpComponent, ...rest } = this.props;
    const { token } = this.props.loginStore;

    return (
      <Route
        {...rest}
        render={props => (
          token ? (
            <warpComponent {...props} />
          ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: { pathname: document.location.pathname } }
              }}
            />
          )
        )}
      />
    );
  }
}
