"use strict";

const db = require("../database");


// Query being searched by
let searchQuery;

// List of results displayed on screen
let results;

// Register event handlers
document.getElementById("goButton").addEventListener("click", goPressed);
document.getElementById("searchBox").addEventListener("keypress", (event) => {
    if(event.keyCode == 13) {
		event.preventDefault();
		document.getElementById("goButton").click();
	}
});
document.getElementById("backButton").addEventListener("click", backPressed);

// Called during initial loading
window.onload = () => {
	// Get search query and prepopulate it in the search bar
	let url = new URL(window.location.href);
	searchQuery = decodeURIComponent(url.searchParams.get("query"));
	if(searchQuery === undefined || searchQuery === null) {
		console.error("No search query specified");		
		return;
	}
	document.getElementById("searchBox").value = searchQuery;

	// Get a list of matching entries for the given query and put them in a list
	results = db.getInstance().searchByTitle(searchQuery);
	results = results.map((result, index) => {
		result.index = index;
		addResultEntry(result);
		return result;
	});

	// Check if no results were found
	if(results.length === 0) {
		document.getElementById("statusText").textContent = "No results! Please try a different query";
	}
}

// Creates a new result entry and appends it to the list
function addResultEntry(result) {
	let div = document.createElement("div");
	div.classList = "result";
	div.appendChild(createKeyValuePair("Title", result.title));
	div.appendChild(createKeyValuePair("Year", result.year));
	div.appendChild(createKeyValuePair("Rating", result.rating));
	div.appendChild(createKeyValuePair("Comments", result.comments, "(none)"));
	div.addEventListener("click", () => { resultPressed(result.index) });
	document.getElementById("resultsContainer").appendChild(div);
}

// Creates and returns a pair of key-value nodes in a div
function createKeyValuePair(key, value, defaultValue="") {
	let div = document.createElement("div");

	let pKey = document.createElement("p");
	pKey.classList = "key";
	pKey.textContent = key;
	div.appendChild(pKey);

	let pValue = document.createElement("p");
	pValue.classList = "value";
	pValue.textContent = value ? value : defaultValue;
	div.appendChild(pValue);

	return div;
}

// Called when search button is pressed
function goPressed() {
	// Clear current search results
	let resultsContainer = document.getElementById("resultsContainer");
	while(resultsContainer.firstChild) resultsContainer.removeChild(resultsContainer.firstChild);
	results = undefined;
	document.getElementById("statusText").textContent = "";

	// Get entered query
	let query = document.getElementById("searchBox").value.trim();
	if(query === "") {
		window.alert("Please enter a search query!");
		return;
	}

	// Modify the search query URL parameter
	document.location.href = "./search-results.html?query=" + encodeURIComponent(query);
}

// Called when back button pressed
function backPressed() {
	// Go back to previous page
	window.history.back();
}

// Called when a search result is pressed
function resultPressed(index) {
	// Navigate to details page for this entry
	document.location.href = "../view-entry/view-entry.html?entry-id=" + results[index].id;
}
