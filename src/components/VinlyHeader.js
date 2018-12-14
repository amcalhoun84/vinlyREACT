import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../styles/App.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header className="App-header">
          <p>Welcome to <code>Vin.ly</code>!</p>
          <p> How can we help today? </p>
        </header>
      </div>

    );
  }
}

export default Header;
