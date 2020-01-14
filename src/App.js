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
import Help from "./components/Help";
import PdfPreview from "./components/PdfChart/PdfPreview";
import "./App.css";
import { Icons } from "./components/Chart/Constants";

document.onkeydown = function(event) {
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
  "f5",
  "ctrl+c",
  "ctrl+v",
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
  const [chartType, setChartType] = useState(tmpData.defaultChartType);
  const [displayMode, setDisplayMode] = useState(DisplayModes.EDIT);
  const [displayTitleInput, setDisplayTitleInput] = useState(false);
  // const [daysData, setDaysData] = useState([_.cloneDeep(emptyDay)]);
  const [daysData, setDaysData] = useState(tmpData.days);
  const [title, setTitle] = useState(tmpData.title || "");
  const [comments, setComments] = useState(tmpData.comments || "");
  const [forceOpenEditor, setForceOpenEditor] = useState(false);
  const [hotKeysDisabled, setHotKeysDisabled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const [fileModified, setFileModified] = useState(false);
  const [fileJustOpened, setFileJustOpened] = useState(true);
  const [fileSource, setFileSource] = useState(null);
  const titleInputRef = useRef(null);

  const cleanData = () => {
    setDaysData([_.cloneDeep(emptyDay)]);
    setTitle("");
    setComments("");
    setChartType(ChartTypes.COLORS);
  };

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

  const editDayListener = useCallback(() => {
    console.log("force edit on");
    setForceOpenEditor(true);
  }, []);

  useEffect(() => {
    // for desktop only
    if (window.ipcRenderer) {
      window.ipcRenderer.on("fileOpened", (event, data) => {
        try {
          const contentAsJson = JSON.parse(data.content);

          const fixedData = checkDataIntegrityAndFixErrors(contentAsJson);
          if (fixedData) {
            setCurrentDay(0);
            setCurrentDaySubStepIdx(0);
            setDisplayMode(DisplayModes.EDIT);
            setDaysData(fixedData.days);
            setTitle(fixedData.title);
            setComments(fixedData.comments);
            setChartType(fixedData.defaultChartType);
            setFileSource(data.filePath);
            setFileModified(false);
            setFileJustOpened(true);
          }
        } catch (e) {
          console.log(`ERROR: ${e}`);
          const fileName = data.filePath
            .split("\\")
            .pop()
            .split("/")
            .pop();
          window.ipcRenderer.send("showMessage", {
            title: "Error abriendo archivo",
            message: `El archivo '${fileName}' no es compatible con esta aplicación`,
            type: "error",
            buttons: ["OK"]
          });
        }
      });

      window.ipcRenderer.on("showSortcutsCommand", () => {
        setShowHelp(true);
      });

      window.ipcRenderer.on("startPresentationCommand", () => {
        setDisplayMode(c => {
          if (c === DisplayModes.EDIT) return DisplayModes.PRESENTATION;
        });
      });

      window.ipcRenderer.on("editDayCommand", editDayListener);
    }
  }, [editDayListener]);

  useEffect(() => {
    if (window.ipcRenderer) {
      window.ipcRenderer.on("deleteDayCommand", dropDay);

      return () => {
        window.ipcRenderer.removeListener("deleteDayCommand", dropDay);
      };
    }
  }, [dropDay]);

  const tryNewListener = useCallback(
    (event, data) => {
      let continueCleanData = true;
      console.log("here");
      if (fileModified) {
        const result = window.ipcRenderer.sendSync("showMessage", {
          title: "Gráfica no guardada",
          message: `La gŕafica no ha sido guardada, ¿Deseas eliminarla?`,
          type: "warning",
          buttons: ["Si", "No"]
        });
        if (result !== 0) {
          continueCleanData = false;
        }
      }

      if (data.cleanData && continueCleanData) {
        setCurrentDay(0);
        setCurrentDaySubStepIdx(0);
        setFileSource(null);
        setFileJustOpened(true);
        setFileModified(false);
        cleanData();
      }
    },
    [fileModified]
  );

  const quitListener = useCallback(
    (event, data) => {
      if (window.ipcRenderer) {
        let continueQuit = true;
        const content = {
          title,
          comments,
          defaultChartType: chartType,
          days: daysData
        };
        console.log(`here with fileModified: ${fileModified}`);
        if (fileModified) {
          const result = window.ipcRenderer.sendSync("showMessage", {
            title: "Gráfica no guardada",
            message: `La gŕafica no ha sido guardada, ¿Estás seguro que quieres salir?`,
            type: "warning",
            buttons: ["Si", "No", "Guardar"]
          });
          if (result === 1) {
            continueQuit = false;
          } else if (result === 2) {
            // Guardar
            const result = window.ipcRenderer.sendSync("saveFile", {
              saveAs: fileSource === null ? true : false,
              filePath: fileSource,
              content: JSON.stringify(content, null, 2)
            });
            console.log(result);
            if (!result.saved) {
              continueQuit = false;
            }
          }
        }

        if (continueQuit) {
          window.ipcRenderer.sendSync("quit");
        }
      }
    },
    [chartType, comments, daysData, fileModified, fileSource, title]
  );

  const saveFileListener = useCallback(
    (event, data) => {
      const content = {
        title,
        comments,
        defaultChartType: chartType,
        days: daysData
      };
      if (window.ipcRenderer) {
        const result = window.ipcRenderer.sendSync("saveFile", {
          saveAs: data.saveAs,
          filePath: fileSource,
          content: JSON.stringify(content, null, 2)
        });
        if (result && result.saved) {
          setFileSource(result.filePath);
          setFileJustOpened(true);
          setFileModified(false);
        }
      }
    },
    [title, comments, chartType, daysData, fileSource]
  );

  useEffect(() => {
    if (window.ipcRenderer) {
      window.ipcRenderer.on("tryNew", tryNewListener);
      window.ipcRenderer.on("quitCommand", quitListener);

      return () => {
        window.ipcRenderer.removeListener("tryNew", tryNewListener);
        window.ipcRenderer.removeListener("quitCommand", quitListener);
        if (fileJustOpened) {
          setFileModified(false);
        }
      };
    }
  }, [fileJustOpened, tryNewListener, quitListener]);

  useEffect(() => {
    if (window.ipcRenderer) {
      window.ipcRenderer.on("saveFileCommand", saveFileListener);

      setFileJustOpened(false);

      return () => {
        window.ipcRenderer.removeListener("saveFileCommand", saveFileListener);
        setFileModified(!fileJustOpened);
      };
    }
  }, [fileJustOpened, saveFileListener]);

  const copyToClipboard = useCallback(() => {
    const dayJson = daysData[currentDay];
    window.clipboard.writeText(JSON.stringify(dayJson, null, 2));
  }, [currentDay, daysData]);

  const pasteFromClipboard = useCallback(() => {
    try {
      const clipboardData = window.clipboard.readText();
      const jsonData = JSON.parse(clipboardData);

      if (jsonData && typeof jsonData === "object") {
        const finalJsonData = {
          day: currentDay + 1,
          symbol: {
            background:
              (jsonData.symbol && jsonData.symbol.background) || undefined,
            icon: (jsonData.symbol && jsonData.symbol.icon) || undefined,
            intercourse:
              (jsonData.symbol && jsonData.symbol.intercourse) || undefined,
            peakDay: (jsonData.symbol && jsonData.symbol.peakDay) || undefined,
            numberDay:
              (jsonData.symbol && jsonData.symbol.numberDay) || undefined
          },
          annotation: jsonData.annotation,
          rule: jsonData.rule
        };

        if (finalJsonData.symbol.peakDay === true) {
          finalJsonData.symbol.peakDay = false;
        }
        setDayValue(currentDay, finalJsonData);
      }
    } catch (e) {}
  }, [currentDay, setDayValue]);

  useEffect(() => {
    if (window.clipboard && window.ipcRenderer) {
      window.ipcRenderer.on("copyCommand", copyToClipboard);

      window.ipcRenderer.on("pasteCommand", pasteFromClipboard);

      return () => {
        window.ipcRenderer.removeListener("copyCommand", copyToClipboard);
        window.ipcRenderer.removeListener("pasteCommand", pasteFromClipboard);
      };
    }
  }, [copyToClipboard, pasteFromClipboard]);

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

    if (displayMode === DisplayModes.EDIT) {
      switch (key) {
        case "f5":
          setDisplayMode(DisplayModes.PRESENTATION);
          break;
        case "ctrl+c":
          if (displayMode === DisplayModes.EDIT) {
            copyToClipboard();
          }
          break;
        case "ctrl+v":
          if (displayMode === DisplayModes.EDIT) {
            pasteFromClipboard();
          }
          break;
        case "ctrl+plus":
          addDayOnIdx(currentDay + 1);
          break;
        case "ctrl+minus":
          dropDay(currentDay);
          break;
        default:
      }
    }
  };

  const renderPresentationControl = () => {
    return (
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
              title="Iniciar presentación (F5)"
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
              title="Cerrar presentación (Esc)"
            />
          </div>
        )}
      </div>
    );
  };

  const renderHelpButton = () => {
    return (
      displayMode === DisplayModes.EDIT && (
        <Popover
          isOpen={showHelp}
          position={["top", "right", "left", "bottom"]}
          padding={10}
          disableReposition
          onClickOutside={() => setShowHelp(false)}
          contentLocation={{ top: 0, left: 0 }}
          containerClassName="help-full"
          transitionDuration={0.5}
          content={() => <Help onClose={() => setShowHelp(false)} />}
        >
          {
            <div
              className="help-icon"
              onClick={() => setShowHelp(true)}
              title="Ayuda"
            >
              <QuestionIcon />
            </div>
          }
        </Popover>
      )
    );
  };

  const renderPdfButton = () => {
    return displayMode === DisplayModes.EDIT ? (
      <Popover
        isOpen={showExportPdf}
        position={["top", "right", "left", "bottom"]}
        padding={10}
        disableReposition
        onClickOutside={() => setShowExportPdf(false)}
        contentLocation={{ top: 0, left: 0 }}
        containerClassName="export-full"
        transitionDuration={0.5}
        content={() => (
          <PdfPreview
            daysData={daysData}
            title={title}
            comments={comments}
            chartType={chartType}
            onClose={() => setShowExportPdf(false)}
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
          {renderHelpButton()}
          {renderPdfButton()}
          {/* <div
            style={{
              left: "0px",
              top: "0px",
              position: "absolute",
              backgroundColor: "rgb(0, 91, 175)",
              padding: "6px",
              borderRadius: "50%"
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                style={{ objectFit: "contain" }}
                src={woombIcon}
                alt="logo"
                width="55"
                height="55"
              />
            </div>
          </div> */}
          {renderTitle()}
          {renderPresentationControl()}
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
              disabled={displayMode === DisplayModes.PRESENTATION}
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
