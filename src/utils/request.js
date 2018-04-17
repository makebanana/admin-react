import axios, { CancelToken } from 'axios';
import { Notify, Sweetalert } from 'zent';
import loginStore from '../store/loginStore';
import langHelper from './langHelper';

const source = CancelToken.source();

const codeMessage = {
  zh: {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    999: '服务器错误'
  },
  en: {
    200: 'The server succeeds in returning the requested data.',
    201: 'New or modified data is successful.',
    202: 'A request has entered a backstage queue (asynchronous task).',
    204: 'Deleting the data is successful.',
    400: 'The request is wrong and the server does not do the operation of the new or modified data.',
    401: 'The user has no rights (tokens, username, password error).',
    403: 'The user is authorized, but the access is prohibited.',
    404: 'The request is directed against a non - existent record, and the server is not operating.',
    406: 'The format of the request is not available.',
    410: "The requested resources are permanently deleted and won't be obtained again.",
    422: 'When an object is created, a validation error occurs.',
    500: 'An error occurred on the server. Please check the server.',
    502: 'Gateway error.',
    503: 'The service is not available, and the server is temporarily overloaded or maintained.',
    504: 'The gateway is out of time.',
    999: 'The server error'
  }

};

// catch server uncatch error
function checkStatus({ response = {} }) {
  const { status = 999 } = response;
  const errortext = codeMessage[langHelper.key][status];
  Notify.error(`${status}: ${errortext}`, 2000);
  const error = new Error(errortext);
  error.name = status;
  throw error;
}

// catch server catch error
function checkCode({ data, status, ...others }) {
  const serverCode = data.code;
  if (serverCode === 200) {
    return data.data;
  }

  if (serverCode === 401) {
    const langKey = Number(langHelper.key === 'en');
    loginStore.tokenRemove();
    Sweetalert.alert({
      title: ['提示', 'FYA'][langKey],
      content: codeMessage[langHelper.key][401],
      confirmType: 'danger',
    });

    source.cancel(codeMessage[langHelper.key][401]);
  }


  const errortext = `${serverCode}: ${codeMessage[langHelper.key][serverCode] || data.massege || ''}`;
  Notify.error(errortext, 2000);

  const error = new Error(errortext);
  error.name = status;
  error.response = {
    status,
    ...others,
  };

  throw error;
}

export default function fetch(options) {
  const instance = axios.create({
    timeout: options.timeout || 4000,
    headers: {
      Accept: 'application/json',
      authorization: sessionStorage.getItem('yz_authorization'),
      'Content-Type': options.data instanceof FormData ? 'multipart/form-data' : 'application/json',
      ...options.headers
    },
    cancelToken: source.token
  });

  /**
  * 拦截器
  */
  instance.interceptors.request.use((config) => {
    const newConfig = config;
    // 在发送请求之前做些什么
    newConfig.method = options.method || 'GET';
    if (config.method === 'GET') {
      newConfig.params = config.data;
    }
    return newConfig;
  });

  return instance(options)
    .catch(checkStatus)
    .then(checkCode);
}
