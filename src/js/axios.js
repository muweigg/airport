import axios from "axios";

// axios.defaults.baseURL = 'http://weixin.cqa.cn/cqabi/jk';
axios.defaults.headers.common['X-HW-ID'] = 'com.roma.cqatest';
axios.defaults.headers.common['X-HW-APPKEY'] = 'Ki+VbWe3lb9uvEarLeuPUw==';

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axios;
