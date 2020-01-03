import React from "react";
import "./shortcut.css";

const Shortcut = props => {
  return (
    <div className="shortcut">
      <span className="shortcut-text-container">
        <span className="shortcut-text">{props.shortcutText}</span>
      </span>
      <span className="shortcut-description">{props.description}</span>
    </div>
  );
};

export default Shortcut;
