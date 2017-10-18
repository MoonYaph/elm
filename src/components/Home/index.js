import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import './index.scss';
import Location from './Location';
import Carousel from './Carousel';
import Infite from '../Infite';
import List from './List';
import Footer from '../Footer';

import {
  fetchCity,
  fetchCurrentLocation,
  fetchRestaurant,
  fetchCarousel,
  fetchMoreRestaurant
} from '../../actions/HomeAction';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      show: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCity());
  }

  componentWillReceiveProps(nextProps) {
    const { home, dispatch } = this.props;
    if (home.latitude !== nextProps.home.latitude) {
      dispatch(fetchCurrentLocation());
      dispatch(fetchCarousel());
      dispatch(fetchRestaurant());
    }
  }

  goBack() {
    this.setState({ show: false });
  }
  handleClick = () => {
    this.setState({ show: !this.state.show, isClick: true });
  };
  scroll = () => {
    const {dispatch} = this.props
    dispatch(fetchMoreRestaurant())
  };
  render() {
    const { home } = this.props;
    const { show, isClick } = this.state;
    const isShow = show ? 'slideup' : 'slidedown';
    const classname = isClick ? isShow : '';
    const h = window.innerHeight
    return (
      <Infite classname="" scrollFunc={this.scroll} isFetching={home.isFetching} scrollHeight={h}>
        <Header title={home.name} handleClick={this.handleClick} />
        {show ? (
          <Location
            {...this.props}
            goBack={this.goBack}
            classname={classname}
          />
        ) : (
          <Location
            {...this.props}
            goBack={this.goBack}
            classname={classname}
          />
        )}
        <Carousel {...this.props} />
        <List {...this.props} />
        <Footer {...this.props} />
      </Infite>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,

  home: PropTypes.instanceOf(Object)
};
Home.defaultProps = {
  home: PropTypes.object.isRequired
};

export default Home;
