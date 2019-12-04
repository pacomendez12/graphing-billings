import React from "react";
import "./rule.css";
import { ReactComponent as QuestionIcon } from "../../../../img/question.svg";

const renderRule = rule => {
  if (rule === null) return null;
  if (rule === 1 || rule === 2 || rule === 3 || rule === "C" || rule === "c")
    return rule;
  return "";
};

export default function Rule(props) {
  return (
    <div className="item-field item-rule">
      {props.isCurrentDay ? (
        <QuestionIcon style={{ width: "20px", height: "20px" }} />
      ) : props.showResult ? (
        renderRule(props.rule) || ""
      ) : (
        ""
      )}
    </div>
  );
}
