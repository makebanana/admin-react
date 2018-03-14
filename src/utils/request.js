import axios from 'axios';
import { message, Modal, notification } from 'antd';
import loginStore from '../store/loginStore';

// 配置反馈
message.config({
  top: 200,
  duration: 2,
});

export default function fetch(options) {
  const beforeCb = options.beforeCb || function loadingBegin() { message.loading('正在加载...', 60000); };
  const completeCb = options.completeCb || function loadingEnd() { message.destroy(); };

  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: 2000,
      headers: {
        authorization: localStorage.getItem('bu_authorization'),
        'Content-Type': 'application/json'
      }
    });

    // 拦截器
    instance.interceptors.request.use((config) => {
      const settings = config;

      // 在发送请求之前做些什么
      if (settings.method === 'get') {
        settings.params = settings.data;
      }

      beforeCb();
      return settings;
    }, (error) => {
      // 对请求错误做些什么
      completeCb();
      notification.error({
        message: '提示',
        description: error || '处理失败'
      });
    });

    instance(options)
      .then((response) => {
        // 关闭过度动画
        completeCb();

        const returnCode = Number(response.data.code);

        // 正常返回
        if (returnCode === 200) {
          return resolve(response.data);
        }

        if (returnCode === 401) {
          return Modal.error({
            title: '提示',
            content: '用户信息过期啦，快去登录～',
            okText: '去登录',
            onOk: () => {
              loginStore.tokenRemove();
            }
          });
        }

        notification.error({
          message: '提示',
          description: response.data.message || '处理失败'
        });


        reject(response.data);
      }).catch((error) => {
        completeCb();

        // 关闭过度动画
        reject(error);
      });
  });
}
