import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'
import Home from './home'
import NavBar from './NavBar';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Contest from './contest'
import Problem from './problem'
import Me from './me'
import NotFound from './404';
import Problemset from './problemset'
import Academy from './academy'
import Paper from './academy/paper'
import AddProblem from './problem/addProblem'
import { withAuthentication } from './session';
import { withDBX } from './dropbox'
function App() {
  return (
    <div className="App">
      <Helmet><title>NITR Codes | A Code Red initiative</title></Helmet>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/contest/:id/" component = {Contest} />
          <Route exact path = "/problemset" component = {Problemset} />
          <Route exact path = "/problem/:id/" component = {Problem} />
          <Route exact path = "/academy" component = {Academy} />
          <Route exact path = "/academy/:type/:id/" component = {Paper} />
          <Route exact path = "/me" component = {Me} />
          <Route exact path = "/cms/problem" component = {AddProblem} />
          <Route component = {NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default withDBX(withAuthentication(App));
