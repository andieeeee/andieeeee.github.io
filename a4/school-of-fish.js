// Track a bunch of boids

class FishSchool {
	constructor() {
		this.fishes = []
		this.averageVelocity = new Vector(0, 0)
		this.center = new Vector(0, 0)

		for (var i = 0; i < fishStartCount; i++) {
			this.addFish()
		}

	}

	// Create a boid at this position (or if none, )
	addFish(position, velocity) {
		if (!position)
			position = Vector.random([0,simulationWidth],[0,simulationHeight])
		if (!velocity)
			velocity = Vector.randomPolar(50)

		let fish = new Fish(this, position, velocity)
		this.fishes.push(fish)
	}


	update(t, dt) {


		// Update the flock data 
		
		// Set the center to the average of all boids, for cohesion

		this.center = Vector.average(this.fishes.map(b => b.position))
		

		// Set the average velocity (add them all up, divide by the size)
		this.averageVelocity = Vector.average(this.fishes.map(b => b.velocity))



		// // The boids need their flock in order to calculate forces
		this.fishes.forEach(b => b.calculateForces(t, dt))

		// // Update each boid
		this.fishes.forEach(b => b.update(t, dt))
	}

	draw(p) {
		this.fishes.forEach(fish => fish.draw(p))
	}

	debugDraw(p) {
		// Flock data
		p.noFill()
		p.stroke(0, 100, 40)
		p.circle(...this.center, 5)

		p.strokeWeight(5)
		this.averageVelocity.drawArrow({
			p:p,
			arrowSize: 14,
			color: [0, 100, 20, .3],
			multiple: 4,
			center: this.center
		})

		p.strokeWeight(1)
		this.fishes.forEach(b => b.debugDraw(p))
	}

}

