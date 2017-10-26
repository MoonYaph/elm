import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProfileBenefit from '../components/ProfileBenefit';


class ProfileBenefitContainer extends Component {

  render() {
    return <ProfileBenefit {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  authed: state.authed
})


export default connect(mapStateToProps)(ProfileBenefitContainer)
