import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class DiscoverItemHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };
  render() {
    const { title, link, children } = this.props;
    return (
      <Link to={link} className="discover-activity-list">
        <div className="discover-activity-header">
          <span className="discover-left" />
          <h3 className="discover-activity-title">{title}</h3>
          <span className="discover-right" />
        </div>
        <p className="discover-sub-title">{this.props.sub_title}</p>
        {children}
        <div className="discover-more">
          <span>加载更多</span>
        </div>
      </Link>
    );
  }
}
