import React, { Component } from 'react';
import { Provider } from 'react-redux';

import setupStore from './redux/setupStore';
import InboxPageContainer from './redux/containers/InboxPageContainer';

const store = setupStore();

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <InboxPageContainer />
        </Provider>
      </div>
    );
  }
}
