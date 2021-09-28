import {getSecureData} from './../constants/storage';

export default async(url, options, authenticated) => {
  options = options || {};
  let headers = {'Accept': 'application/json', 
    'Content-Type': 'application/json',
    'Authorization': ''
  };
  if (authenticated){
    let token = await getSecureData("accesstoken");
    headers['Authorization'] = 'Bearer ' + token
  }
  options = {
    ...options,
    headers: {
      ...options.headers,
      ...headers
    }
  }
  return fetch(url, options)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }).then(data => {
      return data
    }).catch((err) => {
      console.error(err);
      return {};
    });
}
