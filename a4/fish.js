

let fishCount = 0


let Fish = class {
	constructor(school, position, velocity) {
		this.school = school

		// Each boid gets a unique number, 
		//  useful for giving each one its own behavior or label
		this.idNumber = fishCount++ 

		// Catch errors in case I pass something silly as an argument
		if (!Array.isArray(position))
			throw("position needs to be an array, got: " + position)
		if (!Array.isArray(velocity))
			throw("velocity needs to be an array, got:  " + velocity)
		

		this.position = position
		this.velocity = velocity


		// What forces does this boid have?
		// Have as many empty vectors as there are types of forces
		// Because this is where we will store them

		this.forces = {
			cohesion: new Vector(0, 0),
			alignment: new Vector(0, 0),
			separation: new Vector(0, 0),
			selfPropulsion: new Vector(0, 0),
		}


	
	}

	toString() {
		return `Fish${this.idNumber} p:(${this.position.toFixed(2)})  v:(${this.velocity.toFixed(10)})`
	}

	calculateForces(t, dt) {


		// This force pulls the boid toward the center of the flock
		this.forces.cohesion
			.setToDifference(this.position, this.school.center)
			.mult(-.07* SLIDERS.fishCohesion.value())

		// The addition of all forces relative to other boids
		this.forces.separation.mult(0)
		this.school.fishes.forEach(fish => {
			if (fish !== this) {
				let offset = Vector.getDifference(this.position, fish.position)
				let d = offset.magnitude
				let range = 50
				// How close am I to this boid?

				if (d < range) {		
					let pushStrength = -90*(range - d)/range		
					offset.normalize().mult(pushStrength)
					this.forces.separation.add(offset)
				}
			}
		})


		// The boid gets a boost in the direction of the flocks average speed
		this.forces.alignment.copy(this.school.averageVelocity).mult(.5)

		// It also gets a boost in its own direction
		this.forces.selfPropulsion.setToPolar(20, this.velocity.angle)
	}


	// dt: 	How much time has elapsed? 
	// t: 	What is the current time
	update(t, dt) {
		dt = Math.min(1, dt) // Don't ever update more than 1 second at a time, things get too unstable
		

		// Position2 = Position1 + (Elapsed time)*Velocity
 		this.position.addMultiples(this.velocity, dt)

 		// Add up all the forces
 		// Velocity2 = Velocity1 + (Elapsed time)*Force
 		for (let forceKey in this.forces) {
 			let force = this.forces[forceKey]
 			this.velocity.addMultiples(force, dt)
 		}

 		// Clamp the maximum speed, to keep the boids from running too fast (or too slow)
		this.velocity.clampMagnitude(1, 75)

 		// Apply some drag.  This keeps them from getting a runaway effect
 		let drag = 1
 		this.velocity.mult(drag)

 		// Wrap around
 		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight
		
 	}

	debugDraw(p) {

		let forceDisplayMultiple = 1

		// Get a list of all force names, then 
		// for each one, draw the force
		Object.keys(this.forces).map((forceKey, index) => {
			let force = this.forces[forceKey]
 			force.drawArrow({
 				p:p,
 				arrowSize: 6,
 				center: this.position,
 				multiple: forceDisplayMultiple,
 				color: [index*30 + 240, 100, 70, 1],
 			})
		})
	}


	draw(p) {
		p.textSize(this.size*4)
		p.noStroke()
		p.fill(255, 0, 255, 1)
		p.text("🐠", ...this.position)

	}
};