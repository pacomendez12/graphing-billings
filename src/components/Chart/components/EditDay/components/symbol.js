import React from "react";
import { Icons } from "../../../Constants";
import { ReactComponent as BabeIcon } from "../../../../../img/babe.svg";
import { ReactComponent as BabeRedDotsIcon } from "../../../../../img/babe_red_dots.svg";
import { ReactComponent as BlackDotsIcon } from "../../../../../img/black_dots.svg";
import { ReactComponent as BigDotIcon } from "../../../../../img/big_dot.svg";
import { ReactComponent as BigDotUnfilledIcon } from "../../../../../img/big_dot_unfilled.svg";
import { ReactComponent as BigDotUnfilledWithDotsIcon } from "../../../../../img/big_dot_unfilled_with_dots.svg";
import { ReactComponent as VerticalLineIcon } from "../../../../../img/vertical_line.svg";
import { ReactComponent as HorizontalLinesIcon } from "../../../../../img/horizontal_lines.svg";
import "./symbol.css";

const getIconByTypeInColors = type => {
  switch (type) {
    case Icons.BABE:
      return <BabeIcon />;
    case Icons.BABE_RED_DOTS:
      return <BabeRedDotsIcon />;
    case Icons.BLACK_DOTS:
      return <BlackDotsIcon />;
    case Icons.RED_ICON:
    case Icons.GREEN_ICON:
    case Icons.YELLOW_ICON:
    case Icons.NONE:
    default:
      return null;
  }
};

const getIconByTypeInSymbols = type => {
  let Icon;
  switch (type) {
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

  return Icon;
};

export default function Symbol(props) {
  return (
    <div
      title={props.title}
      className={`icon${
        props.symbol === props.icon ||
        (props.icon === Icons.NONE &&
          (props.symbol === Icons.RED_ICON ||
            props.symbol === Icons.GREEN_ICON ||
            props.symbol === Icons.YELLOW_ICON ||
            props.symbol === null))
          ? " item-checked"
          : ""
      }`}
      onClick={() => props.setSymbol(props.icon)}
    >
      {props.isUsingColors
        ? getIconByTypeInColors(props.icon)
        : getIconByTypeInSymbols(props.icon)}
    </div>
  );
}
