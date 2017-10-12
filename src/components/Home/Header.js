import React, { Component } from 'react'
import { Link } from 'react-router';
import PropTypes from 'prop-types'


class Header extends Component {


  render() {
    return [
      <div key="0" className='header'>
        <button onClick={this.props.handleClick} >
          <i className="fa fa-location-arrow" />
          <strong>{this.props.title}</strong>
          <i className="fa fa-caret-down" />
        </button>
      </div>,
     <div key='1' className='search'>
        <Link href='/search' key='1' >
          <i className="fa fa-search" />
          <span>搜索商家、商品名称</span>
      </Link>
     </div>
    ];
  }
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}
export default Header
