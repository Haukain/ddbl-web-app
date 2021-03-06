/**
 * TODO
 */
export default class Api {
  /**
   * TODO
   */
  static connect(uri, options) {
    return new Promise((resolve, reject) => {
      fetch(uri, options)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.success) {
            return resolve(data.success);
          } else {
            return reject(data.error);
          }
        })
        .catch(error => {
          return reject(error);
        });
    });
  }

  /**
   * TODO
   */
  static post(uri, body) {
    let options = {
      method: 'POST',
      body: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return this.connect(uri, options);
  }
  /**
   * TODO
   */
  static get(uri) {
    let options = {
      method: 'get',
      headers: {
        Accept: 'application/json'
      }
    };
    return this.connect(uri, options);
  }
}
