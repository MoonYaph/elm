import React, { Component } from 'react'
import { connect } from 'react-redux'

import Sign from '../components/Sign';


class AuthedContainer extends Component {

  render() {
    return <Sign {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  home: state.home,
  authed: state.authed
})


export default connect(mapStateToProps)(AuthedContainer)
