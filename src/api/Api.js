import axios from "axios";

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const URL = "http://localhost:8080/rest/v1";

export default {
  login(data) {
    return axios.post(URL + "/login", data);
  },

  getUser(id) {
    return axios.get(URL + "/user/" + id);
  },

  getCompanys(userId) {
    return axios.get(URL + "/company/" + userId);
  }
};
