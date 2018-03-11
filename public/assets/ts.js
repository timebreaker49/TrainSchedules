$(function () {
    let database = firebase.database();

    database.ref("trainSched").orderByChild("dateAdded")
    .on("child_added", function(snapshot) {

    	let currentData = snapshot.val();

    	var newRow = $("<tr class='tableRow'>");
        //creates a newRow variable with a class tableRow
        var currentName = $("<td class='name'>").text(currentData.name);
        //creates a new <td> for the name inputed
        var currentDest = $("<td class='destanation'>").text(currentData.destination);
        //creates a new <td> for the destination inputed
        var currentFreq = $("<td class='frequency'>").text(currentData.frequency);
        //creates a new <td> for the frequency that was calculated
        var currentArrival = $("<td class='nextArrival'>").text("calculated by function");
        //creates a new <td> for the next train arrival inputed
        var currentTrain = $("<td class='nextTrain'>").text("calculated with function");
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