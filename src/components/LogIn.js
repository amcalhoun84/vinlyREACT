import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../styles/App.css';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  componentDidMount() {
    let self = this;
    fetch('/api/v1/users/' + this.state.username + '/' + this.state.password, {
      method: 'GET'
    }).then(function (response) {
      if (response.status >= 400 {
        throw new Error("Bad response from server.");
      }
      return response.json();


    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let login = '/api/v1/user/login/';
    fetch(login, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data);
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad Response!");
      }
      return response.json();
    }).


    })
};

render() {
  return (

    <div className="login">
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
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
          <ControlLabel>Password</ControlLabel>
          <FormControl
            autoFocus
            type="password"
            name="password"
            placeholder="Enter password"
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          disable={!this.validateForm()}
          type="submit"
          onClick={(e) => this.handleSubmit(e)}
        ></Button>
      </form>
    </div>
  );
}
}
