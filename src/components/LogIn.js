import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/LogIn.css';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      msg: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async e => {
    let self = this;
    let username = this.state.username;
    let password = this.state.password;
    e.preventDefault();

    try {
      await Auth.signIn(this.state.username, this.state.password);
      console.log("Logged in");
    } catch (err) {
      console.log("Error caught", err.message);
    }
  };


  render() {
    return (

      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <br />
            <ControlLabel>Username</ControlLabel>
            <br />
            <FormControl
              autoFocus
              type="text"
              name="username"
              placeholder="Enter user name"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <br />
            <ControlLabel>Password</ControlLabel>
            <br />
            <FormControl
              autoFocus
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <br />
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={(e) => this.handleSubmit(e)}
          >Login
          </Button>
          <br /><br />
          <p>{this.state.msg}</p>
        </form>


      </div >
    );
  }
}
