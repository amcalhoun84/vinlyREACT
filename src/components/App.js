import React, { Component } from 'react';
import Header from './VinlyHeader';
import Home from './Home';
import Beer from './Beer';
import Wine from './Wine';
import LogIn from './LogIn';
import Register from './Register';
import '../styles/App.css';
import NaviBar from './NaviBar';
import Routes from './Routes';


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
        <NaviBar />
      </div>
    );
  }
}

export default App;
