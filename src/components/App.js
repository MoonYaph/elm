import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.instanceOf(Object),
    routes: PropTypes.instanceOf(Object),
  }
  static defaultProps = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.info(this.props.store, this.props.routes)
    return (
      <Provider store={this.props.store}>

          <Router history={browserHistory} routes={this.props.routes} />

      </Provider>
    );
  }
}

export default App;
