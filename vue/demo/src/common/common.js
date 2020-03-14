import axios from 'axios'

let common = {}

common.isLocalMock = function (o) {
  if (o instanceof Array) {
    return o[0].indexOf('.json') != -1 ? true : false;
  } else if (o instanceof String) {
    return o.indexOf('.json') != -1 ? true : false;
  }
}

common.axiosRequest = function (type, url, options) {
  // debugger;
  let invokMethod = {
    "post": function (url, options) {
      if (isLocalMock(url)) {
        return axios.get(url, options);
      } else {
        return axios.post(url, options);
      }
    },
    "get": function (url, options) {
      return axios.get(url, options);
    },
    "put": function (url, options) {
      return axios.put(url, options);
    },
    "delete": function (url, options) {
      return axios.delete(url, options);
    },
  }
  //console.log(invokMethod[type])
  return invokMethod[type](url, options);
}

export const axiosRequest = common.axiosRequest;
export const isLocalMock = common.isLocalMock;
export default common
