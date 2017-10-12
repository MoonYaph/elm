import React from 'react';

const Nav = ({classname,handleClick, title}) => [
  <div key='0' className={classname}>
    <button onKeyUp={handleClick} onClick={handleClick}>
      <i className="fa fa-chevron-left" />
    </button>
    <h2>{title}</h2>
  </div>
];

export default Nav;
