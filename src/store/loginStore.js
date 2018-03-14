import {
  observable,
  useStrict,
  action
} from 'mobx';

useStrict(true);

class LoginStore {
  @observable token = localStorage.getItem('local_authorization')

  @action tokenUpdate = () => {
    this.token = localStorage.getItem('local_authorization');
  }

  @action tokenRemove = () => {
    // 删除用户token
    localStorage.removeItem('bu_authorization');
    localStorage.removeItem('bu_userId');
    this.token = null;
  }
}

export default new LoginStore();
