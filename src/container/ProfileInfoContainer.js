import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProfileInfo from '../components/ProfileInfo';


class ProfileInfoContainer extends Component {

  render() {
    return <ProfileInfo {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  authed: state.authed
})


export default connect(mapStateToProps)(ProfileInfoContainer)
