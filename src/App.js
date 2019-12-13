import React, { useState, useEffect, useRef } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Fullscreen from "react-full-screen";
import { DisplayModes, ChartTypes, BackgroundColors } from "./Constants";
import { ReactComponent as CloseIcon } from "./img/close.svg";
import { ReactComponent as StartPresentationIcon } from "./img/start_presentation.svg";

import { ReactComponent as Next } from "./img/next.svg";
import { ReactComponent as Prev } from "./img/prev.svg";

import Chart from "./components/Chart";
import "./App.css";

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 116: //F5 button
      event.returnValue = false;
      // event.keyCode = 0;
      return false;
    /*     case 82: //R button
      if (event.ctrlKey) {
        event.returnValue = false;
        // event.keyCode = 0;
        return false;
      }
      break; */
    default:
  }
};

const tmpData = {
  title: 'Gráfica con PBI de "Seco" y "Nada"',
  comments:
    "Llena la siguiente gráfica con los símbolos o colores correspondientes para cada día.",
  defaultChartType: "COLORS",
  days: [
    {
      day: 1,
      symbol: {
        background: "RED",
        icon: "RED_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Sangrado Mojado",
      rule: 1
    },
    {
      day: 2,
      symbol: {
        background: "RED",
        icon: "RED_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Sangrado Mojado",
      rule: 1
    },
    {
      day: 3,
      symbol: {
        background: "RED",
        icon: "RED_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Sangrado Mojado",
      rule: 1
    },
    {
      day: 4,
      symbol: {
        background: "RED",
        icon: "BLACK_DOTS",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Goteo Mojado",
      rule: 1
    },
    {
      day: 5,
      symbol: {
        background: "RED",
        icon: "BLACK_DOTS",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Goteo Seco",
      rule: 2
    },
    {
      day: 6,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: 2
    },
    {
      day: 7,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: 2
    },
    {
      day: 8,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: 2
    },
    {
      day: 9,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: 2
    },
    {
      day: 10,
      symbol: {
        background: "WHITE",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Mojado",
      rule: 3
    },
    {
      day: 11,
      symbol: {
        background: "WHITE",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Amarillo Mojado",
      rule: 3
    },
    {
      day: 12,
      symbol: {
        background: "WHITE",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Claro Mojado",
      rule: 3
    },
    {
      day: 13,
      symbol: {
        background: "WHITE",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Claro Muy mojado",
      rule: 3
    },
    {
      day: 14,
      symbol: {
        background: "WHITE",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Claro Resbaloso",
      rule: 3
    },
    {
      day: 15,
      symbol: {
        background: "WHITE",
        icon: "BABE",
        intercourse: false,
        peakDay: true,
        numberDay: null
      },
      annotation: "Nada Resbaloso",
      rule: 3
    },
    {
      day: 16,
      symbol: {
        background: "GREEN",
        icon: "BABE",
        intercourse: true,
        peakDay: false,
        numberDay: 1
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 17,
      symbol: {
        background: "GREEN",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: 2
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 18,
      symbol: {
        background: "GREEN",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: 3
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 19,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 20,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 21,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 22,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 23,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 24,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 25,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 26,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 27,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 28,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 29,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    },
    {
      day: 30,
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: "C"
    }
  ]
};

const emptyDay = {
  day: 0,
  symbol: {
    background: BackgroundColors.WHITE,
    icon: null,
    intercourse: false,
    peakDay: false,
    numberDay: null
  },
  annotation: "",
  rule: null
};

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentDayStep, setCurrentDayStep] = useState(0);
  const [chartType, setChartType] = useState(tmpData.defaultChartType);
  const [displayMode, setDisplayMode] = useState(DisplayModes.EDIT);
  const [shouldRenderPeak, setShouldRenderPeak] = useState(false);

  const [displayTitleInput, setDisplayTitleInput] = useState(false);
  const [daysData, setDaysData] = useState([]);
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");

  const titleInputRef = useRef(null);

  useEffect(() => {
    setDaysData(tmpData.days);
    setTitle(tmpData.title);
    setComments(tmpData.comments);
  }, []);

  const peakDay = daysData.findIndex(day => day.symbol.peakDay);

  const goBack = (positions = 1) => {
    const newPosition = currentDay - positions;
    if (newPosition >= 0) {
      setCurrentDay(newPosition);
    }
    setCurrentDayStep(0);
  };

  const goForward = (positions = 1) => {
    /* const newPosition = currentDay + positions;
    if (newPosition <= data.days.length) {
      setCurrentDay(newPosition);
    } */
    setCurrentDayStep(c => c + 1);
  };

  const goNDaysForward = (positions = 1) => {
    const newPosition = currentDay + positions;
    if (newPosition <= daysData.length) {
      setCurrentDay(newPosition);
    }
    setCurrentDayStep(0);
  };

  const goToDay = position => {
    if (position >= 0 && position < daysData.length) {
      setCurrentDay(position);
    }
  };

  const onChangeChartType = value => {
    if (value === ChartTypes.SYMBOLS || value === ChartTypes.COLORS)
      setChartType(value);
  };

  const dropDay = idxDay => {
    if (idxDay >= 0 && idxDay < daysData.length) {
      setDaysData(currentDaysData => {
        currentDaysData.splice(idxDay, 1);
        if (currentDaysData.length === 0) {
          currentDaysData.push({ ...emptyDay });
        }
        return [...currentDaysData];
      });
    }
  };

  const addDayOnIdx = idx => {
    if (idx >= 0 && idx <= daysData.length) {
      setDaysData(currentDaysData => {
        currentDaysData.splice(idx, 0, { ...emptyDay });

        currentDaysData = currentDaysData.map((currentDay, idx) => ({
          ...currentDay,
          day: idx + 1
        }));

        return [...currentDaysData];
      });
    }
  };

  const renderTitle = () => {
    if (displayTitleInput) {
      return (
        <input
          ref={titleInputRef}
          style={{ color: "gray" }}
          className="chart-title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
          onBlur={() => {
            if (displayMode === DisplayModes.EDIT) {
              setDisplayTitleInput(false);
            }
          }}
        />
      );
    } else {
      return (
        <h2
          className="chart-title"
          onClick={() => {
            if (displayMode === DisplayModes.EDIT) {
              setDisplayTitleInput(true);
              setTimeout(() => {
                titleInputRef.current.focus();
              }, 100);
            }
          }}
        >
          {title}
        </h2>
      );
    }
  };

  const setDayValue = (dayIdx, newValue) => {
    if (dayIdx >= 0 && dayIdx < daysData.length) {
      daysData[dayIdx] = newValue;
      setDaysData([...daysData]);
    }
  };

  return (
    <Fullscreen
      enabled={displayMode === DisplayModes.PRESENTATION}
      onChange={isFull =>
        setDisplayMode(
          isFull === true ? DisplayModes.PRESENTATION : DisplayModes.EDIT
        )
      }
    >
      <div className="App full-screenable-node">
        <KeyboardEventHandler
          handleKeys={["left", "right", "f5"]}
          onKeyEvent={key => {
            if (key === "left") {
              goBack();
            } else if (key === "right") {
              goForward();
            } else if (key === "f5") {
              setDisplayMode(DisplayModes.PRESENTATION);
            }
          }}
        />

        <div className="presentation-control">
          {displayMode === DisplayModes.EDIT ? (
            <div
              className="start-presentation"
              onClick={() => {
                setDisplayMode(DisplayModes.PRESENTATION);
              }}
            >
              <StartPresentationIcon
                className="start-presentation-icon"
                title="Iniciar presentación"
              />
            </div>
          ) : (
            <div
              className="close-presentation"
              onClick={() => {
                setDisplayMode(DisplayModes.EDIT);
              }}
            >
              <CloseIcon
                className="close-presentation-icon"
                title="Cerrar presentación"
              />
            </div>
          )}
        </div>
        {renderTitle()}
        {/* <div>
          <span>Current day:</span>
          <span>{currentDay}</span>
        </div>
        <div>
          <span>Current day step:</span>
          <span>{currentDayStep}</span>
        </div> */}
        <div className="chart-type-buttons">
          <RadioGroup
            onChange={value => onChangeChartType(value)}
            horizontal
            value={chartType}
          >
            <RadioButton
              padding={10}
              rootColor="#0066ff"
              pointColor="#0066ff"
              value={ChartTypes.COLORS}
            >
              Colores
            </RadioButton>
            <RadioButton
              padding={10}
              rootColor="#0066ff"
              pointColor="#0066ff"
              value={ChartTypes.SYMBOLS}
            >
              Símbolos
            </RadioButton>
          </RadioGroup>
        </div>
        <div className="main-chart-container">
          <Chart
            daysData={daysData}
            peakDay={peakDay}
            currentDay={currentDay}
            currentDayStep={currentDayStep}
            chartType={chartType}
            displayMode={displayMode}
            shouldRenderPeak={
              shouldRenderPeak || displayMode === DisplayModes.EDIT
            }
            goToDay={goToDay}
            goNDaysForward={goNDaysForward}
            setShouldRenderPeak={setShouldRenderPeak}
            dropDay={dropDay}
            addDayOnIdx={addDayOnIdx}
            setDayValue={setDayValue}
          />
        </div>
        {
          <div className="nav-buttons">
            {displayMode === DisplayModes.PRESENTATION && (
              <div className="button" onClick={() => goBack()}>
                <Prev className="prev-icon" />
                <span className="text">Anterior</span>
              </div>
            )}
            <textarea
              className="comments"
              title="Escribe tus comentarios aquí"
              value={comments}
              spellCheck={false}
              rows="4"
              cols="1"
              onChange={event => setComments(event.target.value)}
              disabled={displayMode === DisplayModes.PRESENTATION}
            />
            {displayMode === DisplayModes.PRESENTATION && (
              <div className="button" onClick={() => goForward()}>
                <span className="text">Siguiente</span>
                <Next className="next-icon" />
              </div>
            )}
          </div>
        }
      </div>
    </Fullscreen>
  );
}

export default App;
