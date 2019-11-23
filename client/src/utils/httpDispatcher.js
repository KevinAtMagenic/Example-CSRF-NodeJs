import axios from 'axios';

class HttpDispatcher {
  static async processRequest(request) {
    try {
      const response = axios(request);
      const json = await response;
      return json;
    } catch (error) {
      throw error;
    }
  }
}
export default HttpDispatcher;
