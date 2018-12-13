import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import Modal from 'react-modal';
import '../styles/App.css';

export default class Wine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wine_results: []
    }
  }
  componentDidMount() {
    let self = this;
    fetch('/api/v1/wine/', {
      method: 'GET',
    }).then(function (response) {
      console.log(response);
      if (response.status >= 400) {
        throw new Error("Bad response from server.");
      }
      return response.json();
    }).then(function (data) {
      self.setState({ wine_results: data });
    }).catch(err => {
      console.log('caught an error!', err);
    })
  }

  render() {
    console.log("Rendered.");
    return (
      <div className="container">
        <div className="WineList">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Wine Varietal</th>
                <th>Body</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.wine_results.map(wine =>
                <tr key={wine.beer_id}>
                  <td padding='10px'>{wine.varietal}</td>
                  <td padding='10px'>{wine.body}</td>
                  <td padding='10px'>{wine.description}</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
