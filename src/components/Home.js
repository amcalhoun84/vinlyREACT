import React, { Component } from "react";
import vinly from "./vinly-title.png";
import "../helpers/vinlyInfo.js";
import "../styles/Home.css";
import { VinlyInfo } from "../helpers/vinlyInfo.js";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <img src={vinly} alt={"Frustration is okay. Vinly."} />
          <h2>Your Pocket Sommelier and Cicerone</h2>
          <VinlyInfo />
        </div>
      </div>
    );
  }

}
