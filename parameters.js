var canvas, context, board, imageObj, tiles, board, display;
var NUM_OF_TILES = 2;

// viewport
var vX = 0,
    vY = 0,
    vWidth = 15,
    vHeight = 10;

var playerX = 0,
    playerY = 0;

var worldWidth = 29,
    worldHeight = 19;
	
var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;

var img = new Image();
img.src = 'HeroT.gif';