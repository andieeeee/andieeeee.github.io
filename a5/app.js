


// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#app",
		template: `<div id="app">
			<chat-widget :messages="messages" />

			Rosie: 
			{{bot.playfulness}}/{{bot.maxPlayful}} playfulness
			{{bot.satiation}}/{{bot.maxFull}} fullness

			<div id="controls">
				<div>
					<button @click="handleInput('play')">play️</button>
					<button @click="handleInput('cuddle')">cuddle</button>
					<button @click="handleInput('feed')">feed</button>
				</div>
			

			</div>
		</div>`,

		watch: {
			messages() {
				// console.log("messages", this.messages)
			}
		},

		methods: {

			postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
			},

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""

				
				this.handleInput(text)

			},

			handleInput(text) {
				// Does bot things
				this.postToChat(text, "u", true)

				// Add to the messages in chat
			
				// Bot does something
				let output = this.bot.respondTo(text)

				setTimeout(() => {
					this.postToChat(output, "🐱")
					
				}, Math.random()*100 + 400)

			}
		},

		mounted() {

			console.log("Vue app is all set up....")
			setInterval(() => {
				

			}, 1000)

			this.bot.post = (text) =>  {
				// this is now the vue object
				this.postToChat(text, "🐱")
			}

		},
		

		data() {
			return {
				// Store the bot
				bot: new RosieBot(),

				// And the message
				messages: [],

				// And the current thing in the input
				currentInput: ""
			}
		}
	})	
})
