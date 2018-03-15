import {
  observable,
  useStrict,
  action
} from 'mobx';

useStrict(true);

class LoginStore {
  @observable token = localStorage.getItem('yz_authorization')

  @action tokenUpdate = (token) => {
    localStorage.setItem('bu_authorization', token);
    this.token = token;
  }

  @action tokenRemove = () => {
    // 删除用户token
    localStorage.removeItem('yz_authorization');
    localStorage.removeItem('yz_authorization');
    this.token = null;
  }
}

export default new LoginStore();
