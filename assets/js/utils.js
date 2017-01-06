var random = function(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generateRecentLogin = function() {
	var weekday = new Array();
	weekday[0] = "Sun";
	weekday[1] = "Mon";
	weekday[2] = "Tues";
	weekday[3] = "Wed";
	weekday[4] = "Thur";
	weekday[5] = "Fri";
	weekday[6] = "Sat";
	
	var monthNames = new Array();
	monthNames[0] = "Jan";
	monthNames[1] = "Feb";
	monthNames[2] = "Mar";
	monthNames[3] = "Apr";
	monthNames[4] = "May";
	monthNames[5] = "Jun";
	monthNames[6] = "Jul";
	monthNames[7] = "Aug";
	monthNames[8] = "Sept";
	monthNames[9] = "Oct";
	monthNames[10] = "Nov";
	monthNames[11] = "Dec";
	
	// Generate a recent random date/time within the last three days.
	var date = new Date();
	date.setDate(date.getDate() - random(1,3));
	date.setHours(date.getHours() - random(1, 12));
	var day = date.getDay();
	
	day = weekday[day-1];
	var month = date.getMonth();
	
	var result = day + " " + monthNames[date.getMonth()] + " " + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	return result;
}