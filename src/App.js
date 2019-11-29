import React, { useState, useEffect, useRef } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Fullscreen from "react-full-screen";
import logo from "./logo.svg";
import { ReactComponent as CloseIcon } from "./img/close.svg";
import { ReactComponent as StartPresentationIcon } from "./img/start_presentation.svg";

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

const data = {
  title: 'Gráfica con PBI de "Seco" y "Nada"',
  comments: "my comments",
  days: [
    {
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
      symbol: {
        background: "GREEN",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: 1
      },
      annotation: "Nada Seco",
      rule: 3
    },
    {
      symbol: {
        background: "GREEN",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: 2
      },
      annotation: "Nada Seco",
      rule: 3
    },
    {
      symbol: {
        background: "GREEN",
        icon: "BABE",
        intercourse: false,
        peakDay: false,
        numberDay: 3
      },
      annotation: "Nada Seco",
      rule: 3
    },
    {
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
      symbol: {
        background: "GREEN",
        icon: "GREEN_ICON",
        intercourse: false,
        peakDay: false,
        numberDay: null
      },
      annotation: "Nada Seco",
      rule: 2
    }
  ]
};

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentDayStep, setCurrentDayStep] = useState(0);
  const [chartType, setChartType] = useState("COLORS");
  const [displayMode, setDisplayMode] = useState("EDIT");
  const [shouldRenderPeak, setShouldRenderPeak] = useState(false);

  if (!data.days) {
    data.days = [];
  }

  const peakDay = data.days.findIndex(day => day.symbol.peakDay);

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
    if (newPosition <= data.days.length) {
      setCurrentDay(newPosition);
    }
    setCurrentDayStep(0);
  };

  const goToDay = position => {
    if (position >= 0 && position < data.days.length) {
      setCurrentDay(position);
    }
  };

  const onChangeChartType = value => {
    if (value === "SYMBOLS" || value === "COLORS") setChartType(value);
  };
  return (
    <Fullscreen
      enabled={displayMode === "PRESENTATION"}
      onChange={isFull =>
        setDisplayMode(isFull === true ? "PRESENTATION" : "EDIT")
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
              setDisplayMode("PRESENTATION");
            }
          }}
        />

        <div className="presentation-control">
          {displayMode === "EDIT" ? (
            <div
              className="start-presentation"
              onClick={() => {
                setDisplayMode("PRESENTATION");
              }}
            >
              <StartPresentationIcon />
            </div>
          ) : (
            <div
              className="close-presentation"
              onClick={() => {
                setDisplayMode("EDIT");
              }}
            >
              <CloseIcon />
            </div>
          )}
        </div>
        <h1>{data.title}</h1>
        <div>
          <span>Current day:</span>
          <span>{currentDay}</span>
        </div>
        <div>
          <span>Current day step:</span>
          <span>{currentDayStep}</span>
        </div>
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
              value="COLORS"
            >
              Colores
            </RadioButton>
            <RadioButton
              padding={10}
              rootColor="#0066ff"
              pointColor="#0066ff"
              value="SYMBOLS"
            >
              Símbolos
            </RadioButton>
          </RadioGroup>
        </div>
        <Chart
          data={data}
          peakDay={peakDay}
          currentDay={currentDay}
          currentDayStep={currentDayStep}
          chartType={chartType}
          displayMode={displayMode}
          shouldRenderPeak={shouldRenderPeak || displayMode === "EDIT"}
          goToDay={goToDay}
          goNDaysForward={goNDaysForward}
          setShouldRenderPeak={setShouldRenderPeak}
        />
        {displayMode === "PRESENTATION" && (
          <div className="nav-buttons">
            <div
              onClick={() => {
                goBack();
              }}
            >
              Prev
            </div>
            <div
              onClick={() => {
                goForward();
              }}
            >
              Next
            </div>
          </div>
        )}
      </div>
    </Fullscreen>
  );
}

export default App;
