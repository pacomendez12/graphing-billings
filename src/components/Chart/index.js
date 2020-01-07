import React, { useState, useEffect, useCallback } from "react";
import Popover from "react-tiny-popover";
import KeyboardEventHandler from "react-keyboard-event-handler";
import {
  ChartTypes,
  DisplayModes,
  BackgroundColors,
  Icons,
  CurrentSelectedDayColor,
  SELECTING_DAY,
  SHOW_DESCRIPTION,
  SHOW_PEAK_OF_YESTERDAY,
  SHOW_COLOR_AND_SYMBOL,
  SHOW_COUNTING_DAY,
  SHOW_RULE,
  SHOW_INTERCOURSE
} from "./Constants";
import Day from "./components/Day/day";
import Item from "./components/Item";
import EditDay from "./components/EditDay";

import "./chart.css";

const getIconForSymbolsAfterPeak = background => {
  switch (background) {
    case BackgroundColors.GREEN:
      return Icons.GREEN_ICON;
    case BackgroundColors.YELLOW:
      return Icons.YELLOW_ICON;
    // case BackgroundColors.RED:
    //   return Icons.RED_ICON;
    default:
      return false;
  }
};

export default function Chart(props) {
  const [showItemEditor, setShowItemEditor] = useState(false);
  const [dayToEdit, setDayToEdit] = useState(null);

  const chartType = props.chartType || ChartTypes.COLORS;
  const currentDay = props.currentDay !== undefined ? props.currentDay : 0;
  const currentDaySubStep =
    props.currentDaySubStep !== undefined ? props.currentDaySubStep : 0;
  const displayMode = props.displayMode || DisplayModes.PRESENTATION;

  const setHotKeysDisabled = useCallback(props.setHotKeysDisabled);

  useEffect(() => {
    if (props.openEditor) {
      setDayToEdit(props.currentDay);
    }
  }, [props.currentDay, props.openEditor]);

  useEffect(() => {
    if (showItemEditor) {
      setHotKeysDisabled(true);
    }
    return () => {
      setHotKeysDisabled(false);
    };
  }, [setHotKeysDisabled, showItemEditor]);

  const updateDayValue = newConf => {
    props.setDayValue(dayToEdit, newConf);
    setShowItemEditor(false);
    props.setOpenEditor(false);
  };

  const openEditor = idx => {
    if (displayMode === DisplayModes.EDIT) {
      setDayToEdit(idx);
      setShowItemEditor(true);
    }
  };

  const renderItems = daysData => {
    return (
      <div className="container-scrollable">
        {daysData.map((dayData, idx) => {
          const itemStatus =
            displayMode === DisplayModes.EDIT
              ? {
                  displayDaySelector: currentDay === idx,
                  displayDescription: true,
                  displayPeak: dayData.symbol.peakDay,
                  displayColorAndSymbol: true,
                  displayCountingDay:
                    dayData.symbol.numberDay !== null &&
                    dayData.symbol.numberDay !== undefined,
                  displayRule: true,
                  displayIntercourse: dayData.symbol.intercourse
                }
              : {
                  displayDaySelector:
                    currentDay === idx && currentDaySubStep === SELECTING_DAY,
                  displayDescription:
                    currentDay >= idx + 1 ||
                    (currentDay === idx &&
                      currentDaySubStep >= SHOW_DESCRIPTION),
                  displayPeak:
                    dayData.symbol.peakDay &&
                    ((currentDay === idx + 1 &&
                      currentDaySubStep >= SHOW_PEAK_OF_YESTERDAY) ||
                      currentDay > idx + 1),
                  displayColorAndSymbol:
                    currentDay >= idx + 1 ||
                    (currentDay === idx &&
                      currentDaySubStep >= SHOW_COLOR_AND_SYMBOL),
                  displayCountingDay:
                    dayData.symbol.numberDay !== null &&
                    dayData.symbol.numberDay !== undefined &&
                    (currentDay >= idx + 1 ||
                      (currentDay === idx &&
                        currentDaySubStep >= SHOW_COUNTING_DAY)),
                  displayRule:
                    currentDay >= idx + 1 ||
                    (currentDay === idx && currentDaySubStep >= SHOW_RULE),
                  displayIntercourse:
                    dayData.symbol.intercourse &&
                    (currentDay >= idx + 1 ||
                      (currentDay === idx &&
                        currentDaySubStep >= SHOW_INTERCOURSE))
                };

          const isPostPeak = idx > props.peakDay;

          return (
            <div
              key={idx}
              className={`column ${
                displayMode === DisplayModes.EDIT && idx === props.currentDay
                  ? "mark-current-day"
                  : ""
              }`}
              style={{
                backgroundColor:
                  displayMode === DisplayModes.PRESENTATION &&
                  props.currentDay === idx &&
                  props.currentDaySubStep === SELECTING_DAY
                    ? CurrentSelectedDayColor
                    : "white",
                cursor: "pointer"
              }}
              onClick={() => {
                // if (displayMode === DisplayModes.PRESENTATION) {
                props.goToDay(idx);
                // }
              }}
              title={
                (displayMode === DisplayModes.PRESENTATION &&
                  `Ir al día ${idx + 1}`) ||
                ""
              }
            >
              <Day
                day={idx + 1}
                idxDay={idx}
                displayMode={displayMode}
                dropDay={props.dropDay}
                addDayOnIdx={props.addDayOnIdx}
                openEditor={openEditor}
              />
              <div
                style={{ height: "100%", position: "relative" }}
                onDoubleClick={() => {
                  openEditor(props.currentDay);
                }}
                title={
                  displayMode === DisplayModes.EDIT
                    ? `Editar día ${idx + 1}`
                    : undefined
                }
              >
                <Item
                  isPostPeak={isPostPeak}
                  chartType={chartType}
                  showPeakDay={itemStatus.displayPeak}
                  annotation={
                    itemStatus.displayDescription && dayData.annotation
                  }
                  countingDay={
                    itemStatus.displayCountingDay && dayData.symbol.numberDay
                  }
                  // icon={itemStatus.displayColorAndSymbol && dayData.symbol.icon}
                  icon={
                    itemStatus.displayColorAndSymbol &&
                    ((chartType === ChartTypes.SYMBOLS &&
                      idx > props.peakDay &&
                      idx < props.peakDay + 4 &&
                      getIconForSymbolsAfterPeak(dayData.symbol.background)) ||
                      dayData.symbol.icon)
                  }
                  iconBackground={
                    itemStatus.displayColorAndSymbol &&
                    dayData.symbol.background
                  }
                  rule={itemStatus.displayRule && dayData.rule}
                  intercourse={
                    itemStatus.displayIntercourse && dayData.symbol.intercourse
                  }
                  showQuestionMarkInSymbol={
                    displayMode === DisplayModes.PRESENTATION &&
                    props.currentDay === idx &&
                    props.currentDaySubStep >= SHOW_DESCRIPTION &&
                    props.currentDaySubStep < SHOW_COLOR_AND_SYMBOL
                  }
                  showQuestionMarkInRule={
                    displayMode === DisplayModes.PRESENTATION &&
                    props.currentDay === idx &&
                    props.currentDaySubStep >= SHOW_DESCRIPTION &&
                    props.currentDaySubStep < SHOW_RULE
                  }
                  currentDaySubStep={currentDaySubStep}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Popover
      isOpen={showItemEditor || props.openEditor}
      position={["top", "right", "left", "bottom"]}
      padding={10}
      disableReposition
      contentLocation={{ top: 0, left: 0 }}
      containerClassName="edit-day-component"
      transitionDuration={0.5}
      content={() => (
        <EditDay
          {...props.daysData[dayToEdit]}
          chartType={props.chartType}
          peakDay={props.peakDay}
          postPeak={dayToEdit > props.peakDay}
          onClose={() => {
            setShowItemEditor(false);
            props.setOpenEditor(false);
          }}
          updateDayValue={updateDayValue}
        />
      )}
    >
      <KeyboardEventHandler
        handleKeys={["enter"]}
        onKeyEvent={(key, e) => {
          if (key === "enter") {
            openEditor(props.currentDay);
          }
        }}
      />
      <div className="chart">
        <div className="left-header">
          <div className="header-day">Día</div>
          <div className="main-content">
            <div className="header-symbol">
              <div className="symbol-or-color rotated-text">
                {props.chartType === ChartTypes.SYMBOLS
                  ? "Símbolo"
                  : "Símbolo y color"}
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
        <div className="columns-container">{renderItems(props.daysData)}</div>
      </div>
    </Popover>
  );
}
