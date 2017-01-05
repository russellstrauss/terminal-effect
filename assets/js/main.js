// function([string1, string2],target id,[color1,color2])    
//consoleText(['Hello World.', 'Console Text', 'Made with Love.'], 'text');


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


function consoleText(words, id, colors) {
	if (colors === undefined) colors = ['#00e500'];
	var visible = true;
	var con = document.getElementById('console');
	var letterCount = 1;
	var x = 1;
	var waiting = false;
	var target = document.getElementById(id)
	target.setAttribute('style', 'color:' + colors[0])
	window.setInterval(function() {

		if (letterCount === 0 && waiting === false) {
			waiting = true;
			target.innerHTML = words[0].substring(0, letterCount)
			window.setTimeout(function() {
				var usedColor = colors.shift();
				colors.push(usedColor);
				var usedWord = words.shift();
				words.push(usedWord);
				x = 1;
				target.setAttribute('style', 'color:' + colors[0])
				letterCount += x;
				waiting = false;
			}, 1000)
		} else if (letterCount === words[0].length + 1 && waiting === false) {
			waiting = true;
			window.setTimeout(function() {
				x = -1;
				letterCount += x;
				waiting = false;
			}, 1000)
		} else if (waiting === false) {
			target.innerHTML = words[0].substring(0, letterCount)
			letterCount += x;
		}
	}, 120);
	
	window.setInterval(function() {
		if (visible === true) {
			con.className = 'console-underscore hidden'
			visible = false;

		} else {
			con.className = 'console-underscore'

			visible = true;
		}
	}, 400);
}

var testData = [

	{
		'command': 'type',
		'speed': 200,
		'text': 'Hello world',
		'complete': false
	},
	{
		'command': 'type',
		'speed': 200,
		'text': 'Go again',
		'complete': false // use setInterval to repeatedly run until complete, then shift() to remove that item from the stack
	}
]

var consoleText2 = function(instructions) {
	
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

							$('#currentLine').append(outputString[0]);
							outputString.shift(); // Remove first index of array, each letter as it is added.
							
							if (outputString.length == 0) { // If entire string has been appended, terminate interval.
								clearInterval(typeInterval);
								step['complete'] = true;
								waiting = false;
								instructions.shift();
								
								$('#currentLine').removeAttr('id');
								var $consolePrefix = $('.console-container').find('.prefix').first();
								$('.console-container').append("<div>" + $consolePrefix.html() + " <span id='currentLine'></span></div>");
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
			
			// if the last instruction (which has already been completed at this point) is the only one left, stop overall flow
			if (instructions.length == 1) {
				clearInterval(flow);
			}
		}
		
	}, 50);
	
	
	
	
	
	
	
	// $.each(instructions, function(index, value) {
	// 	var step = value;
	// 	console.log('loop');
		
	// 	switch(step['command']) {
	// 		case 'type':
	// 			if (!waiting) {
	// 				waiting = true;
	// 				var outputString = step['text'].split("");
	// 				var count = 0;
					
	// 				var typeInterval = setInterval(function(){

	// 					$('#text').append(outputString[0]);
	// 					outputString.shift(); // Remove first index of array, each letter as it is added.
						
	// 					if (outputString.length == 0) { // If entire string has been appended, terminate interval.
	// 						clearInterval(typeInterval);
	// 						step['complete'] = true;
	// 						waiting = false;
	// 						debugger;
	// 					}
	// 					count++;
	// 				}, step['speed']);
	// 			}
				

				
	// 			break;
	// 		case 'delete':
	// 			break;
	// 		case 'delay':
	// 			break;
	// 		case 'newline':
	// 			break;
	// 	}
	// });
}
consoleText2(testData);