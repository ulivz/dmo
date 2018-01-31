import { isPlainObject } from './shared'

function serializeBody(body: Object) {
  if (!isPlainObject(body)) {
    throw new Error('Invalid body: ' + body)
  }
  let result = ''
  for (const [key, index]  of Object.keys(body).entries()) {
    result += `${index !== 0 ? '&' : ''}${key}=${body[key]}`
  }
}

export function get(url) {
  return new Promise((resolve, reject) => {
    const obj = new XMLHttpRequest();
    obj.open('GET', url, true);
    obj.onload = () => {
      if (obj.status >= 200 || obj.status < 400) {
        return resolve({
          status: obj.status,
          body: obj.response
        })
      }
      reject({
        status: obj.status,
        body: obj.response
      })
    }
    obj.send();
  })
}

// Now it's uesless
export function post(url, body) {
  return new Promise((resolve, reject) => {
    const obj = new XMLHttpRequest();
    obj.open('POST', url, true);
    obj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    obj.onload = () => {
      if (obj.status >= 200 || obj.status < 400) {
        return resolve({
          status: obj.status,
          body: obj.response
        })
      }
      reject({
        status: obj.status,
        body: obj.response
      })
    }
    obj.send(serializeBody(body));
  })
}
