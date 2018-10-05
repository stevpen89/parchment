import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import './reset.css'
import './App.css'

import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import AboutUs from './components/AboutUs/AboutUs'
import Contact from './components/Contact/Contact'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Nav/>
        <Switch>
          <Route exact path = "/"   component={Home}    />
          <Route path = "/products" component={Products}/>
          <Route path = "/about"    component={AboutUs} />
          <Route path = "/contact"  component={Contact} />
        </Switch>
      </div>
    );
  }
}

export default App;
