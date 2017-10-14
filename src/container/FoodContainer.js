import React, { Component } from 'react'
import { connect } from 'react-redux'

import Food from '../components/Food';


class FoodContainer extends Component {

  render() {
    return <Food {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  food: state.food,
})


export default connect(mapStateToProps)(FoodContainer)
