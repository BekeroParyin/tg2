var cHeight = c.height/scale;
var cWidth = c.width/scale;
function drawArmyPath(){
	if(p.following > -1 && p.following < p.armies.length){
		if(typeof p.armies[p.following] != 'undefined' && p.armies[p.following] != -1){
			ctx.fillStyle = p.color;
			for(let h = 0; h < p.armies[p.following].path.length; h++){
				for(let tic = 0; tic < 2; tic++){
					let hY = safeC(p.armies[p.following].path[h][0]);
					let hX = safeC(p.armies[p.following].path[h][1]);
					let dX = safeC(hX - p.xView);
					let dY = safeC(hY - p.yView);
						if(dX >= 0 && dY >= 0){
						let pY=-1; let pX= -1;
						if(tic == 0 && h > 0){
							pY = safeC(p.armies[p.following].path[h-1][0]);
							pX = safeC(p.armies[p.following].path[h-1][1]);
						} else if(tic == 1 && h < p.armies[p.following].path.length-1){
							pY = safeC(p.armies[p.following].path[h+1][0]);
							pX = safeC(p.armies[p.following].path[h+1][1]);
						}
						else if(h == 0){
							pY = safeC(p.armies[p.following].y);
							pX = safeC(p.armies[p.following].x);
						}
						if(pY > -1 && pX > -1){
							if(Math.abs(hY-pY) == 1 || (Math.abs(hY-pY) == MAPSIZE-1 && hY*pY == 0)){				
								if((pY > hY && Math.abs(hY-pY) == 1)||(pY==0&&hY == MAPSIZE-1)){ //draw above
									ctx.fillRect((dX + (1-.2)/2)*p.zoom, (.5 + dY) * p.zoom, p.zoom*.2, p.zoom*.5);
								}
								else{ //draw below
									ctx.fillRect((dX + (1-.2)/2)*p.zoom, dY * p.zoom, p.zoom*.2, p.zoom*.5);
								}
							}
							if(Math.abs(hX-pX) == 1 || (Math.abs(hX-pX) == MAPSIZE-1 && hX*pX == 0)){
								if((pX > hX && Math.abs(hX-pX) == 1)|| (pX==0&&hX == MAPSIZE-1)){ //draw to right
									ctx.fillRect((.5 + dX) * p.zoom, (dY + (1-.2)/2)*p.zoom, p.zoom*.5, p.zoom*.2);
								}
								else { //draw to left
									ctx.fillRect(dX * p.zoom, (dY + (1-.2)/2)*p.zoom, p.zoom*.5, p.zoom*.2);
								}
							}
						}
					}
				}
			}
		}
		else{
			p.armies[p.following] = -1;
			p.following = -1;
		}
	}
}
function drawNavyPath(){
	if(p.nFollowing > -1 && p.nFollowing < p.navies.length){
		if(typeof p.navies[p.nFollowing] != 'undefined' && p.navies[p.nFollowing] != -1){
			ctx.fillStyle = p.color;
			for(let h = 0; h < p.navies[p.nFollowing].path.length; h++){
				for(let tic = 0; tic < 2; tic++){
					let hY = safeC(p.navies[p.nFollowing].path[h][0]);
					let hX = safeC(p.navies[p.nFollowing].path[h][1]);
					let dX = safeC(hX - p.xView);
					let dY = safeC(hY - p.yView);
						if(dX >= 0 && dY >= 0){
						let pY=-1; let pX= -1;
						if(tic == 0 && h > 0){
							pY = safeC(p.navies[p.nFollowing].path[h-1][0]);
							pX = safeC(p.navies[p.nFollowing].path[h-1][1]);
						} else if(tic == 1 && h < p.navies[p.nFollowing].path.length-1){
							pY = safeC(p.navies[p.nFollowing].path[h+1][0]);
							pX = safeC(p.navies[p.nFollowing].path[h+1][1]);
						}
						else if(h == 0){
							pY = safeC(p.navies[p.nFollowing].y);
							pX = safeC(p.navies[p.nFollowing].x);
						}
						if(pY > -1 && pX > -1){
							if(Math.abs(hY-pY) == 1 || (Math.abs(hY-pY) == MAPSIZE-1 && hY*pY == 0)){				
								if((pY > hY && (Math.abs(hY-pY) == 1))||(pY==0&&hY == MAPSIZE-1)){ //draw above
									ctx.fillRect((dX + (1-.2)/2)*p.zoom, (.5 + dY) * p.zoom, p.zoom*.2, p.zoom*.5);
								}
								else{ //draw below
									ctx.fillRect((dX + (1-.2)/2)*p.zoom, dY * p.zoom, p.zoom*.2, p.zoom*.5);
								}
							}
							if(Math.abs(hX-pX) == 1 || (Math.abs(hX-pX) == MAPSIZE-1 && hX*pX == 0)){
								if((pX > hX && Math.abs(hX-pX) == 1)|| (pX==0&&hX == MAPSIZE-1)){ //draw to right
									ctx.fillRect((.5 + dX) * p.zoom, (dY + (1-.2)/2)*p.zoom, p.zoom*.5, p.zoom*.2);
								}
								else { //draw to left
									ctx.fillRect(dX * p.zoom, (dY + (1-.2)/2)*p.zoom, p.zoom*.5, p.zoom*.2);
								}
							}
						}
					}
				}
			}
		}
		else{
			p.navies[p.nFollowing] = -1;
			p.nFollowing = -1;
		}
	}
}
function drawMap(newDir){
	ctx.fillStyle = "red";
	drawing = true;
	if(typeof newDir == 'undefined' || newDir == -1 || newDir > 4 || p.zoom > 20){
		ctx.clearRect(0, 0, cWidth, cHeight);
		for(let i = 0; i < Math.ceil(cHeight/p.zoom); i++){
			for(let j = 0; j < Math.ceil(cWidth/p.zoom); j++){
				drawTile(p.yView + i, p.xView + j);
			}
		}
	}
	else if(newDir > -1 && newDir < 4){
		let xEdg = Math.floor(cWidth/p.zoom);
		let yEdg = Math.floor(cHeight/p.zoom);
		let d = xEdg;
		let b = 0;
		let c1 = yEdg;
		let a = 0;
		switch(newDir){
			case 0: ctx.drawImage(c, 0, 0, Math.ceil(cWidth/p.zoom)*p.zoom*scale, Math.ceil(cHeight/p.zoom)*p.zoom*scale, 0, p.zoom, Math.ceil(cWidth/p.zoom)*p.zoom, Math.ceil(cHeight/p.zoom)*p.zoom); c1=1;break; //up
			case 1: ctx.drawImage(c, 0, 0, Math.ceil(cWidth/p.zoom)*p.zoom*scale, Math.ceil(cHeight/p.zoom)*p.zoom*scale, -p.zoom, 0, Math.ceil(cWidth/p.zoom)*p.zoom, Math.ceil(cHeight/p.zoom)*p.zoom); b=xEdg-1;break; //right
			case 2: ctx.drawImage(c, 0, 0, Math.ceil(cWidth/p.zoom)*p.zoom*scale, Math.ceil(cHeight/p.zoom)*p.zoom*scale, 0, -p.zoom, Math.ceil(cWidth/p.zoom)*p.zoom, Math.ceil(cHeight/p.zoom)*p.zoom); a=yEdg-1;break; //down
			case 3: ctx.drawImage(c, 0, 0, Math.ceil(cWidth/p.zoom)*p.zoom*scale, Math.ceil(cHeight/p.zoom)*p.zoom*scale, p.zoom, 0, Math.ceil(cWidth/p.zoom)*p.zoom, Math.ceil(cHeight/p.zoom)*p.zoom);d = 0;break; //left
		}
		for(let i = a; i <= c1; i++){
			for(let j = b; j <= d; j++){
				drawTile(p.yView+i, p.xView+j);
			}
		}
	}
	drawArmyPath();
	drawNavyPath();
	drawing = false;
}
function drawDynamic(type, img, y1, x, y, dx, dy, x11){ //type of tile, img sheet, where on the img sheet to start, tileX, tileY, drawposX, drawposY
	let x1 = x11 || 0;
	var b0 = -1; var b1 = -1;
	let t = map[y][x];
	let lT = map[y][safeC(x-1)];
	let rT = map[y][safeC(x+1)];
	let uT = map[safeC(y-1)][x];
	let dT = map[safeC(y+1)][x];
	let blT = map[safeC(y+1)][safeC(x-1)];
	let brT = map[safeC(y+1)][safeC(x+1)];
	let tlT = map[safeC(y-1)][safeC(x-1)];
	let trT = map[safeC(y-1)][safeC(x+1)];
	[bL, bR, tL, tR] = [false,false,false,false];
	if(type == 'w' || type == 'r' || type == 'a'){
		[leftT, rightT, upT, downT] = [(lT.elevation < 0), (rT.elevation < 0), (uT.elevation < 0), (dT.elevation < 0)];
		[leftD, rightD, upD, downD] = [((lT.building[0] == 1) && lT.building[1] == 3), ((rT.building[0] == 1) && rT.building[1] == 3), ((uT.building[0] == 1) && uT.building[1] == 3), ((dT.building[0] == 1) && dT.building[1] == 3)];
		[bL, bR, tL, tR] = [(blT.elevation > 0), 
		(brT.elevation > 0), 
		(tlT.elevation > 0),
		(trT.elevation > 0)]
		bL = bL && leftT && downT;
		bR = bR && rightT && downT;
		tL = tL && upT && leftT;
		tR = tR && upT && rightT;
		if(leftT && rightT && upT && downT){
			if(leftD){ //Redraw Adjacent Docks
				drawDynamic('b', sprites2, 272, safeC(x-1), y,  dx-p.zoom, dy);
			}
			if(rightD){
				drawDynamic('b', sprites2, 272, safeC(x+1), y,  dx+p.zoom, dy);
			}
			if(upD){
				drawDynamic('b', sprites2, 272, x, safeC(y-1),  dx, dy-p.zoom);
			}
			if(downD){
				drawDynamic('b', sprites2, 272, x, safeC(y+1),  dx, dy+p.zoom);
			}
			if(!(bL||bR||tL||tR)){
				return;
			}
		}
	}
	else if(type == 'h' || type == 'k' || type == 'l'){
		let elev = .5;
		if(type == 'h'){ elev = .565; } else if(type == 'l'){ elev = .69; }
		[leftT, rightT, upT, downT] = [(lT.elevation >= elev), (rT.elevation >= elev), (uT.elevation >= elev), (dT.elevation >= elev)];
		[bL, bR, tL, tR] = [(blT.elevation < elev), 
		(brT.elevation < elev), 
		(tlT.elevation < elev),
		(trT.elevation < elev)]
		bL = bL && leftT && downT;
		bR = bR && rightT && downT;
		tL = tL && upT && leftT;
		tR = tR && upT && rightT;
	}
	else if(type == 'b'){ //building
		b0 = map[y][x].building[0]; b1 = map[y][x].building[1];
		tu = map[y][x].owner;
		if(b0 == 0 && b1 == 1){ //farm
			[leftT, rightT, upT, downT] = [
			(lT.owner == tu && lT.building[0] == 0 && lT.building[1] == 1),
			(rT.owner == tu && rT.building[0] == 0 && rT.building[1] == 1),
			(uT.owner == tu && uT.building[0] == 0 && uT.building[1] == 1),
			(dT.owner == tu && dT.building[0] == 0 && dT.building[1] == 1)];
			[bL, bR, tL, tR] = [!((blT.building[0] == 0) && blT.building[1] == 1), //bL
			!((brT.building[0] == 0) && brT.building[1] == 1), //bR
			!((tlT.building[0] == 0) && tlT.building[1] == 1), //tL
			!((trT.building[0] == 0) && trT.building[1] == 1)]; //tR
			let badTypes = ['h', 'k', 'l'];
			leftT = leftT && (lT.type == t.type || (badTypes.indexOf(lT.type)==-1||badTypes.indexOf(t.type)==1));
			rightT = rightT && (rT.type == t.type || (badTypes.indexOf(rT.type)==-1||badTypes.indexOf(t.type)==1));
			downT = downT && (dT.type == t.type || (badTypes.indexOf(dT.type)==-1||badTypes.indexOf(t.type)==1));
			upT = upT && (uT.type == t.type || (badTypes.indexOf(uT.type)==-1||badTypes.indexOf(t.type)==1));
			bL = bL && leftT && downT;
			bR = bR && rightT && downT;
			tL = tL && upT && leftT;
			tR = tR && upT && rightT;
		}
		else{
			if(!(b0 == 1 && b1 == 3)){ //not dock - all buildings unless specified are dynamic to roads
				[leftT, rightT, upT, downT] = [
				(lT.owner == tu && (lT.building[0] == 0) && lT.building[1] == 0),
				(rT.owner == tu && (rT.building[0] == 0) && rT.building[1] == 0),
				(uT.owner == tu && (uT.building[0] == 0) && uT.building[1] == 0),
				(dT.owner == tu && (dT.building[0] == 0) && dT.building[1] == 0)];}
			else{ //dock
				[leftT, rightT, upT, downT] = [(lT.elevation <= 0), (rT.elevation <= 0), (uT.elevation <= 0), (dT.elevation <= 0)];
			}
			if(!(b0 == 0 && b1 == 0)){ //if not road
				upT = upT && !downT;
				leftT = leftT && !(upT || downT);
				rightT = rightT && !(upT || downT);
				if(leftT && rightT){
					leftT = (x+y) % 2 == 0;
					rightT = !leftT;
				}
			}
		}
	}
	else{ //trees prob/ generic
		[leftT, rightT, upT, downT] = [(lT.type == type), (rT.type == type), (uT.type == type), (dT.type == type)];
	}
	for(let i = 0; i < 2; i++){ //up
		for(let j = 0; j < 2; j++){ //down
			for(let k = 0; k < 2; k++){ //left
				for(let l = 0; l < 2; l++){ //right
					if(i == upT && j == downT && k == leftT && l == rightT){
						ctx.drawImage(img, x1+(l+2*k+4*j+8*i)*16, y1, 16, 16, dx, dy, p.zoom, p.zoom);
						if(type == 'w' || type == 'r' || type == 'a'){
							if(leftD){ //Redraw Adjacent Docks
								drawDynamic('b', sprites2, 272, safeC(x-1), y,  dx-p.zoom, dy);
							}
							if(rightD){
								drawDynamic('b', sprites2, 272, safeC(x+1), y,  dx+p.zoom, dy);
							}
							if(upD){
								drawDynamic('b', sprites2, 272, x, safeC(y-1),  dx, dy-p.zoom);
							}
							if(downD){
								drawDynamic('b', sprites2, 272, x, safeC(y+1),  dx, dy+p.zoom);
							}
						}
						else if(b0 == 1 && b1 == 3){
							if(leftT){
								ctx.drawImage(img, x1+(l+2*k+4*j+8*i)*16, y1+16, 16, 16, dx-p.zoom, dy, p.zoom, p.zoom);
							}
							else if(rightT){
								ctx.drawImage(img, x1+(l+2*k+4*j+8*i)*16, y1+16, 16, 16, dx+p.zoom, dy, p.zoom, p.zoom);
							}
							else if(upT){
								ctx.drawImage(img, x1+(l+2*k+4*j+8*i)*16, y1+16, 16, 16, dx, dy-p.zoom, p.zoom, p.zoom);
							}
							else{
								ctx.drawImage(img, x1+(l+2*k+4*j+8*i)*16, y1+16, 16, 16, dx, dy+p.zoom, p.zoom, p.zoom);
							}
						}
						if(!(bL||tR||tL||bR)){
							return;
						}
						else{
							i = j = k = l = 2;
						}
					}
				}	
			}
		}
	}
	if(bL){
		ctx.drawImage(img, 256, y1, 16, 16, dx, dy, p.zoom, p.zoom);
	}
	if(bR){
		ctx.drawImage(img, 272, y1, 16, 16, dx, dy, p.zoom, p.zoom);
	}
	if(tL){
		ctx.drawImage(img, 288, y1, 16, 16, dx, dy, p.zoom, p.zoom);
	}
	if(tR){
		ctx.drawImage(img, 304, y1, 16, 16, dx, dy, p.zoom, p.zoom);
	}
}
function drawBuilding(y1, x1){
	let y = safeC(y1);
	let x = safeC(x1);
	var t = map[y][x];
	let dY = safeC(y1 - p.yView);
	let dX = safeC(x1 - p.xView);
	var b0 = t.building[0];
	var b1 = t.building[1];
	let drawY = Math.floor(dY*p.zoom);
	if(t.type == 'k'){
		drawY -= 1*(p.zoom/16);
	}
	else if(t.type == 'h'){
		drawY -= 2*(p.zoom/16);
	}
	else if(t.type == 'l'){
		drawY -= 3*(p.zoom/16);
	}
	if(b0 == 0){ //DRAW ECONOMIC BUILDINGS
		if(b1 == 0){ //ROAD
			drawDynamic('b', sprites2, 128, x, y,  Math.floor(dX * p.zoom), drawY);
		}
		else if(b1 == 1){ //FARM
			let xSpot = Math.floor(day/100)*16;
			drawDynamic('b', sprites2, 160, x, y,  Math.floor(dX * p.zoom), drawY);
			ctx.drawImage(sprites2, xSpot, 144, 16, 16, dX*p.zoom, drawY, p.zoom, p.zoom);
		}
		else if((b1 == 2 || b1 == 11 || b1 == 12 || b1 == 13)){ //ORCHARDS/SPICEPLANT
			let xSpot = 64 + Math.floor(day/100)*16;
			if(b1 >= 11){
				xSpot += (b1-10)*64;
			}
			ctx.drawImage(sprites2, xSpot, 144, 16, 16, dX*p.zoom, drawY, p.zoom, p.zoom);
		}
		else if(b1 == 3){ //LUMBER MILL
			ctx.drawImage(sprites2, 0, 176, 16, 16, dX*p.zoom, drawY, p.zoom, p.zoom);
		}
		else if(b1 == 4){ //GRANARY
			drawDynamic('b', sprites2, 256, x, y,  Math.floor(dX * p.zoom), drawY, 144);
		}
		else if(b1 == 5){//WAREHOUSE
			drawDynamic('b', sprites2, 192, x, y, Math.floor(dX*p.zoom), drawY);
		}
		else if(b1 == 6){ //MINE
			drawDynamic('b', sprites2, 208, x, y, Math.floor(dX*p.zoom), drawY);
		}
		else if(b1 == 7){ //METALWORKS
			ctx.drawImage(sprites2, 0, 224, 16, 16, dX*p.zoom, drawY, p.zoom, p.zoom);
		}
	}
	else if(b0 == 1){ //DRAW SOCIAL BUILDINGS
		if(b1 == 0){ //HOUSE
			drawDynamic('b', sprites2, 256, x, y,  Math.floor(dX * p.zoom), drawY);
		}
		else if(b1 == 1){ //PLAZA
			ctx.drawImage(sprites2, 80, 176, 16, 16, dX*p.zoom, drawY, p.zoom, p.zoom);
		}
		else if (b1 == 2){ //TAX OFFICE
			ctx.drawImage(sprites2, 96, 176, 16, 16, dX*p.zoom, drawY, p.zoom, p.zoom);
		}
		else if(b1 == 3){ //DOCK
			drawDynamic('b', sprites2, 272, x, y,  Math.floor(dX * p.zoom), drawY);
		}
		else if(b1 == 4){ //TEMPLE
			ctx.drawImage(sprites2, 48, 192, 16, 16, dX*p.zoom, drawY, p.zoom, p.zoom);
		}
		else if(b1 == 11){ //WINERY
			drawDynamic('b', sprites2, 240, x, y,  Math.floor(dX * p.zoom), drawY, 144);
		}	
		else if((b1 == 7 || b1 == 8 || b1 == 9 || b1 == 12)){
			let xSpot = 16 + Math.min(3, b1-7)*16;
			ctx.drawImage(sprites2, xSpot, 176, 16, 16, dX*p.zoom, drawY, p.zoom, p.zoom);
		}
		else if(b1 == 10){ //TAVERN
			drawDynamic('b', sprites2, 240, x, y,  Math.floor(dX * p.zoom), drawY);
		}
	}
	else {
		var girth = buildings[b0][b1].draw[1];
		ctx.fillStyle = buildings[b0][b1].draw[0];
		ctx.fillRect((dX + (1-girth)/2)*p.zoom, ((1-girth)/2 + dY) * p.zoom, p.zoom*girth, p.zoom*girth);
	}
}
function drawTile(y1, x1){
	let y = safeC(y1);
	let x = safeC(x1);
	var t = map[y][x];
	let dY = safeC(y1 - p.yView);
	let dX = safeC(x1 - p.xView);
	ctx.clearRect(dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
	if(p.draw == "normal"){
		var dDraw = false;
		if(p.sprites && p.zoom > 6){
			dDraw = true;
			switch(t.type){
				case 'w': ctx.fillStyle = "#005fc6"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); drawDynamic('w', sprites2, 112, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); break;//water
				case 'a': ctx.fillStyle = "#006adc"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); drawDynamic('w', sprites2, 112, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); break;//lAke
				case 'r': ctx.fillStyle = "#1978DF"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); drawDynamic('w', sprites2, 112, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); break; //river
				case 'i': let tape = rand(srand(y*62*157*y*11*x+941*y+1728*x+1921)); if(tape < .5){ctx.drawImage(sprites2, 80, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);}else if(tape <.7){ctx.drawImage(sprites2, 96, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);}else if(tape <.95){ctx.drawImage(sprites2, 112, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);} else{ ctx.drawImage(sprites2, 64, 0, 8, 8, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);} break; //grass
				case 'd':
				case 's': ctx.fillStyle = "#d7c698"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); break;
				case 'l': ctx.fillStyle = "#167042"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); 
				drawDynamic('h', sprites2, 80, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
				drawDynamic('l', sprites2, 96, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); break; 
				case 'h': ctx.fillStyle = "#0f8400"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);
				drawDynamic('k', sprites2, 64, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
				drawDynamic('h', sprites2, 80, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
				break; //hill
				case 'k': ctx.fillStyle = "#36a165"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);
				drawDynamic('k', sprites2, 64, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); break; //knoll
				case 'm': ctx.fillStyle = "#305615"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); 
				drawDynamic('l', sprites2, 96, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); ctx.drawImage(sprites2, 192, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);
				break;
				case 'c':
				case 'g': let tape2 = rand(srand(y*62*157*y*11*x+941*y+1728*x+1921)); if(tape2 < .33){ctx.drawImage(sprites2, 144, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);}else if(tape2 <.88){ctx.drawImage(sprites2, 160, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);}else{ctx.drawImage(sprites2, 176, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);} break;
				case 'f': if(t.elevation > .5){
					drawDynamic('k', sprites2, 64, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); 
				}
				else if(t.elevation > .565){
					drawDynamic('h', sprites2, 80, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); 
				}
				else{
					ctx.drawImage(sprites2, 64, 0, 16, 16, Math.floor(dX*p.zoom), Math.floor(dY*p.zoom), p.zoom, p.zoom);
				}
				drawDynamic('f', sprites2, 16, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
				break;
			}
		}
		else{
			switch(t.type){
				case 'w': ctx.fillStyle = "#005fc6"; break;//water
				case 'a': ctx.fillStyle = "#006adc"; break;//lAke
				case 'r': ctx.fillStyle = "#1978DF"; break; //river
				case 's': ctx.fillStyle = "#b3f0a5"; break; //steppe
				case 'd': ctx.fillStyle = "tan"; break; //desert
				case 'h': ctx.fillStyle = "olivedrab";break; //hill
				case 'k': ctx.fillStyle = "#4ba520"; break; //knoll
				case 'm': ctx.fillStyle = "#B4B4B4"; break; //mountain
				case 'i': ctx.fillStyle = "#36a165"; break; //hIghland
				case 'c':
				case 'g': ctx.fillStyle = "#4d8d4f"; break; //grass
				case 'f': ctx.fillStyle = "#1b4500"; break; //forest*/
				case 'l': ctx.fillStyle = "grey"; break; //high hilLs
				case 'e': ctx.fillStyle = "white"; break; //ice
				case 'n': ctx.fillStyle = "#EFFCFF"; break; //snow
				default:  ctx.fillStyle = "red"; break;
			}
		}
	}
	else if(p.draw == "resources"){
		switch(t.resource){
			case 0: case 1: case 2: case 3: case 4: case 5: case 6: ctx.fillStyle = "#808080"; break; //stone
			case 7: ctx.fillStyle = "#b87333"; break; //copper
			case 8: ctx.fillStyle = "#b85233"; break; //bronze
			case 9: ctx.fillStyle = "#B0E0E6"; break; //iron
			case 10:ctx.fillStyle = "gold"; break; //gold
			case 11:ctx.fillStyle = "#a07b60"; break;//Hides
			case 12:ctx.fillStyle = "#604E42"; break;//Luxury 	Wood
			case 13:ctx.fillStyle = "#bd7194"; break; //Perfume
			case 14:ctx.fillStyle = "black"; break; //Pearls
			case 15:ctx.fillStyle = "#B7A99B"; break; //Silk	
			case 16:ctx.fillStyle = "#B35D51"; break; //Spices
			default: if(t.elevation <= 0){ ctx.fillStyle = "white"; } else{ctx.fillStyle = "Gainsboro";} break; //nothing
		}
	}
	else if(p.draw == "heat"){
		if(t.heat <= 0.5){
			ctx.fillStyle = "white";
		}
		else if(t.heat <= .75){
			ctx.fillStyle = "tan";
		}
		else if(t.heat <= 1){
			ctx.fillStyle = "olive";
		}
		else if(t.heat <= 1.5){
			ctx.fillStyle = "yellow";
		}
		else if(t.heat <= 2){
			ctx.fillStyle = "orange";
		}
		else if(t.heat <= 3){
			ctx.fillStyle = "red";
		}
		else{
			ctx.fillStyle = "blue";
		}
	}
	else if(p.draw == "elevation"){
		if(t.elevation <= 0.1){
			ctx.fillStyle = "white";
		}
		else if(t.elevation <= .2){
			ctx.fillStyle = "tan";
		}
		else if(t.elevation <= .3){
			ctx.fillStyle = "olive";
		}
		else if(t.elevation <= .5){
			ctx.fillStyle = "yellow";
		}
		else if(t.elevation <= .7){
			ctx.fillStyle = "orange";
		}
		else if(t.elevation <= .9){
			ctx.fillStyle = "red";
		}
		else{
			ctx.fillStyle = "blue";
		}
	}
	else if(p.draw == "currents"){
		if(t.curred <= 1){
			ctx.fillStyle = "white";
		}
		else if(t.curred <= 2){
			ctx.fillStyle = "tan";
		}
		else if(t.curred <= 3){
			ctx.fillStyle = "olive";
		}
		else if(t.curred <= 4){
			ctx.fillStyle = "yellow";
		}
		else if(t.curred <= 5){
			ctx.fillStyle = "orange";
		}
		else if(t.curred <= 6){
			ctx.fillStyle = "red";
		}
		else{
			ctx.fillStyle = "blue";
		}
	}
	else if(p.draw == "wetness"){
		if(t.wetness <= 0.1){
			ctx.fillStyle = "white";
		}
		else if(t.wetness <= .05){
			ctx.fillStyle = "tan";
		}
		else if(t.wetness <= .1){
			ctx.fillStyle = "olive";
		}
		else if(t.wetness <= .5){
			ctx.fillStyle = "yellow";
		}
		else if(t.wetness <= 1){
			ctx.fillStyle = "orange";
		}
		else if(t.wetness <= 2){
			ctx.fillStyle = "red";
		}
		else{
			ctx.fillStyle = "blue";
		}
	}
	else if(p.draw == "zones"){
		switch(t.zone){
			case -1: if(t.elevation <= 0){ ctx.fillStyle = "white";} else { ctx.fillStyle = "#B4B4B4" }; break;
			case 0:ctx.fillStyle = "#ABFF96"; break;
			case 1:ctx.fillStyle = "#BFFFAA"; break;
			case 2:ctx.fillStyle = "#D3FFBE"; break;
			case 3:ctx.fillStyle = "#E7FFD2"; break;
			default: ctx.fillStyle = "green"; break;
		}
	}
	else { p.draw = "normal"; }
	if(!dDraw){
		ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);
	}
	if(p.draw == "normal" || p.draw == "zones" || p.draw == "resources"){
		if(t.owner > -1){ //DRAW COUNTRY BORDERS
			ctx.fillStyle = colors[Math.min(colors.length-1,t.owner)];
			if(map[safeC(y + 1)][x].owner != t.owner){
				ctx.fillRect((dX) * (p.zoom), (dY+(13/14)) * (p.zoom), (p.zoom), (p.zoom)/14);
			}
			if(map[safeC(y + 1)][safeC(x+1)].owner != t.owner){
				ctx.fillRect((dX+(13/14)) * (p.zoom), (dY+(13/14)) * (p.zoom), (p.zoom)/14, (p.zoom)/14);
			}
			if(map[safeC(y + 1)][safeC(x-1)].owner != t.owner){
				ctx.fillRect((dX) * (p.zoom), (dY+(13/14)) * (p.zoom), (p.zoom)/14, (p.zoom)/14);
			}	
			if(map[safeC(y - 1)][safeC(x+1)].owner != t.owner){
				ctx.fillRect((dX+(13/14)) * (p.zoom), (dY) * (p.zoom), (p.zoom)/14, (p.zoom)/14);
			}
			if(map[safeC(y - 1)][safeC(x-1)].owner != t.owner){
				ctx.fillRect((dX) * (p.zoom), (dY) * (p.zoom), (p.zoom)/14, (p.zoom)/14);
			}
			if(map[safeC(y - 1)][x].owner != t.owner){
				ctx.fillRect(dX * (p.zoom), dY * (p.zoom), (p.zoom), (p.zoom)/14);
			}
			if(map[y][safeC(x + 1)].owner != t.owner){
				ctx.fillRect((dX+(13/14)) * (p.zoom), (dY) * (p.zoom), (p.zoom)/14, (p.zoom));
			}
			if(map[y][safeC(x - 1)].owner != t.owner){
				ctx.fillRect(Math.floor(dX * (p.zoom)), Math.floor(dY * (p.zoom)), (p.zoom)/14, (p.zoom));
			}
		}
		if(t.building[0] != -1 && t.building[0] < 4){
			drawBuilding(y, x);
		}
		if(t.navy != -1){
			let n = t.navy;
			ctx.fillStyle = "#83423b";
			if(n.lastDir %2==0){
				ctx.fillRect((dX+.325)*p.zoom,(dY+.15)*p.zoom,.35*p.zoom,.7*p.zoom);
			}
			else{
				ctx.fillRect((dX+.15)*p.zoom,(dY+.325)*p.zoom,.7*p.zoom,.35*p.zoom);
			}
			if(n.owner == p.turn){
				ctx.fillStyle = p.color;
			}
			else if(n.owner > -1){
				ctx.fillStyle = colors[Math.min(colors.length-1,n.owner)];
			}
			else{
				ctx.fillStyle = "#c4adad";
			}
			let cVal = Math.floor((Math.min(1,(n.health[0]/n.health[1]))) * 255);
			ctx.strokeStyle = "rgb("+cVal+","+cVal+","+cVal+")";
			ctx.lineWidth = 2;
			switch(n.lastDir){
				case 0: ctx.fillRect((dX+.4)*p.zoom,(dY+.25)*p.zoom,.2*p.zoom,.2*p.zoom);
				ctx.strokeRect((dX+.4)*p.zoom,(dY+.25)*p.zoom,.2*p.zoom,.2*p.zoom);
				break;
				case 1: ctx.fillRect((dX+.58)*p.zoom,(dY+.4)*p.zoom,.2*p.zoom,.2*p.zoom);
				ctx.strokeRect((dX+.58)*p.zoom,(dY+.4)*p.zoom,.2*p.zoom,.2*p.zoom);
				break;
				case 2: ctx.fillRect((dX+.4)*p.zoom,(dY+.58)*p.zoom,.2*p.zoom,.2*p.zoom);
				ctx.strokeRect((dX+.4)*p.zoom,(dY+.58)*p.zoom,.2*p.zoom,.2*p.zoom);
				break;
				case 3: ctx.fillRect((dX+.25)*p.zoom,(dY+.4)*p.zoom,.2*p.zoom,.2*p.zoom);
				ctx.strokeRect((dX+.25)*p.zoom,(dY+.4)*p.zoom,.2*p.zoom,.2*p.zoom);
				break;
			}
			ctx.lineWidth = 1;
		}
		if(t.building[0] == 4 && t.building[1] == 0){//BRIDGE
			for(a = -1; a < 2; a++){
				for(b = -1; b < 2; b++){
					if(a * b == 0 && a != b){
						var h0 = map[safeC(a+y)][safeC(b+x)].building[0];
						var h1 = map[safeC(a+y)][safeC(b+x)].building[1];
						if(map[safeC(a+y)][safeC(b+x)].elevation > 0 || map[safeC(a+y)][safeC(b+x)].building[0] ==4){
							var girth = .3;
							ctx.fillStyle = "#5C4033";
							if(b == 0){
								ctx.fillRect((dX + (1-girth)/2)*p.zoom, (.5*(Math.ceil(a/2)) + dY) * p.zoom, p.zoom*girth, p.zoom*.5);
							}
							else {
								ctx.fillRect((.5*(Math.ceil(b/2)) + dX) * p.zoom, (dY + (1-girth)/2)*p.zoom, p.zoom*.5, p.zoom*girth);
							}
						}
					}
				}
			}
		}
		if(t.army != -1){
			var a = t.army;
			let cVal = Math.floor((1-Math.min(1,(a.morale[0]/a.morale[1]))) * 255);
			ctx.strokeStyle = "rgb("+cVal+","+cVal+","+cVal+")";
			ctx.lineWidth = Math.floor(2 * p.zoom/40);
			if(a.owner == p.turn){
				ctx.fillStyle = p.color;
			}
			else if(a.owner > -1){
				ctx.fillStyle = colors[Math.min(colors.length-1,a.owner)];
			}
			else{
				ctx.fillStyle = "#c4adad";
			}
			if(a.trebuchet){
				ctx.lineWidth = 4;
				ctx.strokeStyle = ctx.fillStyle;
				ctx.fillStyle = "brown";
			}
			ctx.beginPath();
			ctx.arc(dX*p.zoom+ p.zoom/2, dY*p.zoom+p.zoom/2, Math.max(1, (Math.min(1,a.size/100)*.8+.2) * (p.zoom/2)), 0, 2*Math.PI);
			ctx.fill();
			ctx.stroke();
			ctx.lineWidth = 1;
		}
		if(map[safeC(y+1)][x].building[0] != -1){
			drawBuilding(y+1, x);
		}
		if(y == tS[0] && x == tS[1] && p.zoom > 4){ 
			ctx.strokeStyle = "gold"; 
			ctx.strokeRect(Math.floor(dX * p.zoom)+1, Math.floor(dY * p.zoom)+1, p.zoom-2, p.zoom-2);
		}
	}
}

