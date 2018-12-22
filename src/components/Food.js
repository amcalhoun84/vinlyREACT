import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import Modal from 'react-modal';
import '../styles/App.css';

export default class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food_results: []
    }
  }
  componentDidMount() {
    let self = this;
    fetch('/api/v1/util/food_types', {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server.");
      }
      return response.json();
    }).then(function (data) {
      self.setState({ food_results: data });
    }).catch(err => {
      console.log('caught an error!', err);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="FoodList">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Food Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.food_results.map(food =>
                <tr key={food.food_id}>
                  <td padding='10px'>{food.food_type}</td>
                  <td padding='10px'>{food.description}</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    );
  }

};
