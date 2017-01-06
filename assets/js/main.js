// features
// simply create json object to control all data such as text, speed, delete, newline, then iterate through so that the ideas are all that need to form rather than getting stuck in code
// switch statement for each type of control, i.e. speed, delay, delete, type, newline
// Random delay in between typed characters to simulate human interaction


var consoleData = [
	['type', 100, 'npm install self-destruct-sequence --save'],
	['delay', 3000],
	['delete', 30],
	['type', 100, 'gulp --save-dev'],
	['newline']
]


var testData = [

	{
		'command': 'type',
		'speed': 200,
		'text': 'Hello world',
		'complete': false,
		'delayAfter': 3000
	},
	{
		'command': 'type',
		'speed': 200,
		'text': 'Go again',
		'complete': false, // use setInterval to repeatedly run until complete, then shift() to remove that item from the stack
		'delayAfter': 3000
	}
]

var consoleText = function(instructions) {
	
	var waiting = false;
	
	var flow = setInterval(function(){
		
		if (!waiting) {
			
			var step = instructions[0];
						
			switch(step['command']) {
				case 'type':
					if (!waiting) {
						
						waiting = true;
						var outputString = step['text'].split("");
						
						var typeInterval = setInterval(function(){

							$('#currentText').append(outputString[0]);
							outputString.shift(); // Remove first index of array, each letter as it is added.
							
							if (outputString.length == 0) { // If entire string has been appended, terminate interval.
									clearInterval(typeInterval);
									step['complete'] = true;
									instructions.shift();
								
								setTimeout(function(){ // By setting a timeout on changing the waiting to false, you are keeping everything from running as setInterval continues to loop
									waiting = false;
									
									// Duplicate content and remove ID's to initiate next line
									var $prevLine = $('.current-line');
									var $newLine = $('#console').append($prevLine.clone());
									$prevLine.find('#cursor').remove();
									$prevLine.removeAttr('class');
									$prevLine.find('#currentText').removeAttr('id');
									$newLine.find('#currentText').html('');
									
								}, step['delayAfter']);
							}
							
						}, step['speed']);
					}
				break;
				case 'delete':
				break;
				case 'delay':
				break;
				case 'newline':
				break;
			}
			
			// if the last instruction is the only one left (which has already been completed at this point), stop overall flow
			if (instructions.length == 1) {
				clearInterval(flow);
			}
		}
		
	}, 50);
}
consoleText(testData);