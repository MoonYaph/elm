import React, { Component } from 'react'
import { connect } from 'react-redux'
import Shop from '../components/Shop'

class ShopContainer extends Component {
  render () {
    return (
      <div>
        <Shop {...this.props} />
      </div>
    )
  }
}
function mapStateToProps (state) {
  const { shop, msite, cart } = state
  return {
    shop,
    msite,
    cart
  }
}

export default connect(mapStateToProps)(ShopContainer)
