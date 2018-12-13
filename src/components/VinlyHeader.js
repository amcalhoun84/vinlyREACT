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
        <div text-align="center">
          <a href="beer">Beer </a> | <a href="wine">Wine</a> | <a href="food">Food</a> | <a href="food-to-wine">Food To Wine</a> | <a href="food-to-beer">Food to Beer</a> | <a href="wine-to-food">Wine To Food</a> | <a href="beer-to-food">Beer to Food</a>
        </div>
      </div>

    );
  }
}

export default Header;
