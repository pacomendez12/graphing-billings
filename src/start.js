const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const openAboutWindow = require("electron-about-window").default;
require("electron-reload");

const isMac = process.platform === "darwin";

let mainWindow;

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
    icon: __dirname + "/img/logo256.png",
    title: "hola"
  });

  mainWindow.maximize();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  const template = [
    {
      label: "Archivo",
      submenu: [
        { label: "Nuevo", accelerator: "CmdOrCtrl+n", click: () => newFile() },
        { label: "Abrir", accelerator: "CmdOrCtrl+o", click: () => openFile() },
        { type: "separator" },
        {
          label: "Guardar",
          accelerator: "CmdOrCtrl+s",
          click: () => saveFile()
        },
        {
          label: "Guardar Como...",
          accelerator: "CmdOrCtrl+shift+s",
          click: () => saveFileAs()
        },
        { type: "separator" },
        { label: "Salir", accelerator: "CmdOrCtrl+q", click: () => quit() }
      ]
    },
    {
      label: "Edición",
      submenu: [
        { label: "Copiar", accelerator: "ctrl+c" },
        { label: "Pegar", accelerator: "ctrl+v" },
        { label: "Eliminar" }
      ]
    },
    {
      label: "Ver",
      submenu: [
        {
          label: "Iniciar presentación",
          accelerator: "f5",
          click: () => startPresentation()
        }
      ]
    },
    {
      label: "Ayuda",
      submenu: [
        {
          label: "Mostrar atajos",
          click: () => showShortcuts()
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

const newFile = async () => {
  mainWindow.webContents.send("tryNew", {
    cleanData: true
  });
};

const saveFile = () => {
  mainWindow.webContents.send("saveFileCommand", { saveAs: false });
};

const saveFileAs = () => {
  mainWindow.webContents.send("saveFileCommand", { saveAs: true });
};

const quit = () => {
  mainWindow.webContents.send("quitCommand");
};

const showShortcuts = () => {
  mainWindow.webContents.send("showSortcutsCommand");
};

const startPresentation = () => {
  mainWindow.webContents.send("startPresentationCommand");
};

const showAbout = () => {
  openAboutWindow({
    icon_path: __dirname + "/img/logo1024.png",
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
