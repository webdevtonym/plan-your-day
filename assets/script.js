// //AS AN employee with a busy schedule
// I WANT to add important events to a daily planner
// SO THAT I can manage my time effectively

//The app should:

// Display the current day at the top of the calendar when a user opens the planner.

// Present timeblocks for standard business hours when the user scrolls down.

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Allow a user to enter an event when they click a timeblock.

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page.

// ------------------------------------------------------------------------------------------------------

//assign the moment function to variable current date
var currentDate = moment();

//Display the current day at the top of the calendar when a user opens the planner.
$("#currentDay").text(currentDate.format("D MM YYYY"));

//-------------------------Define the hours---------------------------------//

//need to create elements and append them to the page.

//array of hours.

var hours = [
  {
    hour: 9,
    displayHour: "9am",
  },
  {
    hour: 10,
    displayHour: "10am",
  },
  {
    hour: 11,
    displayHour: "11am",
  },
  {
    hour: 12,
    displayHour: "12pm",
  },
  {
    hour: 13,
    displayHour: "1pm",
  },
  {
    hour: 14,
    displayHour: "2pm",
  },
  {
    hour: 15,
    displayHour: "3pm",
  },
  {
    hour: 16,
    displayHour: "4pm",
  },
  {
    hour: 17,
    displayHour: "5pm",
  },
];

//-------------------------Create a function to display the divs---------------------------------//

//displays the divs for the columns.
function displayBlock() {
  //what the hour is
  var blockHTML = "";
  for (var i = 0; i < hours.length; i++) {
    var currentHour = hours[i]; // current hour is equal to the the current index
    blockHTML += `<div class = "row">
        <div class= "col-lg-1 col-md-1 time-block">${currentHour.displayHour}</div>
        <textarea id="text-${currentHour.hour}" class="col-lg-10 col-md-10"></textarea>
        <button id="button-${currentHour.hour}" class="fa fa-save col-lg-1 col-md-1 saveBtn"></button>
      </div>`;
  }

  $("#timeDiv").html(blockHTML); //appends the html to the html div

  for (var j = 0; j < hours.length; j++) {
    var currentHour = hours[j]; // current hour is equal to the the current index

    //Is the current hour more than the hour that it's currently checking
    if (moment().hour() > currentHour.hour) {
      //if the current hour now is equal to the current hour in the list and the hour number in
      $(`#text-${currentHour.hour}`).addClass("past");
    } else if (moment().hour() === currentHour.hour) {
      $(`#text-${currentHour.hour}`).addClass("present");
    } else {
      $(`#text-${currentHour.hour}`).addClass("future");
    }
  }
}

displayBlock();

//document.ready JQuery function that will only run the code inside it once everything has loaded.
$(document).ready(function () {
  //for loop that
  for (var i = 0; i < hours.length; i++) {
    var currentHour = hours[i];

    //retrieve value after refresh
    $(`#text-${currentHour.hour}`).val(
      localStorage.getItem(`text-${currentHour.hour}`)
    );
  }

  //eventListener for button click event
  $(".saveBtn").on("click", function (currentHour) {
    //test click even works
    console.log("click even working");

    var hour = $(this).attr("id").split("-")[1];

    //save value to local storage
    localStorage.setItem(`text-${hour}`, $(`#text-${hour}`).val());
  });
});
