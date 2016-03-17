'use strict';

var GAME_CONTAINER = document.getElementById("game-container");

//stocker dnas un objet les valeurs renvoyer par l'event keydown
var KEY_CODE = {
	LEFT: 37,
	RIGHT: 39,
	SPACE: 32
};

var DEFENDER = {
	SPEED:10
};

var DESTROYER = {
	SPEED:20
};

var EXTREME = {
	TOP: 0,
	BOT: 600,
	LEFT: 0,
	RIGHT: 1000
};







// objet sprite

var Sprite = function(id){

	this.pos = {x: 0, y: 0};
	this.dir = {x: 0, y: 0};
	this.dim = {width: 0, height: 0, halfWidth: 0, halfHeight: 0};

	this.el = document.getElementById(id);

	this.el.classList.add("sprite");

	this.init = function(){console.log("todo sprite init")};          //initialise l'objet

	this.update = function(){console.log("todo sprite update")};           //udpate les changements de valeur

	this.render = function(){
		
		this.pos.x += this.dir.x; 
		this.pos.y += this.dir.y

		this.el.style.left = this.pos.x + "px";
		this.el.style.top = this.pos.y + "px";
		this.el.style.width = this.dim.width + "px";
		this.el.style.height = this.dim.height + "px";

	};           
};




var defender = new Sprite("defender");

defender.init = function(){
	var self = this;
	var gameContainer = document.getElementById("game-container");

	this.dim.width = 150;
	this.dim.height = 20;

	this.dim.halfWidth = this.dim.width / 2;
	this.dim.halfHeight = this.dim.height / 2;

	this.pos.x = gameContainer.offsetWidth / 2 - this.dim.halfWidth;
	this.pos.y = gameContainer.offsetHeight  - this.dim.halfHeight*4;

	document.onkeydown = function (event){
		console.log(event.which)                      //quelle touche est appuey, renvoi un code keyboard
		if( event.which == KEY_CODE.LEFT){
			self.dir.x = -DEFENDER.SPEED
		}
		else if( event.which == KEY_CODE.RIGHT){
			self.dir.x = DEFENDER.SPEED
		}
	};

	document.onkeyup = function(event){
		if(event.which == KEY_CODE.LEFT || event.which == KEY_CODE.RIGHT){
			self.dir.x = 0;
		}

	};

	console.log(this.pos);


};

defender.update = function(){

};



defender.init();
defender.render();




var destroyer = new Sprite("destroyer");

destroyer.init = function(){
	var self = this;
	var gameContainer = document.getElementById("game-container");
	var MIN_SPEED = 2;


	this.dim.width = 20;
	this.dim.height = 20;

	this.dim.halfWidth = this.dim.width / 2;

	this.pos.x = gameContainer.offsetWidth / 2 - this.dim.halfWidth;
	this.pos.y = gameContainer.offsetHeight / 1.8;


	this.dir.x = (Math.random()-0.5)*10;
		while (this.dir.x < MIN_SPEED && this.dir.x > MIN_SPEED){
			(Math.random()-0.5)*10
		};
	this.dir.y = (Math.random()-0.5)*10;
		while (this.dir.y < MIN_SPEED && this.dir.y > MIN_SPEED){
			(Math.random()-0.5)*10
		};






};

destroyer.update = function(){

	if (this.pos.x <= 0){
		this.dir.x = -this.dir.x
	}

	else if(this.pos.x >= GAME_CONTAINER.offsetWidth- this.dim.width ){
		this.dir.x = -this.dir.x
	}
	
	if(this.pos.y <= 0){
		this.dir.y = -this.dir.y
	}
	else if (this.pos.y > GAME_CONTAINER.offsetHeight){
		this.init()
	}


	//collosion avec le defender
	if ( this.pos.y + this.dim.height >= defender.pos.y) {
		if(defender.pos.x < this.pos.x && this.pos.x <defender.pos.x + defender.dim.width){
		this.dir.y = -this.dir.y
		}
	}
	

};

destroyer.init();
destroyer.render();








var Game = function (){
	

	this.spriteList = [];

	this.addSprite = function (sprite){
		this.spriteList.push(sprite);
	};

	this.gameLoop = function (){
		for (var i = 0; i < this.spriteList.length; i++) {
			this.spriteList[i].update();
			this.spriteList[i].render();
		}

	};

	this.start = function (){
		console.log("Game Started");
		console.log(this.spriteList);
		setInterval("game.gameLoop()", 1000/30);
	};


};


var game = new Game ();
game.addSprite(defender);
game.addSprite(destroyer);

game.start();
