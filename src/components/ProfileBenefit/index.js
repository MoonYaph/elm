import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  fetchUserIsLogin,
  fetchPacket,
  fetchHongbao,
  fetchNewRefer,
  fetchCoupons
} from '../../actions/AuthedAction';
import ProfilePacket from './ProflePacket';
import Nav from '../Nav';
import './index.scss';

class ProfileBenefit extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authed: PropTypes.shape({
      userId: PropTypes.number.isRequired
    }).isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserIsLogin());
    dispatch(fetchPacket());
    dispatch(fetchHongbao());
    dispatch(fetchNewRefer());
    dispatch(fetchCoupons());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, authed: { login, userId } } = this.props;
    if (login === true && userId !== nextProps.authed.userId) {
      dispatch(fetchPacket());
      dispatch(fetchHongbao());
      dispatch(fetchNewRefer());
      dispatch(fetchCoupons());
    }
  }

  goBack = () => window.history.back();
  render() {
    return [
      <Nav
        title="我的优惠"
        handleClick={this.goBack}
        classname="benefit"
        key="0"
      />,
      <ProfilePacket key="1" {...this.props} />
    ];
  }
}

export default ProfileBenefit;
