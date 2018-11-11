import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MemeCaption from './MemeCaption'
import MemeDisplay from './MemeDisplay'
import NotFound from './NotFound'
import { Route } from 'react-router'
import { BrowserRouter as Router,Switch} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducer/index.js";

let store = createStore(reducers, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store = {store}>
  <Router>
    <div>
      <Switch>
        <Route  path='/' exact component={App} />
        <Route path='/Meme/:memeId' component={MemeCaption} />
        <Route path='/Meme/:url' component={MemeDisplay} />
        <Route  component={NotFound} />
      </Switch>
    </div>
  </Router>
  </Provider>
  , document.getElementById('root'));
