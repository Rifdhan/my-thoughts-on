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
document.getElementById("aboutButton").addEventListener("click", aboutPressed);

// Called during initial loading
window.onload = () => {
	// Set version/credits blurb
	document.getElementById("versionAndCredits").textContent =
		"v" + packageJson.version + " by " + packageJson.author;

	// Make the search box in focus
	document.getElementById("searchBox").focus();
}

// Called when search button is pressed
function goPressed() {
	// Get entered query
	let query = document.getElementById("searchBox").value.trim();
	if(query === "") {
		window.alert("Please enter a search query!");
		return;
	}

	// Modify the search query URL parameter
	document.location.href = "../search-results/search-results.html?query=" + encodeURIComponent(query);
}

// Called when button to create a new entry is pressed
function addEntryPressed() {
	// Go to page to edit a new entry
	document.location.href = "../edit-entry/edit-entry.html";
}

// Called when settings button is pressed
function settingsPressed() {
	// Go to settings page
	document.location.href = "../settings/settings.html";
}

// Called when about button is pressed
function aboutPressed() {
	// Go to about page
	document.location.href = "../about/about.html";
}
