
var cellSize = 10;
var fields = new Array();
var fox = new Fox();
var rabbit = new Rabbit();
var localEnv = [0, 0, 0, 0, 0, 0, 0, 0];
var totalFox = 0;
var totalRabbit = 0;
var extinctNum = 0;


function setup() {
    createCanvas(
    	50*cellSize,
    	50*cellSize
    	);
    
    for (var i = 0; i < 50; i++) {
    	fields[i] = new Array();
    }
    init();

    background(0);
    frameRate(50);
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
                if (f < -1000) {    // f < 1000 indicate a new move or new born rabbit
                    f += 1000;      // adjust f to allow future grow
                }
    		} else if (f > 0) {
    			totalFox += 1;
    			fill(255,100,100);
                if (f > 1000) {     // f > 1000 indicate a new born or new move fox
                    f -= 1000;      // adjust f to allow future grow
                }
    		} else {
    			f = 0;
    			fill(200,200,200);
    		}
     		rect(i*cellSize,j*cellSize,cellSize,cellSize);
            fields[i][j] = round(f);
    	}
    }
	document.getElementById("info").innerHTML = "Generation:" + frameCount + " Fox:" 
    + totalFox + " Rabbit:" + totalRabbit + " Extinct:" + extinctNum;

    // grow the foxes and rabbits one by one
    for (var i = 0; i < 50; i++) {
    	for (var j = 0; j < 50; j++) {
    		cellGrow(i,j);
    	}
    }

    if (totalRabbit * totalFox == 0) {
        init();
    }
}
 
function cellGrow(i,j) {
	var f = round(fields[i][j]);
    var animal = (f>0) ? fox : rabbit;  // f > 0, it is a fox; f < 0, it is a rabbit
	
    if (f == 0 || f > 1000 || f < -1000) return; // f> 1000 or < -1000 indicate just growed

	prepareAdjacent(i,j);
    animal.init(localEnv);
    animal.grow();
    animal.getEnv(localEnv);
	updateAdjacent(i,j);
}

function prepareAdjacent(x,y) {
	var k = 0;
	for (var i = -1; i <= 1; i++) {
		for(var j = -1; j <= 1; j++) {
    		var ix = i + x;
    		var jy = j + y;
    		localEnv[k] = 999;    // for a cell outside assign a big number 999
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

function init() {
    for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
            var f = random(-1,1);
            if (f > 0.85) {
                totalFox += 1;
                f = 8*100 + 1;  // it is a fox, energy 8, age 1   
            } else if (f<-0.5) {
                totalRabbit += 1;
                f = -1; // it is a rabbit, age 1
            } else {
                f = 0;  // it is an empty cell
            }
            fields[i][j] = round(f);
        }
    }
    extinctNum += 1;
}
