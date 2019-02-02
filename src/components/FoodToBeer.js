
import React, { Component } from 'react';
import { Button, DropdownButton, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import '../styles/BeerToFood.css';
import { FoodNote } from '../helpers/beerNotes.js';

export default class FoodToBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food_pair: 'Legumes',
      current_food: '',
      fbp_results: [],
      foods: []
    };
  }

  // Testicus!
  componentDidMount() {
    let self = this;
    let fbp = this.state.food_pair;
    const requestOptions = {
      method: 'GET'
    };

    fetch('/api/v1/util/food_types', {
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

  };

  handleChange = e => {
    this.setState({
      food_pair: e.target.value
    });
  }

  handleSubmit = e => {
    console.log(this.state);
    console.log(this.props);
    let self = this;
    let fbp = this.state.food_pair;
    e.preventDefault();

    fetch('/api/v1/match/beer/' + fbp, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        console.log("Pairing not found.");
      }
      return response.json();
    }).then(function (data) {
      console.log(data);
      self.setState({
        fbp_results: data,
        current_food: fbp
      });
    });
  }

  render() {
    const current_food = this.state.current_food;
    let foodOptions = this.state.foods.map(food =>
      <option key={food.food_type}>{food.food_type}</option>
    );

    return (
      <div className="foodtobeerpairing" >
        <form onSubmit={this.handleSubmit}>
          <select id="beer" onChange={this.handleChange.bind(this)} value={this.state.food_pair}>
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

        <FoodNote currFood={current_food} />

        <h3>Food Pairings for: {this.state.current_food} </h3>
        <table className="table table-hover">
          <thead>
          </thead>
          <tbody>
            {this.state.fbp_results.map(beer =>
              <tr key={beer.beer_id}>
                <td padding='10px'>{beer.beer_type}</td>
              </tr>
            )}
          </tbody>
        </table >
      </div >

    );
  };
};
