export default async (urls = '', data = {}, type = 'GET') => {
  let url;
  if (type.toLowerCase() === 'get') {
    let str = '';

    Object.keys(data).forEach(key => {
      str += `${key}=${data[key]}&`;
    });
    if (str !== '') {
      str = str.substr(0, str.lastIndexOf('&'));
      url = `${urls}?${str}`;
    }
  }
  const options = {
    credientials: 'include',
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'force-cache'
  }
  if (type.toLowerCase() === 'post') {
    Object.defineProperty(options, 'body', {
      value: JSON.stringify(data)
    })
  }
  try {
    const res = await fetch(url, options)
    const json = await res.json()
    return json
  } catch (e) {
    throw new Error(e)
  }
};
