import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Nav from '../Nav';
import ProfileSign from './ProfileSign';
import ProfileGift from './ProfileGift';
import ProfileLink from './ProfileLink';
import Footer from '../Footer';
import './index.scss';
import { fetchUserIsLogin, fetchUser } from '../../actions/AuthedAction';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    Cookies.set('SID', '1zJbXzHpJ9lLz0xUYr2sCoiTyorpIRXmbm0g', {
      expires: 7
    });
    dispatch(fetchUserIsLogin());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, authed: { userId } } = this.props;
    if (userId !== nextProps.authed.userId) {
      dispatch(fetchUser(nextProps.authed.userId));
    }
  }

  goBack = () => {
    window.history.back();
  };

  render() {
    return [
      <Nav
        key="0"
        title="我的"
        classname="profile-header"
        handleClick={this.goBack}
      />,
      <ProfileSign key="1" {...this.props} />,
      <ProfileGift key="2" {...this.props} />,
      <ProfileLink key="3" {...this.props} />,
      <Footer key="4" {...this.props} />
    ];
  }
}
Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authed: PropTypes.shape({
    userId: PropTypes.number
  }).isRequired
};
export default Profile;
