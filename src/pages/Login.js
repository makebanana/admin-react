import React, { Component } from 'react';
import { Notify, Form, Button } from 'zent';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import md5 from 'js-md5';
import request from '../utils/request';

const { FormInputField, createForm } = Form;

const StyleLoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -100px;
  padding: 40px;
  width: 300px;
  height: 200px;
  border: 1px solid #d9d9d9;
`;

const StyleSubmitBox = styled.div`
  text-align: center;
`;

class LoginForm extends Component {
  submit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <Form inline onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <FormInputField
          name="mobile"
          type="text"
          label="账号:"
          validations={{
            required: true,
            matchRegex: /^1[345678]\d{9}$/
          }}
          validationErrors={{
            required: '请填写账号',
            matchRegex: '请填写正确的账号'
          }}
        />
        <FormInputField
          name="password"
          type="password"
          label="密码:"
          validations={{
            required: true
          }}
          validationErrors={{
            required: '请填写密码'
          }}
        />
        <StyleSubmitBox>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={this.props.loading}
            disabled={this.props.loading}
            style={{
              width: '160px'
            }}
          >
            登录
          </Button>
        </StyleSubmitBox>
      </Form>
    );
  }
}

const WrappedForm = createForm()(LoginForm);

@inject('loginStore') @observer
export default class Login extends Component {
  state = {
    isLogining: false
  }

  // 登陆事件
  handleSubmit = ({ mobile, password }) => {
    this.setState({
      isLogining: true
    });

    request({
      url: '/server/login',
      method: 'POST',
      data: {
        mobile,
        password: md5(password)
      }
    }).then((data) => {
      localStorage.setItem('yz_userId', data.userId);
      this.props.loginStore.tokenUpdate(data.authorization);

      Notify.success();
    }).finally(() => {
      this.setState({
        isLogining: false
      });
    });
  }

  render() {
    return (
      <StyleLoginBox>
        <WrappedForm onSubmit={this.handleSubmit} loading={this.state.isLogining} />
      </StyleLoginBox>
    );
  }
}
