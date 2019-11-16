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
function drawTile(y1, x1){
	let y = safeC(y1);
	let x = safeC(x1);
	var t = map[y][x];
	let dY = safeC(y1 - p.yView);
	let dX = safeC(x1 - p.xView);
	if(p.draw == "normal"){
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
			case 'c': if(drawCoasts){ ctx.fillStyle = "tan";} else { ctx.fillStyle = "#3cb371";}  break; //coast
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
			break; //forest
			case 'l': ctx.fillStyle = "grey"; break; //high hilLs
			case 'e': ctx.fillStyle = "white"; break; //ice
			case 'n': ctx.fillStyle = "#EFFCFF"; break; //snow
			default:  ctx.fillStyle = "red"; break;
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
	ctx.fillRect(Math.floor(dX * p.zoom), Math.floor(dY * p.zoom), p.zoom, p.zoom);
	if(p.draw == "normal" || p.draw == "zones" || p.draw == "resources"){
		if(t.owner > -1){
			ctx.fillStyle = colors[Math.min(colors.length-1,t.owner)];
			if(map[safeC(y + 1)][x].owner != t.owner){
				ctx.fillRect((dX) * (p.zoom), (dY+(5/6)) * (p.zoom), (p.zoom), (p.zoom)/6);
			}
			if(map[safeC(y + 1)][safeC(x+1)].owner != t.owner){
				ctx.fillRect((dX+(5/6)) * (p.zoom), (dY+(5/6)) * (p.zoom), (p.zoom)/6, (p.zoom)/6);
			}
			if(map[safeC(y + 1)][safeC(x-1)].owner != t.owner){
				ctx.fillRect((dX) * (p.zoom), (dY+(5/6)) * (p.zoom), (p.zoom)/6, (p.zoom)/6);
			}	
			if(map[safeC(y - 1)][safeC(x+1)].owner != t.owner){
				ctx.fillRect((dX+(5/6)) * (p.zoom), (dY) * (p.zoom), (p.zoom)/6, (p.zoom)/6);
			}
			if(map[safeC(y - 1)][safeC(x-1)].owner != t.owner){
				ctx.fillRect((dX) * (p.zoom), (dY) * (p.zoom), (p.zoom)/6, (p.zoom)/6);
			}
			if(map[safeC(y - 1)][x].owner != t.owner){
				ctx.fillRect(dX * (p.zoom), dY * (p.zoom), (p.zoom), (p.zoom)/6);
			}
			if(map[y][safeC(x + 1)].owner != t.owner){
				ctx.fillRect((dX+(5/6)) * (p.zoom), (dY) * (p.zoom), (p.zoom)/6, (p.zoom));
			}
			if(map[y][safeC(x - 1)].owner != t.owner){
				ctx.fillRect(Math.floor(dX * (p.zoom)), Math.floor(dY * (p.zoom)), (p.zoom)/6, (p.zoom));
			}
		}
		if(t.building[0] != -1 && t.building[0] < 4){
			var b0 = t.building[0];
			var b1 = t.building[1];
			var onestop = false;
			if(((b0 == 0 || b0 == 2) && b1 <= 2*t.building[0]) || (b0 == 1 && b1 == 3)){
				var girth = buildings[b0][b1].draw[1];
				ctx.fillStyle = buildings[b0][b1].draw[0];
				var none = true;
				for(h = -1; h < 2; h+=2){
					var h0 = map[y][safeC(h+x)].building[0];
					var h1 = map[y][safeC(h+x)].building[1];
					ctx.fillStyle = buildings[b0][b1].draw[0];
					girth = buildings[b0][b1].draw[1];
					if(!onestop && (h0 != -1 || (b0 == 2 && map[y][safeC(h+x)].elevation < 0) || (b0 == 1 && b1 == 3 && map[y][safeC(h+x)].elevation < 0))){
						if((h0 == b0  && h1 <= 1.5*b0 && b1 != 4 && b0 !=1) || (b0 == 2 && map[y][safeC(h+x)].elevation < 0)|| (b0 == 1 && b1 == 3 && map[y][safeC(h+x)].elevation < 0) || (b0==0 && b1==0 && h0==2 && h1==3) || (b0==2 && ((b1==3 && h0==0 & h1==0) || (b1 == 4 && h0 == 2 && h1 == 4)))){ // l or r
							if(b0 == 1 && b1 == 3){
								onestop = true;
							}
							ctx.fillStyle = buildings[t.building[0]][t.building[1]].draw[0];
							ctx.fillStyle = buildings[t.building[0]][t.building[1]].draw[1];
							none = false;
							ctx.fillRect((.5*(Math.ceil(h/2)) + dX) * p.zoom, (dY + (1-girth)/2)*p.zoom, p.zoom*.5, p.zoom*girth);
						}
					}
					var h0 = map[safeC(y+h)][x].building[0];
					var h1 = map[safeC(y+h)][x].building[1];
					if(!onestop && (h0 != -1 || (b0 == 2 && map[safeC(y+h)][x].elevation < 0)|| (b0 == 1 && b1 == 3 && map[safeC(y+h)][x].elevation < 0))){
						if((h0 == b0  && h1 <= 1.5*b0 && b1 != 4 && b0 != 1) || (b0 == 2 && map[safeC(y+h)][x].elevation < 0) || (b0 == 1 && b1 == 3 && map[safeC(y+h)][safeC(x)].elevation < 0)|| (b0==0 && b1==0 && h0==2 && h1==3) || (b0==2 && ((b1==3 && h0==0 & h1==0) || (b1 == 4 && h0 == 2 && h1 == 4)))){ // u or d
							if(b0 == 1 && b1 == 3){
								onestop = true;
							}
							none = false;
							ctx.fillRect((dX + (1-girth)/2)*p.zoom, (.5*(Math.ceil(h/2)) + dY) * p.zoom, p.zoom*girth, p.zoom*.5);
						}
					}
				}
				if(none){
					ctx.fillRect((dX + (1-girth)/2)*p.zoom, ((1-girth)/2 + dY) * p.zoom, p.zoom*girth, p.zoom*girth);
				}
			}
			else if(b0 == 0 && (b1 == 2 || b1 == 12 || b1 == 13)){ //Orchard
				ctx.fillStyle = "#B7A99B";
				if(b1 ==2){
					ctx.fillStyle = "#005000";
				}
				else if(b1 == 13){
					ctx.fillStyle = "#604E42";
				}
				for(let i = 0; i < 2; i++){
					for(let j = 0; j < 2; j++){
						ctx.fillRect((dX + .2*(2*i+1))*p.zoom, (dY+((2*j+1)*.2)) * p.zoom, p.zoom*.2, p.zoom*.2);
					}
				}
			}
			else if(b0 == 0 && b1 == 9){ //bazaar
				var girth = buildings[b0][b1].draw[1];
				ctx.fillStyle = buildings[b0][b1].draw[0];
				ctx.fillRect((dX + (1-girth)/2)*p.zoom, ((1-girth)/2 + dY) * p.zoom, p.zoom*girth, p.zoom*girth);
				ctx.fillStyle = "tan";
				ctx.fillRect((dX + .45)*p.zoom, dY * p.zoom, .1*p.zoom, p.zoom);
				ctx.fillRect(dX*p.zoom, (.45 + dY) * p.zoom, p.zoom, p.zoom*.1);
			}
			//else if(b0 == 0 && b1 == 1){//farm
			//	var girth = buildings[b0][b1].draw[1];
			//	ctx.fillStyle = buildings[b0][b1].draw[0];
			//	ctx.fillRect((dX + (1-girth)/2)*p.zoom, ((1-girth)/2 + dY) * p.zoom, p.zoom*girth, p.zoom*girth);
			//	for(let i = 0; i < 4; i++){
			//		ctx.fillStyle = "black";
			//		ctx.fillRect((dX + (1-girth)/2 + .1*(i+i))*p.zoom, (dY+(1-girth)/2) * p.zoom, p.zoom*.05, p.zoom*girth);
			//	}
			//}
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
		if(y == tileSelected[0] && x == tileSelected[1]){ 
			ctx.strokeStyle = "gold"; 
			ctx.strokeRect(Math.floor(dX * p.zoom)+1, Math.floor(dY * p.zoom)+1, p.zoom-2, p.zoom-2);
		}
	}
}