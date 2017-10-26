import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Nav from '../Nav';
import Info from './ProfileInfo'
import './index.scss'
import { fetchUserIsLogin, fetchUser, fetchExtra } from '../../actions/AuthedAction';

class ProfileInfo extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authed: PropTypes.shape({
      userId: PropTypes.number.isRequired,
    }).isRequired,
  }

   componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUserIsLogin())
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, authed: { login, userId } } = nextProps
    if (login && this.props.authed.userId !== userId) {
      dispatch(fetchUser(userId))
      dispatch(fetchExtra(userId))
    }
  }
  goBack = () => window.history.back()
  render() {
    return [
      <Nav title='用户信息' handleClick={this.goBack} classname='info' key='0' />,
      <Info {...this.props} key='1' />
    ]
  }
}

export default ProfileInfo;
