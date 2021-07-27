import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhiteLogo from "../assets/WhiteLogo.png";
import { FACEBOOK, INSTAGRAM, EMAIL_ADDRESS } from "../constants";

import "../assets/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="lineAbove"></div>
      <div className="footerLinks">
        <div>
          <div className="subtitle">Quick Links</div>
          <Link to="/legalpolicies/privacypolicy">Privacy Policy</Link>
          <Link to="/legalpolicies/refundpolicy">Refund Policy</Link>
          <Link to="/legalpolicies/shippingpolicy">Shipping Policy</Link>
          <Link to="/legalpolicies/termsofservice">Terms of Service</Link>
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
              href={`mailto:${EMAIL_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="email"
            >
              Email: {EMAIL_ADDRESS}
            </a>
            <br />
          </b>
          <br />
          <a href={FACEBOOK} target="_blank" rel="noreferrer">
            <FacebookIcon />
            Facebook
          </a>
          <a
            href={INSTAGRAM}
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
