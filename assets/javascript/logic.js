// TO DO
// Initialize firebase.
// 


// Firebase engaged 
var config = {
    apiKey: "AIzaSyCDz0vMX53PMPph105iFgcjaBFEZeRc2c0",
    authDomain: "train-scheduler-d535a.firebaseapp.com",
    databaseURL: "https://train-scheduler-d535a.firebaseio.com",
    projectId: "train-scheduler-d535a",
    storageBucket: "",
    messagingSenderId: "781081358402"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains to the display.

$("#add-employee-btn").on("click", function () {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var train = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };


    // Uploads employee data to the database
    database.ref().push(train);
    // Logs everything to console
    console.log(train.name);
    console.log(train.destination);
    console.log(train.firstTrain);
    console.log(train.frequncy);
    // Alert
    alert("You've added some trains, son!");
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequncy;
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + firstTrain + "</td><td>" + firstTrain + "</td></tr>");
  });
