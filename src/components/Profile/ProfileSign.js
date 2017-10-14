import React, { Component } from 'react'
import { Link } from 'react-router';
import PropTypes from 'prop-types'


class ProfileSign extends Component {
  render() {
    const { authed } = this.props
    const { isLogin } = authed
    return (
      <Link to={isLogin ? '/profile/info' : '/signin'} className='profile-content'>
        <span><i className='fa fa-user-circle' /></span>
        <div className='profile-sign'>
          {isLogin ? <h2>{isLogin}</h2>  : <h2>登录/注册</h2>}
          <div>
            <i className='fa fa-mobile' />
            {isLogin ? <span className='profile-mobile'>{isLogin}</span> : <span className='profile-mobile'>登陆后享受更多特权</span>}
          </div>

        </div>
        <i className='fa fa-angle-right' />
      </Link>
    )
  }
}
ProfileSign.propTypes = {
  authed: PropTypes.instanceOf(Object),
}
ProfileSign.defaultProps = {
  authed: PropTypes.object,
}
export default ProfileSign
