import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  classname: PropTypes.string.isRequired,
  scrollFunc: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  scrollHeight: PropTypes.number.isRequired
};

class Infite extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const el = this.scroll;
    const { isFetching, scrollHeight, scrollFunc } = this.props;
    const s = el.getBoundingClientRect().top
    const top = document.body.scrollTop || document.documentElement.scrollTop;
    console.info(el.clientHeight, top, scrollHeight, s)
    if (el.clientHeight - top <= scrollHeight && isFetching !== true) {
      scrollFunc();
    }
  }

  render() {
    return (
      <div
        className={this.props.classname}
        ref={t => {
          this.scroll = t;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Infite.propTypes = propTypes;

export default Infite;
