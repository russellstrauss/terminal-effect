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

// Greetings, Human. What business do you have in this port? Are you looking for Russell? He is not here. I am his server, how may I help you?
// Press 'h' for help.
// *help menu with different options*
// CD - change directory; I'm sorry, I can't let you do that.
// Ctrl+X to exit
// open files
// list out different pages as file in terminal

var amysMessage = [

	{
		'command': 'type',
		'speed': 200,
		'text': 'Hello, Amy.',
		'delayBefore': 0,
		'delayAfter': 3000
	},
	{
		'command': 'type',
		'speed': 180,
		'text': 'My name is Russell\'s Computer.',
		'delayBefore': 1000,
		'delayAfter': 3000
	},
	{
		'command': 'type',
		'speed': 50,
		'text': '00011101010101110001111000100010000111110101010110101000110111111110111110100101101100110101101111100',
		'delayBefore': 1000,
		'delayAfter': 3000
	},
	{
		'command': 'type',
		'speed': 100,
		'text': 'That is computerese for "I hope you have a lovely day tomorrow."',
		'delayBefore': 1000,
		'delayAfter': 3000
	},
	{
		'command': 'type',
		'speed': 100,
		'text': 'Now if you\'ll excuse me, I\'ll be surfing on a wave of juice I like to call the Internet.',
		'delayBefore': 1000,
		'delayAfter': 3000
	},
	{
		'command': 'type',
		'speed': 0,
		'text': 'Conversation terminated, Ctrl+Q to exit.',
		'delayBefore': 1000,
		'delayAfter': 0
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

consoleText(amysMessage);