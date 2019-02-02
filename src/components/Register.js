import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import '../utility/validation.js'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CountryDropdown } from 'react-country-region-selector';
import Validation from 'react-validation';
import '../styles/App.css';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      country: '',
      dob: '',
      msg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  logChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  selectCountry = val => {
    this.setState({ country: val });
  }

  handleSubmit = e => {
    e.preventDefault();
    var self = this;
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      country: this.state.country,
      dob: this.state.dob,
      msg: ''
    };

    console.log(data);
    fetch('/api/v1/user/', {
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
      self.setState({ msg: "Thank for registering with us!" });

    }).catch(function (err) {
      console.log(err);
      self.setState({ msg: err });
    });
  };


  render() {
    const country = this.state;
    return (
      <div className="container register-form">
        <div>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username: </ControlLabel>
            <FormControl autoFocus
              type="text"
              name="username"
              placeholder="Input your user name."
              value={this.state.username}
              onChange={this.logChange} />
          </FormGroup>

          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email: </ControlLabel>
            <FormControl autoFocus
              type="email"
              name="email"
              placeholder="Input your email name."
              value={this.state.email}
              onChange={this.logChange} />
            <ControlLabel>Password </ControlLabel>
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <FormControl autoFocus
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.logChange} />
          </FormGroup>
          <FormGroup controlId="country" bsSize="large">
            <ControlLabel>Country </ControlLabel>
            <br />
            <CountryDropdown
              value={this.state.country}
              onChange={(val) => this.selectCountry(val)} />
            <br />
          </FormGroup>

          <FormGroup controlId="dob" bsSize="large">
            <ControlLabel>Date of Birth </ControlLabel>
            <FormControl autoFocus
              type="date"
              name="dob"
              value={this.state.dob}
              onChange={this.logChange} />
          </FormGroup>

          <Button
            block
            bsSize="large"
            //disabled={!this.validateForm()}
            type="submit"
            onClick={(e) => this.handleSubmit(e)}
          >Register
          </Button>

          <p>{this.state.msg}</p>

        </div >
      </div >
    );

  }
}
