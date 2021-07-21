import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined/";
import { IconButton, Popover } from "@material-ui/core";

import useCartModel from "../hooks/useCart";
import Cart from "./Cart";

import "../assets/nav.scss";

const Navbar = () => {
  const { cartDisplay, setCartDisplay } = useCartModel();
  const cartButton = useRef(null);

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
          <IconButton
            ref={cartButton}
            aria-label="shopping cart"
            onClick={() => setCartDisplay(!cartDisplay ? true : false)}
          >
            <ShoppingCartIcon style={{ fontSize: 30 }} />
          </IconButton>
        </div>
      </div>
      <Popover
        open={cartDisplay}
        onClose={() => setCartDisplay(false)}
        anchorEl={cartButton.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Cart />
      </Popover>
    </>
  );
};

export default Navbar;
