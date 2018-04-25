var ball = { 
			speed: 5, 
			x: 350, 
			y: 245, 
			directionX: 1, 
			directionY: 1 
};

var gameData = {
				score: 0,
				level: 0,
				hits: 0
}

$(function(){
	setInterval(loop, 1000/60);



	$("#paddle").draggable({
		axis: "y",
		containment: "parent"
	});



	$(document).keydown(function(e){
		controller = e.key.toLowerCase();
		playerInput(controller);
	});
});



function playerInput(controller){

	if(controller === 'w'){
		movePaddleUp();
	}else if(controller === 's'){
		movePaddleDown();
	}
}

function loop(){
	console.log("Hits: " + gameData.hits);
	console.log("Score: " + gameData.score);
	console.log("Level: " + gameData.level)
	ballMovement();
}


function ballMovement(){
	var detector = collisionConfig();
	var arenaConfig = arenaData();
	var ballConfig = ballData();


	if (detector.ballY > (arenaConfig.gameHeight - ballConfig.height)){
		ball.directionY = -1;
	}
	
	if (detector.ballY < 0) {
		ball.directionY = 1;
	}
	
	if (detector.ballX > (arenaConfig.gameWidth - 20)){


		
		gameData.hits += 1;
		gameData.score += 1;

		var score = document.querySelector('#score');
		score.textContent = "Score: " + gameData.score;
		
		
		if(gameData.hits == 10){
			ball.speed += 1;
			gameData.level += 1;
			gameData.hits = 0;

			var level = document.querySelector('#level');
			level.textContent = "Level: " + gameData.level;
		}

		ball.directionX = -1;
	}

	if (detector.ballX < 0) {
		window.alert("Game Over, Score: "+ gameData.score);
	}

	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;

	collisionDetector();
	$("#ball").css({ "left": ball.x, "top": ball.y });
}

function collisionDetector(){
	var detector = collisionConfig();

	if(detector.ballX < detector.PaddlePosition) {
		if((detector.ballY <= detector.paddleBottom) && (detector.ballY >= detector.paddleTop)){
			ball.directionX = 1;
		}
	}
}

function movePaddleUp(player){
	var paddleUp = paddleConfig();
	if(paddleUp.arenaHeight - paddleUp.paddletopPosition <= 475){
		$("#paddle").css("top", paddleUp.paddletopPosition - paddleUp.step);
	}
}

function movePaddleDown(player){
	var paddleDown = paddleConfig();
	if(paddleDown.arenaHeight - paddleDown.paddletopPosition >= 115){
		$("#paddle").css("top", paddleDown.paddletopPosition + paddleDown.step);
	}
}

function paddleConfig(){
	var config = {
				arenaHeight: parseInt($("#arena").css("height")),
				paddletopPosition: parseInt($("#paddle").css("top")), 
				step: 30
	};

	return config;
}

function collisionConfig(){
	var config = {
				ballX: ball.x + ball.speed * ball.directionX,
				ballY: ball.y + ball.speed * ball.directionY,
				PaddlePosition: parseInt($("#paddle").css("left")) + parseInt($("#paddle").css("width")),
				paddleBottom: parseInt($("#paddle").css("top")) + parseInt($("#paddle").css("height")),
				paddleTop: parseInt($("#paddle").css("top")),
	}; 

	return config;
};

function arenaData(){
	var arenaData = {
				gameWidth: parseInt($("#arena").width()),
				gameHeight: parseInt($("#arena").height())
	};

	return arenaData;
};

function ballData(){
	var ballData = {
				 height: parseInt($("#ball").height())
	};

	return ballData;
};