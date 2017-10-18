/**
 * Created by nick on 2017/10/13.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { browserHistory } from 'react-router';
import { sendLogin, mobileCode, getcaptchas } from '../../utils/api';
import store from '../../utils/store';
// import { mobileCode } from '../../utils/url';

class SignMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      countButtonBusy: false,
      loginButtonBusy: false,
      validateToken: '',
      verifyCode: '',
      count: '',
      captcha: '',
      captchaImage: '',
      success: '',
      message: '',
      name: '',
      showCaptcha: '',
      captchaError: '',
      errorData: {
        mobile: {
          name: 'MOBILE_NONE_ERROR',
          message: '请填写手机号'
        },
        enabledMobile: {
          name: 'MOBILE_ILLEGAL_ERROR',
          message: '请填写合法的手机号'
        },
        validateToken: {
          name: 'TOKEN_NONE_ERROR',
          message: '请获取验证码'
        },
        verifyCode: {
          name: 'VERIFY_NONE_ERROR',
          message: '验证码错误，请重新填写'
        },
        username: {
          name: 'USERNAME_NONE_ERROR',
          message: '手机/邮箱/用户名 不能为空'
        },
        password: {
          name: 'PAAWORD_NONE_ERROR',
          message: '密码不能为空'
        },
        needCaptchaCode: {
          name: 'CAPTCHACODE_NONE_ERROR',
          message: '请填写验证码'
        }
      }
    };
  }

  loginError = () => {
    const { mobile, errorData, verifyCode, validateToken } = this.state;

    return mobile
      ? this.enabedMobile()
        ? validateToken
          ? verifyCode ? '' : errorData.verifyCode
          : errorData.validateToken
        : errorData.enabledMobile
      : errorData.mobile;
  };
  enabedMobile = () => {
    const { mobile, countButtonBusy } = this.state;
    return /^1[34578]\d{9}$/.test(mobile) && !countButtonBusy;
  };
  loginButtonText = () => {
    const { loginButtonBusy } = this.state;
    return loginButtonBusy ? '登录中' : '登录';
  };
  validateMobile = e => {
    this.setState({ mobile: e.target.value });
  };
  countButtonText = () => {
    const { count } = this.state;

    return typeof count === 'number'
      ? count ? `已发送${count}s` : '重新获取'
      : '获取验证码';
  };
  fetchVerifyCode = () => {
    this.setState({ countButtonBusy: true });
    const { mobile, captcha } = this.state;
    mobileCode(mobile, captcha).then(res => {
      if (res.validate_token) {
        this.setState({
          validateToken: res.validate_token,
          countButtonBusy: false
        });
        this.countButton();
      }
      this.handleCaptchaError(res);
    });
  };
  fetchImageCaptcha = () => {
    const url = 'https://restapi.ele.me/v1/captchas/';
    getcaptchas().then(res => this.setState({ captchaImage: url + res.code }));
  };
  handleCaptchaError = (e, t) => {
    const { name } = e;
    if (name === 'CAPTCHA_NONE_ERROR' || name === 'NEED_CAPTCHA') {
      this.setState({ submitCaptcha: !!t, showCaptcha: true });
      this.fetchImageCaptcha();
    } else if (name === 'CAPTCHA_CODE_ERROR') {
      this.fetchImageCaptcha();
      this.setState({ captchaError: '验证码错误，请重新填写' });
    } else if (t) {
      this.setState({ showCaptcha: false, verifyCode: '' });
      this.handleError(e);
    }
  };
  pushMessageLogin = () => {
    if (this.loginError()) {
      return this.handleError(this.loginError());
    }
    this.setState({ loginButtonBusy: true });
    const { verifyCode, mobile, validateToken, captcha } = this.state;
    sendLogin(verifyCode, mobile, validateToken, captcha).then(res => {
      const s = Cookies.get('SID');
      console.info(s);
      Cookies.set('SID', res);
      store.setUser(res);
      store.setUserId(res.user_id);
      return this.go();
    });
    return null;
  };
  go = () => {
    const { location: { search } } = this.props;
    if (!search) {
      browserHistory.push('/');
    } else {
      window.history.back();
    }
  };
  handleError = e => {
    const { message } = e;
    this.setState({ message });
  };

  countButton = () => {
    this.setState({ count: 30 });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      let t = this.state.count;
      t--;
      if (t === 0) {
        clearInterval(this.timer);
      }
      this.setState({ count: t });
    }, 1e3);
  };
  checkCaptcha = e => {
    this.setState({ captcha: e.target.value });
  };
  enterVerify = e => {
    this.setState({ verifyCode: e.target.value.trim() });
  };
  cancel = () => {
    this.setState({ showCaptcha: false, captcha: '', countButtonBusy: false });
  };
  submit = () =>
    this.state.submitCaptcha ? this.pushMessageLogin : this.fetchVerifyCode;

  int = () => setTimeout(() => {
      this.setState({ message: '' });
    }, 3e3);

  renderError = e => {
    if (!e) {
      return null;
    }
    this.int();
    return <div>{e}</div>;
  };
  renderCaptcha = () => {
    if (!this.state.showCaptcha) {
      return null;
    }
    return [
      <section className="sign-captcha">
        <section className="sign-captcha-content">
          <h2>请输入图形验证码</h2>
          <div className="sign-captcha-input">
            <div>
              <input type="text" onChange={this.checkCaptcha} />
            </div>
            <img alt="" src={this.state.captchaImage} />
          </div>
          <p>{this.state.captchaError}</p>
          <section className="check">
            <button className="cancel" onClick={this.cancel}>
              取消
            </button>
            <button className="submit" onClick={this.submit()}>
              确定
            </button>
          </section>
        </section>
      </section>
    ];
  };

  render() {
    console.info(this.state.message);
    return (
      <div>
        <section className="sign-item">
          <input
            type="text"
            placeholder="手机号"
            name="mobile"
            onChange={this.validateMobile}
          />
          <button
            disabled={!this.enabedMobile()}
            className={this.enabedMobile() ? 'sign-enabled' : ''}
            onClick={this.fetchVerifyCode}
          >
            {this.countButtonText()}
          </button>
        </section>
        <section className="sign-item">
          <input type="text" placeholder="验证码" onChange={this.enterVerify} />
        </section>
        <section className="sign-item">
          温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意
        </section>
        <button className="sign-button" onClick={this.pushMessageLogin}>
          <span>{this.loginButtonText()}</span>
        </button>
        {this.renderCaptcha()}
        {this.renderError(this.state.message)}
      </div>
    );
  }
}
SignMessage.propTypes = {
  location: PropTypes.shape({}).isRequired
};
export default SignMessage;
