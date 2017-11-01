// TO DO

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


// Updating time live on page in header

var datetime = null,
date = null;

var timeUpdate = function () {
date = moment(new Date())
datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
datetime = $('#current-time')
timeUpdate();
setInterval(timeUpdate, 1000);
});


// Button for adding trains to the display.

$("#add-train-btn").on("click", function () {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm a");
    var frequency = moment($("#frequency-input").val().trim(), "hh:mm").format("hh:mm");

    console.log(firstTrain);
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
    console.log(train.frequency);
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
    var frequency = childSnapshot.val().frequency;


    // TRAIN MATH CHAOS ======================================
    
    // Store current time in variable
    var currentTime = moment().format('h:mm:ss a'); 
    // Take first train time and add frequency to it to get Next Arrival.
    var nextArrival = moment().add(frequency, 'm').format('HH:mm');

    // Take next arrival and subtract current time to get minutes away.

    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log(currentTime);
    console.log(nextArrival);
    
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
