import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Books from '../pages/books';


export default (props) => {
    return (<BrowserRouter >
    <Switch>
        <Route exact path="/front/books"><Books /></Route>
        </Switch>
    </BrowserRouter>)
}