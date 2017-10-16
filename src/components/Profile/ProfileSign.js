import React, { Component } from 'react'
import { Link } from 'react-router';
import PropTypes from 'prop-types'


class ProfileSign extends Component {
  render() {
    const { authed: {isLogin, user}, location:{ pathname} } = this.props
    const l = pathname ? `/signin?redirect=${encodeURIComponent(pathname)}` : '/'
    return (
      <Link to={isLogin ? '/profile/info' : l} className='profile-content'>
        <span><i className='fa fa-user-circle' /></span>
        <div className='profile-sign'>
          {isLogin ? <h2>{user.username}</h2>  : <h2>登录/注册</h2>}
          <div>
            <i className='fa fa-mobile' />
            {isLogin ? <span className='profile-mobile'>{user.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span> : <span className='profile-mobile'>登陆后享受更多特权</span>}
          </div>

        </div>
        <i className='fa fa-angle-right' />
      </Link>
    )
  }
}
ProfileSign.propTypes = {
  authed: PropTypes.shape({

      isLogin: PropTypes.bool.isRequired,

  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProfileSign
