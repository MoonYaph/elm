import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  receiveCategory,
  changeId,
  receiveFood,
  changeSort,
  fetchFoodActivity,
  fetchFoodDelivery,
  fetchFoodActivityType,
  fetchFoodCost,
  sortFood
} from '../../actions/FoodAction';
import transform from '../../utils/img';
import Button from '../Button';

export default class Category extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleConfrim = this.handleConfrim.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      level: '',
      isHide: true,
      index: '',
      category: '分类',
      sort: '排序',
      filter: '筛选',
      categoryType: '',
      deliveryMode: '', // 配送方式
      sortPrice: '', // 人均消费
      sortDicount: '', // 优惠活动
      sortActivities: [] // 商家属性
    };
  }
  handleClear() {
    this.setState({
      deliveryMode: '', // 配送方式
      sortPrice: '', // 人均消费
      sortDicount: '', // 优惠活动
      sortActivities: [] // 商家属性
    });
  }
  handleConfrim() {
    const { dispatch } = this.props;
    const { sortActivities, deliveryMode, sortDicount, sortPrice } = this.state;
    dispatch(sortFood(deliveryMode, sortPrice, sortDicount, sortActivities));
    dispatch(receiveFood());
    this.setState({
      categoryType: ''
    });
  }
  handleClick = e => {
    const { dispatch } = this.props;
    if (this.state.categoryType === e) {
      this.setState({ categoryType: '' });
    } else {
      if (e === 'category') {
        dispatch(receiveCategory());
      } else if (e === 'filter') {
        dispatch(fetchFoodActivity());
        dispatch(fetchFoodDelivery());
        dispatch(fetchFoodActivityType());
        dispatch(fetchFoodCost());
      }
      this.setState({
        categoryType: e
      });
    }
  };

  handleId(item) {
    const { id, name } = item;
    const { dispatch } = this.props;
    dispatch(changeId(id));
    dispatch(receiveFood());
    this.setState({
      category: name,
      categoryType: ''
    });
  }
  handleCategory(item, index) {
    const { level } = item;
    this.setState({
      index,
      level
    });
  }
  handleDelivery(id) {
    if (this.state.deliveryMode === id) {
      this.setState({
        deliveryMode: ''
      });
    } else {
      this.setState({
        deliveryMode: id
      });
    }
  }
  handleCost(id, index) {
    if (this.state.sortPrice === id) {
      this.setState({ sortPrice: '', index: '' });
    } else {
      this.setState({ sortPrice: id, index });
    }
  }
  handleDiscount(type) {
    if (this.state.sortDicount === type) {
      this.setState({ sortDicount: '' });
    } else {
      this.setState({ sortDicount: type });
    }
  }
  handleActivities(id) {
    const { sortActivities } = this.state;
    if (sortActivities.some(item => id === item)) {
      this.setState({
        sortActivities: this.state.sortActivities.filter(item => item !== id)
      });
    } else {
      this.setState({ sortActivities: this.state.sortActivities.concat(id) });
    }
  }
  handleSort(index) {
    const { dispatch } = this.props;
    dispatch(changeSort(index));
    dispatch(receiveFood());
    this.setState({
      categoryType: ''
    });
  }
  render() {
    const {
      categoryList,
      cost,
      activitiesType,
      delivery,
      activities
    } = this.props.food;
    const {
      category,
      sort,
      filter,
      deliveryMode,
      sortActivities,
      sortDicount,
      categoryType
    } = this.state;
    return (
      <div className="food-category">
        <div className="food-category-header">
          <Button
            classname=""
            handleClick={() => this.handleClick('category')}
            text={category}
          />
          <Button
            classname=""
            handleClick={() => this.handleClick('sort')}
            text={sort}
          />
          <Button
            classname=""
            handleClick={() => this.handleClick('filter')}
            text={filter}
          />
        </div>
        {categoryType === 'category' && (
          <div className="food-category-list">
            <div className="food-category-left">
              {categoryList.map((item, index) => {
                const { name, count } = item;
                const color = index === this.state.index ? 'white' : '';
                return (
                  <Button
                    key={index}
                    classname={`item-left ${color}`}
                    handleClick={() => this.handleCategory(item, index)}
                    text={[
                      <span key="0">{name}</span>,
                      <span key="1">{count}</span>
                    ]}
                  />
                );
              })}
            </div>
            <div className="food-category-right">
              {categoryList.map((item, index) => {
                const { sub_categories } = item;
                if (item.sub_categories && index === this.state.index) {
                  return sub_categories.map((data, i) => {
                    const { name, count } = data;
                    return (
                      <Button
                        key={i}
                        classname="item-right"
                        handleClick={() => this.handleId(data, i)}
                        text={[
                          <span key="0" className="item-img">
                            <img alt="" src={transform(data.image_url)} />
                            <span>{name}</span>
                          </span>,
                          <span key="1">{count}</span>
                        ]}
                      />
                    );
                  });
                }
              })}
            </div>
          </div>
        )}
        {categoryType === 'sort' && (
          <div className="food-category-list food-sort">
            <Button
              classname="food-category-sort"
              text="综合排序"
              handleClick={() => this.handleSort(0)}
            />
            <Button
              classname="food-category-sort"
              text="销量最高"
              handleClick={() => this.handleSort(6)}
            />
            <Button
              classname="food-category-sort"
              text="起送价最低"
              handleClick={() => this.handleSort(1)}
            />
            <Button
              classname="food-category-sort"
              text="配送最快"
              handleClick={() => this.handleSort(2)}
            />
          </div>
        )}
        {categoryType === 'filter' && (
          <div className="food-category-list food-filter">
            <div className="food-category-filter">
              <span>配送方式</span>
              {delivery.map((item, index) => {
                const { text, color, id } = item;
                const style = { color: `#${color}` };
                const selected = deliveryMode ? 'selected' : '';
                return (
                  <div style={style} key={index}>
                    <Button
                      key={index}
                      classname={`filter-border ${selected}`}
                      handleClick={() => this.handleDelivery(id)}
                      text={text}
                    />
                  </div>
                );
              })}
            </div>
            <div className="food-category-filter">
              <span>人均消费</span>
              <div className="filter-wrap">
                {cost.map((item, index) => {
                  const { description, id } = item;
                  const selected = index === this.state.index ? 'selected' : '';
                  return (
                    <Button
                      key={index}
                      text={description}
                      classname={`filter-border ${selected}`}
                      handleClick={() => this.handleCost(id, index)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="food-category-filter">
              <span>优惠活动</span>
              <div className="filter-wrap">
                {activitiesType.map((item, index) => {
                  const { name, id } = item;
                  const style = { background: `#${item.icon_color}` };
                  const selected = id === sortDicount ? 'selected' : '';
                  return (
                    <Button
                      key={index}
                      classname={`filter-border ${selected}`}
                      handleClick={() => this.handleDiscount(id, index)}
                      text={[
                        <span style={style} key="0">
                          {item.icon_name}
                        </span>,
                        <div key="1">{name}</div>
                      ]}
                    />
                  );
                })}
              </div>
            </div>
            <div className="food-category-filter">
              <span>商家活动 (可多选)</span>
              <div className="filter-wrap">
                {activities.map((activity, index) => {
                  const { name, id } = activity;
                  const style = {
                    color: `#${activity.icon_color}`,
                    border: `1px solid #${activity.icon_color}`
                  };
                  const selected = sortActivities.some(i => i === id)
                    ? 'selected'
                    : '';
                  return (
                    <Button
                      key={index}
                      classname={`filter-border ${selected}`}
                      handleClick={() => this.handleActivities(id)}
                      text={[
                        <span style={style} key="0">
                          {activity.icon_name}
                        </span>,
                        <div key="1">{name}</div>
                      ]}
                    />
                  );
                })}
              </div>
            </div>
            <div className="food-category-filter food-button">
              <Button
                classname="clear"
                handleClick={this.handleClear}
                text="清空"
              />

              <Button
                classname="confirm"
                handleClick={this.handleConfrim}
                text="确定"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  food: PropTypes.instanceOf(Object),
};
Category.defaultProps = {
  food: PropTypes.object,
}
