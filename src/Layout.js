import React from 'react';
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className='navbar navbar-light'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to="/">
            <h2><b>Curren</b><i>See</i></h2>
          </Link>
        </div>
      </nav>

      <div className='container-fluid'>

        {props.children}

      </div>

      <footer className='mt-3'>
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
    </React.Fragment>
  )
}

export default Layout;