"use strict";

const db = require("../database");


// Store ID of entry being edited, if it has one
let entryId;

// Register event handlers
document.getElementById("cancelButton").addEventListener("click", cancelPressed);
document.getElementById("saveButton").addEventListener("click", savePressed);

// Called during initial loading
window.onload = () => {
	// Get ID of entry being edited (if none, we are creating a new entry)
	let url = new URL(window.location.href);
	entryId = url.searchParams.get("entry-id");
	if(entryId === undefined || entryId === null) {
		return;
	}
	let existingData = db.getInstance().getEntryById(entryId);

	// Pre-populate fields with the data
	document.getElementById("titleBox").value = existingData.title;
	document.getElementById("yearBox").value = existingData.year;
	document.getElementById("ratingBox").value = existingData.rating;
	document.getElementById("commentsBox").value = existingData.comments ? existingData.comments : "";
}

// Called when search button pressed
function cancelPressed() {
	// Go back to previous page
	window.history.back();
}

// Called when button to create a new entry pressed
function savePressed() {
	// Read data from all fields
	let updatedData = {
		title: document.getElementById("titleBox").value.trim(),
		year: document.getElementById("yearBox").value.trim(),
		rating: document.getElementById("ratingBox").value.trim(),
		comments: document.getElementById("commentsBox").value.trim()
	};

	// Make sure all fields are validly populated
	if(updatedData.title === "") {
		window.alert("Please enter a title!");
		return;
	}
	if(updatedData.year === "") {
		window.alert("Please enter a year!");
		return;
	}
	if(updatedData.rating === "") {
		window.alert("Please enter a rating!");
		return;
	}

	// Write data to database
	if(entryId) {
		db.getInstance().updateEntryById(entryId, updatedData);
	} else {
		entryId = db.getInstance().createEntry(updatedData);
	}

	// Navigate to viewing the entry
	document.location.href = "../view-entry/view-entry.html?entry-id=" + entryId;
}
