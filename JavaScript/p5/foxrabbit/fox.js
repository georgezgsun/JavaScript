function Fox() {
	space = [0,0,0,0,0,0,0,0,0];
	age = 0;  
	hunger = 0;
	this.alive = true;
	deadAge = 20;
	breedAge = 10;

	this.init = function(local) {
		for (var i = 0; i < 9; i++) {
			space[i] = round(local[i]);
		}
		age = space[4] % 100;
		hunger = floor(space[4] / 100);
	}

	this.getEnv = function(local) {
		for (var i = 0; i < 9; i++) {
			local[i] = space[i];
		}
	}

	this.grow = function () {
		age += 1; // age one year old
		hunger -= 1; // get more hungray
		if (age >= deadAge || hunger <= 0) {
			age = 0;
			hunger = 0;
			space[4] = 0;
			return;
		}
		space[4] = hunger * 100 + age;

		this.breed();
		this.hunt();
	}

	this.breed = function(){
		if (age < breedAge || random(0,1) < 0.8) {
			return;
		}

		var hasRoom = false;
		for (var i = 0; i < 9; i++) {
			if (round(space[i]) <= 0) {
				hasRoom = true;
			}
		}
		if (!hasRoom) {
			console.log("No room to breed", age,space);
			age = 0;
			hunger = 0;
			space[4] = 0;
		} else {
			var i=3;
			do {
				i = floor(random(0,9));
			} while (space[i] > 0);  // a location with rabbit or empty location is good for breed a fox
			space[i] = 8*100+1+1000;   // special assign for a new born fox
	//		console.log("breed a baby fox", frameCount,age,space[i]);
		}
	}

	this.hunt = function() {
		var hasRabbit = false;
		for (var i = 0; i < 9; i++) {
			if (space[i] < 0) {
				hasRabbit = true;
			}
		}

		if (hasRabbit) {
			var i = 0;
			do {
				i = floor(random(0,9));
			} while (space[i] >= 0);  // search for rabbit 
			hunger = 8;  // get energy after eat a rabbit
			space[i] = hunger*100 + age + 1000; // the same fox move to new location;
			space[4] = 0; // the previouse location has nothing now
		} else {
			var hasRoom = false;
			for (var i = 0; i < 9; i++) {
				if (space[i] == 0) {
					hasRoom = true;
				}
			}
			if (hasRoom) {
				var i = 0;
				do {
					i = floor(random(0,9));
				} while (space[i] != 0);
				space[i] = space[4] + 1000;   // fox jump to an ampty cell;
				space[4] = 0;
			} else {
				space[4] = 0;  // fox died of no room to hunt;
			}
		}
	}

}
