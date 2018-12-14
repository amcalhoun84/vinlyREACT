import React, { Component } from 'react';
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

  handleSubmit = e => {
    let self = this;
    let username = this.state.username;
    let password = this.state.password;
    e.preventDefault();
    /* fetch('/api/v1/user/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(function (response) {
      if (response.status >= 400) {
        // throw new Error("Bad response from server");
        self.setState({
          msg: "Can't find user"
        })
        return;
      }

      console.log("SUCCESS!");
      self.setState({
        msg: "User found. We're almost there!"
      })
    }).then(user => {
      console.log(user);

    }); */

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    console.log(requestOptions.body);

    return fetch('/api/v1/user/login/', requestOptions)
      .then(response => {
        console.log(response);
        if (response.status >= 400) {
          self.setState({ msg: "User not found " })
          return;
        }
        else {
          self.setState({ msg: "SUCCESS!" });
        }

      })

      .then(data => {
        console.log("User: ", data);

      });

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
          {this.state.msg}
        </form>


      </div >
    );
  }
}
