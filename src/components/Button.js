import React from 'react';
import PropTypes from 'prop-types'

const Button = ({ handleClick, classname, text='' }) => (
  <div
    tabIndex="0"
    role="button"

    className={classname}
    onClick={handleClick}
    onKeyPress={handleClick}
  >
    {text}
  </div>
);
Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classname: PropTypes.string,

  text: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),

}
Button.defaultProps = {
  text: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  classname: PropTypes.string,
}
export default Button;
