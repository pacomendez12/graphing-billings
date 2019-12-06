import React, { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../../img/close.svg";

import "./editDay.css";

export default function EditDay(props) {
  return (
    <div className="edit-day">
      <button
        onClick={() => {
          props.onClose();
        }}
      >
        <CloseIcon />
      </button>
      <div>Hi! I'm popover content. Here's my position: {props.position}.</div>
      <div>
        I'm {` ${props.nudgedLeft} `} pixels beyond the window horizontally!
      </div>
      <div>
        I'm {` ${props.nudgedTop} `} pixels beyond the window vertically!
      </div>
    </div>
  );
}
