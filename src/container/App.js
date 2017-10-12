import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

class App extends Component {
  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        <Home {...this.props} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    home: state.home
  };
}
export default connect(mapStateToProps)(App);

