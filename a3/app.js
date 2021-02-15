
// Outermost scope, 
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let mode = "stars"
let mousePositions = []

function clearCanvas() {
    myP5.background("black")
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("Be gay, do art")

    // Add a processing instance

    // Create the processing instance, and store it in myP5, 
    // where we can access it anywhere in the code
    let element = document.getElementById("main")
    myP5 = new p5(



        // Run after processing is initialized
        function(p) {



            p.setup = () => {

                console.log("Do setup", p)

                p.createCanvas(300, 300);
                p.colorMode(p.HSL);

                // Hue, Sat, Light
                // (0-360,0-100,0-100)
                p.background("black")
            }

            p.mouseDragged = () => {
                let t = p.millis()*.001

                // Save this current mouse position in an array
                // .... but what will you do with an array of vectors?
                mousePositions.push([p.mouseX, p.mouseY])


                switch(mode) {
                    case "stars":
                        let speed = Math.sqrt(p.movedX*p.movedX + p.movedY*p.movedY)
                        let allChar = [".","・","。","゜","✫","✧","*"]
                        let charIndex = Math.floor(Math.random()*allChar.length)
                        let char = allChar[charIndex]

                        // Draw the emoji at the mous
                        p.textSize(2*speed + 6)

                        p.fill(0, 100, 100, .5)
                        p.text(char, p.mouseX + Math.random()*speed, p.mouseY + Math.random()*speed)
                        
                        // Turn back to normal
                        p.blendMode(p.BLEND);
                        break;
                        
                        
                    //got frustrated trying to get the letters to not place on top of each other :/
                        
                    /*case "goodnight":
                        let word = 'goodnight'
                        let wordIndex = 0
                        let everyOther = mousePositions.filter((element, index) => {
                            return (mousePositions.length - index) % 7 === 0;
                        })

                        // Take the last N positions
                        let count = 2
                        let pts = everyOther.slice(everyOther.length - count)

                        // Now we have 5 points, sampled every 7th point, starting at the end
                        // So we can draw "backward" from the end

                        if (pts.length > 0) {
                            for (let i = 0; i < 9; i++) {
                                p.fill(0, 100, 100, .5)
                                p.text(word[wordIndex % word.length], p.mouseX, p.mouseY)
                                wordIndex++
                                console.log(word[wordIndex % word.length])
                            }
                        }
                        // Draw the emoji at the mouse
                        p.textSize(15)

                        // Turn back to normal
                        p.blendMode(p.BLEND);
                        break;*/

                    case "gayfrogs":
                        let frog = "𓆏"
                        let everyOther2 = mousePositions.filter((element, index) => {
                            return (mousePositions.length - index) % 7 === 0;
                        })

                        // Take the last N positions
                        let count2 = 2
                        let pts2 = everyOther2.slice(everyOther2.length - count2)

                        // Now we have 5 points, sampled every 7th point, starting at the end
                        // So we can draw "backward" from the end

                        if (pts2.length > 0) {
                                p.fill(Math.random()*360, 100, 85, .5)
                                p.text(frog, p.mouseX, p.mouseY)
                        }
                        // Draw the emoji at the mouse
                        p.textSize(15)

                        // Turn back to normal
                        p.blendMode(p.BLEND);
                        break;
                        

                    case "funkysculpture":
                        drawBeziers(p, mousePositions)
                        break;

                    default:
                        console.warn("UNKNOWN TOOL:" + mode)
                }

            }

            p.draw = () => {
                // Not updating the background
                let t = p.millis()*.001

                // Draw the text box to label the tool (OPTIONAL)
                p.noStroke()
                p.fill("white")
                p.rect(0, 0, 90, 30)
                p.fill("black")
                p.textSize(10)
                p.text(mode, 5, 20)


            }
        },

        // A place to put the canvas
        element);
})


// Using a lot of mouse positions to do... something
function drawBeziers(p, mousePositions) {
    // Draw some vectors

    // Get every 7th point in the array
    let everyOther = mousePositions.filter((element, index) => {
        return (mousePositions.length - index) % 7 === 0;
    })

    // Take the last N positions
    let count = 2
    let pts = everyOther.slice(everyOther.length - count)

    // Now we have 5 points, sampled every 7th point, starting at the end
    // So we can draw "backward" from the end

    if (pts.length > 0) {
        //p.stroke(0)
        p.fill(Math.random()*255, .25)

        p.beginShape()
        p.vertex(...pts[0])

        // Draw each segment of a bezier curve 
        // (start at index=1!)
        for (var i = 1; i < pts.length; i++) {
            // For this segment, we draw between 2 pts
            let pt0 = pts[i - 1]
            let pt1 = pts[i]
            let d = vector.getSub(pt1, pt0)
            let mag = vector.magnitude(d)
            let n = [-d[1], d[0]]

            let cp0 = pt0.slice(0)
            let cp1 = pt1.slice(0)
            cp0[1] -= mag
            cp1[1] -= mag

            // vector.addTo(cp1, n)
            


            p.bezierVertex(...cp0, ...cp1, ...pt1)
        }

        p.endShape()
    }
}
