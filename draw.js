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
	drawing = true;
	if(typeof newDir == 'undefined' || newDir == -1 || p.zoom > 6){
		ctx.clearRect(0, 0, cWidth, cHeight);
		for(let i = 0; i < Math.ceil(cHeight/p.zoom); i++){
			for(let j = 0; j < Math.ceil(cWidth/p.zoom); j++){
				drawTile(p.yView + i, p.xView + j);
			}
		}
	}
	else{
		ctx.save();
		switch(newDir){
			case 0: ctx.translate(0, p.zoom); break; //up
			case 1: ctx.translate(-p.zoom, 0); break; //right
			case 2: ctx.translate(0, 0 -p.zoom); break; //down
			case 3: ctx.translate(p.zoom, 0); break; //left
		}
		ctx.drawImage(c, 0, 0, c.width/scale, c.height/scale);
		ctx.restore();
		let a = b = c1 = d = 0;
		let xEdg = Math.min(MAPSIZE, Math.ceil(cWidth/p.zoom));
		let yEdg = Math.min(MAPSIZE, Math.ceil(cHeight/p.zoom));
		switch(newDir){ //draws from (a,b) to (c1, d)
			case 0: a=0;b=0;c1=1;d=xEdg; break; //up
			case 1: a=0;b=xEdg-2;c1=yEdg;d=xEdg; break; //right
			case 2: a=yEdg-2;b=0;c1=yEdg;d=xEdg; break; //down
			case 3: a=0;b=0;c1=yEdg;d=1; break; //left
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
	if(type == 'w' || type == 'r' || type == 'a'){
		[leftT, rightT, upT, downT] = [(map[y][safeC(x-1)].elevation < 0), (map[y][safeC(x+1)].elevation < 0), (map[safeC(y-1)][x].elevation < 0), (map[safeC(y+1)][x].elevation < 0)];
		[leftD, rightD, upD, downD] = [((map[y][safeC(x-1)].building[0] == 1) && map[y][safeC(x-1)].building[1] == 3), ((map[y][safeC(x+1)].building[0] == 1) && map[y][safeC(x+1)].building[1] == 3), ((map[safeC(y-1)][x].building[0] == 1) && map[safeC(y-1)][x].building[1] == 3), ((map[safeC(y+1)][x].building[0] == 1) && map[safeC(y+1)][x].building[1] == 3)];
	}
	else if(type == 'h' || type == 'k' || type == 'l'){
		let elev = .5;
		if(type == 'h'){ elev = .565; } else if(type == 'l'){ elev = .69; }
		[leftT, rightT, upT, downT] = [(map[y][safeC(x-1)].elevation >= elev), (map[y][safeC(x+1)].elevation >= elev), (map[safeC(y-1)][x].elevation >= elev), (map[safeC(y+1)][x].elevation >= elev)];
		[bL, bR, tL, tR] = [(map[safeC(y+1)][safeC(x-1)].elevation < elev), 
		(map[safeC(y+1)][safeC(x+1)].elevation < elev), 
		(map[safeC(y-1)][safeC(x-1)].elevation < elev),
		(map[safeC(y-1)][safeC(x+1)].elevation < elev)]
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
			(map[y][safeC(x-1)].owner == tu && (map[y][safeC(x-1)].building[0] == 0) && map[y][safeC(x-1)].building[1] == 1),
			(map[y][safeC(x+1)].owner == tu && (map[y][safeC(x+1)].building[0] == 0) && map[y][safeC(x+1)].building[1] == 1),
			(map[safeC(y-1)][x].owner == tu && (map[safeC(y-1)][x].building[0] == 0) && map[safeC(y-1)][x].building[1] == 1),
			(map[safeC(y+1)][x].owner == tu && (map[safeC(y+1)][x].building[0] == 0) && map[safeC(y+1)][x].building[1] == 1)];
			[bL, bR, tL, tR] = [!((map[safeC(y+1)][safeC(x-1)].building[0] == 0) && map[safeC(y+1)][safeC(x-1)].building[1] == 1), //bL
			!((map[safeC(y+1)][safeC(x+1)].building[0] == 0) && map[safeC(y+1)][safeC(x+1)].building[1] == 1), //bR
			!((map[safeC(y-1)][safeC(x-1)].building[0] == 0) && map[safeC(y-1)][safeC(x-1)].building[1] == 1), //tL
			!((map[safeC(y-1)][safeC(x+1)].building[0] == 0) && map[safeC(y-1)][safeC(x+1)].building[1] == 1)]; //tR
			bL = bL && leftT && downT;
			bR = bR && rightT && downT;
			tL = tL && upT && leftT;
			tR = tR && upT && rightT;
		}
		else{
			if(!(b0 == 1 && b1 == 3)){ //not dock - all buildings unless specified are dynamic to roads
				[leftT, rightT, upT, downT] = [
				(map[y][safeC(x-1)].owner == tu && (map[y][safeC(x-1)].building[0] == 0) && map[y][safeC(x-1)].building[1] == 0),
				(map[y][safeC(x+1)].owner == tu && (map[y][safeC(x+1)].building[0] == 0) && map[y][safeC(x+1)].building[1] == 0),
				(map[safeC(y-1)][x].owner == tu && (map[safeC(y-1)][x].building[0] == 0) && map[safeC(y-1)][x].building[1] == 0),
				(map[safeC(y+1)][x].owner == tu && (map[safeC(y+1)][x].building[0] == 0) && map[safeC(y+1)][x].building[1] == 0)];}
			else{ //dock
				[leftT, rightT, upT, downT] = [(map[y][safeC(x-1)].elevation <= 0), (map[y][safeC(x+1)].elevation <= 0), (map[safeC(y-1)][x].elevation <= 0), (map[safeC(y+1)][x].elevation <= 0)];
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
		[leftT, rightT, upT, downT] = [(map[y][safeC(x-1)].type == type), (map[y][safeC(x+1)].type == type), (map[safeC(y-1)][x].type == type), (map[safeC(y+1)][x].type == type)];
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
						if((!(b0 == 0 && b1 == 1) && type != 'h' && type != 'k' && type != 'l')){
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
function drawTile(y1, x1){
	let y = safeC(y1);
	let x = safeC(x1);
	var t = map[y][x];
	let dY = safeC(y1 - p.yView);
	let dX = safeC(x1 - p.xView);
	ctx.clearRect(dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
	if(p.draw == "normal"){
		var dDraw = false;
		if(p.sprites){
			dDraw = true;
			switch(t.type){
				case 'w': ctx.fillStyle = "#005fc6"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); drawDynamic('w', sprites2, 112, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); break;//water
				case 'a': ctx.fillStyle = "#006adc"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); drawDynamic('w', sprites2, 112, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); break;//lAke
				case 'r': ctx.fillStyle = "#1978DF"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); drawDynamic('w', sprites2, 112, x, y, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom)); break; //river
				case 'i': let tape = rand(srand(y*62*157*y*11*x+941*y+1728*x+1921)); if(tape < .5){ctx.drawImage(sprites2, 80, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);}else if(tape <.7){ctx.drawImage(sprites2, 96, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);}else if(tape <.95){ctx.drawImage(sprites2, 112, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);} else{ ctx.drawImage(sprites2, 64, 0, 8, 8, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);} break; //grass
				case 'd':
				case 's': let tape1 = rand(srand(y*62*157*y*11*x+941*y+1728*x+1921)); if(tape1 < .33){ctx.drawImage(sprites2, 16, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);}else if(tape1 <.88){ctx.drawImage(sprites2, 32, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);}else{ctx.drawImage(sprites2, 48, 0, 16, 16, Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);} break; //steppe
				
				case 'l': ctx.fillStyle = "#167042"; ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom); 
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
				case 'g': ctx.fillStyle = "#3cb371"; break; //grass
				case 's': ctx.fillStyle = "#b3f0a5"; break; //steppe
				case 'd': ctx.fillStyle = "tan"; break; //desert
				case 'h': if(t.wetness > .1){ctx.fillStyle = "olivedrab";} 
				else{ctx.fillStyle = "#898a74"; }
				break; //hill
				case 'k': ctx.fillStyle = "#4ba520"; if(t.wetness < .1){ctx.fillStyle = "#7FCB63";} break; //knoll
				case 'm': ctx.fillStyle = "#B4B4B4"; break; //mountain
				case 'i': if(t.wetness > .1){ctx.fillStyle = "#36a165";} 
				else{ctx.fillStyle = "#80dd9b"; }
				break; //hIghland
				case 'c': ctx.fillStyle = "#3cb371";  break; //coast
				case 'f': ctx.fillStyle = "#005000";
				if(t.heat > .5 && t.heat < 2.5){
					let autCols = ["#D45B12", "#C64E0F", "#B8410C", "#AA3409", "#9C2706"];
					if(day > 250){
						for(let i = 0; i < (day-250)/5; i++){
							autCols.push("#475a3e");
						}
					}
					if(day < 200){
						let gVal = 100 - 40*(day/200); let colo = "rgb(0, "+gVal+",0)";
						let sprCols = [colo, colo, colo, colo, colo, colo, colo];
						if(day < 165){ sprCols.push(colo); sprCols.push(colo); sprCols.push(colo); }
						else if(day < 170){ sprCols.push(colo); sprCols.push(colo); }
						else if(day < 175){ sprCols.push(colo); }
						if(day > 155){
							for(let i = 0; i < (day-150)/8; i++){
								sprCols.push(autCols[i]);
							}
						}
						let tInd = Math.floor(sprCols.length*rand(srand(y*62*157*y*11*x+941*y+1728*x+1921)));
						ctx.fillStyle = sprCols[tInd];
					}
					else if(day < 300){
						let tInd = Math.floor(autCols.length*rand(srand(y*62*157*y*11*x+941*y+1728*x+1921)));
						ctx.fillStyle = autCols[tInd];
					}
					else{
						ctx.fillStyle = "#475a3e";
					}
				}
				break; //forest*/
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
			var b0 = t.building[0];
			var b1 = t.building[1];
			if(b0 == 0){ //DRAW ECONOMIC BUILDINGS
				if(b1 == 0){ //ROAD
					drawDynamic('b', sprites2, 128, x, y,  Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
				}
				else if(b1 == 1){ //FARM
					let xSpot = Math.floor(day/100)*16;
					drawDynamic('b', sprites2, 160, x, y,  Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
					ctx.drawImage(sprites2, xSpot, 144, 16, 16, dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
				}
				else if((b1 == 2 || b1 == 11 || b1 == 12 || b1 == 13)){ //ORCHARDS/SPICEPLANT
					let xSpot = 64 + Math.floor(day/100)*16;
					if(b1 >= 11){
						xSpot += (b1-10)*64;
					}
					ctx.drawImage(sprites2, xSpot, 144, 16, 16, dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
				}
				else if(b1 == 3){ //LUMBER MILL
					ctx.drawImage(sprites2, 0, 176, 16, 16, dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
				}
				else if(b1 == 4){ //GRANARY
					drawDynamic('b', sprites2, 256, x, y,  Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), 144);
				}
				else if(b1 == 5){//WAREHOUSE
					drawDynamic('b', sprites2, 192, x, y, Math.floor(dX*p.zoom), Math.floor(dY*p.zoom));
				}
				else if(b1 == 6){ //MINE
					drawDynamic('b', sprites2, 208, x, y, Math.floor(dX*p.zoom), Math.floor(dY*p.zoom));
				}
				else if(b1 == 7){ //METALWORKS
					ctx.drawImage(sprites2, 0, 224, 16, 16, dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
				}
			}
			else if(b0 == 1){ //DRAW SOCIAL BUILDINGS
				if(b1 == 0){ //HOUSE
					drawDynamic('b', sprites2, 256, x, y,  Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
				}
				else if(b1 == 1){ //PLAZA
					ctx.drawImage(sprites2, 80, 176, 16, 16, dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
				}
				else if (b1 == 2){ //TAX OFFICE
					ctx.drawImage(sprites2, 96, 176, 16, 16, dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
				}
				else if(b1 == 3){ //DOCK
					drawDynamic('b', sprites2, 272, x, y,  Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
				}
				else if(b1 == 4){ //TEMPLE
					ctx.drawImage(sprites2, 48, 192, 16, 16, dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
				}
				else if(b1 == 11){ //WINERY
					drawDynamic('b', sprites2, 240, x, y,  Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), 144);
				}	
				else if((b1 == 7 || b1 == 8 || b1 == 9 || b1 == 12)){
					let xSpot = 16 + Math.min(3, b1-7)*16;
					ctx.drawImage(sprites2, xSpot, 176, 16, 16, dX*p.zoom, dY*p.zoom, p.zoom, p.zoom);
				}
				else if(b1 == 10){ //TAVERN
					drawDynamic('b', sprites2, 240, x, y,  Math.floor(dX * p.zoom), Math.floor(dY * p.zoom));
				}
			}
			else {
				var girth = buildings[b0][b1].draw[1];
				ctx.fillStyle = buildings[b0][b1].draw[0];
				ctx.fillRect((dX + (1-girth)/2)*p.zoom, ((1-girth)/2 + dY) * p.zoom, p.zoom*girth, p.zoom*girth);
			}
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
		if(y == tS[0] && x == tS[1]){ 
			ctx.strokeStyle = "gold"; 
			ctx.strokeRect(Math.floor(dX * p.zoom)+1, Math.floor(dY * p.zoom)+1, p.zoom-2, p.zoom-2);
		}
	}
}
function drawRightBar(e){
	var rect = r.getBoundingClientRect();
	rtx.clearRect(0, 0, rect.width, rect.height);
	rtx.fillStyle =  "#293134";
	rtx.fillRect(0,0, rect.width,rect.height);
	var yS = -1;
	var xS = -1;
	if(tS.length == 2){
		yS = tS[0];
		xS = tS[1];
	}
	if(e.type == 'mouseup'){
		r.removeEventListener('mousemove', drawRightBar);
		e = 0;
	}
	if(e!=0 && e.type == 'mousedown' || e.type == 'mousemove'){
		var y = e.clientY - rect.top;
		var x = e.clientX - rect.left;
		if(e.type == 'mousemove' && x < rect.width-60){
			r.removeEventListener('mousemove', drawRightBar);
			e = 0;
		}
	}
	if(e != 0 && y > 0 && y < rect.height && x > 0 && x < rect.width){ //Handle Clicks in this If
		if(p.menView[1][0] == -1 && e.type == 'mousedown'){ //Which Building Type is Selected
			if(y < 4*rect.height/12){
				p.menView[1][0] = Math.floor((y)/(rect.height/12));
				p.menView[1][2] = 0;
			}
		}
		else if(x > rect.width - 60){ //If Collapse Arrows are clicked or scrollbar
			var topOf = p.menView[1][0]*rect.height/12;
			var botOf = p.menView[1][0]*rect.height/12+5*rect.height/12;
			if(e.type == 'mousedown' && y > (20 + (p.menView[1][0]) * (rect.height/12) + 5*rect.height/12) && y < ((p.menView[1][0]) * (rect.height/12) + 5*rect.height/12)){
				p.menView[1] = [-1, -1, 0]
			}
			else if(y < p.menView[1][0]*(rect.height/12) || y > ((p.menView[1][0]) * (rect.height/12) + 5*rect.height/12)){ //If a separate expand arrow is clicked, switch to that building type
				if(y<topOf){
					p.menView[1][0] = Math.floor((y)/(rect.height/12)); p.menView[1][2] = 0;
				}
				else if(y>botOf && y < 8*rect.height/12){
					p.menView[1][0] += 1+Math.floor((y-(botOf))/(rect.height/12)); p.menView[1][2] = 0;
				}
			}
			else if(y < botOf && y > topOf && x > rect.width - 60){
				if(e.type == 'mousedown'){
					r.addEventListener('mousemove', drawRightBar);
					r.addEventListener('mouseup', drawRightBar);
				}
				else if(e.type == 'mousemove'){
					p.menView[1][2] = Math.min((y-topOf), 240);
				}
			}
		}
		else if(x < rect.width-60 && y > p.menView[1][0] * rect.height/12 && y < (6+p.menView[1][0]) * rect.height/12){ //else a building is clicked
			r.removeEventListener('mousemove', drawRightBar);
			//Arbitrary Variables for simpler math, handles which building is selected
			var tB = (5*rect.height/12 - 2)/7;
			var tC = (p.menView[1][0]*rect.height/12)
			p.menView[1][1] = safeC(Math.floor((y-tC)/(tB))+Math.floor(p.menView[1][2]/buildings[p.menView[1][0]].length), buildings[p.menView[1][0]].length);
		}
		else if(p.menView[1][0] > -1 && p.menView[1][1] > -1 && x > 10 && y > 80+8*rect.height/12 && x < 70 && y <= 170+8*rect.height/12){//buy key
			let b0 = p.menView[1][0];
			let b1 = p.menView[1][1];
			if(canBuy(yS, xS, b0, b1, p)){ //Buy a building
				var canPlace = false;
				if(b0 == 1 && b1 == 3){ //if Dock
					for(let a = -1; a < 2; a++){
						for(let b = -1; b < 2; b++){
							if((a == 0 || b == 0) && a != b){
								if(map[safeC(yS+a)][safeC(xS+b)].elevation < 0){
									canPlace = true; a = 2; b = 2;
								}
							}
						}
					}
				}
				else if(map[yS][xS].type == 'l'){
					if(b0 == 2 && b1 <= 3){ //walls on hills
						canPlace = true;
					}
				}
				else{ canPlace = true; }
				if(b0 == 2 && b1 == 3){ // no adjacent gatehouses
					for(let a = -1; a < 2; a++){
						for(let b = -1; b < 2; b++){
							if((a == 0 || b == 0) && a != b){
								if(map[safeC(yS+a)][safeC(xS+b)].building[0] == 2 && map[safeC(yS+a)][safeC(xS+b)].building[1] == 3){
									canPlace = false;
									alert("No adjacent gatehouses u ape");
								}
							}
						}
					}
				}
				else if(b0 == 0 && b1 == 6){ // no adjacent mines
					for(let a = -1; a < 2; a++){
						for(let b = -1; b < 2; b++){
							if((a == 0 || b == 0) && a != b){
								if(map[safeC(yS+a)][safeC(xS+b)].building[0] == 0 && map[safeC(yS+a)][safeC(xS+b)].building[1] == 6){
									canPlace = false;
									alert("No adjacent mines u ape");
								}
							}
						}
					}
				}
				if(canPlace){ //BUY BUILDING AND PLACE IT
					map[yS][xS].building = [b0, b1, 1, [false]];
					if(b0 == 1 && b1 == 6){ // manor
						p.manors.push([yS,xS]);
					}
					if(buildings[b0][b1].cost[0] > 0){
						p.zones[map[yS][xS].zone].res.wood -= buildings[b0][b1].cost[0];
					}
					if(buildings[b0][b1].cost[1] > 0){
						p.zones[map[yS][xS].zone].res.stone -= buildings[b0][b1].cost[1];
					}
					if(buildings[b0][b1].cost[2] > 0){
						p.zones[map[yS][xS].zone].res.gold -= buildings[b0][b1].cost[2];
					}
					p.gold -= buildings[b0][b1].cost[2];
					p.manpower -= buildings[b0][b1].cost[3];
					switch(buildings[b0][b1].cost[4][0]){
						case 12: p.zones[map[yS][xS].zone].res.rWood-=buildings[b0][b1].cost[4][1]; break;
						case 15: p.zones[map[yS][xS].zone].res.rSilk-=buildings[b0][b1].cost[4][1]; break;
						case 16: p.zones[map[yS][xS].zone].res.spices-=buildings[b0][b1].cost[4][1]; break;
					}
					buildings[b0][b1].effect(0);
					drawTile(yS, xS);
					if(yS > 0){
						drawTile(yS-1, xS);
					}
					if(xS > 0){
						drawTile(yS, xS-1);
					}
					if(xS-p.xView < Math.floor(cWidth/p.zoom)){
						drawTile(yS, xS+1);
					}
					if(yS-p.yView < Math.floor(cHeight/p.zoom)){
						drawTile(yS+1, xS);
					}
					if(b0 + b1 == 0){
						$("#switchContainer").css("display", "inline-block");
						if(document.getElementById("resgood").checked){
							$('#resource-list').show();
						}
						else { $('#goods-list').show(); }
					}
					delta = true;
					if(e.shiftKey){ p.action = "building";}
					else { b1 = -1; }
					tileChange(yS,xS);
					return;
				}
			}
		}
	}
	var cCols = ["#BAEFC8", "#E5EFBA", "#BAEAEF", "#EFD4BA"];
	if(p.menView[1][0] == -1){ //No selected building
		for(let i = 0; i < 4; i++){
			rtx.font = "32px Bookman";
			rtx.fillStyle = cCols[i];
			rtx.fillRect(0, i*rect.height/12, rect.width, rect.height/12);
			rtx.fillStyle = "black";
			switch(i){
				case 0:rtx.fillText("Economic", 10, 45);  break;
				case 1:rtx.fillText("Social", 10, 45 + rect.height/12); break;
				case 2:rtx.fillText("Defense", 10, 45 + 2*rect.height/12 );  break;
				case 3:rtx.fillText("Offense", 10, 45 + 3*rect.height/12);  break;
			}
			rtx.beginPath();
			rtx.moveTo(rect.width-35, 40 + i*rect.height/12);
			rtx.lineTo(rect.width-25, 30 + i*rect.height/12);
			rtx.lineTo(rect.width-45, 30 + i*rect.height/12);
			rtx.fill()
		}
		rtx.fillStyle = "#526165";
		rtx.fillRect(0, 4*rect.height/12, rect.width, (rect.height)-(4*rect.height/12));
		rtx.fillStyle = "white";
		rtx.font = "18px Bookman";
		rtx.fillText("No building selected", 15, 4*rect.height/12+40);
	}
	else {
		var yCur = 0;
		for(i = 0; i < 4; i++){
			rtx.fillStyle = cCols[i];
			if(i == p.menView[1][0]){
				rtx.fillRect(0, yCur, rect.width, 5*rect.height/12);
				rtx.fillStyle = "black";
				rtx.strokeRect(0, 1+yCur, rect.width-1, 5*rect.height/12-2);
				for(let j = 0; j < Math.min(7, buildings[p.menView[1][0]].length); j++){ //this loop draws the selected building types
					let bInd = safeC(j + Math.floor(p.menView[1][2]/buildings[p.menView[1][0]].length), buildings[p.menView[1][0]].length);
					var gir = buildings[p.menView[1][0]][bInd].draw[1];
					rtx.fillStyle = buildings[p.menView[1][0]][bInd].draw[0];
					rtx.fillRect(10 + (1-gir)*18, yCur + (1-gir)*18+ 2+(5*rect.height/12)/7*j , 36*gir, 36*gir);
					rtx.fillStyle = "black"; rtx.font = "26px Bookman";
					rtx.fillText(buildings[p.menView[1][0]][bInd].name, 50, yCur+30+(5*rect.height/12)/7*j, rect.width-60);
					rtx.lineWidth = 2;
					if(p.menView[1][1] == bInd){rtx.strokeStyle = "gold";} else { rtx.strokeStyle = "black"; }
					rtx.strokeRect(2, 1+yCur+(5*rect.height/12-2)/7*j, rect.width-60, (5*rect.height/12 - 2)/7);
					rtx.strokeStyle = "black";
				}
				rtx.strokeRect(rect.width-58, yCur, 58, 6*(5*rect.height/12 - 1)/7); 
				rtx.fillStyle = "grey";
				rtx.fillRect(rect.width-57, yCur+Math.max(2, p.menView[1][2]), 55, 20);
				yCur += 5*rect.height/12;
				rtx.fillStyle = "black";
				rtx.beginPath();
				rtx.moveTo(rect.width-30, yCur - 30);
				rtx.lineTo(rect.width-20, yCur - 20);
				rtx.lineTo(rect.width-40, yCur - 20);
				rtx.fill();
			}
			else{ //this draws the unselected tabs
				rtx.fillRect(0, yCur, rect.width, rect.height/12);
				rtx.fillStyle = "black"; rtx.font = "32px Bookman";
				switch(i){
					case 0:rtx.fillText("Economic", 10, 45+yCur);  break;
					case 1:rtx.fillText("Social", 10, 45+yCur); break;
					case 2:rtx.fillText("Defense", 10, 45+yCur);  break;
					case 3:rtx.fillText("Offense", 10, 45+yCur);  break;
				}
				yCur += rect.height/12;
				rtx.beginPath();
				rtx.moveTo(rect.width-30, yCur - 20);
				rtx.lineTo(rect.width-20, yCur - 30);
				rtx.lineTo(rect.width-40, yCur - 30);
				rtx.fill()
			}
		}
		if(p.menView[1][1] > -1 && buildings.length > p.menView[1][0] && buildings[p.menView[1][0]].length > p.menView[1][1]){ //Draw Pricing & Buy key
			rtx.fillStyle = "rgb(53, 65, 68)";
			rtx.font = "20px Bookman";
			rtx.fillRect(0, 8*rect.height/12, rect.width, (rect.height - (120+8*rect.height/12)));
			var trig = 0;
			var a = buildings[p.menView[1][0]][p.menView[1][1]].cost;
			var b = map[yS][xS].zone;
			let cR;
			if( b > -1){
				cR = p.zones[b].res;
			}
			rtx.fillStyle = "white";
			rtx.fillText(buildings[p.menView[1][0]][p.menView[1][1]].description, 15, 8*rect.height/12 + 70);
			if(b > -1 && a[0] <= cR.wood){ rtx.fillStyle = "white"; trig++; } else { rtx.fillStyle = "grey" }
			rtx.fillText("W Cost:  " + a[0], 15, 8*rect.height/12 + 20);
			if(a[4][0] == -1){
				if(b > -1 && a[1] <= cR.stone){ rtx.fillStyle = "white"; trig++; } else { rtx.fillStyle = "grey" }
				rtx.fillText("S Cost:  " + a[1], 15 + rect.width/2, 8*rect.height/12 + 20);
			}
			else{ //In case there is a special cost, like for plantations or silk orchards
				rtx.fillStyle = "grey";
				switch(a[4][0]){
					case 12: if(cR.rWood >= a[4][1]){rtx.fillStyle = "white"; }rtx.fillText("LW Cost: " + a[4][1], 15 + rect.width/2, 8*rect.height/12+20); break;
					case 15: if(cR.rSilk >= a[4][1]){rtx.fillStyle = "white"; }rtx.fillText("Si Cost: " + a[4][1], 15 + rect.width/2, 8*rect.height/12+20); break;
					case 16: if(cR.spices >= a[4][1]){rtx.fillStyle = "white"; }rtx.fillText("Sp Cost: " + a[4][1], 15 + rect.width/2, 8*rect.height/12+20); break;
				}
			}
			if(a[3] <= p.manpower){ rtx.fillStyle = "white"; trig++; } else { rtx.fillStyle = "grey" }
			rtx.fillText("M Cost:  " + a[3], 15, 8*rect.height/12 + 45);
			if(b > -1 && a[2] <= p.gold){ rtx.fillStyle = "white"; trig++; } else { rtx.fillStyle = "grey" }
			rtx.fillText("G Cost:  " + a[2], 15 + rect.width/2, 8*rect.height/12 + 45);
			if(trig == 0){ rtx.fillStyle = "white"; } else { rtx.fillStyle = "grey"; }
			rtx.strokeRect(10, 8*rect.height/12 + 80, 60, 30);
			rtx.fillText("Build!", 15, 8*rect.height/12 + 100);
		}
	}
}
