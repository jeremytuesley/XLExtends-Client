import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/Nav.scss';

function Navbar() {
  return (
    <div className="topnav">
      <h1>XLEXTENDS</h1>
      <div>
        <Link to="/">Home </Link>
        <Link to="/catalog">Product Catalog </Link>
        <Link to="/services">Beauty Services </Link>
        <Link to="/sales">Sales </Link>
        <Link to="/contact">Contact </Link>
        <a href="www.google.com">carthere</a>
      </div>
    </div>
  );
}

export default Navbar;
