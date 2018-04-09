"use strict";

let packageJson = require("../../package.json");

// Register event handlers
document.getElementById("goButton").addEventListener("click", goPressed);
document.getElementById("searchBox").addEventListener("keypress", (event) => {
    if(event.keyCode == 13) {
		event.preventDefault();
		document.getElementById("goButton").click();
	}
});
document.getElementById("addEntryButton").addEventListener("click", addEntryPressed);
document.getElementById("settingsButton").addEventListener("click", settingsPressed);

// Called during initial loading
window.onload = () => {
	// Set version/credits blurb
	document.getElementById("versionAndCredits").textContent =
		"v" + packageJson.version + " by " + packageJson.author;

	// Make the search box in focus
	document.getElementById("searchBox").focus();
}

// Called when search button pressed
function goPressed() {
	// TODO
}

// Called when button to create a new entry pressed
function addEntryPressed() {
	// Go to page to edit a new entry
	document.location.href = "../edit-entry/edit-entry.html";
}

// Called when settings button pressed
function settingsPressed() {
	// TODO
}
