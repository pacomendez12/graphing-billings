import React from "react";
import Symbol from "./components/symbol";
import Annotation from "./components/annotation";
import Rule from "./components/rule";
import "./item.css";

/** Component */
export default function Item(props) {
  return (
    <div className="item">
      <div className="main-content">
        <Symbol
          currentDayStep={props.currentDaySubStep}
          showQuestionMark={props.showQuestionMarkInSymbol}
          icon={props.icon}
          iconBackground={props.iconBackground}
          countingDay={props.countingDay}
          showPeakDay={props.showPeakDay}
          intercourse={props.intercourse}
          postPeak={props.postPeak}
          chartType={props.chartType}
        />
        <Annotation annotation={props.annotation} />
      </div>
      <Rule rule={props.rule} showQuestionMark={props.showQuestionMarkInRule} />
    </div>
  );
}
