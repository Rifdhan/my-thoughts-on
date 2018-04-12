"use strict";

let shell = require("electron").shell;

let packageJson = require("../../package.json");


// Register event handlers
document.getElementById("backButton").addEventListener("click", backPressed);
document.getElementById("githubLink").addEventListener("click", openGithubLinkExternally);

// Called during initial loading
window.onload = () => {
	// Dynamically populate about text
	document.getElementById("aboutText").textContent =
		"My Thoughts On... is a free and open-source project authored by " + packageJson.author +
		", under the " + packageJson.license + " license. " +
		"You are currently using version " + packageJson.version + " of the app. " +
		"For more details, to submit feedback, or to check for updates to the app, " +
		"please visit the GitHub page linked below.";
}

// Called when search button is pressed
function backPressed() {
	// Go back to previous page
	window.history.back();
}

// Called when the GitHub link is clicked
function openGithubLinkExternally(event) {
	event.preventDefault();
	shell.openExternal(packageJson.homepage);
}
