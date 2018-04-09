"use strict";

const db = require("../database");


// Store ID of entry being viewed
let entryId;

// Register event handlers
document.getElementById("backButton").addEventListener("click", backPressed);
document.getElementById("editButton").addEventListener("click", editPressed);
document.getElementById("deleteButton").addEventListener("click", deletePressed);

// Called during initial loading
window.onload = () => {
	// Get ID of entry being edited (if none, we are creating a new entry)
	let url = new URL(window.location.href);
	entryId = url.searchParams.get("entry-id");
	if(entryId === undefined || entryId === null) {
		console.error("Couldn't find any entry to populate fields with");		
		return;
	}
	let existingData = db.getInstance().getEntryById(entryId);

	// Pre-populate fields with the data
	document.getElementById("titleBox").textContent = existingData.title;
	document.getElementById("yearBox").textContent = existingData.year;
	document.getElementById("ratingBox").textContent = existingData.rating;
	document.getElementById("commentsBox").textContent = existingData.comments ? existingData.comments : "(none)";
}

// Called when back button pressed
function backPressed() {
	// Go back to previous page
	window.history.back();
}

// Called when edit button pressed
function editPressed() {
	// Save entry ID to local storage
	localStorage.setItem("entry-id", entryId);

	// Go to edit page
	document.location.href = "../edit-entry/edit-entry.html?entry-id=" + entryId;
}

// Called when delete button pressed
function deletePressed() {
	// TODO show confirmation popup
}