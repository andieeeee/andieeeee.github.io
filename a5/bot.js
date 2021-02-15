class RosieBot {
	constructor() {
		this.playfulness = 0
		this.maxPlayful = 10
		this.satiation = 10
		this.maxFull = 20

		this.grammar = tracery.createGrammar(catGrammar)
		this.grammar.addModifiers(baseEngModifiers)
	}

	respondTo(s) {
		//cuddle with Rosie, she calms down
		if (s.includes("cuddle")) {
			if (this.playfulness === 0)
				return "This cat is all tuckered out!"

			this.playfulness -= 1
			if(this.satiation > 3)
				this.satiation -= Math.floor(Math.random()*3)
			return this.grammar.flatten("#cuddleDesc#")
		}

		//play with Rosie, playfulness increases, gets hungrier 
		if (s.includes("play")) {

			if (this.playfulness >= this.maxPlayful)
				return "Rosie's bouncing off the walls, try to calm her down!"
			if(this.satiation <= 0)
				return "Rosie's too hungry to play!"

			this.playfulness += 1
			this.satiation -= Math.floor(Math.random()*5)
			return this.grammar.flatten("#playDesc#")
		}

		if (s.includes("feed")) {
			if (this.satiation === this.maxFull)
				return "Rosie's so full she could burst! Try something else."

			this.satiation += 1
			return this.grammar.flatten("#foodDesc#")
		}
	}
}