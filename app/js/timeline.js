var x = $('h1');
var body = $("body");
var timelineTable = $("#timeline-table");
var monthRow = $("<tr id='month-row'></tr>");
var dateRow = $("<tr id='date-row'></tr>");
var dayRow = $("<tr id='day-row'></tr>");
var date = new Date();
var day;
var weekDays;
var allWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months;
var allMonths = ["Jan", "Feb", "Mar", "Apr", 
"May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var myDate;

window.onload = function(){
	createTimeline();
}

function createTimeline(){
	date.setDate(date.getDate()-3);
	for (var i = 0; i<=60; i++){
		var monthHolder = $("<th></th>");
		var dateHolder = $("<td></td>");
		var dayHolder = $("<td></td>");
		date.setDate(date.getDate()+1);
		myDate = new Date(date);
		day = myDate.getDate();
		months = myDate.getMonth();
		weekDays = myDate.getDay();
		var weekDay = allWeekDays[weekDays];
		var month = allMonths[months];
		monthHolder.text(month);
		dateHolder.text(day+". ");
		dateHolder.addClass("day" + i);
		dayHolder.text(weekDay);
		monthRow.append(monthHolder);
		dateRow.append(dateHolder);
		dayRow.append(dayHolder);
		timelineTable.append(monthRow, dateRow, dayRow);
	}
	days();
	addEvents();
}

var calendarStart = new Date();
calendarStart.setDate(calendarStart.getDate()-2);
var oneDay = 24*60*60*1000;
var timelineStart;
var events = [
  	{start: new Date(),
   	end: new Date(2016,10,10),
   	name: "Event 1"
  	},
  	{start: new Date(2016,10,5),
  	end: new Date(2016,10,8),
  	name: "Event 2"	
  	},
  	{start: new Date(2016,9,25),
  	end: new Date(2016,10,8),
  	name: "Event 3"	
  	}
];

function days(datum1, datum2){
	var y = Math.ceil((datum1-datum2)/oneDay);
	return y;
}

function addEvents(){
	for(var i in events) {
		var newEventHolder = $("<div></div>");
	   	var x = days((events[i].start), calendarStart);
	   	var z = days((events[i].end), calendarStart);
	   	
	   	var holderStart = document.querySelector(".day"+x);
	   	var holderEnd = document.querySelector(".day"+z);
	   	
	   	if(x < 0){
	   		timelineStart = 0;
	   		newEventHolder.css({
	   			"border-top-right-radius":"10px",
	   			"border-bottom-right-radius":"10px",
	   		});
	   	}
	   	else{
	   		timelineStart = holderStart.getBoundingClientRect().left;
	   		newEventHolder.css({
	   			"border-radius":"10px",
	   		});
	   	}
	   	var timelineEnd = holderEnd.getBoundingClientRect().right;
		var pxWidth = timelineEnd - timelineStart;
		var colors = ["#bc42f4", "#a7f442", "#f4aa42", "#f46b42", "#f4425f", "#f442df", "#e2f442"];
		var colorPicker = colors[Math.floor(Math.random()*6)];

		newEventHolder.text(events[i].name);
		newEventHolder.css({
			"position":"relative",
			"left":timelineStart,
			"width":pxWidth,
			"margin-top":"3px",
			"background-color":colorPicker,
			"color":"black",
			"padding-left":"15px",
			"height":"13px",
			"font-size":"11px",
			"font-family":"Arial"
		});
		body.append(newEventHolder);
	}
}