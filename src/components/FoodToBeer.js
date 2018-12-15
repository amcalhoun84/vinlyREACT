import React, { Component } from 'react';
//import '../styles/WineToFood.css';

import { Button, DropdownButton, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class FoodToBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food_pair: 'Pork',
      current_food: 'Pork',
      fp_results: [],
      foods: []
    };
  }

  // Testicus!
  componentDidMount() {
    let self = this;
    let fp = this.state.food_pair;
    const requestOptions = {
      method: 'GET'
    };

    fetch('/api/v1/food/', {
      method: 'GET'
    }).then(response => {
      if (response.status >= 400) {
        console.log("Woops");
      }
      return response.json();
    }).then(data => {
      console.log("Data: ", data);
      self.setState({ foods: data });
    });

    return fetch('/api/v1/food/match/beer/' + fp, requestOptions)
      .then(response => {
        if (response.status >= 400) {
          console.log("Pairing not found.");
        }
        return response.json();
      }).then(data => {
        self.setState({ fp_results: data });
      });
  }

  handleChange = e => {
    this.setState({
      food_pair: e.target.value
    });
  }

  handleSubmit = e => {
    let self = this;
    let fp = this.state.food_pair;
    e.preventDefault();

    fetch('/api/v1/food/match/beer/' + fp, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        console.log("Pairing not found.");
      }
      return response.json();
    }).then(function (data) {
      console.log(data)
      self.setState({
        fp_results: data,
        current_food: fp
      });
    });
  }

  render() {
    let foodOptions = this.state.foods.map((food) =>
      <option key={food.food_type}>{food.food_type}</option>
    );

    return (
      <div className="foodtobeerpairing" >
        <form onSubmit={this.handleSubmit}>
          <select id="beers" onChange={this.handleChange.bind(this)} value={this.state.food_pair}>
            {foodOptions}
          </select>
          <br /><br />

          <Button
            block
            bsSize="sm"
            type="submit"
            width="320"
            onClick={(e) => this.handleSubmit(e)}>Select

        </Button>

        </form>

        <h3>Food Pairings for: {this.state.current_food} </h3>
        <table className="table table-hover">
          <thead>
          </thead>
          <tbody>
            {this.state.fp_results.map(beer =>
              <tr key={beer.beer_id}>
                <td padding='10px'>{beer.beer_type}</td>
              </tr>
            )}
          </tbody>
        </table >
      </div >

    );
  }
};
