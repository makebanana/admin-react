import {
  observable,
  useStrict,
  action
} from 'mobx';

useStrict(true);

class LoginStore {
  @observable token = sessionStorage.getItem('yz_authorization')

  @action tokenUpdate = (token) => {
    sessionStorage.setItem('yz_authorization', `Bearer ${token}`);
    this.token = token;
  }

  @action tokenRemove = () => {
    // 删除用户token
    sessionStorage.removeItem('yz_authorization');
    this.token = null;
  }
}

export default new LoginStore();
