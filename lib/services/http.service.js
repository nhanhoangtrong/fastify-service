import axios from 'axios';
import HTTPError from '../utils/HTTPError.js';

class HttpService {
  async callAPI(method = '', url = '', options = {}) {
    try {
      return await axios.request({
        url,
        method,
        ...options,
      });
    } catch (err) {
      if (err?.response?.data) {
        throw new HTTPError(`${url} ${err.response.status}`, err.response.data);
      }
      throw err;
    }
  }
}
const httpService = new HttpService();

export const callAPI = httpService.callAPI;

export default httpService;
