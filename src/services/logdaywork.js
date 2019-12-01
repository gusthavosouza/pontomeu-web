import http from '@/api/http'
//  import { store } from '@/api/store'

export const logdaywork = {
  loadDayWork: (id) => http.get('/work/' + id),
  post: (data) => http.post("/work", data)
}
