import React, { Component } from 'react';
import { Menu } from 'zent';
import PropTypes from 'prop-types';
import request from '../utils/request';

const { MenuItem, SubMenu } = Menu;

export default class AuthNav extends Component {
  static propTypes = {
    menuSelected: PropTypes.string,
  }

  static defaultProps = {
    menuSelected: 'index',
  }

  state = {
    menu: [],
  }

  componentWillMount() {
    this.fecthMenuList();
  }

  onMenuClick = (e) => {
    console.log(e);
  }

  fecthMenuList = () => {
    request({ url: '/server/auth' })
      .then((data) => {
        console.log(data);
        this.setState({
          menu: [],
        });
      });
  }

  render() {
    console.log(123);
    const { menu } = this.state;
    const { menuSelected } = this.props;

    if (!menu || !menu.length) {
      return null;
    }

    return (
      <Menu
        mode="inline"
        defaultSelectedKey={menuSelected}
        onClick={this.onMenuClick}
      >
        <MenuItem key="1-1">
          食品分类
        </MenuItem>
        <SubMenu>
          <MenuItem key="1-3-1">电视机</MenuItem>
          <MenuItem key="1-3-2">笔记本</MenuItem>
          <MenuItem key="1-3-3">洗衣机</MenuItem>
        </SubMenu>
      </Menu>
    );
  }
}
