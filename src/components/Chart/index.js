import React, { useState, useEffect, useRef } from "react";
import { ChartTypes, DisplayModes } from "./Constants";
import Item from "./Item";
import "./chart.css";

export default function Chart(props) {
  const charType = props.chartType || ChartTypes.COLORS;
  const currentDay = props.currentDay !== undefined ? props.currentDay : 0;
  const currentDayStep =
    props.currentDayStep !== undefined ? props.currentDayStep : 0;
  const displayMode = props.displayMode || DisplayModes.PRESENTATION;

  let postPeak = false;
  const renderItems = daysData => {
    return (
      <div className="container-scrollable">
        {daysData.map((dayData, idx) => {
          if (dayData.symbol.peakDay) {
            postPeak = true;
          }
          return (
            <Item
              key={idx}
              {...dayData}
              peakDay={props.peakDay}
              day={idx + 1}
              idxDay={idx}
              chartType={charType}
              showResult={
                displayMode === DisplayModes.PRESENTATION
                  ? currentDay > idx
                  : true
              }
              isCurrentDay={
                displayMode === DisplayModes.PRESENTATION
                  ? currentDay === idx
                  : false
              }
              displayMode={displayMode}
              postPeak={postPeak}
              shouldRenderPeak={props.shouldRenderPeak}
              currentDayStep={currentDayStep}
              goToDay={props.goToDay}
              goNDaysForward={props.goNDaysForward}
              setShouldRenderPeak={props.setShouldRenderPeak}
              dropDay={props.dropDay}
              addDayOnIdx={props.addDayOnIdx}
              setDayValue={props.setDayValue}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="chart">
      <div className="left-header">
        <div className="header-day">Día</div>
        <div className="main-content">
          <div className="header-symbol">
            <div className="symbol-or-color rotated-text">
              {props.charType === "SYMBOLS" ? "Símbolo" : "Símbolo o color"}{" "}
            </div>
          </div>
          <div className="header-annotation">
            <div className="sensation-or-appearance rotated-text">
              Apariencia y sensación
            </div>
          </div>
        </div>
        <div className="header-rule">Regla</div>
      </div>
      <div className="items-container">{renderItems(props.daysData)}</div>
    </div>
  );
}
