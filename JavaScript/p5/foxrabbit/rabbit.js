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
		
		var hasRoom = false;
		for (var i = 0; i < 9; i++) {
			if (round(space[i]) == 0) {
				hasRoom = true;
			}
		}

		breed();
		jump();
	}

	breed = function() {
		var hasRoom = false;
		if (age < breedAge || random(0,1) < 0.5) {
			return;
		}

		for (var i = 0; i < 9; i++) {
			if (space[i] == 0) hasRoom = true;
		}
		if (!hasRoom) {
			space[4] = 0;
			return;
		}

		var i;
		// randomly find an available adjacent location
		do {
			i = floor(random(0,9));
		} while (space[i] != 0);
		// new breeded rabit age 1;
		space[i] = -1; 
	}

	jump = function() {
		var hasRoom = false;
		for (var i = 0; i < 9; i++) {
			if (round(space[i]) == 0) {
				hasRoom = true;
			}
		}
		if (hasRoom) {
			var i;
			do {
				i = floor(random(0,9));
			} while (round(space[i]) != 0);
			//rabbit jumps to an empty cell
			space[i] = space[4]-1000;
		}
		// current space has no rabbit now   
		space[4] = 0;   		
	}
}
