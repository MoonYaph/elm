import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../components/Order';


class OrderContainer extends Component {

  render() {
    return <Order {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  order: state.order,
})


export default connect(mapStateToProps)(OrderContainer)
