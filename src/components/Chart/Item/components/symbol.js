import React from "react";
import "./symbol.css";
import { ReactComponent as BabeIcon } from "../../../../img/babe.svg";
import { ReactComponent as BabeRedDotsIcon } from "../../../../img/babe_red_dots.svg";
import { ReactComponent as BlackDotsIcon } from "../../../../img/black_dots.svg";
import { ReactComponent as BigDotIcon } from "../../../../img/big_dot.svg";
import { ReactComponent as BigDotUnfilledIcon } from "../../../../img/big_dot_unfilled.svg";
import { ReactComponent as VerticalLineIcon } from "../../../../img/vertical_line.svg";
import { ReactComponent as HorizontalLinesIcon } from "../../../../img/horizontal_lines.svg";
import { ReactComponent as QuestionIcon } from "../../../../img/question.svg";

const Icons = {
  RED_ICON: "RED_ICON",
  GREEN_ICON: "GREEN_ICON",
  YELLOW_ICON: "YELLOW_ICON",
  BABE: "BABE",
  BABE_RED_DOTS: "BABE_RED_DOTS",
  BLACK_DOTS: "BLACK_DOTS"
};

const Backgrounds = {
  RED: "RED",
  GREEN: "GREEN",
  WHITE: "WHITE",
  YELLOW: "YELLOW"
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

export default function Symbol(props) {
  let itemBackgroundColor = props.isCurrentDay ? currentDayColor : "white";
  // let itemBackgroundColor =
  //   props.currentDayStep < 2 ? currentDayColor : "white";
  if (
    (props.chartType === "COLORS" &&
      props.isCurrentDay &&
      props.currentDayStep >= props.backgroundStep) ||
    (props.showResult && props.chartType === "COLORS")
  ) {
    switch (props.iconBackground) {
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

  // console.log(props.peakDay);
  return (
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
              props.icon,
              props.iconBackground,
              props.numberDay,
              props.postPeak,
              props.chartType
            )}
          </div>
          <div className="item-peak-or-day">
            {(props.peakDay === props.idxDay &&
              props.shouldRenderPeak &&
              "X") ||
              props.numberDay ||
              null}
          </div>
          <div className="item-intercourse">{props.intercourse && "R"}</div>
        </React.Fragment>
      ) : null}
    </div>
  );
}