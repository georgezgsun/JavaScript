function Fox() {
	space = [0,0,0,0,0,0,0,0,0];	// adjacent environment for the fox
	age = 0;  
	hunger = 0;
	deadAge = 20;
	breedAge = 10;

	this.init = function(local) {
		space = local;
		age = space[4] % 100;
		hunger = floor(space[4] / 100);
	}

	this.getEnv = function(local) {
		local = space;
	}

	this.grow = function () {
		age += 1; // age one year old
		hunger -= 1; // get more hungray
		if (age >= deadAge || hunger <= 0) {
			space[4] = 0;	// die of hunger or aged
		} else {
			space[4] = hunger * 100 + age;  // update the age and hunger index

			this.breed();
			this.hunt();			
		}
	}

	this.breed = function(){
		if (age >= breedAge && random(0,1) > 0.8) {
			if (!this.hasRoom(0)) {
				space[4] = 0;	// die of no room to breed
			} else {
				space[this.searchRoom(0)] = 8*100+1+1000;   // special assign for a new born fox
			}
		}
	}

	this.hunt = function() {
		if (this.hasRoom(1)) {
			hunger = 8;  // get energy after eat a rabbit
			space[this.searchRoom(1)] = hunger*100 + age + 1000; // the same fox move to new location;
			space[4] = 0; // the previouse location has nothing now
		} else {
			if (this.hasRoom(0)) {
				space[this.searchRoom(0)] = space[4] + 1000;   // fox jump to an ampty cell;
			}
			space[4] = 0;  // current cell has no fox anyway after hunting;
		}
	}

	this.hasRoom = function(x) {
		var room = false;
		var bias = (x > 0) ? 1 : 0;	// test adjacent empty or with rabbits; if x > 0, with rabbit only
		for (var i = 0; i < 9; i++) {
			if (round(space[i]+bias) <= 0) {
				room = true;
			}
		}
		return room;
	}

	this.searchRoom = function(x) {
		var i = 0;
		var bias = (x > 0) ? 1 : 0;
		do {
			i = floor(random(0,9));
		} while (space[i]+bias > 0);	// search for room; if x > 0, search for rabbit
		return i;
	}

}
