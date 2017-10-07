// setTimeout (fn, time in ms) --- do the fn in 5000 millisecs time
// setInterval (fn, time in ms) -- is setTimeout on loop; returns a receipt id for that specific timer
// clearInterval (timerId)


//Show current speed: createElement li

var img = document.querySelector('.squirtle'); // update for multiple images
var squirtle = document.querySelector('.squirtle');
var start = document.querySelector('#start-button');
var stop = document.querySelector('#stop-button');
var faster = document.querySelector('#speed-button');
var slower = document.querySelector('#slow-button');
var magicBox = document.querySelector(".magic-box");

squirtle.style.left = 0 + 'px';
// squirtle.style.bottom = Math.random()*(window.innerHeight*0.3) + 'px';
squirtle.style.bottom = '20px';

var timerId = null;
var movement = 10;
var direction = 1;
var speed = 100;
var maxSpeed = 40; // i.e. 1/30 ms
var minSpeed = 300;
var hopLevel = 100;

var checkIfGoingForward = function (direction){
	if (direction>0){
		return true;
	}
	return false;
}

var checkIfImageWithinWindow = function (){
	var position = parseInt(img.style.left);
	if (position < (window.innerWidth - img.width) && position >= 0){
		return true;
	}
	return false;
}



var walk = function(){
	var position = parseInt(img.style.left);
	if(checkIfImageWithinWindow() === true && checkIfGoingForward(direction) === true){
		img.style.left = (position + movement * direction) + 'px';
	} 
	else if (checkIfImageWithinWindow() === false && checkIfGoingForward(direction) === true){
		backwards();
		img.style.left = (position - img.width/2 * direction) + 'px'; // take one step back to get into frame
		img.style.bottom = parseInt(img.style.bottom)*1.2 + 'px';
		direction = -direction;
	}	
	else if (checkIfImageWithinWindow() === true && checkIfGoingForward(direction) === false){
		img.style.left = (position + movement * direction) + 'px';
	} 
	else if (checkIfImageWithinWindow() === false && checkIfGoingForward(direction) === false){
		forwards();
		img.style.left = (position - img.width/2 * direction) + 'px';
		img.style.bottom = parseInt(img.style.bottom)*1.2 + 'px';
		direction = -direction;
	}

	if(window.innerHeight-img.height<parseInt(img.style.bottom)){
		clearInterval(timerId);
	}
}

var backwards = function(){
	squirtle.classList.add('backwards'); //what do you do if this is an id instead
}
var forwards = function(){
	squirtle.classList.remove('backwards');
}

// start.addEventListener("click", function(){
// 	timerId = setInterval(walk,speed); //initiates "start" function for eternity
// 	console.log(timerId);
// });

timerId = setInterval(walk,speed);

stop.addEventListener("click", function(){
	clearInterval(timerId); //clears "start" function
});

faster.addEventListener("click", function(){
	if (speed > maxSpeed){
		speed = speed*0.65;
	};
	clearInterval(timerId);
	timerId = setInterval(walk,speed);

});

slower.addEventListener("click", function(){
	if (speed < minSpeed){
		speed = speed*1.8;
	};
	clearInterval(timerId);
	timerId = setInterval(walk,speed);
});

var toggleEvolve = function(){
	console.log("evolving...")
	squirtle.classList.toggle('evolve');
}

magicBox.addEventListener("mouseover", toggleEvolve);


