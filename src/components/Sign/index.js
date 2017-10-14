import React, { Component } from 'react'
import Nav from '../Nav'
import SignMessage from './SignMessage'
import './indes.scss'

 class Sign extends Component {
  goBack = () => {

  }
  render() {
    return [
      <Nav title='登录' classname='signin' handleClick={this.goBack} key='0' />,
      <SignMessage {...this.props} key='1' />
    ]
  }
}

export default Sign
