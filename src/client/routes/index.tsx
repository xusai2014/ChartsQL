import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Books from '../pages/books';
import HeatMap from '../pages/HeatMap';


export default (props) => {
    return (<BrowserRouter >
    <Switch>
        <Route exact path="/front/books"><Books /></Route>
        <Route exact path="/front/heatmap"><HeatMap /></Route>
    </Switch>
    </BrowserRouter>)
}