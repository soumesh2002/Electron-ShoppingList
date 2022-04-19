const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

// listen for app to be ready
app.on("ready", function () {
  mainWindow = new BrowserWindow({});
  // Load HTML file
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", function () {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

// Handling create add function
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add shopping list item",
  });
  // Load HTML file
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // Garbage collection handle
  addWindow.on("close", function () {
    addWindow = null;
  });
}

// create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Items",
      },
      {
        label: "Quit",
        accelerator: process.platform == "win32" ? "Alt+F4" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];
