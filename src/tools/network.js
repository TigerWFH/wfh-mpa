import axios from 'axios';
/*
axios.request(config)
axios(config={method, url, config})
请求方式别名
axios.get(url)
axios.post(url, config)
axios.delete(url, config)
axios.head(url, config)
axios.options(url, config)
axios.put(url, config)
axios.patch(url, config)
axios实例
axios.create(config)
    ins.request(config)
    ins.get(url,config)
    ins.post(url,config)
    ins.delete(url,config)
    ins.put(url,config)
    ins.patch(url,config)
    ins.options(url,config)
    ins.head(url,config)
    ins.getUri(url,config)
*/

const network = axios.create();
network.interceptors.request.use(function (config) {
  const uuid = sessionStorage.getItem('uuid');
  const { headers } = config;

  return {
    ...config,
    headers: {
      ...headers,
      'X-ACTION-ID': uuid
    }
  };
});

export { network };
