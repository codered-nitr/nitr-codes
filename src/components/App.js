import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'
import Home from './home'
import NavBar from './NavBar';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Problem from './problem'
import NotFound from './404';
import Problemset from './problemset'
import Academy from './academy'
import Paper from './academy/paper'
import AddProblem from './problem/addProblem'
import { withAuthentication } from './session';
import { withDBX } from './dropbox'
import Weekly from './weekly'
import Doubts from './doubts'
function App() {
  return (
    <div className="App">
      <Helmet><title>NITR Codes | A Code Red initiative</title></Helmet>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/weekly" component = {Weekly} />
          <Route exact path = "/problemset" component = {Problemset} />
          <Route exact path = "/problem/:id/" component = {Problem} />
          <Route exact path = "/academy" component = {Academy} />
          <Route exact path = "/academy/:type/:id/" component = {Paper} />
          <Route exact path = "/cms/problem" component = {AddProblem} />
          <Route exact path = "/forum" component = {Doubts} />
          <Route component = {NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default withDBX(withAuthentication(App));
