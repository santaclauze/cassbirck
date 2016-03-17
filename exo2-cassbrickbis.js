'use strict';



//stocker dnas un objet les valeurs renvoyer par l'event keydown
var KEY_CODE = {
	LEFT: 37,
	RIGHT: 39
};

var DEFENDER = {
	SPEED:5
};

// objet sprite

var Sprite = function(id){

	this.pos = {x: 0, y: 0};
	this.dir = {x: 0, y: 0};
	this.dim = {width: 0, height: 0, halfWidth: 0, halfHeight: 0};

	this.el = document.getElementById(id);

	this.init = function(){console.log("todo sprite init")};          //initialise l'objet

	this.update = function(){console.log("todo sprite update")};           //udpate les changements de valeur

	this.render = function(){
		
		this.pos.x += this.dir.x; 
/*		this.pos.y =*/

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
		console.log(event.which)  //quelle touche est appuey, renvoi un code keyboard
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

var Game = function (){
	

	this.spriteList = [];

	this.addSprite = function (sprite){
		this.spriteList.push(sprite);
	};

	this.gameLoop = function (){
		for (var i = 0; i < this.spriteList.length; i++) {
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
game.start();
