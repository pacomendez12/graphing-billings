import React, { useEffect, useState } from "react";
import "./item.css";
import { ReactComponent as BabeIcon } from "../../../img/babe.svg";
import { ReactComponent as BabeRedDotsIcon } from "../../../img/babe_red_dots.svg";
import { ReactComponent as BlackDotsIcon } from "../../../img/black_dots.svg";
import { ReactComponent as BigDotIcon } from "../../../img/big_dot.svg";
import { ReactComponent as BigDotUnfilledIcon } from "../../../img/big_dot_unfilled.svg";
import { ReactComponent as VerticalLineIcon } from "../../../img/vertical_line.svg";
import { ReactComponent as HorizontalLinesIcon } from "../../../img/horizontal_lines.svg";
import { ReactComponent as QuestionIcon } from "../../../img/question.svg";
import { ReactComponent as DayIndicatorIcon } from "../../../img/day_indicator.svg";
import { ReactComponent as CurrentDayIndicatorIcon } from "../../../img/current_day_indicator.svg";

const itemProps = {
  background: "GREEN",
  icon: null,
  intercourse: false,
  peakDay: false,
  numberDay: 1
};

const currentDayColor = "#e0e0e0";

const renderIcon = (
  iconType,
  background,
  countingDay,
  isPostPeak,
  chartType
) => {
  let Icon;
  if (chartType === "SYMBOLS") {
    switch (iconType) {
      case Icons.BABE:
        Icon = <BigDotUnfilledIcon />;
        break;
      case Icons.BABE_RED_DOTS:
        Icon = <BigDotUnfilledIcon />;
        break;
      case Icons.BLACK_DOTS:
        Icon = <BlackDotsIcon />;
        break;
      case Icons.RED_ICON:
        Icon = <BigDotIcon />;
        break;
      case Icons.GREEN_ICON:
        Icon = <VerticalLineIcon />;
        break;
      case Icons.YELLOW_ICON:
        Icon = <HorizontalLinesIcon />;
        break;
      default:
        Icon = null;
    }

    if (isPostPeak && iconType === Icons.BABE) {
      if (background === Backgrounds.YELLOW) {
        Icon = <HorizontalLinesIcon />;
      } else if (background === Backgrounds.GREEN) {
        Icon = <VerticalLineIcon />;
      }
    }
  } else {
    switch (iconType) {
      case Icons.BABE:
        Icon = <BabeIcon />;
        break;
      case Icons.BABE_RED_DOTS:
        Icon = <BabeRedDotsIcon />;
        break;
      case Icons.BLACK_DOTS:
        Icon = <BlackDotsIcon />;
        break;
      case Icons.RED_ICON:
      case Icons.GREEN_ICON:
      case Icons.YELLOW_ICON:
      default:
        Icon = null;
    }
  }

  return <div className="icon-container">{Icon}</div>;
};

const renderRule = rule => {
  if (rule === null) return null;
  if (rule === 1 || rule === 2 || rule === 3 || rule === "C" || rule === "c")
    return rule;
  return "";
};

/** Component */
export default function Item(props) {
  const { currentDayStep } = props;
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
    // console.log("here");
    props.setShouldRenderPeak(
      props.isCurrentDay && props.idxDay >= props.peakDay + 2
    );
  }, [props, props.isCurrentDay]);

  const renderActiveIndicator = isActive => {
    if (isActive) {
      return (
        <div className="active-indicator">
          <CurrentDayIndicatorIcon />
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            props.goToDay(props.idxDay);
          }}
          className="active-indicator move-to-indicator"
        >
          <DayIndicatorIcon />
        </div>
      );
    }
  };

  let itemBackgroundColor = props.isCurrentDay ? currentDayColor : "white";
  // let itemBackgroundColor =
  //   props.currentDayStep < 2 ? currentDayColor : "white";
  if (
    (props.chartType === "COLORS" &&
      props.isCurrentDay &&
      props.currentDayStep >= backgroundStep) ||
    props.showResult
  ) {
    switch (props.symbol.background) {
      case Backgrounds.RED:
        itemBackgroundColor = "#aa0000";
        break;
      case Backgrounds.GREEN:
        itemBackgroundColor = "#1e6f1e";
        break;
      case Backgrounds.YELLOW:
        itemBackgroundColor = "#ffcc00";
        break;
      case Backgrounds.WHITE:
      default:
        itemBackgroundColor = "white";
        break;
    }
  }

  return (
    <div
      className="item"
      style={{
        backgroundColor:
          props.isCurrentDay &&
          (props.currentDayStep === 0 || props.currentDayStep === 1)
            ? currentDayColor
            : "white"
      }}
    >
      <div className="item-field item-day">{props.day || 1}</div>
      <div className="main-content">
        <div
          className="item-field item-symbol "
          style={{ background: itemBackgroundColor }}
        >
          {props.isCurrentDay && props.currentDayStep === 1 ? (
            <QuestionIcon className="item-icon" />
          ) : props.showResult ? (
            <React.Fragment>
              <div className="item-icon">
                {renderIcon(
                  props.symbol.icon,
                  props.symbol.background,
                  props.symbol.numberDay,
                  props.postPeak,
                  props.chartType
                )}
              </div>
              <div className="item-peak-or-day">
                {props.symbol.numberDay ||
                  (props.symbol.peakDay &&
                    (props.shouldRenderPeak || props.displayMode === "EDIT") &&
                    "X") ||
                  null}
              </div>
              <div className="item-intercourse">
                {props.symbol.intercourse && "R"}
              </div>
            </React.Fragment>
          ) : null}
        </div>
        <div className="item-field item-annotation">
          {(props.isCurrentDay && props.currentDayStep >= 1) ||
          props.showResult ? (
            <div className="annotation rotated-text">
              {props.annotation || ""}
            </div>
          ) : null}
        </div>
      </div>
      <div className="item-field item-rule">
        {props.isCurrentDay ? (
          <QuestionIcon />
        ) : props.showResult ? (
          renderRule(props.rule) || ""
        ) : (
          ""
        )}
      </div>
      {props.displayMode === "PRESENTATION" &&
        renderActiveIndicator(props.isCurrentDay)}
    </div>
  );
}

const Backgrounds = {
  RED: "RED",
  GREEN: "GREEN",
  WHITE: "WHITE",
  YELLOW: "YELLOW"
};

const Icons = {
  RED_ICON: "RED_ICON",
  GREEN_ICON: "GREEN_ICON",
  YELLOW_ICON: "YELLOW_ICON",
  BABE: "BABE",
  BABE_RED_DOTS: "BABE_RED_DOTS",
  BLACK_DOTS: "BLACK_DOTS"
};

// export backgrounds;
