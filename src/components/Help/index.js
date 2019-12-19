import React from "react";
import "./help.css";

import { ReactComponent as CloseIcon } from "../../img/close.svg";

export default function Help(props) {
  return (
    <div className="help-main">
      <div className="top-bar">
        <div className="title">Ayuda</div>
        <button
          className="close-button"
          onClick={() => {
            props.onClose();
          }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
