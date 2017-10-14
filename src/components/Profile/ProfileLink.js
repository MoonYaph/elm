import React, { Component } from 'react'

const info  = [
  {
    icon: 'fa fa-location-arrow',
    name: '我的地址',
    link: '/signin',
    href: 'fa fa-angle-right',
  },
  {
    icon: 'fa fa-shopping-bag',
    name: '积分商城',
    link: '/signin',
    href: 'fa fa-angle-right',
  },
  {
    icon: 'fa fa-phone',
    name: '我的客服',
    link: '/signin',
    href: 'fa fa-angle-right',
  }
]
class ProfileLink extends Component {
  renderInfo = () => info.map((item) => [
      <div className='profile-link' key={item.name}>
        <i className={item.icon} />
        <span>{item.name}</span>
        <i className={item.href} />
      </div>
    ])

  render() {
    return this.renderInfo()
  }
}

export default ProfileLink
