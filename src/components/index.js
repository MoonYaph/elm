import React, { Component } from 'react'
import PropTypes from 'prop-types'



export default class App extends Component {
  static propTypes ={
    children: PropTypes.node.isRequired
  }
  render () {
    return this.props.children
  }
}
