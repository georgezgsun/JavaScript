// Water tank
// (160,80,30) for the sand
// (10,100,255) for water

var cells = [];
var cellSize = 5;
var tankHeight = 75;
var tankWidth = 50;
var toolSelect;


function setup() {
    createCanvas(tankWidth*cellSize,tankHeight*cellSize);
	noStroke();

    for (var i = 0; i < tankWidth; i++) {
    	cells[i] = new Array();
    	for (var j = 0; j < tankHeight; j++) {
    		cells[i][j] = 0;	// fill with air in the beginning
    	}
    }
}	

function draw(){
	for (var i = 0; i < tankWidth; i++) {
		for (var j = 0; j < tankHeight; j++) {
			switch (cells[i][j]) {
				case 0 : 	// air
					fill(200,200,200);
					break;
				case 1 : 	// water
					fill(10,100,255);
					break;
				case 2 : 	// sand
					fill(160,80,30);
					break;
				default : 	// metal
					fill(20,20,20);
			}
			rect(i*cellSize,j*cellSize,cellSize,cellSize);
		}
	}

	updateCells();

	var s = document.getElementById("toolbar");
	var val;

	for (var i = 0; i < s.length; i++) {
		if (s[i].checked) {
			val = s[i].value;
		}
	}

	switch (val) {
		case "metal" :
			toolSelect = 3;
			break;
		case "sand" :
			toolSelect = 2;
			break;
		case "water" :
			toolSelect = 1;
			break;
		default :
			toolSelect = 0;
	}
}

function updateCells() {
for (var i = 0; i < tankWidth; i++) {
		for (var j = tankHeight-1; j >= 0; j--) {
			var x = round(random(tankWidth-1));
			var y = round(random(tankHeight-1));
			switch (cells[x][y]) {
				case 0 : 
					airUpdate(x,y);
					break;
				case 1 :
					waterUpdate(x,y);
					break;
				case 2 :
					sandUpdate(x,y);
			}
		}
	}	
}

function airUpdate(x,y) {
	if (y > 0) {
		var c = cells[x][y-1];
		if (c == 1 || c == 2) {
			cells[x][y] = c;
			cells[x][y-1] = 0;
		}
	}
}

function waterUpdate(x,y) {
	if (y > tankHeight-1) {
		return;
	}

	if (y < tankHeight && cells[x][y+1] < 1) {
		cells[x][y] = 0;
		cells[x][y+1] = 1;
		return;
	}

	var l = (x > 0) ? cells[x-1][y] : 3;
	var r = (x < tankWidth-1) ? cells[x+1][y] : 3;

	if (l > 0 && r > 0) {
		return;
	}

	var p = (round(random(0,1)) == 0) ? -1 : 1;
	if (l > 0 && r < 1) {
		p = 1;
	} else if (l < 1 && r > 0) {
		p = -1
	}

	cells[x+p][y] = 1;
	cells[x][y] = 0;
}

function sandUpdate(x,y) {
	if (y >= tankHeight-1) {
		return;
	}

	if (cells[x][y+1] < 2) {
		cells[x][y] = cells[x][y+1];
		cells[x][y+1] = 2;
	}
}

function mouseDragged() {
 	var x = round(mouseX/cellSize);
 	var y = round(mouseY/cellSize);

 	if (x < 0 || x > tankWidth-1 || y < 0 || y > tankHeight-1) {
 		return;
 	}

 	cells[x][y] = toolSelect;
}