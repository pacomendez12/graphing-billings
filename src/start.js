const { app, BrowserWindow, Menu } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
require("electron-reload");

const isMac = process.platform === "darwin";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideothers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" }
            ]
          }
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: "Archivo",
      submenu: [
        { label: "Nuevo", accelerator: "ctrl+n" },
        { label: "Abrir", accelerator: "ctrl+o" },
        { type: "separator" },
        { label: "Guardar", accelerator: "ctrl+s" },
        { label: "Guardar Como...", accelerator: "ctrl+shift+s" },
        { type: "separator" },
        { label: "Salir", accelerator: "ctrl+q" }
        // { role: isMac ? "close" : "quit" }
      ]
    },
    // { role: 'editMenu' }
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
              }
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" }
            ]
          : [{ role: "close" }])
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          }
        }
      ]
    }
  ];

  // const template = [
  //   {
  //     label: "Archivo",
  //     submenu: [
  //       { role: "Abrir" },
  //       { role: "Guardar" },
  //       { role: "Guardar como..." },
  //       { role: "Salir" }
  //     ]
  //   }
  // ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
