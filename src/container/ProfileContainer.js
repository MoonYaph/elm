import React, { Component } from 'react'
import { connect } from 'react-redux'

import Profile from '../components/Profile';


class ProfileContainer extends Component {

  render() {
    return <Profile {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  authed: state.authed
})


export default connect(mapStateToProps)(ProfileContainer)
