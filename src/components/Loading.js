import React from "react";
import "../assets/loadinganderror.scss";
// import LoopIcon from "@material-ui/icons/Loop";

const Loading = ({ fullPage }) => {
  return (
    <div className={`lds-roller ${fullPage && "fullpage"}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
