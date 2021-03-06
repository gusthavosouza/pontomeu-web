import http from '@/api/http'
import { store } from '@/api/store'

export const user = {
  getUser: () => http.get('/user/' + store.getUserId()),
  getCompanies: () => http.get('/user/' + store.getUserId() + '/company'),
  logout: () => { store.logout(); }
}
