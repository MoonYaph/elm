import React, { Component } from 'react'

class ProfileGift extends Component {
  render() {
   return (
     <section className='profile-gift'>
       <div className='profile-gift-left'>
         <i className='fa fa-vcard' />
         <span>优惠</span>
       </div>
       <div className='profile-gift-right'>
       <i className='fa fa-database' />
         <span>积分</span>
       </div>
     </section>
   )
  }
}
export default ProfileGift
