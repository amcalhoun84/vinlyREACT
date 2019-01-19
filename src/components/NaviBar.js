import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
//import { LinkContainer } from "react-router-bootstrap";
import Routes from './Routes';
import vinlysmall from './vinly-title-small.png';
import "../helpers/utilityHelpers.js";
import "../styles/App.css";
import "../styles/NaviBar.css";

function NavLog(props) {
  let loggedIn = props.loggedIn;
  if (loggedIn) {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img src={vinlysmall} alt={"Vinly"} /></Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft>
              <NavItem href="/wine">Wine</NavItem>
              <NavItem href="/beer">Beer</NavItem>
              <NavItem href="/food">Food</NavItem>
              <NavItem href="/cheese">Cheese</NavItem>
              <NavItem href="/food-to-wine">Food to Wine</NavItem>
              <NavItem href="/food-to-beer">Food to Beer</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem href="/">Signout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div >
    );
  } else {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img src={vinlysmall} alt={"Vinly"} /></Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="/login">Login</NavItem>
              <NavItem href="/signup">Signup</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>

    );
  }
};

export default class NaviBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }
  render() {
    const logIn = this.state.loggedIn
    //let self = this;
    return (
      // Quick and DIRTY
      <div>
        <NavLog loggedIn={logIn} />
      </div>

    );

  };
}
