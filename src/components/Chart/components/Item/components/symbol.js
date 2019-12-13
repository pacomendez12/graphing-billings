import React from "react";
import "./symbol.css";
import { Icons, BackgroundColors, ChartTypes } from "../../../Constants";
import { ReactComponent as BabeIcon } from "../../../../../img/babe.svg";
import { ReactComponent as BabeRedDotsIcon } from "../../../../../img/babe_red_dots.svg";
import { ReactComponent as BlackDotsIcon } from "../../../../../img/black_dots.svg";
import { ReactComponent as BigDotIcon } from "../../../../../img/big_dot.svg";
import { ReactComponent as BigDotUnfilledIcon } from "../../../../../img/big_dot_unfilled.svg";
import { ReactComponent as BigDotUnfilledWithDotsIcon } from "../../../../../img/big_dot_unfilled_with_dots.svg";
import { ReactComponent as VerticalLineIcon } from "../../../../../img/vertical_line.svg";
import { ReactComponent as HorizontalLinesIcon } from "../../../../../img/horizontal_lines.svg";
import { ReactComponent as QuestionIcon } from "../../../../../img/question.svg";
import { CurrentSelectedDayColor } from "../../../Constants";

const renderIcon = (iconType, background, isPostPeak, chartType) => {
  let Icon;
  if (chartType === ChartTypes.SYMBOLS) {
    switch (iconType) {
      case Icons.BABE:
        Icon = <BigDotUnfilledIcon />;
        break;
      case Icons.BABE_RED_DOTS:
        Icon = <BigDotUnfilledWithDotsIcon />;
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
      if (background === BackgroundColors.YELLOW) {
        Icon = <HorizontalLinesIcon />;
      } else if (background === BackgroundColors.GREEN) {
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
  let itemBackgroundColor;
  if (props.showQuestionMark) {
    itemBackgroundColor = CurrentSelectedDayColor;
  } else {
    if (props.chartType === ChartTypes.COLORS && props.iconBackground) {
      switch (props.iconBackground) {
        case BackgroundColors.RED:
          itemBackgroundColor = "#aa0000";
          break;
        case BackgroundColors.GREEN:
          itemBackgroundColor = "#1e6f1e";
          break;
        case BackgroundColors.YELLOW:
          itemBackgroundColor = "#ffcc00";
          break;
        case BackgroundColors.WHITE:
        default:
          itemBackgroundColor = "white";
          break;
      }
    }
  }

  return (
    <div
      className="item-field item-symbol "
      style={{ background: itemBackgroundColor }}
    >
      {props.showQuestionMark ? (
        <QuestionIcon className="item-icon" />
      ) : (
        <React.Fragment>
          <div className="item-icon">
            {renderIcon(
              props.icon,
              props.iconBackground,
              props.postPeak,
              props.chartType
            )}
          </div>
          <div className="item-peak-or-day">
            {(props.showPeakDay && "X") || props.countingDay || null}
          </div>
          <div className="item-intercourse">{props.intercourse && "R"}</div>
        </React.Fragment>
      )}
    </div>
  );
}
