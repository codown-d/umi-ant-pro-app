
import axios from '@/utils/axios'; 

export function getModelInfo(data?: any) {
  return axios.get('/api/v1/modelInfo', data); 
}