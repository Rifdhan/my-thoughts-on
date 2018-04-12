"use strict";

const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");

const db = require("./database");
const settings = require("./settings");
const common = require("./common");


// Reference to main window
let mainWindow;

// Creates the main window
function createWindow() {
	// Create browser window and load initial page
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 768,
		webPreferences: {
			devTools: common.devMode
		}
	});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "home", "home.html"),
		protocol: "file:",
		slashes: true
	}));

	// Create menu items
	Menu.setApplicationMenu(Menu.buildFromTemplate([{
			label: "Application",
			submenu: [
				{ label: "Quit", accelerator: "Command+Q", click: () => { app.quit() }}
			]
		}, {
			label: "Edit",
			submenu: [
				{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
				{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
				{ type: "separator" },
				{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
				{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
				{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
				{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
			]
		}
	]));

	// Apply preferences for developer mode
	if(common.devMode) {
		mainWindow.maximize();
		mainWindow.webContents.openDevTools()
	}

	// Window closed
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

// First instance launched
app.on("ready", () => {
	// Create settings file if none exists
	settings.createDefaultSettingsFileIfNotExists();

	// Load data from database
	db.initialize(settings.getDatabaseFilePath());

	// Open the main window
	createWindow();
});

// App opened while already running
app.on("activate", () => {
	// Open a new window if none is open already
	if(mainWindow === null) {
		createWindow();
	}
});

// All windows closed
app.on("window-all-closed", () => {
	app.quit();
});
