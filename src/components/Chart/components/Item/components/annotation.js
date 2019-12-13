import React from "react";
import "./annotation.css";

export default function Annotation(props) {
  return (
    <div className="item-field item-annotation">
      {<div className="rotated-text annotation">{props.annotation || ""}</div>}
    </div>
  );
}
