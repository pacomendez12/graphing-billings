import React from "react";
import "./rule.css";
import { ReactComponent as QuestionIcon } from "../../../../../img/question.svg";
import { CurrentSelectedDayColor } from "../../../Constants";

const renderRule = rule => {
  if (rule === null) return null;
  if (rule === 1 || rule === 2 || rule === 3 || rule === "C" || rule === "c")
    return rule;
  return "";
};

export default function Rule(props) {
  return (
    <div
      className="item-field item-rule"
      style={{
        backgroundColor: props.showQuestionMark
          ? CurrentSelectedDayColor
          : undefined
      }}
    >
      {props.showQuestionMark ? (
        <QuestionIcon style={{ width: "20px", height: "20px" }} />
      ) : (
        renderRule(props.rule) || ""
      )}
    </div>
  );
}
