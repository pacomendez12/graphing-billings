import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../img/close.svg";
import Symbol from "./components/symbol";
import "./editDay.css";

const Icons = {
  RED_ICON: "RED_ICON",
  GREEN_ICON: "GREEN_ICON",
  YELLOW_ICON: "YELLOW_ICON",
  BABE: "BABE",
  BABE_RED_DOTS: "BABE_RED_DOTS",
  BLACK_DOTS: "BLACK_DOTS",
  NONE: "NONE"
};

export default function EditDay(props) {
  const [background, setBackground] = useState(props.symbol.background);
  const [symbol, setSymbol] = useState(props.symbol.icon);

  const isUsingColors = props.chartType !== "SYMBOLS";
  const currentDay = props.currentDay !== undefined ? props.currentDay : 0;
  const currentDayStep =
    props.currentDayStep !== undefined ? props.currentDayStep : 0;
  const displayMode = props.displayMode || "PRESENTATION";

  const renderColorsOptions = () => {
    return (
      <React.Fragment>
        <div className="color-chooser options-editor-item">
          <div className="option-title">Color:</div>
          {["RED", "GREEN", "YELLOW", "WHITE"].map(color => (
            <label
              className="background-color-field"
              onClick={() => setBackground(color)}
            >
              <input
                type="radio"
                name="background-color"
                value="RED"
                checked={background === color}
                readOnly
              />
              <div className={`${color.toLowerCase()}-background`}></div>
            </label>
          ))}
        </div>
      </React.Fragment>
    );
  };

  const renderSymbolsOptions = () => {
    const symbols = isUsingColors
      ? [
          { title: "Bebé", icon: Icons.BABE },
          { title: "Puntos goteo", icon: Icons.BLACK_DOTS },
          { title: "Bebé con goteo", icon: Icons.BABE_RED_DOTS },
          { title: "Ninguno", icon: Icons.NONE }
        ]
      : [
          { title: "Sangrado fuerte", icon: Icons.RED_ICON },
          { title: "Sangrado goteo", icon: Icons.BLACK_DOTS },
          { title: "Nada y seco", icon: Icons.GREEN_ICON },
          { title: "Flujo infértil", icon: Icons.YELLOW_ICON },
          { title: "Posible fertilidad", icon: Icons.BABE },
          { title: "Posible fertilidad con goteo", icon: Icons.BABE_RED_DOTS }
        ];

    return (
      <React.Fragment>
        <div className="symbol-chooser options-editor-item">
          <div className="option-title">Símbolo:</div>
          {symbols.map(s => (
            <div className="icon">
              <Symbol
                title={s.title}
                symbol={symbol}
                setSymbol={setSymbol}
                icon={s.icon}
                isUsingColors={isUsingColors}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  const renderPeakOrDay = () => {
    const items = [
      { text: "X", title: "Día cúspide" },
      { text: "1", title: "Día uno" },
      { text: "2", title: "Día dos" },
      { text: "3", title: "Día tres" },
      { text: null, title: "Ninguno" }
    ];
    return (
      <React.Fragment>
        <div className="peak-or-day-chooser options-editor-item">
          <div className="option-title">Cúspide o día:</div>
          {items.map(i => (
            <div title={i.title} className="box">
              {i.text}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="edit-day">
      <div className="top-bar">
        <div className="title">
          <h2>{`Editar día ${props.day}`}</h2>
        </div>
        <button
          className="close-button"
          onClick={() => {
            props.onClose();
          }}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="edit-day-main-container">
        <div className="all-options">
          {isUsingColors && (
            <div className="options-editor">{renderColorsOptions()}</div>
          )}
          <div className="options-editor">{renderSymbolsOptions()}</div>
          <div className="options-editor">{renderPeakOrDay()}</div>
        </div>
        <div className="viewer">
          {/* <Item
            key={props.idxDay}
            peakDay={props.peakDay}
            day={props.idxDay + 1}
            idxDay={props.idxDay}
            chartType={charType}
            showResult={
              displayMode === "PRESENTATION" ? currentDay > props.idxDay : true
            }
            isCurrentDay={
              displayMode === "PRESENTATION"
                ? currentDay === props.idxDay
                : false
            }
            displayMode={displayMode}
            // postPeak={postPeak}
            shouldRenderPeak={props.shouldRenderPeak}
            currentDayStep={currentDayStep}
            goToDay={props.goToDay}
            goNDaysForward={props.goNDaysForward}
            setShouldRenderPeak={props.setShouldRenderPeak}
            dropDay={props.dropDay}
            addDayOnIdx={props.addDayOnIdx}
          /> */}
        </div>
      </div>
      <div className="control-buttons">
        <button className="ok-button">Aceptar</button>
      </div>
    </div>
  );
}
