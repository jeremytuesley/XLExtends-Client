import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined/";
import Drawer from "@mui/material/Drawer";
import hamburgerIcon from "../assets/hamburger.svg";
import { IconButton, Popover } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { FACEBOOK, INSTAGRAM, EMAIL_ADDRESS } from "../constants";

import useCartModel from "../hooks/useCart";
import Cart from "./Cart";

import "../assets/nav.scss";

const Navbar = () => {
  const { cartDisplay, setCartDisplay } = useCartModel();
  const cartButton = useRef(null);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className="topnav">
        <Link to="/">
          <h1>XLEXTENDS</h1>
        </Link>
        <div>
          <Link to="/" className="topnav__desktop-nav">
            Home{" "}
          </Link>
          <Link to="/products" className="topnav__desktop-nav">
            Product Catalog{" "}
          </Link>
          <Link to="/services" className="topnav__desktop-nav">
            Beauty Services{" "}
          </Link>
          <Link to="/sales" className="topnav__desktop-nav">
            Sales{" "}
          </Link>
          <Link to="/contact" className="topnav__desktop-nav">
            Contact{" "}
          </Link>
          <IconButton
            ref={cartButton}
            aria-label="shopping cart"
            onClick={() => setCartDisplay(!cartDisplay ? true : false)}
          >
            <ShoppingCartIcon style={{ fontSize: 30 }} />
          </IconButton>
          {/* HAMBURGER MENU FOR MOBILE */}
          <React.Fragment>
            <div className="hamburger-menu__icon">
              <img
                src={hamburgerIcon}
                alt="hamburger"
                onClick={toggleDrawer}
              ></img>
            </div>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={toggleDrawer}
              className="hamburger-drawer"
            >
              <Link to="/" onClick={toggleDrawer}>
                <div
                  className="hamburger__menu-item"
                  style={{ paddingTop: "36px" }}
                >
                  Home
                </div>
              </Link>
              <Link to="/products" onClick={toggleDrawer}>
                <div className="hamburger__menu-item">Product Catalog</div>
              </Link>
              <Link to="/services" onClick={toggleDrawer}>
                <div className="hamburger__menu-item">Beauty Services</div>
              </Link>
              <Link to="/sales" onClick={toggleDrawer}>
                <div className="hamburger__menu-item">Sales</div>
              </Link>
              <Link to="/contact" onClick={toggleDrawer}>
                <div className="hamburger__menu-item">Contact</div>
              </Link>
              <div className="hamburger__menu-item hamburger__social-links">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  target="_blank"
                  rel="noreferrer"
                  className="email"
                >
                  <i className="far fa-envelope default-black"></i>
                </a>
                <a href={FACEBOOK} target="_blank" rel="noreferrer">
                  <FacebookIcon />
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="second"
                >
                  <InstagramIcon />
                </a>
              </div>
            </Drawer>
          </React.Fragment>
          {/* HAMBURGER MENU FOR MOBILE */}
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
