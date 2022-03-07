import axios from "axios";

class HttpClient {
  static get(url, data) {
    return axios.get(url, {
      data,
    });
  }

  static post(url, data) {
    return axios.post(url, data);
  }
}

export default HttpClient;