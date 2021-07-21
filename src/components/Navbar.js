import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined/";
import { IconButton, Fade, Popper } from "@material-ui/core";

import useCartModel from "../hooks/useCart";
import Cart from "./Cart";

import "../assets/nav.scss";

const Navbar = () => {
  const { cartDisplay, setCartDisplay } = useCartModel();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOnClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setCartDisplay(!cartDisplay ? true : false);
  };

  return (
    <>
      <div className="topnav">
        <Link to="/">
          <h1>XLEXTENDS</h1>
        </Link>
        <div>
          <Link to="/">Home </Link>
          <Link to="/products">Product Catalog </Link>
          <Link to="/services">Beauty Services </Link>
          <Link to="/sales">Sales </Link>
          <Link to="/contact">Contact </Link>
          <IconButton aria-label="shopping cart" onClick={handleOnClick}>
            <ShoppingCartIcon style={{ fontSize: 30 }} />
          </IconButton>
        </div>
      </div>
      <Popper
        open={cartDisplay}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div>
              <Cart />
            </div>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default Navbar;
