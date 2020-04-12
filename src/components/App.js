import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'
import Home from './home'
import NavBar from './NavBar';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './404';
import { withAuthentication } from './session';
function App() {
  return (
    <div className="App">
      <div className = "appbody">
        <Helmet><title>NITR Codes | A Code Red initiative</title></Helmet>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route component = {NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default withAuthentication(App);
