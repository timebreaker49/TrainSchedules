$(function () {
    let database = firebase.database();

    database.ref("trainSched").orderByChild("dateAdded")
    .on("child_added", function(snapshot) {

    	let currentData = snapshot.val();

   		var trainFreq = currentData.frequency;

		var firstTrain = moment(currentData.start, "HH:mm").subtract(1, "years");
		console.log("firstTrain: " + firstTrain);

		var diffTime = moment().diff(moment(firstTrain), "minutes");
		console.log("Difftime: " + diffTime);

		var remainder = diffTime % trainFreq;
		console.log(remainder);

		var timeTillTrain = trainFreq - remainder;

		var nextTrain = moment().add(timeTillTrain, "minutes");

    	var newRow = $("<tr class='tableRow'>");
        //creates a newRow variable with a class tableRow
        var currentName = $("<td class='name'>").text(currentData.name);
        //creates a new <td> for the name inputed
        var currentDest = $("<td class='destanation'>").text(currentData.destination);
        //creates a new <td> for the destination inputed
        var currentFreq = $("<td class='frequency'>").text(currentData.frequency);
        //creates a new <td> for the frequency that was calculated
        var currentArrival = $("<td class='nextArrival'>").text(moment(nextTrain).format("h:mm A"));
        //creates a new <td> for the next train arrival inputed
        var currentTrain = $("<td class='minAway'>").text(timeTillTrain);
        //creates a new <td> for the next train that was calculated 

        newRow.append(currentName)
        	.append(currentDest)
        	.append(currentFreq)
        	.append(currentArrival)
        	.append(currentTrain);

        $("tbody").append(newRow);
    })


    $("form").off("submit").on("submit", function (e) {
        e.preventDefault();

        let name = $("#train-name").val().trim();
        let destination = $("#train-destination").val().trim();
        let start = $("#train-start").val().trim();
        let frequency = $("#train-frequency").val().trim();
        //sets the variables to the user input

        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-start").val("");
        $("#train-frequency").val("");
        //clears the input field after each input

        database.ref("trainSched").push({
            "name": name, 
            "destination": destination, 
            "start": start, 
            "frequency": frequency
        });

    })


});