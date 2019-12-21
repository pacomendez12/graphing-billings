import React from "react";
import "./help.css";
import { ReactComponent as AppLogo } from "../../img/logo.svg";
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
      <div className="help-body">
        <div className="help-item">
          <AppLogo className="app-logo" />
        </div>
        <div className="help-item">
          <AppLogo className="app-logo" />
        </div>
        <div className="help-item">
          <AppLogo className="app-logo" />
        </div>
        <div className="help-item">
          <AppLogo className="app-logo" />
        </div>
        <div className="help-item">
          <AppLogo className="app-logo" />
        </div>
        <div className="help-item">
          <AppLogo className="app-logo" />
        </div>
        <div className="help-item">
          <AppLogo className="app-logo" />
        </div>
        <div className="help-item">
          <AppLogo className="app-logo" />
        </div>
      </div>
    </div>
  );
}
