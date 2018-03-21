class LangHelper {
  constructor() {
    this.useHash = false;
    this.key = '';
    this.callback = [];
  }

  config({ useHash = false }) {
    // SHOW BE ONCE
    this.useHash = useHash;
    this.key = this.matchLangKey();
    this.makeCurrentShow(this.key);
  }

  matchLangKey() {
    let urlKey = '';

    if (this.useHash) {
      urlKey = location.hash.replace(/#/i, '');
    } else {
      const keyResult = location.pathname.match(/^\/(\w+)\/?/i);
      urlKey = keyResult ? keyResult[1] : '';
    }

    this.key = urlKey === 'en' ? 'en' : 'zh';
    return this.key;
  }

  makeCurrentShow(key = '') {
    const currentKey = key === 'en' ? 'en' : '';
    if (this.useHash) {
      location.hash = currentKey;
    } else {
      history.replaceState(null, null, `${location.protocol}//${location.host}/${currentKey}`);
    }
  }

  updateLang(key) {
    this.makeCurrentShow(key);
    const langKey = this.matchLangKey();
    this.callback.forEach((cb) => {
      cb(langKey);
    });
  }

  listen(cb) {
    if (typeof cb === 'function') {
      this.callback.push(cb);
    }
  }

  rmListen(fn) {
    this.callback = this.callback.filter(cb => cb === fn);
  }
}

export default new LangHelper();
