import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from '../Nav';
import { constructSearchUrl } from '../../utils/url';
import { fetchSearchLocation } from '../../actions/HomeAction';

class Location extends Component {
  constructor(props) {
    super(props);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.state = {
      list: [],
      title: '选择地址'
    };
  }

  handleOnKeyPress = e => {
    if (e.charCode === 13) {
      const value = e.currentTarget.value.trim();
      if (value !== '') {
        const { home } = this.props;
        const { latitude, longitude } = home;
        fetch(constructSearchUrl(latitude, longitude, value))
          .then(res => res.json())
          .then(json => this.setState({ list: json }));
      }
    }
  };
  handleClick = (item) => {
    const { dispatch } = this.props;
    const { latitude, longitude, name, address } = item;
    dispatch(fetchSearchLocation(latitude, longitude, name, address));
    this.props.goBack()
  };
  renderData() {
    const { list } = this.state;
    if (!list) {
      return null;
    }

    return [
      list.map((item, index) => (
        <div
          key={`${item.name}`}
          onClick={() => this.handleClick(item)}
          onKeyPress={() => this.handleClick(item)}
          className="search-item"
          role="button"
          tabIndex={index}
        >
          <div className="search-name">{item.name}</div>
          <div className="search-address">{item.address}</div>
        </div>
      ))
    ]
  }
  render() {
    const { classname } = this.props
    return (
      <div
        className={`${classname} search-page`}
      >
        <Nav
          classname="search-nav"
          title={this.state.title}
          handleClick={this.props.goBack}
        />
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="请输入地址"
            onKeyPress={this.handleOnKeyPress}
          />
        </div>
        <div className="search-location">{this.renderData()}</div>
      </div>
    );
  }
}

Location.propTypes = {
  dispatch: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  classname: PropTypes.string.isRequired,
  home: PropTypes.shape({
    latitude: PropTypes.number
  }).isRequired
};

export default Location;
