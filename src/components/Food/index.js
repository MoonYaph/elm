import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router';

import { requestFood, receiveFood, loadMoreData, receiveMore } from '../../actions/FoodAction';
import Nav from '../Nav';
import Category from './Category'
import Infite from '../Infite'
import List from './List'
import './index.scss'

export default class Food extends Component {

  componentDidMount() {
    const { dispatch, location: { query: {latitude, longitude, target}} } = this.props
    const obj = unescape(target).split('&target_name')[0]
    const id = JSON.parse(obj).restaurant_category_id
    dispatch(requestFood(id, latitude, longitude))
    dispatch(receiveFood())
  }
  handleScroll = () => {
    const { dispatch } = this.props;
    dispatch(loadMoreData());
    dispatch(receiveMore());
  }
  goBack = () => {
    browserHistory.push('/')
  }
  render() {
    const { location: { query: { name}}, food: {isFetching} } = this.props
    return [
      <Infite scrollFunc={this.handleScroll} scrollHeight={800} classname='i' isFetching={isFetching}>
        <Nav key='0' title={name} handleClick={this.goBack} classname='food-header' />,
        <Category key='1' {...this.props} />,
        <List key='2' {...this.props} />
      </Infite>
    ]
  }
}
Food.propTypes = {
  location: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired,
  food: PropTypes.instanceOf(Object),
}
Food.defaultProps = {
  location: PropTypes.instanceOf(Object),
  food: PropTypes.instanceOf(Object),
}
