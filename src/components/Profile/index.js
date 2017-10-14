import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Nav from '../Nav'
import ProfileSign from './ProfileSign'
import ProfileGift from './ProfileGift'
import ProfileLink from './ProfileLink'
import Footer from '../Footer'
import './index.scss'
import { fetchUser } from '../../actions/AuthedAction';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchUser())
  }
  goBack = () => {
    window.history.back()
  }

  render() {
    return [
      <Nav key='0' title='我的' classname='profile-header' handleClick={this.goBack} />,
      <ProfileSign key='1' {...this.props} />,
      <ProfileGift key='2' {...this.props} />,
      <ProfileLink key='3' {...this.props} />,
      <Footer key='4' {...this.props} />
    ]
  }
}
Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
export default Profile
