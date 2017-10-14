import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import '../styles/footer.scss'

export default class MsiteFooter extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object)
  };
  static defaultProps = {
    location: PropTypes.object,
  }
  render() {
    const { location } = this.props;
    const { pathname } = location;
    let o = pathname.replace(/\//g, '');
    const a =  ['index', 'discover', 'order', 'profile'].indexOf(o) === -1;
    if (a) {
      o = 'home'
    }
    const s = [
      {
        name: 'home',
        text: '外卖',
        link: '/home/',
        icon: 'fa fa-home'
      },
      {
        name: 'discover',
        text: '发现',
        link: '/discover/',
        icon: 'fa fa-bandcamp'
      },
      {
        name: 'order',
        text: '订单',
        link: '/order/',
        icon: 'fa fa-reorder'
      },
      {
        name: 'profile',
        text: '我的',
        link: '/profile/',
        icon: 'fa fa-user-o'
      }
    ];
    return (
      <div className="footer">
        {s.map((item, index) => {
          const color = item.name === o ? 'blue' : '';
          return (
            <section className="item" key={index}>
              <Link to={item.link} className={color}>
                <i className={item.icon} />
                <span>{item.text}</span>
              </Link>
            </section>
          );
        })}
      </div>
    );
  }
}
