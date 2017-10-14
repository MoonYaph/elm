import React, { Component } from 'react';
import PropTypes from 'prop-types';

import activities from '../../utils/discover';
import DiscoverItemHeader from './Header';
import DiscoverItemInfo from './Item';

export default class DiscoverList extends Component {
  static propTypes = {
    discover: PropTypes.instanceOf(Object)
  };
  static defaultProps = {
    discover: PropTypes.instanceOf(Object)
  };
  renderList = (i, j) => {
    const data = activities.activities;
    const list = Object.keys(data)
      .sort((a, b) => data[a].index - data[b].index)
      .map((item, index) => {
        if (index === i) {
          const { title, link } = data[item];
          return (
            <DiscoverItemHeader
              title={title}
              sub_title={data[item].sub_title}
              link={link}
              key={index}
            >
              <div className="discover-container">{this.renderPic(j)}</div>
            </DiscoverItemHeader>
          );
        }
      });
    return list;
  };
  renderPic = hot =>
    hot.filter((item, index) => index < 3).map((item, index) => {
      const { foods } = item;
      if (!foods) {
        return <DiscoverItemInfo {...this.props} data={item} key={index} />;
      }
      return <DiscoverItemInfo {...this.props} data={foods[0]} key={index} />;
    });
  render() {
    const { hot, like, gift } = this.props.discover;
    return (
      <div className="discover-bg">
        {this.renderList(0, hot)}
        {this.renderList(1, like)}
        {this.renderList(2, gift)}
      </div>
    );
  }
}
