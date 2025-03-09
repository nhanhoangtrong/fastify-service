import { callAPI } from './http.service.js';

class FeatAndGreedService {
  baseURL = 'https://api.alternative.me';

  async requestFnG() {
    const resp = await callAPI('GET', '/fng', {
      baseURL: this.baseURL,
    });
    const { name, data } = resp.data;
    return {
      name,
      data: data || [],
    };
  }
}

export default new FeatAndGreedService();
