function Rabbit() {
	var space = [0,0,0,0,0,0,0,0,0];
	var age;
	var deadAge = 15;
	var breedAge = 5;

	this.init = function(local) {
		space = local;
		age = -local[4];
	}

	this.getEnv = function(local) {
		local = space;
	}

	this.grow = function () {
		age += 1;   // age one year old
		space[4] = -age;
		
		breed();
		jump();
	}

	breed = function() {
		if (age >= breedAge && random(0,1) > 0.5 && hasRoom()) {
			space[searchRoom()] = -1;	// new breeded rabit age 1;
		}
	}

	jump = function() {
		if (hasRoom()) {
		space[searchRoom()] = space[4]-1000;	//rabbit jumps to an empty cell
		}
		space[4] = 0; 		// current space has no rabbit now   	
	}

	hasRoom = function() {
		var room = false;
		for (var i = 0; i < 9; i++) {
			if (round(space[i]) == 0) {    // search for an empty cell
				room = true;
			}
		}
		return room;
	}

	searchRoom = function() {
		var i;
		do {
			i = floor(random(0,9));
		} while (round(space[i]) != 0);	  // search for an empty cell
		return i;
	}


}
