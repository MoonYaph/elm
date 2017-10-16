import React, { Component } from 'react'
import PropTypes from 'prop-types'



class ProfileInfo extends Component {
  render() {
    const { authed: { user }} = this.props
    return [
      <div className="info-item" key='0'>
        <span>头像</span>
       <span className='info-file'>
         <input type='file' />
         <span className='avatar'>
           <i className='fa fa-user-circle' />
         </span>
         <i className='fa fa-angle-right' />
       </span>
      </div>,
      <div className="info-item" key='1'>
        <span>用户名</span>
       <span className='info-file'>
         <span>{user.username}</span>
         <i className='fa fa-angle-right' />
       </span>
      </div>
    ]
  }
}
ProfileInfo.propTypes = {
  authed: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
  }).isRequired,
}
export default ProfileInfo
