import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <BrowserRouter>
            <div>
                <Layout />
            </div>
        </BrowserRouter>
    );
  }
}
