// router 只用在login 跟 index 两个入口
// 然后引入 整个 react-router-dom 造成了一定的资源浪费
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Loadable from '../component/Loadable';

const LoadableIndex = Loadable({
  loader: () => import(/* webpackChunkName: 'chunk_index' */'../pages/Index')
});
const LoadableLogin = Loadable({
  loader: () => import(/* webpackChunkName: 'chunk_login */'../pages/Login')
});

@inject('loginStore') @observer
export default class SimpleRouter extends Component {
  render() {
    const { token } = this.props.loginStore;
    return (
      token ? <LoadableIndex /> : <LoadableLogin />
    );
  }
}
