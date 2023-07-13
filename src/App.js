import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Layout from './Layout';
import Home from './Home'

import './App.css';

const NotFound = () => {
  return <h2>Not Found</h2>;
}

const App = () => {
  return (
    <Router basename="currensee">
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;