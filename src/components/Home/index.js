import React, { Component } from 'react';
import PropTypes from 'prop-types'

import city from '../../actions/HomeAction'

export default class Home extends Component {

  componentDidMount() {
    this.props.dispatch(city('1'))
  }
  render() {
    return (
      <div>1</div>
    );
  }
}
Home.propTypes = {
  dispatch: PropTypes.func,
}
