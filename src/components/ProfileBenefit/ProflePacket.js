import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Button from '../Button';

export default class ProfilePacket extends Component {
  static propTypes = {
    authed: PropTypes.shape({
      count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      hongbao: PropTypes.array
    }).isRequired
  };
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  handleClick = index => {
    this.setState({ index });
  };
  renderHongbao = hongbao => {
    if (this.state.index === 0) {
      if (hongbao.length === 0) {
        return (
          <div className="benefit-info">
            <span>没有红包 快去抢几个吧</span>
          </div>
        );
      }
      return hongbao.map(item => <div>{item}</div>);
    }
    return null;
  };
  renderCoupons = coupons => {
    if (this.state.index === 1) {
      return coupons.map((item, index) => (
        <div className="benefit-coupons-item" key={index}>
          <div className="benefit-coupons-amount">{item.reduce_amount}</div>
          <div className="benefit-coupons-content">
            <h2>{item.restaurant_name}</h2>
            {item.details.map(data => <p key={data}>{data}</p>)}
          </div>
          <Link
            className="benefit-coupons-link"
            to={{ pathname: '/shop', query: { id: item.restaurant_id } }}
          >
            <span>进店使用</span>
          </Link>
        </div>
      ));
    }
    return null;
  };
  render() {
    const { authed: { coupons, hongbao } } = this.props;
    const { index } = this.state;
    const data = [
      { text: `红包${hongbao.length}个` },
      { text: `商家代金卷${coupons.length}张` }
    ];
    return [
      <div className="benefit-switch" key="0">
        {data.map((item, i) => {
          const current = i === index ? 'selected' : '';
          return (
            <Button
              key={i}
              handleClick={() => this.handleClick(i)}
              classname=""
              text={<span className={current}>{item.text}</span>}
            />
          );
        })}
      </div>,
      <div key="1" className="benefit-hongbao">
        {this.renderHongbao(hongbao)}
      </div>,
      <div key="2" className="benefit-coupons">
        {coupons && this.renderCoupons(coupons)}
      </div>
    ];
  }
}
