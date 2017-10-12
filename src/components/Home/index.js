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
      title: '地址',
      id: '',
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
    this.setState({ show: !this.state.show });
  };
  render() {
    const { home } = this.props
    const { title, show } = this.state;
    const classname = show ? 'slideup' : ''
    return [
      <Header key="0" title={home.name} handleClick={this.handleClick} />,
      (show ? <Location key="1" {...this.props} goBack={this.goBack} classname={classname} />
      : <Location key="1" {...this.props} goBack={this.goBack} classname='slidedown' />),
    ];
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  home: PropTypes.shape({
    cityId: PropTypes.number
  })
};
Home.defaultProps = {
  home: PropTypes.object.isRequired
};
