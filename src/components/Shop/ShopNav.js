import React, { Component } from 'react'
import PropTypes from 'prop-types'

import transform from '../../utils/img'
import Button from '../Button'


class ShopNav extends Component {
  constructor (props) {
    super(props)
    this.handleBack = this.handleBack.bind(this)
    this.state = {
      list: '',
      isHide: true,
    }
  }
  handleBack = () => {
    window.history.back()
  }
  renderActivities = (type) => type &&
      type.map((item, index) => {
        const hide = index > 0 && this.state.isHide ? ' hide' : ''
        const green = item.icon_name && item.icon_name === '首' ? 'green' : ''
        if (index === 0) {
          return (
            <div key={index} className={`shoplist-active${  hide}`}>
              {item.icon_name && <div className={`icons ${  green}`}>{item.icon_name}</div>}
              <div className='shoplist-description'>{item.description}</div>
            </div>
          )
        }
      })



  render () {
    const { shop } = this.props
    const { list } = shop
    const { name, piecewise_agent_fee, activities } = list
    if (name) {
      const style = {
        backgroundImage:
          `url(${`${transform(list.image_path)  }?imageMogr/format/webp/thumbnail/!40p/blur/50x40/`})`
      }
      return (
        <nav className='shop-wrap-nav'>
          <div className='shop-wrap-nav-bg' style={style} />
          <Button classname='shop-wrap-nav-back' handleClick={this.handleBack} text={<i className='fa fa-chevron-left' />} />
          <div className='shop-wrap-nav-content'>
            <img alt='' src={transform(list.image_path)} className='shop-wrap-nav-logo' />
            <div className='shop-wrap-nav-info'>
              <h2>{name}</h2>
              <div className='delivery'>
                <span>商家配送 / {list.order_lead_time}分钟送达 / { piecewise_agent_fee.description}</span>
              </div>
              <div className='notice'>
                <span>公告： {list.promotion_info}</span>
              </div>
            </div>
          </div>
          <div className='shop-wrap-nav-description'>
            {this.renderActivities(activities)}
            <div className='len'>{activities.length}个活动</div>
          </div>
        </nav>
      )
    }
    return null
  }
}
ShopNav.propTypes = {
  shop: PropTypes.object,
}
export default ShopNav
