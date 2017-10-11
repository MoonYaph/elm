
const createRoutes = () => ({
  path: '/',
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('../components').default);
    }, 'app');
  },
  indexRoute: {
    getComponent(nextState, callback) {
      require.ensure([], (require) => {
        callback(null, require('../container/App').default);
      }, 'home');
    },
  },
  // childRoutes: [
  //   {
  //     path: 'discover',
  //     getComponent (nextState, callback) {
  //       require.ensure([], (require) => {
  //         callback(null, require('../container/DiscoverContainer').default)
  //       }, 'discover')
  //     }
  //   }, {
  //     path: 'msite',
  //     getComponent (nextState, callback) {
  //       require.ensure([], (require) => {
  //         callback(null, require('../container/MsiteContainer').default)
  //       }, 'msite')
  //     }
  //   }, {
  //     path: 'food',
  //     getComponent (nextState, callback) {
  //       require.ensure([], (require) => {
  //         callback(null, require('../container/FoodContainer').default)
  //       }, 'msite')
  //     }
  //   }, {
  //     path: 'shop',
  //     getComponent (nextState, callback) {
  //       require.ensure([], (require) => {
  //         callback(null, require('../container/ShopContainer').default)
  //       }, 'shop')
  //     }
  //   }, {
  //     path: 'profile',
  //     getComponent (nextState, callback) {
  //       require.ensure([], (require) => {
  //         callback(null, require('../container/ProfileContainer').default)
  //       }, 'profile')
  //     },
  //   }, {
  //     path: 'login',
  //     getComponent (nextState, callback) {
  //       require.ensure([], (require) => {
  //         callback(null, require('../container/LogContainer').default)
  //       }, 'login')
  //     }
  //   }, {
  //     path: 'profile/info',
  //     getComponent (nextState, callback) {
  //       require.ensure([], (require) => {
  //         callback(null, require('../components/Profile/ProfileInfo').default)
  //       }, 'info')
  //     }
  //   }, {
  //     path: 'login/password',
  //     getComponent (nextState, callback) {
  //       require.ensure([], (require) => {
  //         callback(null, require('../components/Log/PasswordLogin').default)
  //       }, 'password')
  //     }
  //   }
  // ]
});

export default createRoutes;
