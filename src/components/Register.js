import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import '../utility/validation.js'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Validation from 'react-validation';
import '../styles/App.css';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      password: '',
      msg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      msg: ''
    }
    console.log(data);
    fetch('/api/v1/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      console.log(data)
      if (data == "success") {
        this.setState({ msg: "Thank for registering with us!" });
      }
    }).catch(function (err) {
      console.log(err);
    });
  }

  logChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container register-form">
        <Validation.components.Form onSubmit={this.handleSubmit} method="POST">
          <label>Username</label>
          <label>Email</label>
          <label>Password</label>
          <div className="submit-section">
            <Validation.components.Button className="btn btn-uth-submit">Submit</Validation.components.Button>
          </div>
        </Validation.components.Form>





      </div>
    );

  }
}
