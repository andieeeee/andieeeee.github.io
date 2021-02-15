
let blowfishCount = 0

// Get the water force at this time and position
function getWaterForce(t, x, y) {
    let scale = .2
    let theta = 20*noise(x*scale*.5, y*scale*.5, t*.07)
    let strength = noise(x*scale, y*scale, t*.1 + 150)
    let r = 100 + 1900*strength*strength
    return Vector.polar(r, theta)

}

// Draw a watermap of the jellies at the current time
function debugDrawBlowfish(p, t) {

    // How many columns and rows of points do we want?
    let tileSize = 20
    let tileX = Math.floor(simulationWidth/tileSize)
    let tileY = Math.floor(simulationHeight/tileSize)

    let drawScale = .04
    for (var i = 0; i < tileX; i++) {
        for (var j = 0; j < tileY; j++) {

            // What point are we at?
            let x = tileSize*(i + .5)
            let y = tileSize*(j + .5)

            // Calculate the force here
            let force = getWaterForce(t, x, y)

            // Draw the current water vector
            p.fill(240, 70, 50)
            p.noStroke()
            p.circle(x, y, 2)
            p.stroke(240, 70, 50, .8)
            p.line(x, y, x + drawScale*force[0], y + drawScale*force[1])
        }
    }
}

// Jellies that are pushed around by a water vectorfield
class Blowfish {
    constructor(position, velocity) {
        // Have an id number
        this.idNumber = blowfishCount++

        if (velocity === undefined)
            velocity = Vector.randomPolar(5)

        if (position === undefined)
            position = new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)

        // Create a random jellyfish... somewhere
        this.position = new Vector(...position)
        this.velocity = new Vector(...velocity)

        // Randomly sized jellyfish
        this.size = 12 + Math.random()*9

        this.waterForce = new Vector(0, 0)
        this.gravity = new Vector(0, 25)
    }


    draw(p) {

        p.textSize(this.size)
        p.noStroke()
        p.fill(255, 0, 255, 1)
        p.text("🐡", ...this.position)

    }


    // Time and delta time
    update(t, dt) {
        this.waterForce = getWaterForce(t, ...this.position)

        this.velocity.addMultiples(this.gravity, dt)

        // Move with the water force, but bigger particles move less
        this.velocity.addMultiples(this.waterForce, dt/this.size)
        this.position.addMultiples(this.velocity, dt)

        this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
        this.position[1] = (this.position[1] + simulationHeight)%simulationHeight



        const maxSpeed = 50
        let speed = this.velocity.magnitude
        if (speed > maxSpeed)
            this.velocity.mult(maxSpeed/speed)

        this.velocity.mult(.99)
    }
}