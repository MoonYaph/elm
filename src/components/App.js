import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    routes: PropTypes.object,
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} routes={this.props.routes} />
        </div>
      </Provider>
    );
  }
}

export default App;
