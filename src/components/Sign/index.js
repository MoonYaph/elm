import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { browserHistory } from 'react-router';
import Nav from '../Nav';
import SignMessage from './SignMessage';
import './indes.scss';

class Sign extends Component {
  goBack = () => {
    const { location: { query: redirect } } = this.props;
    console.info(this.props.location)
    if (redirect.redirect) {
      browserHistory.push(redirect.redirect)
    } else {
      browserHistory.push('/')
    }

  };
  render() {
    return [
      <Nav title="登录" classname="signin" handleClick={this.goBack} key="0" />,
      <SignMessage {...this.props} key="1" />
    ];
  }
}
Sign.propTypes = {
  location: PropTypes.instanceOf(Object),
}
Sign.defaultProps = {
  location: PropTypes.object,
}
export default Sign;
