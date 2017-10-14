import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Entry from './Entry';
import List from './List';
import Footer from '../Footer'
import { fetchCity } from '../../actions/DiscoverAction';
import Nav from '../Nav';
import './index.scss';

export default class Discover extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCity());
  }

  handleClick = () => {};
  render() {
    return [
      <Nav
        title="发现"
        classname="discover-header"
        handleClick={this.goBack}
        key="0"
      />,
      <Entry {...this.props} key="1" />,
      <List {...this.props} key="2" />,
      <Footer {...this.props} key="3" />
    ];
  }
}
Discover.propTypes = {
  dispatch: PropTypes.func.isRequired,
  discover: PropTypes.instanceOf(Object)
};

Discover.defaultProps = {
  discover: PropTypes.instanceOf(Object)
};
