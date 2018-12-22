import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../styles/App.css';
import Beer from './Beer';

export default class Cheese extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cheese_results: []
    };
  }

  componentDidMount() {
    let self = this;
    fetch('/api/v1/cheese', {
      method: 'GET',
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from the server.");
      }
      return response.json();
    }).then(data => {
      self.setState({ cheese_results: data })
    }).catch(err => {
      console.log('caught an error', err);
    })
  }

  render() {
    return (
      <div className="container">
        <div className="CheeseList">
          <table className="table table-hover">
            <thead>
              <th>Cheese Type</th>
              <th>Strength</th>
              <th>Texture</th>
              <th>Description</th>
            </thead>
            <tbody>
              {this.state.cheese_results.map(cheese =>
                <tr key={cheese.cheese_id}>
                  <td padding='10px'>{cheese.cheese_type}</td>
                  <td padding='10px'>{cheese.strength}</td>
                  <td padding='10px'>{cheese.texture}</td>
                  <td padding='10px'>{cheese.description}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
