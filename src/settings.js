"use strict";

const electron = require("electron");
const path = require("path");
const fs = require("fs");

const common = require("./common");
const db = require("./database");


// Settings file name
const SETTINGS_FILE_NAME = "settings" + (common.devMode ? "_dev" : "") + ".json";

// Default contents for settings file
const DEFAULT_SETTINGS_FILE_CONTENTS = {
	version: 1,
	db_file_path: db.getDefaultDbFilePath()
}

// Get path to settings file
function getSettingsFilePath() {
	// Get user data path
	let userDataPath = (electron.app || electron.remote.app).getPath("userData");
		
	// Append file name
	return path.join(userDataPath, SETTINGS_FILE_NAME);
}

// Create a settings file with default settings if none exists
function createDefaultSettingsFileIfNotExists() {
	// Check if file exists
	let settingsFilePath = getSettingsFilePath();

	// Check if file exists
	if(!fs.existsSync(settingsFilePath)) {
		// Create if no file exists
		fs.writeFileSync(settingsFilePath, JSON.stringify(DEFAULT_SETTINGS_FILE_CONTENTS));
	}
}

// Read the value for a given key from settings
function readFromSettingsFile(key) {
	// Read data from file
	let settingsFilePath = getSettingsFilePath();
	let data = JSON.parse(fs.readFileSync(settingsFilePath));

	// Extract relevant value and return it
	return data[key];
}

// Get database file path
function getDbFilePath() {
	// Read value from settings file
	return readFromSettingsFile("db_file_path");
}

module.exports = {
	createDefaultSettingsFileIfNotExists,
	getDbFilePath
};
