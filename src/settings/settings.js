"use strict";

const fs = require("fs");

const settings = require("../settings");
const db = require("../database");


// Register event handlers
document.getElementById("updateButton").addEventListener("click", updateDatabasePathPressed);
document.getElementById("databasePathBox").addEventListener("keypress", (event) => {
    if(event.keyCode == 13) {
		event.preventDefault();
		document.getElementById("updateButton").click();
	}
});
document.getElementById("backButton").addEventListener("click", backPressed);

// Called during initial loading
window.onload = () => {
	// Pre-populate database path field
	let databasePath = settings.getDatabaseFilePath();
	document.getElementById("databasePathBox").value = databasePath;
}

// Called when search button is pressed
function backPressed() {
	// Go back to previous page
	window.history.back();
}

// Called when button to update the database path is pressed
function updateDatabasePathPressed() {
	// Check if a path was specified
	let newDatabasePath = document.getElementById("databasePathBox").value.trim();
	if(newDatabasePath === "") {
		window.alert("Please enter a database file path! If you want to cancel your changes, press 'Back' at the bottom.");
		return;
	}

	// Check that the specified file exists
	if(!fs.existsSync(newDatabasePath)) {
		window.alert("No file found at the location specified! Please check the path entered.");
		return;
	}

	// Update database file path in settings
	settings.updateDatabaseFilePath(newDatabasePath);

	// Reload the database from the new file
	db.getInstance().updateDatabaseFilePath(newDatabasePath);
	document.getElementById("statusText").textContent = "Updated database file location!";
}
