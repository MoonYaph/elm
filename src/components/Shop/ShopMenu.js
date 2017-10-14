import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transform from '../../utils/img';
import { addCart, removeCart, emptyCart } from '../../actions/CartAction';
import Button from '../Button';
import Star from '../../components/Star';

const url =
  'https://fuss10.elemecdn.com/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/';

export default class ShopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: ['商品', '评价'],
      tab: 0,
      i: 0,
      s: 0,
      isHide: true
    };
    this.clickShow = this.clickShow.bind(this);
    this.empty = this.empty.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount() {
    this.scroll.addEventListener('scroll', this.onScroll, false);
  }
  componentWillUnmount() {
    this.scroll.removeEventListener('scroll', this.onScroll, false);
  }
  onScroll() {
    const index = this.getCurrentIndex();
    this.setState({ i: index });
  }
  getCurrentIndex = () => {
    const el = this.scroll;
    const top = el.scrollTop;
    const height = this.getMenuHeight();
    for (let i = 0; i < height.length; i++) {
      const h1 = height[i];
      const h2 = height[i + 1];
      if (h1 <= top && h2 > top) {
        return i;
      }
    }
    return 0;
  };
  getMenuHeight() {
    const el = [...this.scroll.querySelectorAll('.main-item')];
    let height = 0;
    const arr = [0];
    for (let i = 0, len = el.length; i < len; i++) {
      height += el[i].clientHeight;
      arr.push(height);
    }
    return arr;
  }

  getTotal = restaurant =>
    restaurant &&
    Object.keys(restaurant)
      .map(item => {
        const { num, price } = restaurant[item];
        return num * price;
      })
      .reduce((a, b) => a + b, 0);

  getTotalNum = restaurant =>
    restaurant &&
    Object.keys(restaurant)
      .map(item => restaurant[item].num)
      .reduce((a, b) => a + b, 0);

  filterNum = (category, restaurant) =>
    restaurant &&
    Object.keys(restaurant)
      .filter(item => restaurant[item].category_id === category)
      .map(item => restaurant[item].num)
      .reduce((a, b) => a + b, 0);

  handleSelected = index => {
    const el = this.scroll;
    const height = this.getMenuHeight();
    el.scrollTop = height[index];
  };
  handleClick = index => {
    this.setState({ tab: index });
  };
  clickShow() {
    this.setState({ isHide: !this.state.isHide });
  }
  empty = () => {
    this.props.dispatch(emptyCart());
  };

  add = item => {
    this.props.dispatch(addCart(item));
    this.setState({});
  };

  remove = item => {
    this.props.dispatch(removeCart(item));
    this.setState({});
  };
  renderMain = (menu, restaurant) =>
    menu.map((a, index) => {
      const { foods } = a;
      return (
        <section key={index} className="main-item">
          <h2 className="title">
            {a.name}
            <span>{a.description}</span>
          </h2>
          {foods.map((item, i) => {
            const { name, description, specfoods, item_id } = item;
            return (
              <div key={i} className="main-content">
                <img alt="" src={transform(item.image_path)} />
                <div className="main-content-detail">
                  <div className="main-title">{name}</div>
                  {description && <div className="detail">{description}</div>}
                  <div className="month">
                    月销{item.month_sales}份 好评率{item.satisfy_rate}%
                  </div>
                  <strong className="strong">￥{specfoods[0].price}</strong>
                  <div className="detail-price">
                    {restaurant &&
                      restaurant[item_id] && (
                        <Button
                          handleClick={() => this.remove(item)}
                          classname="detail-button"
                          text={<i className="fa fa-minus-circle" />}
                        />
                      )}
                    {restaurant &&
                      restaurant[item_id] && (
                        <span className="detail-button">
                          {restaurant[item_id].num}{' '}
                        </span>
                      )}
                    <Button
                      handleClick={() => this.add(item)}
                      classname="detail-button"
                      text={<i className="fa fa-plus-circle" />}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      );
    });
  renderCart = restaurant =>
    restaurant &&
    Object.keys(restaurant).map((item, index) => {
      const { name, price, num, item_id, list } = restaurant[item];
      return (
        <div className="list-item" key={index}>
          <span className="list-item-name">{name}</span>
          <span className="list-item-price">￥{price * num}</span>
          <div className="detail-price list-item-button">
            {restaurant &&
              restaurant[item_id] && (
                <Button
                  handleClick={() => this.remove(list)}
                  classname="detail-button"
                  text={<i className="fa fa-minus-circle" />}
                />
              )}
            {restaurant &&
              restaurant[item_id] && (
                <span className="detail-button">{restaurant[item_id].num}</span>
              )}
            <Button
              handleClick={() => this.add(list)}
              classname="detail-button"
              text={<i className="fa fa-plus-circle" />}
            />
          </div>
        </div>
      );
    });

  renderStar = score =>
    score && (
      <div className="shop-score">
        <div className="shop-score-overall">
          <strong>{score.overall_score.toFixed(1)}</strong>
          <p>综合评价</p>
          <p>高于周边商家{(score.compare_rating * 100).toFixed(1)}%</p>
        </div>
        <div className="shop-score-right">
          <div className="shop-score-line">
            <span>服务态度</span>
            <Star rating={score.service_score.toFixed(1)} />
            <span className="shop-score-num">
              {score.service_score.toFixed(1)}
            </span>
          </div>
          <div className="shop-score-line">
            <span>菜品评价</span>
            <Star rating={score.food_score.toFixed(1)} />
            <span className="shop-score-num">
              {score.food_score.toFixed(1)}
            </span>
          </div>
          <div className="shop-score-line">
            <span>送达时间</span>
            <span>{score.deliver_time}分钟</span>
          </div>
        </div>
      </div>
    );

  renderTags = tags =>
    tags && (
      <div className="shop-tag">
        {tags.map((item, index) => {
          const { count, name, unsatisfied } = item;
          const u = unsatisfied ? 'unsatisfied' : '';
          const s = this.state.s === index && !unsatisfied ? 'satisfied' : '';
          return (
            <div className={`${u} ${s} item`} key={index}>
              {name}
              ({count})
            </div>
          );
        })}
      </div>
    );
  renderComment = comments =>
    comments.map((item, index) => (
      <div className="shop-comment" key={index}>
        <div className="avatar">
          <img alt="" src={url} />
        </div>
        <div className="description">
          <div className="user">
            <span>{item.username}</span>
            <span>{item.rated_at}</span>
          </div>
          <div className="rating">
            <Star rating={item.rating_star} />
            <span>{item.time_spent_desc}</span>
          </div>
          {item.item_ratings && (
            <div className="ratings">
              {item.item_ratings.map((data, i) => (
                <div className="food-name" key={i}>
                  {data.food_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ));

  render() {
    const { menuItem, tab, i, isHide } = this.state;
    const { shop, cart } = this.props;
    const { menu, id, list, score, tags, comments } = shop;
    const restaurant = cart[id];
    return (
      <div className="tab-wrap">
        <aside className="tab">
          {menuItem.map((item, index) => {
            const selectedTab = tab === index ? 'selected' : '';
            return (
              <Button
                key={index}
                text={<span className={selectedTab}>{item}</span>}
                classname="tab-item"
                handleClick={() => this.handleClick(index)}
              />
            );
          })}
        </aside>
        <section
          className="shop-detail"
          style={{ display: tab === 0 ? 'flex' : 'none' }}
        >
          <aside className="menu">
            {menu.map((item, index) => {
              const { name, id } = item;
              const blue = i === index ? 'menu-blue' : '';
              const t = item.icon_url ? (
                <img alt="" src={transform(item.icon_url)} />
              ) : (
                ''
              );
              return (
                <div
                  key={index}
                  tabIndex="0"
                  role="button"
                  onKeyPress={() => this.handleSelected(index)}
                  className={`menu-item ${blue}`}
                  onClick={() => this.handleSelected(index)}
                >
                  {t}
                  {name}{' '}
                  {this.filterNum(id, restaurant) > 0 && (
                    <span className="filter-num">
                      {this.filterNum(id, restaurant)}
                    </span>
                  )}
                </div>
              );
            })}
          </aside>
          <main
            className="main"
            ref={t => {
              this.scroll = t;
            }}
          >
            {this.renderMain(menu, restaurant)}
          </main>
          <footer className="cart-footer">
            {this.getTotal(restaurant) > 0 &&
              !isHide && (
                <div className="cart-detail">
                  <div className="cart-title">
                    <span className="cart-title-name">购物车</span>
                    <button className="cart-title-clear" onClick={this.empty}>
                      清空
                    </button>
                  </div>
                  <div className="cart-body">{this.renderCart(restaurant)}</div>
                </div>
              )}
            <div className="cart-footer-info">
              <button className="cart-logo" onClick={this.clickShow}>
                <i className="fa fa-shopping-cart" />
                {this.getTotalNum(restaurant) >0  && (
                  <span className="cart-count">
                    {this.getTotalNum(restaurant)}
                  </span>
                )}
              </button>
              <div className="cart-price">
                <div className="cart-price-discount">
                  ￥{this.getTotal(restaurant)}
                </div>
                <div className="cart-price-delivery">
                  配送费￥{list.float_delivery_fee}
                </div>
              </div>
              <button className="cart-pay">去结算</button>
            </div>
          </footer>
        </section>
        <section
          className="shop-score-comment"
          style={{ display: tab === 1 ? 'block' : 'none' }}
        >
          {this.renderStar(score)}
          <div className="shop-comments">
            {this.renderTags(tags)}
            {this.renderComment(comments)}
          </div>
        </section>
      </div>
    );
  }
}
ShopMenu.propTypes = {
  shop: PropTypes.instanceOf(Object),
  cart: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired
};
ShopMenu.defaultProps = {
  shop: PropTypes.instanceOf(Object),
  cart: PropTypes.instanceOf(Object)
};
