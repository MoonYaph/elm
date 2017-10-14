import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  shopDetail,
  fetchShop,
  fetchMenu,
  fetchScore,
  fetchTags,
  fetchComments
} from '../../actions/ShopAction.js'
import ShopNav from './ShopNav'
import ShopMenu from './ShopMenu.js'
import './index.scss'
const propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object
}
class Shop extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      list: '',
      isHide: true,
      selected: 0
    }
  }

  componentDidMount () {
    const { dispatch, location } = this.props
    const { query } = location
    const { id, latitude, longitude } = query
    dispatch(shopDetail(id, latitude, longitude))
    dispatch(fetchShop())
    dispatch(fetchMenu())
    dispatch(fetchScore())
    dispatch(fetchTags())
    dispatch(fetchComments())
  }
  render () {
    return (
      <div style={{ overflow: 'auto', height: '100vh', overflowY: 'auto' }}>
        <ShopNav {...this.props} />
        <ShopMenu {...this.props} />
      </div>
    )
  }
}
Shop.propTypes = propTypes
export default Shop
