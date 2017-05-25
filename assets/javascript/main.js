$(document).ready(function() {
    // console.log("ready!");
    // var trainName = '';
    // var destination = '';
    // var firstTrainTime = '';
    // var frequency = '';
    // var nextTrain = '';
    // var nextTrainFormatted = '';
    // var minutesAway = '';
    // var firstTimeConverted = '';
    // var currentTime = '';
    // var diffTime = '';
    // var tRemainder = '';
    // var minutesTillTrain = '';
    // var keyHolder = '';
    // var getKey = '';

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCLUA5NzOozPpoGTm4EmTjnEnojnlJCHrk",
        authDomain: "salad-fingers.firebaseapp.com",
        databaseURL: "https://salad-fingers.firebaseio.com",
        projectId: "salad-fingers",
        storageBucket: "salad-fingers.appspot.com",
        messagingSenderId: "898269381193"
    };
    firebase.initializeApp(config);


    var trainData = firebase.database();

    $('#submit').on('click', function() {

        var trainNameInput = $('#train-name-input').val().trim();
        var destinationInput = $('#destination-input').val().trim();
        var firstTrainTimeInput = moment($("#first-train-input").val().trim(), "HH:mm").subtract(1, "year").format('X');;
        var frequencyInput = $('#frequency-input').val().trim();


        console.log(firstTrainTimeInput)

        var newTrain = {
            train: trainNameInput,
            destination: destinationInput,
            firstTrainTime: firstTrainTimeInput,
            frequency: frequencyInput,
        }

        trainData.ref().push(newTrain);
    });


    // Retrieve new posts as they are added to our database
    trainData.ref().on("child_added", function(snapshot) {
        var train = snapshot.val();
        console.log(train)

        var trainName = train.train;
        var destination = train.destination;
        var trainTime = train.firstTrainTime;
        var frequency = train.frequency;

        console.log('trainName: ' + trainName)
        console.log('destination: ' + destination)
        console.log('trainTime: ' + trainTime)
        console.log('frequency: ' + frequency)

        var diffTime = moment().diff(moment.unix(trainTime), "minutes");
        var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % frequency;
        var minutesAway = frequency - timeRemainder;

        var nextTrain = moment().add(minutesAway, "m").format("hh:mm A");


        console.log('diffTime: ' + diffTime)
        console.log('timeRemainder: ' + timeRemainder)
        console.log('minutesAway: ' + minutesAway)
        console.log('nextTrain: ' + nextTrain)

        console.log('_____________')

        var tableRow = $('<tr>');


        var trainNameOutput = $('<td>').html(trainName);
        tableRow.append(trainNameOutput);

        var destinationOutput = $('<td>').html(destination);
        tableRow.append(destinationOutput);

        var frequencyOutput = $('<td>').html(frequency);
        tableRow.append(frequencyOutput);

        var nextTrainOutput = $('<td>').html(nextTrain);
        tableRow.append(nextTrainOutput);

        var minutesAwayOutput = $('<td>').html(minutesAway);
        tableRow.append(minutesAwayOutput);


        $("#table-row").append(tableRow);
    });






});
