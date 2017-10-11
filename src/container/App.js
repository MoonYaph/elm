import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Home {...this.props} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    city: state.city
  };
}
export default connect(mapStateToProps)(App);

