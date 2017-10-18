import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Nav from '../Nav';
import Info from './ProfileInfo'
import './index.scss'
import store from '../../utils/store';
import { fetchUserInfo } from '../../actions/AuthedAction';

class ProfileInfo extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  async componentWillMount() {
    try {
      const user = await store.get('user')
      const userId = await user.user_id
      this.props.dispatch(fetchUserInfo(userId))
    } catch (e) {
      throw new Error('user is not login')
    }
  }
  componentDidMount() {
    const { location } = this.props
    console.log(location)
  }
  render() {
    return [
      <Nav title='用户信息' handleClick={this.goBack} classname='info' key='0' />,
      <Info {...this.props} key='1' />
    ]
  }
}

export default ProfileInfo;
