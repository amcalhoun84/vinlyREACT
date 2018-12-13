import React, { Component } from 'react';
import Header from './VinlyHeader'
import Beer from './Beer';
import Wine from './Wine';
import '../styles/App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      beer_results: {}
    }
  }
  render() {
    return (
      <div>
        <Header />
        <br />
        <Beer />
        <br />
        <Wine />
      </div>
    );
  }
}

export default App;
