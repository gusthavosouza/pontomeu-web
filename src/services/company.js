import http from '@/api/http'
import {store} from '@/api/store'

export const company = {
  post: (data) => {
    data.userId = store.getUserId();
    return http.post('/company', data);
  }
}
