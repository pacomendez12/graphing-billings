import React, { useState, useEffect, useRef, useCallback } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Popover from "react-tiny-popover";
import Fullscreen from "react-full-screen";
import _ from "lodash";

import {
  DisplayModes,
  ChartTypes,
  BackgroundColors,
  SELECTING_DAY,
  SHOW_DESCRIPTION,
  SHOW_PEAK_OF_YESTERDAY,
  SHOW_COLOR_AND_SYMBOL,
  SHOW_COUNTING_DAY,
  SHOW_RULE,
  SHOW_INTERCOURSE,
  GO_TO_NEXT_DAY
} from "./Constants";
import { ReactComponent as CloseIcon } from "./img/close.svg";
import { ReactComponent as StartPresentationIcon } from "./img/start_presentation.svg";
import { ReactComponent as QuestionIcon } from "./img/question.svg";
import { ReactComponent as PdfIcon } from "./img/pdf.svg";

import { ReactComponent as Next } from "./img/next.svg";
import { ReactComponent as Prev } from "./img/prev.svg";
import woombIcon from "./img/WOOMB.png";

import Chart from "./components/Chart";
import PdfModal from "./components/PdfChart/PdfModal";
import "./App.css";
import { Icons } from "./components/Chart/Constants";

document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 33: // pageup
    case 34: // pagedown
    //case 35: // end
    //case 36: // home
    //case 37: // left
    //case 38: // up
    //case 39: // right
    //case 40: // down
    case 116: //F5 button
    case 62:
    case 107:
    case 173:
    case 109:
    case 187:
    case 189:
      event.returnValue = false;
      return false;
    default:
  }
};

// 	$(window).bind('mousewheel DOMMouseScroll', function (event) {
// 	       if (event.ctrlKey == true) {
//            alert('disabling zooming');
// 		   event.preventDefault();
// 	       }
// 	});
// });

const tmpData = {
  title: 'Gráfica con PBI de "Seco" y "Nada"',
  comments:
    "Llena la siguiente gráfica con los símbolos o colores correspondientes para cada día.",
  defaultChartType: "COLORS",
  "days": [
    {
      "day": 1,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Sangrado mojado",
      "rule": null
    },
    {
      "day": 2,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Sangrado mojado",
      "rule": null
    },
    {
      "day": 3,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Sangrado mojado",
      "rule": null
    },
    {
      "day": 4,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Goteo mojado",
      "rule": null
    },
    {
      "day": 5,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Goteo seco",
      "rule": null
    },
    {
      "day": 6,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 7,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 8,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 9,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 10,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Nada mojado",
      "rule": null
    },
    {
      "day": 11,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Amarillo mojado",
      "rule": null
    },
    {
      "day": 12,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Claro mojado",
      "rule": null
    },
    {
      "day": 13,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Claro muy mojado",
      "rule": null
    },
    {
      "day": 14,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Claro resbaloso",
      "rule": null
    },
    {
      "day": 15,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE",
        "intercourse": false,
        "peakDay": false,
        "numberDay": null
      },
      "annotation": "Nada resbaloso",
      "rule": null
    },
    {
      "day": 16,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 17,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 18,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 19,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 20,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 21,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 22,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 23,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 24,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 25,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 26,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 27,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 28,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 29,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    },
    {
      "day": 30,
      "symbol": {
        "background": "WHITE",
        "icon": "NONE"
      },
      "annotation": "Nada seco",
      "rule": null
    }
  ]
};

const emptyDay = {
  day: 1,
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

const handleKeys = [
  "left",
  "right",
  "ctrl+plus",
  "ctrl+minus",
  "home",
  "end",
  "pageup",
  "pagedown"
];

const isValidBackground = background => {
  return (
    background === BackgroundColors.GREEN ||
    background === BackgroundColors.RED ||
    background === BackgroundColors.WHITE ||
    background === BackgroundColors.YELLOW
  );
};

const isValidIcon = icon => {
  return (
    icon === Icons.BABE ||
    icon === Icons.BABE_RED_DOTS ||
    icon === Icons.BLACK_DOTS ||
    icon === Icons.GREEN_ICON ||
    icon === Icons.NONE ||
    icon === Icons.RED_ICON ||
    icon === Icons.YELLOW_ICON
  );
};

const isValidNumberDay = day => {
  const dayString = `${day}`;
  return dayString === "1" || dayString === "2" || dayString === "3";
};

const isValidRuleumberDay = rule => {
  const ruleString = `${rule}`;
  return (
    ruleString === "1" ||
    ruleString === "2" ||
    ruleString === "3" ||
    ruleString === "c" ||
    ruleString === "C"
  );
};

const checkDataIntegrityAndFixErrors = data => {
  if (typeof data === "object") {
    if (!data.title || typeof data.title !== "string") {
      data.title = "";
    }
    if (!data.comments || typeof data.comments !== "string") {
      data.comments = "";
    }

    if (!data.defaultChartType || typeof data.defaultChartType !== "string") {
      data.defaultChartType = ChartTypes.COLORS;
    }

    if (
      !data.days ||
      typeof data.days !== "object" ||
      !Array.isArray(data.days)
    ) {
      // days data should be at least array
      console.log("days should be an array");
      return null;
    }

    data.days = data.days.map((day, idx) => {
      return {
        day: idx + 1,
        symbol: {
          background:
            (day.symbol &&
              isValidBackground(day.symbol.background) &&
              day.symbol.background) ||
            BackgroundColors.WHITE,
          icon:
            (day.symbol && isValidIcon(day.symbol.icon) && day.symbol.icon) ||
            null,
          intercourse: (day.symbol && day.symbol.intercourse) || false,
          peakDay: (day.symbol && day.symbol.peakDay) || false,
          numberDay:
            (day.symbol &&
              isValidNumberDay(day.symbol.numberDay) &&
              day.symbol.numberDay) ||
            null
        },
        annotation: day.annotation || "",
        rule:
          (day.rule !== undefined &&
            isValidRuleumberDay(day.rule) &&
            day.rule) ||
          null
      };
    });

    return data;
  }
  return null;
};

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentDaySubStepIdx, setCurrentDaySubStepIdx] = useState(0);
  const [daysSteps, setDaysSteps] = useState([]);
  const [peakDay, setPeakDay] = useState(null);
  const [chartType, setChartType] = useState('COLORS');
  const [displayMode, setDisplayMode] = useState(DisplayModes.EDIT);
  const [displayTitleInput, setDisplayTitleInput] = useState(false);
  const [daysData, setDaysData] = useState([_.cloneDeep(emptyDay)]);
  // const [daysData, setDaysData] = useState(tmpData.days);
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [forceOpenEditor, setForceOpenEditor] = useState(false);
  const [hotKeysDisabled, setHotKeysDisabled] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const [fileModified, setFileModified] = useState(false);
  const [fileSource, setFileSource] = useState(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    try {
      const dataEncoded = window.location.search.substring(3);
      const buff = Buffer.from(dataEncoded, 'base64');
      const dataJson = JSON.parse(buff.toString());

      setChartType(dataJson.defaultChartType || 'COLORS');
      setTitle(dataJson.title || "");
      setComments(dataJson.comments || "");

      const { type } = dataJson;

      const days = dataJson.days ? dataJson.days.map((day, idx) => {
        console.log(day);
        if (type === 'FULL') {
          return {
            day: idx + 1,
            symbol: {
              background: day.background || "WHITE",
              icon: day.icon || "NONE",
              intercourse: day.intercourse !== undefined ? day.intercourse : false,
              peakDay: day.peakDay !== undefined ? day.peakDay : false,
              numberDay: day.numberDay !== undefined ? day.numberDay : null
            },
            annotation: day.annotation,
            rule: day.rule !== undefined ? day.rule : null
          }
        } else {
          return {
            day: idx + 1,
            symbol: {
              background: "WHITE",
              icon: "NONE",
              intercourse: false,
              peakDay: false,
              numberDay: null
            },
            annotation: day,
            rule: null
          }
        }
      }) : [{ ...emptyDay }];

      console.log(days);
      setDaysData(days)
    } catch (e) {

    }
  }, []);

  const setDayValue = useCallback((dayIdx, newValue) => {
    if (dayIdx >= 0) {
      setDaysData(currentDaysData => {
        if (dayIdx < currentDaysData.length) {
          currentDaysData[dayIdx] = newValue;
          return [...currentDaysData];
        }
        return currentDaysData;
      });
    }
  }, []);

  const dropDay = useCallback(
    idxDay => {
      if (!idxDay || typeof idxDay !== "number") {
        idxDay = currentDay;
      }
      if (idxDay >= 0 && idxDay < daysData.length) {
        if (currentDay === daysData.length - 1 && daysData.length > 1) {
          setCurrentDay(daysData.length - 2);
        }

        setDaysData(currentDaysData => {
          currentDaysData.splice(idxDay, 1);
          if (currentDaysData.length === 0) {
            currentDaysData.push(_.cloneDeep(emptyDay));
          }
          currentDaysData = currentDaysData.map((currentDay, idx) => ({
            ...currentDay,
            day: idx + 1
          }));
          return [...currentDaysData];
        });
      }
    },
    [currentDay, daysData.length]
  );

  useEffect(() => {
    if (!title || (title === "" && displayMode === DisplayModes.EDIT)) {
      setDisplayTitleInput(true);
    }
  }, [displayMode, title]);

  useEffect(() => {
    const fileName = fileSource
      ? fileSource
        .split("\\")
        .pop()
        .split("/")
        .pop()
      : null;
    if (fileModified) {
      document.title = `* Graficador Billings${
        fileName ? ` - ${fileName}` : ""
        }`;
      return () => {
        document.title = document.title.substring(2);
      };
    }
  }, [fileModified, fileSource]);

  useEffect(() => {
    const newPeakDay = daysData.findIndex(day => day.symbol.peakDay);
    setPeakDay(newPeakDay);
    const newSteps = daysData.map((day, idx) => {
      const steps = [SELECTING_DAY, SHOW_DESCRIPTION];

      // checking peak day (yesterday)
      if (peakDay !== null) {
        if (peakDay === idx - 1) {
          // if yesterday was peak
          steps.push(SHOW_PEAK_OF_YESTERDAY);
        }
      }
      // Adding color or symbol step
      steps.push(SHOW_COLOR_AND_SYMBOL);

      // Checking counting day
      if (day.symbol.numberDay) {
        steps.push(SHOW_COUNTING_DAY);
      }

      // Adding rule step
      steps.push(SHOW_RULE);

      if (day.symbol.intercourse) {
        steps.push(SHOW_INTERCOURSE);
      }

      steps.push(GO_TO_NEXT_DAY);

      return steps;
    });

    setDaysSteps(newSteps);
  }, [daysData, peakDay]);

  const goBack = (positions = 1) => {
    if (currentDay === daysData.length - 1 && currentDaySubStepIdx > 0) {
      // corner case
      setCurrentDaySubStepIdx(0);
    } else {
      const newPosition = currentDay - positions;
      if (newPosition >= 0) {
        setCurrentDay(newPosition);
      }
      if (currentDaySubStepIdx !== 0) setCurrentDaySubStepIdx(0);
    }
  };

  const goForward = (positions = 1) => {
    if (displayMode === DisplayModes.PRESENTATION) {
      if (daysSteps[currentDay][currentDaySubStepIdx + 1] === GO_TO_NEXT_DAY) {
        if (currentDay < daysData.length - 1) {
          setCurrentDay(c => c + 1);
          if (currentDaySubStepIdx !== 0) setCurrentDaySubStepIdx(0);
        }
      } else {
        setCurrentDaySubStepIdx(c => c + 1);
      }
    } else if (currentDay < daysData.length - 1) {
      setCurrentDay(c => c + 1);
    }
  };

  const goNDaysForward = (positions = 1) => {
    const newPosition = currentDay + positions;
    if (newPosition <= daysData.length) {
      setCurrentDay(newPosition);
    }
    setCurrentDaySubStepIdx(0);
  };

  const goToDay = position => {
    if (position >= 0 && position < daysData.length) {
      setCurrentDay(position);
      setCurrentDaySubStepIdx(0);
    }
  };

  const onChangeChartType = value => {
    if (value === ChartTypes.SYMBOLS || value === ChartTypes.COLORS)
      setChartType(value);
  };

  const addDayOnIdx = idx => {
    if (idx >= 0 && idx <= daysData.length) {
      setDaysData(currentDaysData => {
        currentDaysData.splice(idx, 0, _.cloneDeep(emptyDay));

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
          // style={{ color: "gray" }}
          className="chart-title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
          onBlur={() => {
            if (displayMode === DisplayModes.EDIT && title && title !== "") {
              setDisplayTitleInput(false);
            }
          }}
          placeholder={
            displayMode === DisplayModes.EDIT
              ? "Escribe el título de la gráfica aquí"
              : ""
          }
        />
      );
    } else {
      return (
        <h2
          className="chart-title"
        >
          {title}
        </h2>
      );
    }
  };

  const handleKeyEvents = (key, e) => {
    switch (key) {
      case "left":
        goBack();
        break;
      case "right":
        goForward();
        break;

      case "home":
        setCurrentDay(0);
        break;
      case "end":
        setCurrentDay(daysData.length - 1);
        break;
      case "pageup":
        const newPosUp = currentDay - 5;
        setCurrentDay(newPosUp >= 0 ? newPosUp : 0);
        break;
      case "pagedown":
        const newPosDown = currentDay + 5;
        setCurrentDay(
          newPosDown < daysData.length ? newPosDown : daysData.length - 1
        );
        break;
      default:
    }

    // if (displayMode === DisplayModes.EDIT) {
    //   switch (key) {
    //     case "f5":
    //       setDisplayMode(DisplayModes.PRESENTATION);
    //       break;
    //     case "ctrl+c":
    //       if (displayMode === DisplayModes.EDIT) {
    //         copyToClipboard();
    //       }
    //       break;
    //     case "ctrl+v":
    //       if (displayMode === DisplayModes.EDIT) {
    //         pasteFromClipboard();
    //       }
    //       break;
    //     case "ctrl+plus":
    //       addDayOnIdx(currentDay + 1);
    //       break;
    //     case "ctrl+minus":
    //       dropDay(currentDay);
    //       break;
    //     default:
    //   }
    // }
  };


  const closeExportToPdf = () => {
    setShowExportPdf(false);
  };

  const renderPdfButton = () => {
    return displayMode === DisplayModes.EDIT ? (
      <Popover
        isOpen={showExportPdf}
        position={["top", "right", "left", "bottom"]}
        padding={10}
        disableReposition
        // onClickOutside={closeExportToPdf}
        contentLocation={{ top: 0, left: 0 }}
        containerClassName="export-full"
        transitionDuration={0.5}
        content={() => (
          <PdfModal
            daysData={daysData}
            title={title}
            comments={comments}
            chartType={chartType}
            onClose={closeExportToPdf}
          />
        )}
      >
        {
          <div
            className="pdf-icon"
            onClick={() => setShowExportPdf(true)}
            title="Exportar a PDF"
          >
            <PdfIcon />
          </div>
        }
      </Popover>
    ) : null;
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
          isDisabled={hotKeysDisabled}
          handleKeys={handleKeys}
          onKeyEvent={handleKeyEvents}
        />

        <div className="title-and-controls">
          {renderPdfButton()}
          {renderTitle()}

        </div>
        <div className="main-chart-container">
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
          <Chart
            daysData={daysData}
            peakDay={peakDay}
            currentDay={currentDay}
            currentDaySubStep={
              daysSteps.length > 0
                ? daysSteps[currentDay][currentDaySubStepIdx] || 0
                : 0
            }
            chartType={chartType}
            displayMode={displayMode}
            openEditor={forceOpenEditor}
            goToDay={goToDay}
            goNDaysForward={goNDaysForward}
            dropDay={dropDay}
            addDayOnIdx={addDayOnIdx}
            setDayValue={setDayValue}
            setHotKeysDisabled={setHotKeysDisabled}
            setOpenEditor={setForceOpenEditor}
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
              rows="1"
              cols="1"
              onChange={event => setComments(event.target.value)}
              disabled={true}
              placeholder={
                displayMode === DisplayModes.EDIT
                  ? "Escribe los comentarios sobre la gráfica"
                  : ""
              }
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
