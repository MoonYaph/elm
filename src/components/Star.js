import React from 'react';
import PropTypes from 'prop-types'
import '../styles/star.scss'

const Star = ({rating}) => (

      <div className='rating_container'>
        <section className='star_container'>
          {[1, 2, 3, 4, 5].map(num => <i className="fa fa-star" key={num} />)}
        </section>
        <div
          className='star_overflow'
          style={{ width: `${rating * 12  }px` }}
        >
          <section className='star_container'>
            {[1, 2, 3, 4, 5].map(num => <i className="fa fa-star" key={num} />)}
          </section>
        </div>
      </div>
    )
Star.propTypes = {
  rating: PropTypes.number.isRequired,
};
export default Star;
