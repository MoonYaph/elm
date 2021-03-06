import React, { Component } from 'react'
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import transform from '../../utils/img';

export default class Carousel extends Component {
  static propTypes = {

  }

  renderCarousel() {
    const { home } = this.props
    const { list, latitude, longitude } = home
    const arr = []
    arr[0] = list.filter((item, index) => index < 8)
    arr[1] = list.filter((item, index) => index >= 8)
    return arr.map((data, index) => (
        <div key={index} style={{background: '#fff', marginBottom: '.5rem'}}>
          {
            data.map((item) => {
              const { link, name } = item
              if (/eleme:\/\/restaurant/.test(link)) {
                return (
                  <Link key={name} className='swiper-link'
                    to={{pathname: '/food', query:{latitude, longitude, name}}} >
                    <div className='img-wrapper'>
                      <img alt ={name} src={transform(item.image_hash)} />
                    </div>
                    <span className='title'>{name}</span>
                  </Link>
                )
              }
            return false
            })

          }
        </div>
      ))
  }
  render() {
    const options = { auto: 3000 }
    const { home } = this.props
    const { list } =home
    const arr = []
    arr[0] = list.filter((item, index) => index < 8)
    arr[1] = list.filter((item, index) => index >= 8)
    return (
      <ReactSwipe swipeOptions={options}>
       {this.renderCarousel()}
       {this.renderCarousel()}
      </ReactSwipe>
    )
  }
}
Carousel.propTypes = {
  home: PropTypes.instanceOf(Object),
};
Carousel.defaultProps = {
  home: PropTypes.object.isRequired
};

