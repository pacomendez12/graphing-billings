const Electron = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const openAboutWindow = require("electron-about-window").default;
const { app, BrowserWindow, dialog, ipcMain, Menu } = Electron;
if (isDev) {
  require("electron-reload");
}

let mainWindow;
let quitNow = false;

function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 600,
    center: true,
    maximizable: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + "/preload.js"
    },
    icon: __dirname + "/logo1024.png"
  });

  mainWindow.maximize();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "/index.html")}`
  );

  const template = [
    {
      label: "Archivo",
      submenu: [
        {
          label: "Nuevo",
          accelerator: "CmdOrCtrl+n",
          click: () =>
            sendCommandToRenderer("tryNew", {
              cleanData: true
            })
        },
        { label: "Abrir", accelerator: "CmdOrCtrl+o", click: () => openFile() },
        { type: "separator" },
        {
          label: "Guardar",
          accelerator: "CmdOrCtrl+s",
          click: () =>
            sendCommandToRenderer("saveFileCommand", { saveAs: false })
        },
        {
          label: "Guardar Como...",
          accelerator: "CmdOrCtrl+shift+s",
          click: () =>
            sendCommandToRenderer("saveFileCommand", { saveAs: true })
        },
        { type: "separator" },
        {
          label: "Salir",
          accelerator: "CmdOrCtrl+q",
          click: () => sendCommandToRenderer("quitCommand")
        }
      ]
    },
    {
      label: "Edición",
      submenu: [
        {
          label: "Copiar",
          accelerator: "CmdOrCtrl+c",
          selector: "copy:",
          click: () => sendCommandToRenderer("copyCommand")
        },
        {
          label: "Pegar",
          accelerator: "CmdOrCtrl+v",
          selector: "paste:",
          click: () => sendCommandToRenderer("pasteCommand")
        },
        { type: "separator" },
        {
          label: "Editar día",
          click: () => sendCommandToRenderer("editDayCommand")
        },
        {
          label: "Eliminar día",
          click: () => sendCommandToRenderer("deleteDayCommand")
        },
        { type: "separator" },
        {
          label: "Agregar día antes",
          click: () => sendCommandToRenderer("addDayCommand", "BEFORE")
        },
        {
          label: "Agregar día después",
          click: () => sendCommandToRenderer("addDayCommand", "AFTER")
        }
      ]
    },
    // Hide until I can find a solution with browser full screen
    // {
    //   label: "Ver",
    //   submenu: [
    //     {
    //       label: "Iniciar presentación",
    //       accelerator: "f5",
    //       click: () => sendCommandToRenderer("startPresentationCommand")
    //     }
    //   ]
    // },
    {
      label: "Ayuda",
      submenu: [
        {
          label: "Mostrar atajos",
          click: () => sendCommandToRenderer("showSortcutsCommand")
        },
        {
          label: "Acerca de",
          click: () => showAbout()
        },
        { role: "toggledevtools" }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on("close", event => {
    sendCommandToRenderer("quitCommand");
    if (!quitNow) {
      event.returnValue = false;
      event.preventDefault();
      return false;
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.show();
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

ipcMain.on("showMessage", (event, data) => {
  event.returnValue = dialog.showMessageBoxSync(mainWindow, data);
});

ipcMain.on("saveFile", (event, data) => {
  let filePath =
    data.saveAs || data.filePath === null
      ? dialog.showSaveDialogSync(mainWindow, {
          title: "Guardar gráfica",
          properties: ["saveFile"],
          filters: [{ name: "Billings chart", extensions: ["ngs"] }],
          defaultPath: data.filePath || undefined
        })
      : data.filePath;

  let saved = false;
  if (filePath) {
    if (!filePath.endsWith(".ngs")) {
      filePath = `${filePath}.ngs`;
    }
    fs.writeFileSync(filePath, data.content);
    saved = true;
  }

  event.returnValue = {
    saved,
    filePath
  };
});

ipcMain.on("quit", (event, data) => {
  quitNow = true;
  app.quit();
});

const openFile = async () => {
  const files = await dialog.showOpenDialog(mainWindow, {
    title: "Abrir gráfica",
    properties: ["openFile"],
    filters: [
      { name: "Billings chart", extensions: ["ngs"] },
      { name: "All files", extensions: ["*"] }
    ]
  });
  if (files && !files.canceled) {
    const file = files.filePaths[0];

    // Check filesize
    const fileSize = getFilesizeInBytes(file);

    if (fileSize > 1 * 1024 * 1024) {
      dialog.showMessageBoxSync(mainWindow, {
        title: "Error abriendo archivo",
        message: `El archivo '${file}' no es compatible con esta aplicación`,
        type: "error",
        buttons: ["OK"]
      });
    } else {
      const fileContent = fs.readFileSync(file).toString();
      mainWindow.webContents.send("fileOpened", {
        filePath: file,
        content: fileContent
      });
    }
  }
};

const sendCommandToRenderer = (command, data) => {
  mainWindow.webContents.send(command, data);
};

const showAbout = () => {
  openAboutWindow({
    icon_path: __dirname + "/logo1024.png",
    product_name: "Graficador Billings",
    package_json_dir: __dirname + "/..",
    // copyright: "Francisco Méndez",
    homepage: "https://www.woombmexico.com/",
    description: "Herramienta para enseñar a graficar el método Billings",
    license: "GPLv3",
    adjust_window_size: true,
    // win_options?: BrowserWindowOptions;
    use_version_info: false,
    show_close_button: "Cerrar"
  });
};
