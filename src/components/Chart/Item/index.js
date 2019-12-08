import React, { useEffect, useState } from "react";
import Popover from "react-tiny-popover";
import Day from "./components/day";
import Symbol from "./components/symbol";
import Annotation from "./components/annotation";
import Rule from "./components/rule";
import EditDay from "../EditDay";
import "./item.css";

const itemProps = {
  background: "GREEN",
  icon: null,
  intercourse: false,
  peakDay: false,
  numberDay: 1
};

const currentDayColor = "#e0e0e0";

/** Component */
export default function Item(props) {
  const { currentDayStep } = props;
  const [showItemEditor, setShowItemEditor] = useState(false);
  const [nextDayStep, setNextDayStep] = useState(2);
  const [backgroundStep, setBackgroundStep] = useState(1);

  if (props.chartType === "COLORS") {
    if (
      props.symbol.background === Backgrounds.RED ||
      props.symbol.background === Backgrounds.GREEN ||
      props.symbol.background === Backgrounds.YELLOW
    ) {
      // setNextDayStep(nextDayStep => nextDayStep + 1);
      // setBackgroundStep(nextDayStep - 1);
    }
  }
  useEffect(() => {
    if (currentDayStep === nextDayStep) {
      // console.log(`Going forward - ${props.currentDayStep}  - ${nextDayStep}`);
      props.goNDaysForward(1);
    }
  }, [currentDayStep, nextDayStep, props]);

  // let nextDayStep = 2;

  // let backgroundStep = 1;

  if (props.currentDayStep === nextDayStep) {
    console.log(`Going forward - ${props.currentDayStep}  - ${nextDayStep}`);
    props.goNDaysForward(1);
  }

  // console.log(`idxDay: ${props.idxDay} - peakDay: ${props.peakDay}`);
  useEffect(() => {
    props.setShouldRenderPeak(
      props.isCurrentDay && props.idxDay >= props.peakDay + 2
    );
  }, [props, props.isCurrentDay]);

  const renderItemEditor = () => {
    return (
      <Popover
        isOpen={showItemEditor}
        position={["top", "right", "left", "bottom"]}
        padding={10}
        disableReposition
        onClickOutside={() => setShowItemEditor(false)}
        contentLocation={{ top: 0, left: 0 }}
        containerClassName="edit-day-component"
        transitionDuration={0.5}
        content={() => (
          <EditDay onClose={() => setShowItemEditor(false)} {...props} />
        )}
      >
        <div
          className="open-editor-div"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (props.displayMode === "EDIT") {
              setShowItemEditor(true);
            }
          }}
        >
          <div className="main-content">
            <Symbol
              backgroundStep={backgroundStep}
              isCurrentDay={props.isCurrentDay}
              currentDayStep={props.currentDayStep}
              showResult={props.showResult}
              icon={props.symbol.icon}
              iconBackground={props.symbol.background}
              numberDay={props.symbol.numberDay}
              idxDay={props.idxDay}
              peakDay={props.peakDay}
              intercourse={props.symbol.intercourse}
              postPeak={props.postPeak}
              chartType={props.chartType}
              displayMode={props.displayMode}
              shouldRenderPeak={props.shouldRenderPeak}
            />
            <Annotation
              annotation={props.annotation}
              isCurrentDay={props.isCurrentDay}
              currentDayStep={props.currentDayStep}
              showResult={props.showResult}
            />
          </div>
          <Rule
            rule={props.rule}
            isCurrentDay={props.isCurrentDay}
            showResult={props.showResult}
          />
        </div>
      </Popover>
    );
  };

  return (
    <div
      className="item"
      style={{
        backgroundColor:
          props.isCurrentDay &&
          (props.currentDayStep === 0 || props.currentDayStep === 1)
            ? currentDayColor
            : "white",
        cursor: props.displayMode === "PRESENTATION" ? "pointer" : "initial"
      }}
      onClick={() => {
        if (props.displayMode === "PRESENTATION") props.goToDay(props.idxDay);
      }}
      title={
        (props.displayMode === "PRESENTATION" && `Ir al día ${props.day}`) || ""
      }
    >
      <Day
        day={props.day}
        idxDay={props.idxDay}
        displayMode={props.displayMode}
        dropDay={props.dropDay}
        addDayOnIdx={props.addDayOnIdx}
      ></Day>
      {renderItemEditor()}
      {/* <div
        className="open-editor-div"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (props.displayMode === "EDIT") {
            props.openItemEditor(props.idxDay);
          }
        }}
      >
        <div className="main-content">
          <Symbol
            backgroundStep={backgroundStep}
            isCurrentDay={props.isCurrentDay}
            currentDayStep={props.currentDayStep}
            showResult={props.showResult}
            icon={props.symbol.icon}
            iconBackground={props.symbol.background}
            numberDay={props.symbol.numberDay}
            idxDay={props.idxDay}
            peakDay={props.peakDay}
            intercourse={props.symbol.intercourse}
            postPeak={props.postPeak}
            chartType={props.chartType}
            displayMode={props.displayMode}
            shouldRenderPeak={props.shouldRenderPeak}
          />
          <Annotation
            annotation={props.annotation}
            isCurrentDay={props.isCurrentDay}
            currentDayStep={props.currentDayStep}
            showResult={props.showResult}
          />
        </div>
        <Rule
          rule={props.rule}
          isCurrentDay={props.isCurrentDay}
          showResult={props.showResult}
        />
      </div> */}
    </div>
  );
}

const Backgrounds = {
  RED: "RED",
  GREEN: "GREEN",
  WHITE: "WHITE",
  YELLOW: "YELLOW"
};
