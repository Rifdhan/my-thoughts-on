"use strict";

const electron = require("electron");
const path = require("path");
const fs = require("fs");

const common = require("./common");


// Default name for the database file
const DEFAULT_DB_FILE_NAME = "my_thoughts_on_db" + (common.devMode ? "_dev" : "") + ".json";

// Default contents for a new database file
const DEFAULT_DB_FILE_CONTENTS = {
	version: 1,
	data: {}
};

// Get the path to the default database file
function getDefaultDbFilePath() {
	return path.join(common.databaseRootPath, DEFAULT_DB_FILE_NAME);
}

// Initialize a singleton database instance
let db;
function initialize(filePath) {
	db = new Database(filePath);
	global.db = db;
}

// Get the singleton database instance
function getInstance() {
	// Get from current process or remote
	if(db) {
		return db;
	} else {
		return electron.remote.getGlobal("db");
	}
}

// Singleton class to handle database interactions
// Stores an in-memory copy of the database file contents
class Database {
	// Load data from disk or create database file if none exists
	constructor(dbFilePath) {
		// Check if file exists
		if(!fs.existsSync(dbFilePath)) {
			// Create if no file exists
			fs.writeFileSync(dbFilePath, JSON.stringify(DEFAULT_DB_FILE_CONTENTS));
		}

		// Initialize with path
		this.updateDatabaseFilePath(dbFilePath);
	}

	// Sets the path to the database file (may be changed during runtime)
	updateDatabaseFilePath(newDbFilePath) {
		// Store local copy of database file path
		this.dbFilePath = newDbFilePath;

		// Read file contents as in-memory cached copy
		let data = fs.readFileSync(this.dbFilePath);
		this.cache = JSON.parse(data);
	}

	// Create an entry in the database
	createEntry(entry) {
		// Determine next valid ID
		let id = 0;
		Object.keys(this.cache.data).forEach(key => {
			if(parseInt(key) >= id) {
				id++;
			}
		});
		entry.id = id.toString();

		// Write data
		this.updateEntryById(entry.id, entry);

		// Return new entry's ID
		return entry.id;
	}

	// Get an entry from the database by its ID
	getEntryById(id) {
		// Read from cache
		return this.cache.data[id];
	}

	// Update an entry in the database
	updateEntryById(id, entry) {
		// Write into cache
		this.cache.data[id] = entry;

		// Write to disk
		fs.writeFileSync(this.dbFilePath, JSON.stringify(this.cache));
	}

	// Searches for matches based on entry titles
	searchByTitle(searchPhrase) {
		// Filter entire list of data to get only matches
		searchPhrase = searchPhrase.toLowerCase();
		return Object.values(this.cache.data).filter(entry => {
			return (entry.title.toLowerCase().includes(searchPhrase));
		});
	}
}

module.exports = {
	getDefaultDbFilePath,
	initialize,
	getInstance,
	Database
};
