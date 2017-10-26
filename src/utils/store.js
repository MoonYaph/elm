const store = () => {
  let user;
  try {
    user = JSON.parse(localStorage.getItem('STORE')) || {};
  } catch (e) {
    user = {};
  }
  return user;
};

export default {
  get(key) {
    const data = store();
    return key ? data[key] : data;
  },
  set(key, value) {
    const data = store();
    data[key] = value;
    try {
      localStorage.setItem('STORE', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
    return data;
  },
  setUser(username) {
    return this.set('user', username);
  },
  setUserId(id) {
    return this.set('userId', id);
  },
  get user() {
    return this.get('user');
  },
  get userId() {
    return this.get('userid');
  },
};
