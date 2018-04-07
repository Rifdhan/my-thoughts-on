"use strict";

const electron = require("electron");
const path = require("path");
const fs = require("fs");


// Default name for the database file
const DEFAULT_DB_FILE_NAME = "my_thoughts_on_db.json";

// Default contents for a new database file
const DEFAULT_DB_FILE_CONTENTS = {
	version: 1,
	data: {}
};

// Path to database file being used
let dbFilePath;

// Will store an in-memory copy of the data
let cache = {};

// Get the path to the default database file
function getDefaultDbFilePath() {
	// Get user data path
	let userDataPath = (electron.app || electron.remote.app).getPath('userData');
	
	// Append file name
    return path.join(userDataPath, DEFAULT_DB_FILE_NAME);
}

// Load data from disk or create database file if none exists
function initialize(filePath) {
	dbFilePath = filePath;

	// Check if file exists
	if(!fs.existsSync(dbFilePath)) {
		// Create if no file exists
		fs.writeFileSync(dbFilePath, JSON.stringify(DEFAULT_DB_FILE_CONTENTS));
	}

	// Read file contents into cache
	let data = fs.readFileSync(dbFilePath);
	cache = JSON.parse(data);
}

// Get an entry from the database by its ID
function getById(id) {
	// Read from cache
	return cache.data[id];
}

// Insert or update an entry in the database
function setById(id, entry) {
	// Write into cache
	cache.data[id] = entry;

	// Write to disk
	fs.writeFileSync(dbFilePath, JSON.stringify(cache));
}

// Searches for matches based on entry titles
function searchByTitle(searchPhrase) {
	// TODO
}

module.exports = {
	getDefaultDbFilePath,
	initialize,
	getById,
	setById,
	searchByTitle
};
