document.addEventListener("DOMContentLoaded", function(){
	console.log("Well hi there!")
});

var myPix = new Array("images/cats1.jpg",
"images/cats2.jpg","images/cats3.jpg","images/cats4.jpg",
"images/cats5.jpg","images/cats6.jpg","images/cats7.jpg","images/cats8.jpg",
"images/cats9.jpg","images/cats10.jpg","images/cats11.jpg",
"images/cats12.jpg","images/cats13.jpg","images/cats14.jpg",
"images/cats15.jpg","images/cats16.jpg","images/cats17.jpg",
"images/cats18.jpg","images/cats19.jpg","images/cats20.jpg");



function catEmergency() {
	console.log("Cat pics, at your service.")

	var randomNum = Math.floor(Math.random() * myPix.length);
	var img = document.createElement("img");
	img.src = myPix[randomNum];
	// Get the element with the id "cats"
	var src = document.getElementById("cats");
	//add cat image
	src.appendChild(img);

}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}