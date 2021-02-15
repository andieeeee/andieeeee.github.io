

// Outermost scope, 
// You can access these variables from *anywhere*, in fxns, or in html

// These get created when P5 is initialized
let SLIDERS = {

}

let FLAGS = {
	drawFishDebug: false,
	drawJellyDebug: false,
	drawBlowfishDebug: false
}

// Pause button, also pause on spacebar
let paused = false
document.onkeyup = function(e){
    if(e.keyCode == 32){
        paused = !paused
    }
}



// Store our two Processing instances in the global scope
// so we can refer to them separately when we want
let mainP5 = undefined
let lightmap = undefined


let simulationWidth = 600
let simulationHeight = 360


// an object to hold boids
const fishStartCount = 0
let fishSchool = new FishSchool()

// Hold some jellies
const jellyStartCount = 0
let jellies = []

// Hold some jellies
const blowfishStartCount = 0
let blows = []

// Moving noise into the global scope so its not attached to P5 
let noise = function() {
	console.warn("Noise not yet initialized")
}



// Create a p5 slider, but ALSO, label it and append it to the controls object
function createSlider({label, min,max, defaultValue, step=1}) {
	SLIDERS[label] = mainP5.createSlider(min, max, defaultValue, step)

	let controls = document.getElementById("controls")
	let holder = document.createElement("div");
	holder.className = "slider"
	holder.innerHTML = label

	// Add things to the DOM
	controls.append(holder)
	holder.append(SLIDERS[label].elt)
}

// random point returns a point somewhere in this processing object
function randomPoint(p) {
	return [(Math.random())*p.width, (Math.random())*p.height]
}



// Do setup
document.addEventListener("DOMContentLoaded", function(){
	console.log("Steering")

	// Create the processing instances, and store it in mainP5 and lightmapP5, 
	// where we can access it anywhere in the code

	// Having two *separate canvases means we can draw into one and use it in the other
	
	// Create a new lightmap
	// It holds a red, green and blue channel.  You can draw into it
	lightmap = new Lightmap({
		fadeSpeed: 10, // 0: no fading, 100 instant fade
		drawChannels: function() {
			
			fishSchool.fishes.forEach(fish => lightmap.drawBlurryLight({
				pt: fish.position, 
				channels: [255, 0, 0], 
				intensity: .4,
				size: 1.2
			}))
		}
	})


	mainP5 = new p5(

		// Run after processing is initialized
		function(p) {

			// Set the noise function to P5's noise
			noise = p.noise

			p.setup = () => {

				// Basic setup tasks
				p.createCanvas(simulationWidth, simulationHeight);
				p.colorMode(p.HSL);
				p.background("white")
				


				for (var i = 0; i < jellyStartCount; i++) {
					let pt = new Jellyfish()
					jellies.push(pt)
				}

				for (var i = 0; i < blowfishStartCount; i++) {
					let pt = new Blowfish()
					blows.push(pt)
				}


				// CREATE SLIDERS!!
				createSlider({label:"forceDisplay", min:.1, max: 4, defaultValue: .4, step: .1})
				createSlider({label:"fishCohesion", min:0, max: 200, defaultValue: 50})
				createSlider({label:"fishAlignment", min:0, max: 200, defaultValue: 50})
				createSlider({label:"fishWander", min:0, max: 200, defaultValue: 50})
				
			}

			p.mouseClicked = () => {
				let t = p.millis()*.001

				// Processing likes to greedily respond to *all* mouse events, 
				// even when outside the canvas
				// This code checks to see if we're *actually* in the P5 window before responding
				// Use this code if you implement dragging, too
				// From https://stackoverflow.com/questions/36767196/check-if-mouse-is-inside-div
				
				if (p.canvas.parentNode.querySelector(":hover") == p.canvas) {
					//Mouse is inside element
						
					let mousePos = new Vector(p.mouseX, p.mouseY)
							

					// Make a new boid
					switch(drawMode) {
						case "fish": 
							fishSchool.addFish(mousePos)
							break;
						case "jellyfish": 
							jellies.push(new Jellyfish(mousePos))
							break;
						case "blowfish":
							blows.push(new Blowfish(mousePos))
							break;
							

					}
				} 
			}


			p.draw = () => {
				p.background(210, 70, 60, 1)

				// Not updating the background
				let t = p.millis()*.001
				let dt = p.deltaTime*.001


				// UPDATE! 
				if (!paused) {
					fishSchool.update(t, dt)				
					jellies.forEach(pt => pt.update(t, dt))
					blows.forEach(pt => pt.update(t, dt))
				}
				
				
				// Draw boids
				fishSchool.draw(p)
				if (FLAGS.drawFishDebug) {
					fishSchool.debugDraw(p)
				}
				

				// Draw the jellies
				jellies.forEach(pt => pt.draw(p))
				if (FLAGS.drawJellyDebug) {
					debugDrawJellies(p, t)
				}

				blows.forEach(pt => pt.draw(p))
				if (FLAGS.drawBlowfishDebug) {
					debugDrawBlowfish(p, t)
				}
				

				//Uncomment for the detail window, if you want it
				// p.fill(0, 0, 100, .8)
				// p.noStroke()
				// p.rect(0, 0, 100, 50)
				// p.fill("black")
				// p.text(drawMode, 5, 10)
					
			}
		}, 

	// A place to put the canvas
	document.getElementById("main"));
})
