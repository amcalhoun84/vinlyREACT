import React, { Component } from 'react';
import '../styles/WineToFood.css';

import { Button, DropdownButton, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class WineToFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wine_pair: 'Pinot Noir',
      current_wine: 'Pinot Noir',
      wp_results: [],
      wines: []
    };
  }

  // Testicus!
  componentDidMount() {
    let self = this;
    let wp = this.state.wine_pair;
    const requestOptions = {
      method: 'GET'
    };

    fetch('/api/v1/util/varietals', {
      method: 'GET'
    }).then(response => {
      if (response.status >= 400) {
        console.log("Woops");
      }
      return response.json();
    }).then(data => {
      console.log("Data: ", data);
      self.setState({ wines: data });
    });

    return fetch('/api/v1/wine/match/' + wp, requestOptions)
      .then(response => {
        if (response.status >= 400) {
          console.log("Pairing not found.");
        }
        return response.json();
      }).then(data => {
        self.setState({ wp_results: data });
      });
  }

  handleChange = e => {
    this.setState({
      wine_pair: e.target.value
    });
  }

  handleSubmit = e => {
    let self = this;
    let wp = this.state.wine_pair;
    e.preventDefault();

    //return fetch('/api/v1/wine/match' + wp, requestOptions)
    fetch('/api/v1/wine/match/' + wp, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        console.log("Pairing not found.");
      }
      return response.json();
    }).then(function (data) {
      console.log(data)
      self.setState({
        wp_results: data,
        current_wine: wp
      });
    });
  }

  render() {
    let wineOptions = this.state.wines.map((wine) =>
      <option key={wine.varietal}>{wine.varietal}</option>
    );

    return (
      <div className="winetofoodpairing" >
        <form onSubmit={this.handleSubmit}>
          <select id="wines" onChange={this.handleChange.bind(this)} value={this.state.wine_pair}>
            {wineOptions}
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

        <h3>Food Pairings for: {this.state.current_wine} </h3>
        <table className="table table-hover">
          <thead>
            <th>Food Type</th>
            <th>Description</th>
          </thead>
          <tbody>
            {this.state.wp_results.map(food =>
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
