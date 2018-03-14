import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import md5 from 'js-md5';
import { notification } from 'antd';
import { observer, inject } from 'mobx-react';
import request from '../utils/request';

// 200 按照api约定正常返回
// 401 登录信息失效
@inject('loginStore') @observer
export default class Login extends Component {
  state = {
    mobile: null,
    password: null
  }

  // 绑定输入事件
  handleBindInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // 登陆事件
  handleLogin = () => {
    const { mobile, password } = this.state;

    request({
      url: '/server/login',
      method: 'POST',
      data: {
        mobile,
        password: md5(password)
      }
    }).then((data) => {
      localStorage.setItem('bu_authorization', data.authorization);
      localStorage.setItem('bu_userId', data.userId);
      this.props.loginStore.tokenUpdate();

      notification.success({
        message: '登录成功',
        description: '欢迎回来～'
      });
    });
  }

  render() {
    if (this.props.loginStore.token) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <input value={this.state.mobile} name="mobile" placeholder="账号" onInput={this.handleBindInput} />
        <input value={this.state.password} name="password" placeholder="密码" type="password" onInput={this.handleBindInput} />
        <button onClick={this.handleLogin}>登录</button>
        <p>You must log in to view the page at {this.state.from.pathname}</p>
      </div>
    );
  }
}
