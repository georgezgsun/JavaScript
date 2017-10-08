
var cellSize = 10;
var fields = new Array();
var fox = new Fox();
var rabbit = new Rabbit();
var localEnv = [0, 0, 0, 0, 0, 0, 0, 0];
var totalFox = 0;
var totalRabbit = 0;


function setup() {
    createCanvas(
    	50*cellSize,
    	50*cellSize
    	);
    background(0);
    
    for (var i = 0; i < 50; i++) {
    	fields[i] = new Array();
    	for (var j = 0; j < 50; j++) {
    		var f = random(-1,1);
    		if (f > 0.85) {
    			totalFox += 1;
    			f = 801;
    		} else if (f<-0.5) {
    			totalRabbit += 1;
    			f = -1;
    		} else {
    			f = 0;
    		}
    		fields[i][j] = round(f);
    	}
    }
    frameRate(10);
}

function draw(){
	totalRabbit = 0;
	totalFox = 0;
	for (var i = 0; i < 50; i++) {
    	for (var j = 0; j < 50; j++) {
    		var f = round(fields[i][j]);
    		if (f < 0) {
    			totalRabbit += 1;
    			fill(255,255,0);
                if (f < -1000) {
                    f += 1000;
                }
    		} else if (f > 0) {
    			totalFox += 1;
    			fill(255,100,100);
                if (f > 1000) {
                    f -= 1000;
                }
    		} else {
    			f = 0;
    			fill(200,200,200);
    		}
     		rect(i*cellSize,j*cellSize,cellSize,cellSize);
            fields[i][j] = round(f);
    	}
    }
	document.getElementById("info").innerHTML = "Generation:" + frameCount + "Fox:" + totalFox + "Rabbit:" + totalRabbit;

    // evolve the foxes and rabbits one by one
    for (var i = 0; i < 50; i++) {
    	for (var j = 0; j < 50; j++) {
    		cellGrow(i,j);
    	}
    }
}
 
function cellGrow(i,j) {
	var f = round(fields[i][j]);

	if (f == 0 || f > 1000 || f < -1000) return;

	prepareAdjacent(i,j);
	if (f > 0) {
		fox.init(localEnv);
		fox.grow();
		fox.getEnv(localEnv);
	} else if (f < 0) {
		rabbit.init(localEnv);
		rabbit.grow();
		rabbit.getEnv(localEnv);
	}

	updateAdjacent(i,j);
}

function prepareAdjacent(x,y) {
	var k = 0;
	for (var i = -1; i <= 1; i++) {
		for(var j = -1; j <= 1; j++) {
    		var ix = i + x;
    		var jy = j + y;
    		localEnv[k] = 999;
    		if (ix >= 0 && ix < 50 && jy >= 0 && jy < 50) {
    			localEnv[k] = fields[ix][jy];
    		}
    		k += 1;
		}
	}
}

function updateAdjacent(x,y) {
	var k = 0;
	for (var i = -1; i <= 1; i++) {
		for(var j = -1; j <= 1; j++) {
    		var ix = i + x;
    		var jy = j + y;
    		if (ix >= 0 && ix < 50 && jy >= 0 && jy < 50) {
    			fields[ix][jy] = localEnv[k];
    		} 
    		k += 1;
		}
	}
}
