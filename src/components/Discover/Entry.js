import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import transfrom from '../../utils/img';

class Entry extends Component {
  renderEntry = data =>
    data &&
    data.map((item, index) => (
      <Link key={index} className="discover-item" to={item.content_url}>
        <div className="discover-wrapper">
          <div
            className="discover-title"
            style={{ color: `${item.title_color}` }}
          >
            {item.title}
          </div>
          <div className="discover-sub">{item.subtitle}</div>
        </div>
        <img
          alt=""
          src={transfrom(item.main_pic_hash)}
          className="discover-img"
        />
      </Link>
    ));

  renderPic = data =>
    data &&
    data.map((item, index) => (
      <Link key={index} to={item.content_url} className="discover-sub-img">
        <img alt="" src={transfrom(item.sub_pic_hash)} />
      </Link>
    ));

  render() {
    const { discover } = this.props;
    const { list } = discover;
    return [
      <div className="discover" key="0">
        {this.renderEntry(list[0])}
      </div>,
      <div key="1">{this.renderPic(list[1])}</div>
    ];
  }
}

Entry.propTypes = {
  discover: PropTypes.instanceOf(Object)
};
Entry.defaultProps = {
  discover: PropTypes.instanceOf(Object)
};
export default Entry;
