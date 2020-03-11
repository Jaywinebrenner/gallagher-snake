// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/border.png";

// gallagher image
var gallagherReady = false;
var gallagherImage = new Image();
gallagherImage.onload = function () {
	gallagherReady = true;
};
gallagherImage.src = "images/gallagher.png";

// watermelon image
var watermelonReady = false;
var watermelonImage = new Image();
watermelonImage.onload = function () {
	watermelonReady = true;
};
watermelonImage.src = "images/watermelon.png";

// Game objects
var gallagher = {
	speed: 256 // movement in pixels per second
};
var watermelon = {};
var watermelonsCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a watermelon
var reset = function () {
	gallagher.x = canvas.width / 2;
	gallagher.y = canvas.height / 2;

	// Throw the watermelon somewhere on the screen randomly
	watermelon.x = 32 + (Math.random() * (canvas.width - 64));
	watermelon.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		gallagher.y -= gallagher.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		gallagher.y += gallagher.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		gallagher.x -= gallagher.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		gallagher.x += gallagher.speed * modifier;
	}

	// Are they touching?
	if (
		gallagher.x <= (watermelon.x + 100)
		&& watermelon.x <= (gallagher.x + 100)
		&& gallagher.y <= (watermelon.y + 100)
		&& watermelon.y <= (gallagher.y + 100)
	) {
		++watermelonsCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (gallagherReady) {
		ctx.drawImage(gallagherImage, gallagher.x, gallagher.y);
	}

	if (watermelonReady) {
		ctx.drawImage(watermelonImage, watermelon.x, watermelon.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Watermelons: " + watermelonsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
