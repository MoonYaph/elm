import React, { Component } from 'react'
import { connect } from 'react-redux'

import Discover from '../components/Discover';


class DiscoverContainer extends Component {

  render() {
    return <Discover {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  discover: state.discover,
})


export default connect(mapStateToProps)(DiscoverContainer)
