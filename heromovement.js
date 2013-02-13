function MoveByMouse(x,y)
{
	
	var ClickFloorX = Math.floor(x/32);
	var ClickFloorY = Math.floor(y/32);
	
	if (IsTileAllowedMouse(ClickFloorX, ClickFloorY)) {
		if (ClickFloorY+vY == playerY) {
			if (ClickFloorX+vX > playerX) 
			{
				playerX++;
				SetDirection(39);
			}
			else if (ClickFloorX+vX < playerX) 
			{
				playerX--;
				SetDirection(37);
			}
		DrawViewPort();
		}
	}
	if (IsTileAllowedMouse(ClickFloorX, ClickFloorY)) {
		if (ClickFloorX+vX == playerX) {
			if (ClickFloorY+vY > playerY)
			{
				playerY++;
				SetDirection(40);
			}
			else if (ClickFloorY+vY < playerY)
			{
				playerY--;
				SetDirection(38);
			}
		DrawViewPort();
		}
	}
}

function MoveByKey(key)
{
        //console.log(e);
        var key = null;
		if (IsTileAllowedKeyboard(key)) {
			switch (key) {
				case 37:
					// Left
					if (playerX > 0) playerX--; SetDirection(37);
					break;
				case 38:
					// Up
					if (playerY > 0) playerY--; SetDirection(38);
					break;
				case 39:
					// Right
					if (playerX < worldWidth) playerX++; SetDirection(39);
					break;
				case 40:
					// Down
					if (playerY < worldHeight) playerY++; SetDirection(40);
					break;
			}
		}
		DrawViewPort();
}

function IsTileAllowedMouse(ClickFloorX, ClickFloorY)
{

		if (board[ClickFloorY+vY][ClickFloorX+vX] != 1) {  return true; }
		else { return false;}
}
	
function IsTileAllowedKeyboard(key)
{
	var dodatnikX = 0;
	var dodatnikY = 0;
	
	switch (key) {
		case 37:
			// Left
			dodatnikX = -1;
			break;
		case 38:
			// Up
			dodatnikY = -1;
			break;
		case 39:
			// Right
			dodatnikX = 1;
			break;
		case 40:
			// Down
			dodatnikY = 1;
			break;
		}
	
	if (board[playerY+dodatnikY][playerX+dodatnikX] != 1) {  return true; }
	else { return false;}
}

function SetDirection(Direction)
	{
		moveRight = false;
		moveLeft = false;
		moveUp = false;
		moveDown = false;
		
		switch (Direction)
		{
			case 37:
				moveLeft = true;
				break;
			case 38:
				moveUp = true;
				break;
			case 39:
				moveRight = true;
				break;
			case 40:
				moveDown = true;
				break;
		}
	}
	
		
	function DrawViewPort()
	{
	    // Okay! The player is done moving, now we have to determine the "best" viewport.
        // Ideally the viewport centers the player,
        // but if its too close to an edge we'll have to deal with that edge
		vX = playerX - Math.floor(0.5 * vWidth);
        if (vX < 0) vX = 0;
        if (vX + vWidth > worldWidth) vX = worldWidth - vWidth;


        vY = playerY - Math.floor(0.5 * vHeight);
        if (vY < 0) vY = 0;
        if (vY + vHeight > worldHeight) vY = worldHeight - vHeight;
		draw();
	}
	
	var frame = 0;
	
	function draw() {
		
	
        context.clearRect(0, 0, canvas.width, canvas.height);

		
        //malowanie nowej mapy po mozliwym przesunieciu
		for (y = 0; y <= vHeight; y++) {
            for (x = 0; x <= vWidth; x++) {
                theX = x * 32;
                theY = y * 32;
                context.drawImage(tiles[board[y + vY][x + vX]], theX, theY, 32, 32);
            }
        }
		
		
		img.onload = loaded();
			
		function loaded() 
		{
			imageReady = true;
			
			redraw(frame);
			frame++;
			if (frame >= 3) frame = 0;
		}
	
		function redraw(frame)
		{
			if (imageReady && moveRight)
			{
				context.drawImage(img, frame*24, 32, 28, 32, (playerX - vX) * 32, (playerY - vY) * 32, 32, 32);
			}
			else if (imageReady && moveLeft)
			{
				context.drawImage(img, frame*24, 96, 28, 32, (playerX - vX) * 32, (playerY - vY) * 32, 32, 32);
			}
			else if (imageReady && moveDown)
			{
				context.drawImage(img, frame*24, 64, 28, 32, (playerX - vX) * 32, (playerY - vY) * 32, 32, 32);
			}
			else if (imageReady && moveUp)
			{
				context.drawImage(img, frame*24, 0, 28, 32, (playerX - vX) * 32, (playerY - vY) * 32, 32, 32);
			}
			else 
			{
				context.drawImage(img, frame*24, 64, 28, 32, (playerX - vX) * 32, (playerY - vY) * 32, 32, 32);
			}
		}
    }
	
	funcion LoadAndPaint()
	{
	var loadedImagesCount = 0;
    for (x = 0; x <= NUM_OF_TILES; x++) {
        var imageObj = new Image(); // new instance for each image
        imageObj.src = x + ".gif";

        imageObj.onload = function () {
            // console.log("Added tile ... "+loadedImagesCount);
            loadedImagesCount++;
            if (loadedImagesCount == NUM_OF_TILES) {
                // Onces all tiles are loaded ...
                // We paint the map
                draw();
            }
        };
        tiles.push(imageObj);
    }
	}