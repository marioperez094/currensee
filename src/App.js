import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Home from "./Home"

import './App.css';

const NotFound = () => {
  return <h2>Not Found</h2>;
}

const App = () => {
  return (
    <Router basename="currensee">
      <nav className='navbar navbar-light'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to="/">
            <h2><b>Curren</b><i>See</i></h2>
          </Link>
        </div>
      </nav>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>

      <footer>
        <div className='container-fluid'>
          <div className='row text-center'>
            <small className='me-2'>&copy;2023 Mario Perez
              &middot;
              <a className='ms-2 me-2' href='https://cool-dolphin-94f545.netlify.app/'>Portfolio</a>
              &middot;
              <a className='ms-2 me-2' href='https://www.altcademy.com/'>Altcademy</a>
            </small>
          </div>
        </div>
      </footer>
    </Router>
  )
}

export default App;