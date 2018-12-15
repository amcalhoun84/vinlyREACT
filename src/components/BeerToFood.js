import React, { Component } from 'react';
//import '../styles/WineToFood.css';

import { Button, DropdownButton, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class BeerToFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer_pair: 'Ale',
      current_beer: 'Ale',
      bp_results: [],
      beers: []
    };
  }

  // Testicus!
  componentDidMount() {
    let self = this;
    let bp = this.state.beer_pair;
    const requestOptions = {
      method: 'GET'
    };

    fetch('/api/v1/beer/', {
      method: 'GET'
    }).then(response => {
      if (response.status >= 400) {
        console.log("Woops");
      }
      return response.json();
    }).then(data => {
      console.log("Data: ", data);
      self.setState({ beers: data });
    });

    return fetch('/api/v1/beer/match/' + bp, requestOptions)
      .then(response => {
        if (response.status >= 400) {
          console.log("Pairing not found.");
        }
        return response.json();
      }).then(data => {
        self.setState({ bp_results: data });
      });
  }

  handleChange = e => {
    this.setState({
      beer_pair: e.target.value
    });
  }

  handleSubmit = e => {
    let self = this;
    let bp = this.state.beer_pair;
    e.preventDefault();

    fetch('/api/v1/beer/match/' + bp, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        console.log("Pairing not found.");
      }
      return response.json();
    }).then(function (data) {
      console.log(data)
      self.setState({
        bp_results: data,
        current_beer: bp
      });
    });
  }

  render() {
    let beerOptions = this.state.beers.map((beer) =>
      <option key={beer.beer_type}>{beer.beer_type}</option>
    );

    return (
      <div className="beertofoodpairing" >
        <form onSubmit={this.handleSubmit}>
          <select id="beers" onChange={this.handleChange.bind(this)} value={this.state.beer_pair}>
            {beerOptions}
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

        <h3>Food Pairings for: {this.state.current_beer} </h3>
        <table className="table table-hover">
          <thead>
          </thead>
          <tbody>
            {this.state.bp_results.map(food =>
              <tr key={food.food_id}>
                <td padding='10px'>{food.food_type}</td>
              </tr>
            )}
          </tbody>
        </table >
      </div >

    );
  }
};
