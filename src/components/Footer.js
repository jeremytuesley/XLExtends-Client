import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhiteLogo from "../assets/WhiteLogo.png";

import "../assets/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="lineAbove"></div>
      <div className="footerLinks">
        <div>
          <div className="subtitle">Quick Links</div>
          <Link to="/legalpolicies/privacypolicy">Privacy Policy</Link>
          <a>Refund Policy</a>
          <a>Shipping Policy</a>
          <a>Terms of Service</a>
        </div>
        <div className="socials">
          <div className="subtitle">Contact Infomation </div>
          <p>
            If you have a question regarding your online order or any other
            queries, please <Link to="/contact">Contact us</Link> or you can
            also contact us via email or the social links below:
          </p>
          <b>
            <a
              href="mailto:xlextends@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="email"
            >
              Email: xlextends@gmail.com
            </a>
            <br />
          </b>
          <br />
          <a
            href="https://www.facebook.com/XL-Extends-104815671697497"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon />
            Facebook
          </a>
          <a
            href="https://www.instagram.com/xlextends"
            target="_blank"
            rel="noreferrer"
            className="second"
          >
            <InstagramIcon />
            Instagram
          </a>
        </div>
        <div className="logo">
          <img src={WhiteLogo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
