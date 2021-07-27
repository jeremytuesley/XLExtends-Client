import React from "react";
import "../assets/loadinganderror.scss";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const Error = () => {
  return (
    <div className="content">
      <div className="loadError">
        <SentimentVeryDissatisfiedIcon />
        <p>There was an error loading the page, please try again later</p>
      </div>
    </div>
  );
};

export default Error;
