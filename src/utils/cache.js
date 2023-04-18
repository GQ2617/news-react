export default {
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getCache(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  removeCache(key) {
    window.localStorage.removeItem(key);
  },
  clearCache() {
    window.localStorage.clear();
  },
};
