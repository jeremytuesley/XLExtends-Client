import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined/';
import { IconButton } from '@material-ui/core'

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
        <IconButton aria-label="shopping cart">
          <ShoppingCartIcon style={{ fontSize: 30 }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;
