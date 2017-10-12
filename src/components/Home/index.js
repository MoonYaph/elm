import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import './index.scss';
import Location from './Location';
import { fetchCity, fetchCurrentLocation } from '../../actions/HomeAction';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      show: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCity());
  }

  componentWillReceiveProps(nextProps) {
    const { home, dispatch } = this.props;
    if (home.latitude !== nextProps.home.latitude) {
      dispatch(fetchCurrentLocation());
    }
  }
  goBack() {
    this.setState({ show: false});
  }
  handleClick = () => {
    this.setState({ show: !this.state.show, isClick: true});
  };
  render() {
    const { home } = this.props
    const {show, isClick } = this.state;
    const isShow =show ? 'slideup' : 'slidedown'
    const classname = isClick ? isShow : ''
    return [
      <Header key="0" title={home.name} handleClick={this.handleClick} />,
      show ? <Location key="1" {...this.props} goBack={this.goBack} classname={classname} /> :
      <Location key="1" {...this.props} goBack={this.goBack} classname={classname} />
    ];
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,

  home: PropTypes.instanceOf(Object),
};
Home.defaultProps = {
  home: PropTypes.object.isRequired
};
