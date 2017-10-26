import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types'

class ProfileGift extends Component {
  render() {
    const {authed: {login, userInfo}} = this.props
    return (
      <section className="profile-gift">
        <Link className="profile-gift-left" to='/profile/benefit'>
         {login ? <span>{userInfo.gift_amount}个</span> : <i className="fa fa-vcard" />}
          <span>优惠 </span>
        </Link>
        <div className="profile-gift-right">
         {login ? <span>{userInfo.point}个</span> : <i className="fa fa-database" />}
          <span> 积分 </span>
        </div>
      </section>
    );
  }


}

ProfileGift.propTypes = {
  authed: PropTypes.shape({
    login: PropTypes.bool,
  }).isRequired,
}

export default ProfileGift;
