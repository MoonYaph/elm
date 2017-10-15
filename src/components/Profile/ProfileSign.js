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
            {isLogin ? <span className='profile-mobile'>{user.mobile}</span> : <span className='profile-mobile'>登陆后享受更多特权</span>}
          </div>

        </div>
        <i className='fa fa-angle-right' />
      </Link>
    )
  }
}
ProfileSign.propTypes = {
  authed: PropTypes.instanceOf(Object),
  location: PropTypes.instanceOf(Object),
}
ProfileSign.defaultProps = {
  authed: PropTypes.object,
  location: PropTypes.object,
}
export default ProfileSign
