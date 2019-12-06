import React, { useState, useEffect, useRef } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Fullscreen from "react-full-screen";
import AutosizeInput from "react-input-autosize";
import logo from "./logo.svg";
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
      rule: 3
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
      rule: 3
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
      rule: 3
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
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
      rule: 2
    }
  ]
};

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentDayStep, setCurrentDayStep] = useState(0);
  const [chartType, setChartType] = useState(tmpData.defaultChartType);
  const [displayMode, setDisplayMode] = useState("EDIT");
  const [shouldRenderPeak, setShouldRenderPeak] = useState(false);

  const [displayTitleInput, setDisplayTitleInput] = useState(false);
  const [data, setData] = useState({ title: "", comments: "", days: [] });

  const titleInputRef = useRef(null);

  useEffect(() => {
    setData({ ...tmpData });
  }, []);

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

  const dropDay = idxDay => {
    if (idxDay >= 0 && idxDay < data.days.length) {
      setData(currentData => {
        currentData.days.splice(idxDay, 1);
        if (currentData.days.length === 0) {
          currentData.days.push({
            day: 0,
            symbol: {
              background: "WHITE",
              icon: null,
              intercourse: false,
              peakDay: false,
              numberDay: null
            },
            annotation: "",
            rule: null
          });
        }
        return { ...currentData };
      });
    }
  };

  const addDayOnIdx = idx => {
    if (idx >= 0 && idx <= data.days.length) {
      setData(currentData => {
        currentData.days.splice(idx, 0, {
          day: 0,
          symbol: {
            background: "WHITE",
            icon: null,
            intercourse: false,
            peakDay: false,
            numberDay: null
          },
          annotation: "",
          rule: null
        });

        currentData.days = currentData.days.map((currentDay, idx) => ({
          ...currentDay,
          day: idx + 1
        }));
        return { ...currentData };
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
          value={data.title}
          onChange={event => {
            setData(d => {
              return { ...d, title: event.target.value };
            });
          }}
          onBlur={() => {
            if (displayMode === "EDIT") {
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
            if (displayMode === "EDIT") {
              setDisplayTitleInput(true);
              console.log(titleInputRef);
              setTimeout(() => {
                titleInputRef.current.focus();
              }, 100);
            }
          }}
        >
          {data.title}
        </h2>
      );
    }
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
              <StartPresentationIcon
                className="start-presentation-icon"
                title="Iniciar presentación"
              />
            </div>
          ) : (
            <div
              className="close-presentation"
              onClick={() => {
                setDisplayMode("EDIT");
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
        <div className="main-chart-container">
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
            dropDay={dropDay}
            addDayOnIdx={addDayOnIdx}
          />
        </div>
        {
          <div className="nav-buttons">
            {displayMode === "PRESENTATION" && (
              <div
                className="button"
                onClick={() => {
                  goBack();
                }}
              >
                <Prev className="prev-icon" />
                <span className="text">Anterior</span>
              </div>
            )}
            <textarea
              className="comments"
              title="Escribe tus comentarios aquí"
              value={data.comments}
              spellCheck={false}
              rows="4"
              cols="1"
              onChange={event =>
                setData(prev => ({ ...prev, comments: event.target.value }))
              }
              disabled={displayMode === "PRESENTATION"}
            />
            {displayMode === "PRESENTATION" && (
              <div
                className="button"
                onClick={() => {
                  goForward();
                }}
              >
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
