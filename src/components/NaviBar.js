import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from './Routes';
import "../styles/App.css";

export default class NaviBar extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Vin.ly</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="/wine">Wine</NavItem>
              <NavItem href="/beer">Beer</NavItem>
              <NavItem href="/food">Food</NavItem>
              <NavItem href="/wine-to-food">Wine to Food</NavItem>
              <NavItem href="/beer-to-food">Beer to Food</NavItem>
              <NavItem href="/food-to-wine">Food to Wine</NavItem>
              <NavItem href="/food-to-beer">Food to Beer</NavItem>
              <NavItem href="/login">Login</NavItem>
              <NavItem href="/signup">Signup</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>

    );
  };
}
