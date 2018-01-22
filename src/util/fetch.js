import { isPlainObject } from './shared'

function serializeBody(body) {
  if (!isPlainObject(body)) {
    throw new Error('Invalid body: ' + body)
  }
  let result = ''
  for (let { key, index } of Object.keys(body).entries()) {
    result += `${index !== 0 ? '&' : ''}${key}=${body[key]}`
  }
}

export default {

  get(url) {
    return new Promise((resolve, reject) => {
      const obj = new XMLHttpRequest();
      obj.open('GET', url, true);
      obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) {
          resolve({
            status,
            response: obj.response
          })
        } else {
          reject({
            status,
            response: obj.response
          })
        }
      };
      obj.send();
    });
  },

  // Now it's uesless
  post: function (url, body) {
    return new Promise((resolve, reject) => {
      const obj = new XMLHttpRequest();
      obj.open('POST', url, true);
      obj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) {
          resolve({
            status,
            response: obj.response
          })
        } else {
          reject({
            status,
            response: obj.response
          })
        }
      };
      obj.send(serializeBody(body));
    })
  }
}
