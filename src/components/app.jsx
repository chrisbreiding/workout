import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimersList from './timers-list';
import CategoriesList from './categories-list';
import { retrieveData } from '../lib/actions';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(retrieveData());
  }

  render () {
    return (
      <main className="container">
        <TimersList />
        <CategoriesList />
      </main>
    );
  }
}

export default connect()(App);
