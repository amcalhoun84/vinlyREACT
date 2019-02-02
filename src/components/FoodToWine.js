
import React, { Component } from 'react';
import { Button, DropdownButton, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import '../styles/WineToFood.css';
import { FoodNote } from '../helpers/wineNotes.js';

export default class FoodToWine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food_pair: 'Legumes',
      current_food: '',
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
    let fp = this.state.food_pair;
    e.preventDefault();

    fetch('/api/v1/match/wine/' + fp, {
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
    const current_food = this.state.current_food;
    let foodOptions = this.state.foods.map(food =>
      <option key={food.food_type}>{food.food_type}</option>
    );

    return (
      <div className="foodtowinepairing" >
        <form onSubmit={this.handleSubmit}>
          <select id="wines" onChange={this.handleChange.bind(this)} value={this.state.food_pair}>
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
            {this.state.fp_results.map(wine =>
              <tr key={wine.wine_id}>
                <td padding='10px'>{wine.varietal}</td>
              </tr>
            )}
          </tbody>
        </table >
      </div >

    );
  };
};
