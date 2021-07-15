import React from "react";
import "../assets/loadinganderror.scss";
import LoopIcon from "@material-ui/icons/Loop";

const Loading = () => {
  return (
    <div className="content">
      <div className="loadError">
        <LoopIcon className="loadSymbol" />
        <p>Loading... this may take a moment</p>
      </div>
    </div>
  );
};

export default Loading;
