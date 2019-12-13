import React, { useState } from "react";
import Switch from "react-switch";
import { Icons, ChartTypes, BackgroundColors } from "../Constants";
import { ReactComponent as CloseIcon } from "../../../img/close.svg";
import Symbol from "./components/symbol";
import "./editDay.css";

export default function EditDay(props) {
  const [background, setBackground] = useState(props.symbol.background);
  const [symbol, setSymbol] = useState(props.symbol.icon);
  const [peakDay, setPeakDay] = useState(props.symbol.peakDay);
  const [numberDay, setNumberDay] = useState(props.symbol.numberDay);
  const [intercourse, setIntercourse] = useState(props.symbol.intercourse);
  const [rule, setRule] = useState(props.rule);
  const [annotation, setAnnotation] = useState(props.annotation);

  // console.log(peakDay);
  // console.log(numberDay);
  // console.log(props);
  // console.log(rule);

  const isUsingColors = props.chartType !== ChartTypes.SYMBOLS;

  const renderColorsOptions = () => {
    return (
      <React.Fragment>
        <div className="color-chooser options-editor-item">
          <div className="option-title">Color:</div>
          {[
            BackgroundColors.RED,
            BackgroundColors.GREEN,
            BackgroundColors.YELLOW,
            BackgroundColors.WHITE
          ].map((color, idx) => (
            <label
              key={idx}
              className="background-color-field"
              onClick={() => setBackground(color)}
            >
              <input
                type="radio"
                name="background-color"
                value={color}
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
          {symbols.map((s, idx) => (
            <div className="icon" key={idx}>
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

  const renderPeakOrDayOptions = () => {
    const items = [
      { text: "X", title: "Día cúspide" },
      { text: 1, title: "Día uno" },
      { text: 2, title: "Día dos" },
      { text: 3, title: "Día tres" },
      { text: null, title: "Ninguno" }
    ];
    return (
      <React.Fragment>
        <div className="peak-or-day-chooser options-editor-item">
          <div className="option-title">Cúspide o día de la cuenta:</div>
          {items.map((i, idx) => (
            <div
              key={idx}
              title={i.title}
              className={`box${
                (peakDay && i.text === "X") ||
                (numberDay && i.text === numberDay) ||
                (!numberDay && !peakDay && i.text === null)
                  ? " item-checked"
                  : ""
              }`}
              onClick={() => {
                if (i.text === "X") {
                  setPeakDay(true);
                  setNumberDay(null);
                } else if (i.text === 1 || i.text === 2 || i.text === 3) {
                  setPeakDay(false);
                  setNumberDay(i.text);
                } else {
                  setPeakDay(false);
                  setNumberDay(null);
                }
              }}
            >
              {i.text}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  const renderIntercourseOptions = () => {
    return (
      <React.Fragment>
        <div className="intercourse-chooser options-editor-item">
          <div className="option-title">Relación:</div>
          <Switch onChange={setIntercourse} checked={intercourse} />
        </div>
      </React.Fragment>
    );
  };

  const renderRuleOptions = () => {
    const items = [
      { text: 1, title: "Regla uno" },
      { text: 2, title: "Regla dos" },
      { text: 3, title: "Regla tres" },
      { text: "C", title: "Regla de la cúspide" }
    ];
    return (
      <React.Fragment>
        <div className="rule-chooser options-editor-item">
          <div className="option-title">Regla:</div>
          {items.map((i, idx) => (
            <div
              key={idx}
              title={i.title}
              className={`box${rule && i.text === rule ? " item-checked" : ""}`}
              onClick={() => {
                setRule(i.text);
              }}
            >
              {i.text}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  const renderAppearanceAndSensationOptions = () => {
    return (
      <React.Fragment>
        <div className="appearance-and-sensation options-editor-item">
          <div className="option-title">Apariencia y sensación:</div>
          <input
            type="text"
            value={annotation}
            onChange={e => setAnnotation(e.target.value)}
            placeholder="Anota aquí la sensación y apariencia"
            style={{}}
          />
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
          <div className="options-editor">{renderPeakOrDayOptions()}</div>
          <div className="options-editor">{renderIntercourseOptions()}</div>
          <div className="options-editor">{renderRuleOptions()}</div>
          <div className="options-editor">
            {renderAppearanceAndSensationOptions()}
          </div>
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
        <button
          className="ok-button"
          onClick={() =>
            props.updateDayValue({
              day: props.day,
              symbol: {
                background,
                icon: symbol,
                intercourse,
                peakDay,
                numberDay
              },
              annotation,
              rule
            })
          }
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
