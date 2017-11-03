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
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency-input").val().trim();
    console.log(frequency);
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

    // Store current time in variables
    var currentTime = moment();
    var timeInput = moment(childSnapshot.val().firstTrain, 'HH:mm');
    var trainTime = moment(timeInput).format('HH:mm');

    // Difference between times
    var trainTimeDifference = moment(trainTime, 'HH:mm');
    var trainDifference = moment().diff(moment(trainTimeDifference), 'minutes');

    // Remained of the time
    var trainRemainder = trainDifference % frequency;

    // Minutes until next train
    var minutesAway = frequency - trainRemainder;

    // Next train
    var nextTrain = moment().add(minutesAway, 'minutes');


    // Train variable console logs
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + minutesAway + "</td></tr>");
  });
