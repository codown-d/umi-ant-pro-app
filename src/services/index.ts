import axios from '@/utils/axios';

export function getModelInfo(params?: any) {
  return axios.get('/api/v1/modelInfo', { params });
}
export function getSystemInfo(params?: any) {
  return axios.get('/api/v1/systemInfo', { params });
}

export function getAppConfig(params?: any) {
  return axios.get('/api/v1/appConfig', { params });
}
export function getProductList(params?: any) {
  return axios.get('/api/v1/productList', { params });
}
export function postSystemConfig(data?: any) {
  return axios.post('/api/v1/systemInfo', data);
}
export function putAppConfig(params?: any) {
  return axios.put('/api/v1/systemInfo', { params });
}
