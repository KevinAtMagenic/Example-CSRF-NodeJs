import httpDispatcher from './httpDispatcher';

class CsrfDispatcher {
  static async processRequest(request) {
    const tokenCall = this.getCsrfToken();
    tokenCall.then((token) => {
      request.headers['Access-Control-Max-Age'] = 7200
      request.headers['X-CSRF-Token'] = token;
      return httpDispatcher.processRequest(request);
    });
  }

  static async getCsrfToken() {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: '/api/hello'
    };

    return httpDispatcher
      .processRequest(request)
      .then((response) => {
        return response.data.csrfToken;
        //CookieHelper.setCookie('csrfToken', response.data.csrfToken, 1);
        //CookieHelper.setCookie('csrfToken', response.body.csrfToken, 1);
      })
  };
}
export default CsrfDispatcher;
