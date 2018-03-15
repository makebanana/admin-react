import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nProvider } from 'zent';
import enUS from 'zent/lib/i18n/en-US';
import zhCN from 'zent/lib/i18n/zh-CN';
import langHelper from '../utils/langHelper';

const lang = {
  en: enUS,
  zh: zhCN
};

/*
* enUS is .js and rely on other module, can't use request
* This means I might load a module that I don't need when I didn't use it.
*/
export default class I18nWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lang: langHelper.matchLangKey()
    };
  }

  componentWillMount() {
    langHelper.config({ useHash: this.props.useHash });
    langHelper.listen(this.urlListener);
  }

  componentWillReceiveProps({ useHash }) {
    if (this.props.useHash === useHash) { return; }

    langHelper.config({ useHash });
  }

  componentWillUnmount() {
    langHelper.rmListen(this.urlListener);
  }

  urlListener = (langKey) => {
    this.setState({
      lang: langKey
    });
  }

  render() {
    return (
      <I18nProvider i18n={lang[this.state.lang]}>
        {this.props.children}
      </I18nProvider>
    );
  }
}

I18nWrapper.defaultProps = {
  useHash: false
};

I18nWrapper.propTypes = {
  useHash: PropTypes.bool
};
