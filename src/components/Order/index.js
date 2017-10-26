import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Nav from '../Nav';
import Footer from '../Footer';
import './index.scss';
import OrderList from './Order';

import { fetchUserIsLogin, fetchOrder } from '../../actions/AuthedAction';

export default class Order extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authed: PropTypes.shape({
      userId: PropTypes.number,
      login: PropTypes.bool,
    }).isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserIsLogin());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, authed: { login, userId } } = this.props;
    if (login !== nextProps.authed.login && userId !== nextProps.authed.userId) {
      dispatch(fetchOrder());
    }
  }

  handleClick = () => window.history.back();
  render() {
    return [
      <Nav
        key="0"
        title="订单"
        classname="order-header"
        handleClick={this.handleClick}
      />,
      <OrderList {...this.props} key="1" />,
      <Footer key="3" {...this.props} />
    ];
  }
}
