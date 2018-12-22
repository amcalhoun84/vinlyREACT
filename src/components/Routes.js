import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import Wine from './Wine';
import Beer from './Beer';
import Food from './Food';
import Cheese from './Cheese';
import WineToFood from './WineToFood';
import BeerToFood from './BeerToFood';
import FoodToBeer from './FoodToBeer';
import FoodToWine from './FoodToWine';
import NotFound from './NotFound';
import Register from './Register';
import LogIn from "./LogIn";


export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/wine" exact component={Wine} />
    <Route path="/beer" exact component={Beer} />
    <Route path="/food" exact component={Food} />
    <Route path="/cheese" exact component={Cheese} />
    <Route path="/wine-to-food" exact component={WineToFood} />
    <Route path="/beer-to-food" exact component={BeerToFood} />
    <Route path="/food-to-wine" exact component={FoodToWine} />
    <Route path="/food-to-beer" exact component={FoodToBeer} />
    <Route path="/login" exact component={LogIn} />
    <Route path="/signup" exact component={Register} />
    <Route component={NotFound} />
  </Switch>
