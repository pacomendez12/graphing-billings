import React from "react";
import "./annotation.css";

export default function Annotation(props) {
  return (
    <div className="item-field item-annotation">
      {(props.isCurrentDay && props.currentDayStep >= 1) || props.showResult ? (
        <div className="annotation rotated-text">{props.annotation || ""}</div>
      ) : null}
    </div>
  );
}
