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
		switch(newDir){
			case 0: a=0;b=0;c1=1;d=xEdg; break; //up
			case 1: a=0;b=xEdg-2;c1=yEdg;d=xEdg; break; //right
			case 2: a=yEdg-1;b=0;c1=yEdg;d=xEdg; break; //down
			case 3: a=0;b=0;c1=yEdg;d=1; break; //left
		}
		for(let i = a; i < c1; i++){
			for(let j = b; j < d; j++){
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
function drawMenus(){
	var rect = r.getBoundingClientRect();
	rtx.strokeStyle = "black";
	rtx.fillStyle = "#3f4b4e";
	rtx.fillRect(0, 0, rect.width, 60);
	rtx.fillRect(0, rect.height - 60, rect.width, 60);
	rtx.font = "20px Bookman";
	rtx.fillStyle = "#d5d9ef";
	rtx.fillText("Descendant of " + p.bloodline, 15, 40);
	let mCols = ["#36B06F", "#FBB86F","#D9594C","#08386D"] //spring summer fall winter 
	let month = Math.min(3, Math.floor(day/100));
	let normalWidth = rect.width/4;
	let curX = 0;
	let curWidth = rect.width/4 * (100-(day%100))/100;
	rtx.fillStyle = mCols[month];
	rtx.fillRect(0,rect.height-60,curWidth,60); 	
	rtx.fillStyle = mCols[(month+1)%4];
	rtx.fillRect(curWidth,rect.height-60,normalWidth,60); 	
	rtx.fillStyle = mCols[(month+2)%4];
	rtx.fillRect(curWidth+normalWidth,rect.height-60,normalWidth,60);
	rtx.fillStyle = mCols[(month+3)%4];
	rtx.fillRect(curWidth+normalWidth*2,rect.height-60,normalWidth,60);
	if(curWidth < normalWidth){
		rtx.fillStyle = mCols[month];
		rtx.fillRect(curWidth+normalWidth*3,rect.height-60,normalWidth-curWidth,60);
	}
	rtx.fillStyle = "white";
}
var newTaxes = [50, 50, 50, 50, 50, 50]; var taxSelected = -1; var justclicked = false;
var curUnit = [];
var tShift = 0; var tSel = -1;
var curShip = new Ship();
var retUnit = new Unit(); retUnit.stats[4] = 4;
var infUnit = new Unit();
var archUnit = new Unit();
var cavUnit = new Unit();
var sInfUnit = new Unit();
var sArchUnit = new Unit();
var sCavUnit = new Unit();
curUnit = [infUnit, archUnit, cavUnit];
function drawRightBar(e){ //Handles Right Menus. Menu interfacing is handled by p.menView[]. p.menView[0] -> what tab to view; other spots store subdata for the tab
	if(typeof drawRightBar.mVS == 'undefined'){ drawRightBar.mVS = [[0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0], [-1,-1], 0]; }
	var rect = r.getBoundingClientRect();
	rtx.clearRect(0, 0, rect.width, rect.height);
	rtx.fillStyle =  "#293134";
	rtx.fillRect(0,0, rect.width,rect.height);
	drawMenus();
	var yS = -1;
	var xS = -1;
	if(tileSelected.length == 2){
		yS = tileSelected[0];
		xS = tileSelected[1];
	}
	if(p.menView[0] != 3 && yS != -1){
		if(map[yS][xS].army != -1){ p.menView[0] = 2; }
		else if(map[yS][xS].navy != -1){
			p.menView[0] = 4; //3 is commander so 4 is navy
		}
		else if(map[yS][xS].building[0] == -1){ p.menView[0] = 0; }
		else { p.menView[0] = 1; }
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
	rtx.strokeRect(0, 0, rect.width, 60);
	if(y < 60){
		tab = Math.floor(5*x/rect.width);
	}
	else if(y > rect.height-60){
		tab = 5+Math.floor(5*x/rect.width);
	}
	rtx.clearRect(0, 60, rect.width, rect.height - 120);
	switch(p.menView[0]){
		case 0: //Buildings
			if(yS > -1){	
				if(map[yS][xS].building[0] == -1 && map[yS][xS].owner == p.turn && map[yS][xS].elevation > 0 && (map[yS][xS].type == 'g' || map[yS][xS].type == 'i' ||  map[yS][xS].type == 'k' || map[yS][xS].type == 'h'|| map[yS][xS].type == 'c' || map[yS][xS].type == 'l' || map[yS][xS].type == 's')){
					p.appraising = false;
					if(e != 0 && y > 60 && y < rect.height && x > 0 && x < rect.width){ //Handle Clicks in this If
						if(p.menView[1][0] == -1 && e.type == 'mousedown'){ //Which Building Type is Selected
							if(y > 60 && y < 60+4*rect.height/12){
								p.menView[1][0] = Math.floor((y-60)/(rect.height/12));
								p.menView[1][2] = 0;
							}
						}
						else if(x > rect.width - 60){ //If Collapse Arrows are clicked or scrollbar
							var topOf = 60+p.menView[1][0]*rect.height/12;
							var botOf = 60+p.menView[1][0]*rect.height/12+5*rect.height/12;
							if(e.type == 'mousedown' && y > (20 + (p.menView[1][0]) * (rect.height/12) + 5*rect.height/12) && y < (60 + (p.menView[1][0]) * (rect.height/12) + 5*rect.height/12)){
								p.menView[1] = [-1, -1, 0]
							}
							else if(y < 60+p.menView[1][0]*(rect.height/12) || y > (60 + (p.menView[1][0]) * (rect.height/12) + 5*rect.height/12)){ //If a separate expand arrow is clicked, switch to that building type
								if(y<topOf){
									p.menView[1][0] = Math.floor((y-60)/(rect.height/12)); p.menView[1][2] = 0;
								}
								else if(y>botOf && y < 60+8*rect.height/12){
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
						else if(x < rect.width-60 && y > 60+ p.menView[1][0] * rect.height/12 && y < (6+p.menView[1][0]) * rect.height/12){
							r.removeEventListener('mousemove', drawRightBar);
							var yA = y-60; //Arbitrary Variables for simpler math, handles which building is selected
							var tB = (5*rect.height/12 - 2)/7;
							var tC = (p.menView[1][0]*rect.height/12)
							p.menView[1][1] = safeC(Math.floor((yA-tC)/(tB))+Math.floor(p.menView[1][2]/buildings[p.menView[1][0]].length), buildings[p.menView[1][0]].length);
						}
						else if(p.menView[1][0] > -1 && p.menView[1][1] > -1 && x > 10 && y > 140+8*rect.height/12 && x < 70 && y <= 170+8*rect.height/12){ 
							if(canBuy(yS, xS, p.menView[1][0], p.menView[1][1], p)){ //Buy a building
								var canPlace = false;
								if(p.menView[1][0] == 1 && p.menView[1][1] == 3){ //if Dock
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
									if(p.menView[1][0] == 2 && p.menView[1][1] <= 3){ //walls on hills
										canPlace = true;
									}
								}
								else{ canPlace = true; }
								if(p.menView[1][0] == 2 && p.menView[1][1] == 3){ // no adjacent gatehouses
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
								else if(p.menView[1][0] == 0 && p.menView[1][1] == 6){ // no adjacent mines
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
								if(canPlace){
									map[yS][xS].building = [p.menView[1][0], p.menView[1][1], 1, [false]];
									if(p.menView[1][0] == 1 && p.menView[1][1] == 6){ // manor
										p.manors.push([yS,xS]);
									}
									if(buildings[p.menView[1][0]][p.menView[1][1]].cost[0] > 0){
										p.zones[map[yS][xS].zone].res.wood -= buildings[p.menView[1][0]][p.menView[1][1]].cost[0];
									}
									if(buildings[p.menView[1][0]][p.menView[1][1]].cost[1] > 0){
										p.zones[map[yS][xS].zone].res.stone -= buildings[p.menView[1][0]][p.menView[1][1]].cost[1];
									}
									if(buildings[p.menView[1][0]][p.menView[1][1]].cost[2] > 0){
										p.zones[map[yS][xS].zone].res.gold -= buildings[p.menView[1][0]][p.menView[1][1]].cost[2];
									}
									p.gold -= buildings[p.menView[1][0]][p.menView[1][1]].cost[2];
									p.manpower -= buildings[p.menView[1][0]][p.menView[1][1]].cost[3];
									switch(buildings[p.menView[1][0]][p.menView[1][1]].cost[4][0]){
										case 12: p.zones[map[yS][xS].zone].res.rWood-=buildings[p.menView[1][0]][p.menView[1][1]].cost[4][1]; break;
										case 15: p.zones[map[yS][xS].zone].res.rSilk-=buildings[p.menView[1][0]][p.menView[1][1]].cost[4][1]; break;
										case 16: p.zones[map[yS][xS].zone].res.spices-=buildings[p.menView[1][0]][p.menView[1][1]].cost[4][1]; break;
									}
									buildings[p.menView[1][0]][p.menView[1][1]].effect(0);
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
									delta = true;
									if(e.shiftKey){ p.action = "building";}
									else { p.menView[1][1] = -1; }
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
							rtx.fillRect(0, 60 + i*rect.height/12, rect.width, rect.height/12);
							rtx.fillStyle = "black";
							switch(i){
								case 0:rtx.fillText("Economic", 10, 105);  break;
								case 1:rtx.fillText("Social", 10, 105 + rect.height/12); break;
								case 2:rtx.fillText("Defense", 10, 105 + 2*rect.height/12 );  break;
								case 3:rtx.fillText("Offense", 10, 105 + 3*rect.height/12);  break;
							}
							rtx.beginPath();
							rtx.moveTo(rect.width-35, 100 + i*rect.height/12);
							rtx.lineTo(rect.width-25, 90 + i*rect.height/12);
							rtx.lineTo(rect.width-45, 90 + i*rect.height/12);
							rtx.fill()
						}
						rtx.fillStyle = "#526165";
						rtx.fillRect(0, 60+4*rect.height/12, rect.width, (rect.height-60)-(60+4*rect.height/12));
						rtx.fillStyle = "white";
						rtx.font = "18px Bookman";
						rtx.fillText("No building selected", 15, 60+4*rect.height/12+40);
					}
					else {
						var yCur = 60;
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
							rtx.fillRect(0, 60+8*rect.height/12, rect.width, (rect.height - (120+8*rect.height/12)));
							var trig = 0;
							var a = buildings[p.menView[1][0]][p.menView[1][1]].cost;
							var b = map[yS][xS].zone;
							let cR;
							if( b > -1){
								cR = p.zones[b].res;
							}
							rtx.fillStyle = "white";
							rtx.fillText(buildings[p.menView[1][0]][p.menView[1][1]].description, 15, 60+8*rect.height/12 + 70);
							if(b > -1 && a[0] <= cR.wood){ rtx.fillStyle = "white"; trig++; } else { rtx.fillStyle = "grey" }
							rtx.fillText("W Cost:  " + a[0], 15, 60+8*rect.height/12 + 20);
							if(a[4][0] == -1){
								if(b > -1 && a[1] <= cR.stone){ rtx.fillStyle = "white"; trig++; } else { rtx.fillStyle = "grey" }
								rtx.fillText("S Cost:  " + a[1], 15 + rect.width/2, 60+8*rect.height/12 + 20);
							}
							else{ //In case there is a special cost, like for plantations or silk orchards
								rtx.fillStyle = "grey";
								switch(a[4][0]){
									case 12: if(cR.rWood >= a[4][1]){rtx.fillStyle = "white"; }rtx.fillText("LW Cost: " + a[4][1], 15 + rect.width/2, 60+8*rect.height/12+20); break;
									case 15: if(cR.rSilk >= a[4][1]){rtx.fillStyle = "white"; }rtx.fillText("Si Cost: " + a[4][1], 15 + rect.width/2, 60+8*rect.height/12+20); break;
									case 16: if(cR.spices >= a[4][1]){rtx.fillStyle = "white"; }rtx.fillText("Sp Cost: " + a[4][1], 15 + rect.width/2, 60+8*rect.height/12+20); break;
								}
							}
							if(a[3] <= p.manpower){ rtx.fillStyle = "white"; trig++; } else { rtx.fillStyle = "grey" }
							rtx.fillText("M Cost:  " + a[3], 15, 60+8*rect.height/12 + 45);
							if(b > -1 && a[2] <= p.gold){ rtx.fillStyle = "white"; trig++; } else { rtx.fillStyle = "grey" }
							rtx.fillText("G Cost:  " + a[2], 15 + rect.width/2, 60+8*rect.height/12 + 45);
							if(trig == 0){ rtx.fillStyle = "white"; } else { rtx.fillStyle = "grey"; }
							rtx.strokeRect(10, 8*rect.height/12 + 140, 60, 30);
							rtx.fillText("Build!", 15, 8*rect.height/12 + 160);
						}
					}
				}
				else {
					let bridgable = false;
					if(map[yS][xS].building[0] == -1 && map[yS][xS].elevation < 0 && map[yS][xS].zone > -1){
						bridgable = true;
					}
					if(bridgable){
						bridgable = false;
						for(let a = -1; a < 2; a++){
							for(let b = -1; b < 2; b++){
								if((a==0 || b==0) && a!=b){
									if(map[safeC(yS+a)][safeC(xS+b)].owner == p.turn){
										bridgable = true;
									}
								}
							}
						}
					}
					if(bridgable){
						rtx.font = "20px Bookman";
						rtx.fillStyle = "grey";
						if(p.zones[map[yS][xS].zone].res.wood >= 15 && p.manpower >= 20 && p.zones[map[yS][xS].zone].res.stone >= 15 && p.gold >= 100){
							rtx.fillStyle = "white";
							if(x > (rect.width/2)-90 && y > 140 && x < (rect.width/2)+90 && y < 170){
								map[yS][xS].building = [4, 0, 1, [false]];
								map[yS][xS].pass = 1;
								map[yS][xS].owner = p.turn;
								p.gold -= 100;
								p.manpower -= 20;
								p.zones[map[yS][xS].zone].res.wood -= 15;
								p.zones[map[yS][xS].zone].res.stone -= 15;
								drawTile(safeC(yS-1), xS);
								drawTile(safeC(yS+1), xS);
								drawTile(yS, safeC(xS+1));
								drawTile(yS, safeC(xS-1));
								drawTile(yS, xS);
								tileChange(yS, xS);
								delta = true;
								return;
							}
						}
						rtx.strokeRect((rect.width/2)-90, 140, 180, 30);
						rtx.fillText("Build Bridge", (rect.width/2)-75, 160, 180);
						rtx.fillText("Bridge Cost: 15 w, 15 s, 20 m 100 g",  30, 80);
					}
					else {
						rtx.font = "20px Bookman";
						rtx.fillText("You can't build here.", 15, 430);
					}
				}
			}
			break;
			case 1: //Selected
				rtx.font = "20px Bookman";
				var ab0 = map[yS][xS].building[0];
				var ab1 = map[yS][xS].building[1];
				if(map[yS][xS].owner == p.turn && (ab0 > -1 && ab1 > -1) && !(ab0 == 1 && ab1 == 3) && !(ab0 == 0 && ab1 == 0) && ab0 != 3 && !(ab0 == 1 && ab1 == 6) && !(ab0==4) && !(ab0 == 0 && ab1 == 8)){
					if(!p.appraising){
						if(p.manpower >= 1){ rtx.strokeStyle = "white"; } else { rtx.strokeStyle = "grey"; }
						rtx.strokeRect((rect.width/2)-90, 80, 180, 30);
						rtx.fillText("Appraise Structure", (rect.width/2)-75, 100, 180);
						if(e!=0){
							if(y > 80 && y < 110 && x > (rect.width/2)-90 && x < rect.width/2 + 90){
								if(p.manpower >= 1){
									p.appraising = true;
									p.manpower--;
									y = -1;
									x = -1;
								}
							}
						}
					}
					if(p.appraising){
						rtx.clearRect(rect.width/2-100, 75, 200, 40);
						let bsVar = true;
						if(buildings[ab0][ab1].cost[4][0] != -1){
							let z = map[yS][xS].zone;
							if(buildings[ab0][ab1].cost[4][0] == 15){
								bsVar = p.zones[z].res.rSilk >= buildings[ab0][ab1].cost[4][1];
							}
							else if(buildings[ab0][ab1].cost[4][0] == 16){
								bsVar = p.zones[z].res.spices >= buildings[ab0][ab1].cost[4][1];
							}
						}
						var canB = map[yS][xS].building[2] < 4 && p.manpower >= buildings[ab0][ab1].cost[3] && p.zones[map[yS][xS].zone].res.wood >= buildings[ab0][ab1].cost[0] && p.zones[map[yS][xS].zone].res.stone >= buildings[ab0][ab1].cost[1] && (p.gold >= buildings[ab0][ab1].cost[2] || buildings[ab0][ab1].cost[2] == 0);
						canB = canB && bsVar;
						if(map[yS][xS].owner == p.turn && map[yS][xS].zone > -1 && map[yS][xS].manager == -1){
							if(canB){
								rtx.strokeStyle = "white";
								if(e!=0){
									if(y > 80 && y < 110 && x > (rect.width/2)-90 && x < rect.width/2 + 90){
										p.manpower -= buildings[ab0][ab1].cost[3];
										p.gold -= buildings[ab0][ab1].cost[2];
										p.zones[map[yS][xS].zone].res.stone -= buildings[ab0][ab1].cost[1];
										p.zones[map[yS][xS].zone].res.wood -= buildings[ab0][ab1].cost[0];
										switch(buildings[ab0][ab1].cost[4][0]){
											case 15: p.zones[map[yS][xS].zone].res.rSilk-=buildings[ab0][ab1].cost[4][1]; break;
											case 16: p.zones[map[yS][xS].zone].res.spices-=buildings[ab0][ab1].cost[4][1]; break;
										}
										map[yS][xS].building[2]++;
										tileChange(yS,xS);
										delta = true;
									}
								}
							}
							else { rtx.strokeStyle = "grey"; }
							if(map[yS][xS].building[2] < 4){
								rtx.fillText("Upgrade to Tier " +map[yS][xS].building[2], (rect.width/2)-85, 100, 180);
							}
							else {
								rtx.fillText("Already at Tier 3", (rect.width/2)-85, 100, 180);
							}
							rtx.strokeRect((rect.width/2)-90, 80, 200, 30);
						}
						var totalV = [[0, 0, 0, 0, 0, 0, 0, 0,0,0,0], [0, 0, 0], [0, 0, 0, 0, 0,0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
						for(let w = 0; w < map[yS][xS].building[2]; w++){
							var inss;
							if(map[yS][xS].manager == -1){
								inss = getValue(yS, xS, w, p);
							}
							else{
								inss = getValue(yS, xS, w, p.vassals[map[yS][xS].manager]);
							} 
							for(let d = 0; d < inss.length; d++){
								for(let f = 0; f < inss[d].length; f++){
									totalV[d][f] += inss[d][f];
								}
							}
						}
						rtx.fillText(buildings[map[yS][xS].building[0]][map[yS][xS].building[1]].name,5,300);
						rtx.fillText("This Building Gives . . .", 5, 330);
						let vWords = [["Wood Income: ", "Food Income: ", "Manpower Income: ", "Population Income: ", "Gold Income: ", "Wellbeing Income: ", "Stone Income: ", "Market Cap Replenishment: ", "Culture Income: ","Technology Income: ","Horse Income: "], ["Max Wood Income: ", "Max Food Income: ", "Max Manpower Income: "], ["Max Wood: ", "Max Food: ", "Max Population: ", "Max Size: ", "Market Cap: ", "Max Horses: "], ["Copper Ore Income: ", "Bronze Ore Income: ", "Iron Ore Income: ", "Raw Hide Income: ", "Raw Luxury Wood Income: ", "Raw Perfume Income: ", "Purified Copper: ", "Purified Bronze: ", "Purified Iron: ", "Finished Hides: ", "Finished Perfume: ", "Finished Luxury Wood: ", "Raw Silk: ", "Finished Silk: ", "Spice Income: "]];
						let runningHeight = 360;
						for(let i = 0; i < totalV.length; i++){
							for(let j = 0; j < totalV[i].length; j++){
								let prVal = Math.floor(100*totalV[i][j])/100;
								if(prVal != 0){
									if(i == 0 && j == 4){
										prVal = Math.floor(100*totalV[i][j]/15)/100; //gold
									}
									rtx.fillText(vWords[i][j] + prVal, 5, runningHeight);
									runningHeight += 20;
								}
							}
						}
					}
				}
				else if(ab0 == 1 && ab1 == 6 && map[yS][xS].owner == p.turn){ //manor display
					if(p.menView[2] == -1){
						rtx.strokeRect((rect.width/2)-90, 80, 180, 30);
						rtx.strokeRect((rect.width/2)-90, 120, 180, 30);
						rtx.strokeRect((rect.width/2)-90, 160, 180, 30);
						rtx.font = "20px Bookman";
						rtx.fillText("Adjust Taxes", (rect.width/2)-75, 100, 180);
						rtx.fillText("View Treasury", (rect.width/2)-75, 140, 180);
						rtx.fillText("Create Retinue", (rect.width/2)-75, 180, 180);
						var totalV = [[0, 0, 0, 0, 0, 0, 0, 0,0,0,0], [0, 0, 0], [0, 0, 0, 0, 0,0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
						var inss = getValue(yS, xS, 0, p);
						for(let d = 0; d < inss.length; d++){
							for(let f = 0; f < inss[d].length; f++){
								totalV[d][f] += inss[d][f];
							}
						}
						rtx.fillText("This Building Gives . . .", 5, 340);
						rtx.fillText("Wood Income: " + Math.floor(100*totalV[0][0])/100, 5, 360);
						rtx.fillText("Food Income: " + Math.floor(100*totalV[0][1])/100, 5, 380);
						rtx.fillText("Manpower Income: " + Math.floor(100*totalV[0][2])/100, 5, 400);
						rtx.fillText("Population Income: " + Math.floor(100*totalV[0][3])/100, 5, 420);
						rtx.fillText("Gold Income: " + Math.floor(100*(totalV[0][4]/15))/100, 5, 440);
						rtx.fillText("Well-Being Income: " + Math.floor(100*totalV[0][5])/100, 5, 460);
						rtx.fillText("Copper Ore: "  + Math.floor(1000*totalV[3][0])/1000,5, 480);
						rtx.fillText("Bronze Ore: " + Math.floor(1000*totalV[3][1])/1000,5, 500);
						rtx.fillText("Iron Ore: " + Math.floor(1000*totalV[3][2])/1000,5, 520);
						rtx.fillText("Market Cap Replenishment: " + Math.floor(1000*totalV[0][7])/1000,5, 540);
						rtx.fillText("Market Cap: " + Math.floor(1000*totalV[2][4])/1000,5, 560);
						rtx.fillText("Food Income Cap: " + Math.floor(100*totalV[1][1])/100,5, 580);
						rtx.fillText("Food Storage: " + Math.floor(100*totalV[2][1])/100,5, 600);
						if(x >= (rect.width/2)-90 && x < (rect.width/2)+110 && y > 80 && y < 220){
							if(y > 80 && y < 110){
								p.menView[2] = 0;
							}
							else if(y > 120 && y < 150){
								p.menView[2] = 1;
							}
							else if(y > 160 && y < 190){
								p.menView[2] = 2;
							}
						}
					}
					if(p.menView[2] == 0){ //Taxes ------------------------------------------------------
						rtx.clearRect(0, 0, rect.width, rect.height);
						drawMenus();
						let oldTaxes = p.zones[map[yS][xS].zone].taxes;
						if(y > 100 && y < 420 && x > 130 && x < 155){
							taxSelected = Math.floor((y - 100)/30);
							justclicked = true;
						}
						rtx.fillStyle = "white";
						rtx.font = "20px Bookman";
						rtx.fillText("Wellbeing: " + Math.floor(p.zones[map[yS][xS].zone].res.wellbeing), 10, 95);
						rtx.fillText("Wood Tax: ", 15, 130);
						rtx.fillText("Food Tax: ", 15, 160);
						rtx.fillText("Gold Tax: ", 15, 190);
						rtx.fillText("Copper Tax: ", 15, 220);
						rtx.fillText("Bronze Tax: ", 15, 250);
						rtx.fillText("Iron Tax: ", 15, 280);
						
						for(i = 0; i < 6; i++){
							rtx.fillStyle = "white";
							if(newTaxes[i] > oldTaxes[i]){
								rtx.fillStyle = "red";
								rtx.fillText("Wellbeing: " + 10*Math.floor((oldTaxes[i] - newTaxes[i])), 170, 130 + (30 * i));
							}
							else if(oldTaxes[i] > newTaxes[i]){ //Tax Decrease
								rtx.fillStyle = "lime";
								rtx.fillText("Wellbeing: " + 4*Math.floor((oldTaxes[i] - newTaxes[i])), 170, 130 + (30 * i));
							}
							if(taxSelected == i){
								rtx.fillStyle = "lime";	
							}
							else{ rtx.fillStyle = "white"; }
							rtx.fillText(newTaxes[i], 135, 130 + (30*i));
						}
						rtx.strokeStyle = "white";
						rtx.fillText("Save", 80, 350);
						rtx.fillText("Back", 170, 350);
						rtx.strokeStyle = "grey";
						rtx.strokeRect(70, 330, 70, 30);
						rtx.strokeRect(160, 330, 70, 30);
						
						if(y < 360 && y > 330 && x > 70 && x < 140){ //Update taxes & spend/gain wellbeing
							let pool = 0;
							for(i = 0; i < 4; i++){
								if(newTaxes[i] > oldTaxes[i]){
									pool += (10*(newTaxes[i]-oldTaxes[i]));
								}
								else{
									pool -= (4*(oldTaxes[i]-newTaxes[i]));
								}
							}
							if(p.zones[map[yS][xS].zone].res.wellbeing > pool){
								p.zones[map[yS][xS].zone].res.wellbeing -= pool;
								p.zones[map[yS][xS].zone].taxes = newTaxes.slice();
								document.removeEventListener('keydown', drawRightBar);
								taxSelected = -1;
							}
							delta = true;
							return;
						}
						else if(y < 460 && y > 330 && x > 160 && x < 230){
							p.menView[2] = -1;
							delta = true;
							return;
						}
						if(taxSelected != -1){//type tax val 
							document.addEventListener('keydown'	, drawRightBar);
							if(e.keyCode >= 48 && e.keyCode <= 57){
								var num = e.keyCode - 48;
								if(newTaxes[taxSelected] == 0 || justclicked){
									newTaxes[taxSelected] = num;
									justclicked = false;
								}
								else if(newTaxes[taxSelected] + "" + num < 100){
									newTaxes[taxSelected] += "" + num;
								}
								else{
									newTaxes[taxSelected] = 100;
								}
								delta = true;
								return;
							}
							else if(e.keyCode == 8){
								newTaxes[taxSelected] = Math.max(1, Math.floor(newTaxes[taxSelected]/10));
								delta = true;
								return;
							}	
						}
					}
					else if(p.menView[2] == 1){ //Treasury -------------------------
						rtx.clearRect(0, 0, rect.width, rect.height);
						drawMenus();
						rtx.strokeStyle = "white";
						rtx.strokeRect(25, 120, rect.width-50, rect.height-240);
						for(let i = 1; i < Math.min(7, (map[yS][xS].building[3].length)-tShift); i++){
							let treasView = map[yS][xS].building[3][i + tShift];
							rtx.strokeStyle = "white";
							if(1+tSel == i){
								rtx.strokeStyle = "gold";
							}
							if(treasView.legend == p.bloodline){
								if(1+tSel == i){
									rtx.strokeStyle = "#ff8080";
								}
								else{
									rtx.strokeStyle = "#660000";
								}
							}
							rtx.strokeRect(25, 120 + (i-1)*(rect.height-240)/6, rect.width-50, (rect.height-240)/6);
							rtx.fillStyle = "white";
							rtx.font = "21px Bookman";
							rtx.fillText(treasView.name, 40, 165 + (i-1)*(rect.height-240)/6);
							rtx.strokeStyle = "white";
							
						}
						if(y>60 && y<rect.height-60){
							delta = true;
							if(x>rect.width-100 && y > rect.height-110 && y < rect.height-80){ //Back
								p.menView[2] = -1;
								tSel = -1;
								delta = true;
							}
							else if(x>25 && y > rect.height-110 && x < 95 && x < rect.height-80){
								if(tSel > -1 && tSel + tShift < map[yS][xS].building[3].length-1){
									p.menView[2] = 3;
								}
							}
							else if(y > rect.height-96 && y < rect.height-84){
								if(tShift > 0){ //Up Arrow
									if(x>114 && x < 136){
										tShift--;
										tSel++;
									}	
								}
								if(tShift+6 < map[yS][xS].building[3].length-1){ //Down Arrow
									if(x<rect.width-114 && x > rect.width-136){
										tShift++;
										tSel--;
									}
								}
							}
							if(x>25 && y > 120 && x < rect.width-25 && y < rect.height-120){
								tSel = Math.floor(6*(y-120)/(rect.height-240));
							}
							if(y<120){
								map[yS][xS].building[3][0] = !map[yS][xS].building[3][0];
							}
							return;
						}
						rtx.font = "24px Bookman"; rtx.fillStyle = "white";
						if(map[yS][xS].building[3][0]){
							rtx.fillText("Searching for Treasures", 45, 95);
						}
						else{
							rtx.fillText("Not Searching for Treasures", 25, 95);
						}
						rtx.font = "20px Bookman";
						rtx.strokeRect(rect.width-95, rect.height-110, 70, 30);
						rtx.fillText("Back", rect.width-82, rect.height-90);
						rtx.beginPath();
							rtx.moveTo(115, rect.height-85); //left
							rtx.lineTo(125, rect.height-95); //middle
							rtx.lineTo(135,rect.height-85); //right
							rtx.fill()
						rtx.beginPath();
							rtx.moveTo(rect.width-115, rect.height-95); //left
							rtx.lineTo(rect.width-125, rect.height-85); //middle
							rtx.lineTo(rect.width-135,rect.height-95); //right
							rtx.fill();
						if(!(tSel > -1 && tSel + tShift < map[yS][xS].building[3].length-1)){
							rtx.strokeStyle = "grey";
						}
						rtx.strokeRect(25, rect.height-110, 70, 30);
						rtx.fillText("View", 32, rect.height-90);
						
					}
					else if(p.menView[2] == 3){ //Viewing specific Artifact
						let treasView = map[yS][xS].building[3][1+tSel + tShift];
						rtx.fillStyle = "white";
						rtx.font = "21px Bookman";
						rtx.fillText(treasView.name, 40, 165);
						rtx.font = "16px Bookman";
						rtx.fillText(treasView.description[0], 10, 200);
						rtx.fillText(treasView.description[1], 10, 240);
						rtx.fillText(treasView.description[2], 10, 280);
						if(treasView.legend == p.bloodline){
							rtx.fillText("It was made by your ancestor, " + p.bloodline + ".", 10, 325);
						}
						if(y>0){
							p.menView[2] = 1;
							delta = true;
							return;
						}
					}
					else if(p.menView[2] == 2){ //Retinue ------------------------------
						let word = "";
						let mats = ["Wood", "Stone", "Copper", "Bronze", "Iron"];
						if(x > 50 & x < 135 && y > 105 && y < 135){
							retUnit.type++;
							if(retUnit.type == 3){
								retUnit.type = 0;
							}
							retUnit.weapons = [0,4];
						}
						if(retUnit.type == 0){ word = "Infantry"; }
						else if(retUnit.type == 1){ word = "Archer"; }
						else{ word = "Cavalry"; }
						rtx.fillStyle = "#d5d8ef";
						rtx.fillText("Points Remaining: " + retUnit.pts, 10, 85);
						rtx.fillText("Type: " + word, 10, 125); //Type, Number, Attack, Defense, Skirmish, Mobility, Discipline, Owner
						rtx.strokeRect(55, 105, 40 + 5*word.length, 30);
						rtx.fillText("Attack: " + retUnit.stats[0] , 10, 170);
						rtx.fillText("Defense: " + retUnit.stats[1], 10, 200);
						rtx.fillText("Skirmish: " + retUnit.stats[2], 10, 230);
						rtx.fillText("Mobility: " + retUnit.stats[3], 10, 260);
						rtx.fillText("Weapon 1: " + weapons[retUnit.type][retUnit.weapons[0]].name, 10, 320);
						rtx.fillText("Atk: " + weapons[retUnit.type][retUnit.weapons[0]].attack, 10, 340);
						rtx.fillText("Pen: " + weapons[retUnit.type][retUnit.weapons[0]].pierce, 140, 340);
						rtx.fillText("Def: " + weapons[retUnit.type][retUnit.weapons[0]].defense, 10, 360);
						rtx.fillText("Range: " + weapons[retUnit.type][retUnit.weapons[0]].skirmish, 10, 380);
						rtx.fillStyle = "#ff0000";
						rtx.fillRect(200, 302, 20, 20)
						rtx.fillStyle = "#d0f0c0";
						rtx.fillRect(240, 302, 20, 20)
						rtx.fillStyle = "black";
						rtx.fillRect(202, 312, 16, 1);
						rtx.fillRect(242, 312, 16, 1);
						rtx.fillRect(250, 305, 1, 14);
						if(weapons[retUnit.type][retUnit.weapons[0]].hands < 2){
							rtx.fillStyle = "#d5d8ef";
							rtx.fillText("Weapon 2: " + weapons[retUnit.type][retUnit.weapons[1]].name, 10, 400);
							rtx.fillText("Atk: " + weapons[retUnit.type][retUnit.weapons[1]].attack, 10, 420);
							rtx.fillText("Pen: " + weapons[retUnit.type][retUnit.weapons[1]].pierce, 140, 420);
							rtx.fillText("Def: " + weapons[retUnit.type][retUnit.weapons[1]].defense, 10, 440);
							rtx.fillText("Skirmish: " + weapons[retUnit.type][retUnit.weapons[1]].skirmish, 10, 460);
							rtx.fillStyle = "#ff0000";
							rtx.fillRect(200, 382, 20, 20)
							rtx.fillStyle = "#d0f0c0";
							rtx.fillRect(240, 382, 20, 20)
							rtx.fillStyle = "black";
							rtx.fillRect(202, 392, 16, 1);
							rtx.fillRect(242, 392, 16, 1);
							rtx.fillRect(250, 385, 1, 14);
						}
						for(i = 0; i < 4; i++){ //draw little squares
							rtx.fillStyle = "#ff0000";
							rtx.fillRect(180, 150 + (30*i), 18, 18)
							rtx.fillStyle = "#d0f0c0";
							rtx.fillRect(220, 150 + (30*i), 18, 18)
							rtx.fillStyle = "black";
							rtx.fillRect(182, 158 + (30*i), 14, 1); // --
							rtx.fillRect(222, 158 + (30*i), 14, 1); //      -.-
							rtx.fillRect(229, 152 + (30*i), 1, 14); //.......|
						}
						var costs = [40, 0, 0, 0, (45)]; //Calc Unit costs: manpower, food, wood, material, wellbeing
						for(let i = 1; i < map[yS][xS].building[3].length; i++){
							if(map[yS][xS].building[3][i].legend == p.bloodline && map[yS][xS].building[3][i].wI[0] == retUnit.type){
								costs[4] = 0;
							}
						}
						if(costs[4] > 0){
							costs[4] += .3 * retUnit.material * costs[0];
						}
						if(retUnit.type == 1){
							costs[4] += .225 * costs[0];
						}
						if(retUnit.type == 2){
							costs[4] += .525 * costs[0];
						}
						else if(retUnit.type == 0){
							costs[4] += .15 * costs[0];
						}
						costs[4] += 5;
						costs[2] += weapons[retUnit.type][retUnit.weapons[0]].cost[0] * 1.5*costs[0];
						costs[4] += costs[0]*weapons[retUnit.type][retUnit.weapons[0]].upkeep*8;
						costs[3] += weapons[retUnit.type][retUnit.weapons[0]].cost[1] * 2.5*costs[0];
						if(weapons[retUnit.type][retUnit.weapons[0]].hands < 2){
							costs[2] += weapons[retUnit.type][retUnit.weapons[1]].cost[0] * 1.5*costs[0];
							costs[3] += weapons[retUnit.type][retUnit.weapons[1]].cost[1] * 2.5*costs[0];
							costs[4] += costs[0]*weapons[retUnit.type][retUnit.weapons[1]].upkeep*8;
						}
						rtx.fillStyle = "white";
						rtx.fillText("Costs", 10, 485);
						if(retUnit.type == 2){
							rtx.fillText("Manpower/Horses: " + costs[0], 40, 510);
						}
						else{
							rtx.fillText("Manpower: " + costs[0], 40, 510);
						}
						rtx.fillText("Wellbeing: " + Math.floor(10*costs[4]), 40, 535 );
						rtx.fillText("Wood: " + Math.ceil(costs[2]), 40, 560);
						rtx.fillText(mats[retUnit.material] + ": " + Math.ceil(costs[3]), 40, 585);
						rtx.strokeRect(35, 565, 80 + 5*mats[retUnit.material].length, 30);
						rtx.font = "32px Bookman";
						rtx.fillText("Create", 215, 545);
						rtx.fillText("Back", 215, 590);
						rtx.fillStyle = "#DCDCDC";
						rtx.strokeRect(205, 520, 105, 35);
						rtx.strokeRect(205, 565, 90, 35);
						if(y > 60 && y < 430){
							if(y > 150 && y < 268){
								if(x > 175 && x < 245){
									if(x < 200 && x > 180){ //click - or +
										if(retUnit.stats[Math.floor((y - 145)/30)] > 0){
											retUnit.stats[Math.floor((y - 145)/30)]--;
											retUnit.pts++;
										}
									}
									else if(x < 240 && x > 220){
										if(retUnit.pts > 0){
											retUnit.stats[Math.floor((y - 145)/30)]++;
											retUnit.pts--;
										}
									}
								} 
							}
							else if(y >= 297 && y < 322){
								if(x < 230 && x > 190){
									retUnit.weapons[0]--;
								}
								else if(x > 230 && x < 270){
									retUnit.weapons[0]++;
								}
								if(retUnit.weapons[0] < 0){ retUnit.weapons[0] = weapons[retUnit.type].length-1; }
								if(retUnit.weapons[0] > weapons[retUnit.type].length-1){ retUnit.weapons[0] = 0; }
							}
							else if(y < 402 && y > 380){	
								if(x < 230 && x > 190){
									retUnit.weapons[1]--;
									while(retUnit.weapons[1] < 0 || weapons[retUnit.type][retUnit.weapons[1]].hands > 1){
										retUnit.weapons[1]--;
										if(retUnit.weapons[1] < 0){
											retUnit.weapons[1] = weapons[retUnit.type].length-1;
										}
									}
								}
								else if(x > 230 && x < 270){
									retUnit.weapons[1]++;
									while(retUnit.weapons[1] > weapons[retUnit.type].length-1 || weapons[retUnit.type][retUnit.weapons[1]].hands > 1){
										retUnit.weapons[1]++;
										if(retUnit.weapons[1] > weapons[retUnit.type].length-1){
											retUnit.weapons[1] = 0;
										}
									}
								}
							}
							delta = true;
							return;
						}
						else if(x >= 35 && y >= 565 && x <= 35 + 80 + 5*mats[retUnit.material].length && y <= 595){
							retUnit.material++;
							if(retUnit.material > 4){
								retUnit.material = 0;
							}
							delta = true;
							return;
						}
						if(y >= 520 && x >= 205 && x < 310 && y < 555){ // Buy the Unit && Bring it to the world rtx.strokeRect(205, 520, 105, 35);
							var canBuyA = false;
							if(p.manpower >= costs[0]){
								if(p.zones[map[yS][xS].zone].res.horses >= costs[0] || retUnit.type != 2){
									if(p.zones[map[yS][xS].zone].res.wellbeing >= 10*costs[4]){
										if(p.zones[map[yS][xS].zone].res.wood >= costs[2]){
											switch(retUnit.material){
												case 0: if(p.zones[map[yS][xS].zone].res.wood >= costs[3]+costs[2]){ canBuyA = true; } break;
												case 1: if(p.zones[map[yS][xS].zone].res.stone >= costs[3]){ canBuyA = true; } break;
												case 2: if(p.zones[map[yS][xS].zone].res.copper[1] >= costs[3]){ canBuyA = true; } break;
												case 3: if(p.zones[map[yS][xS].zone].res.bronze[1] >= costs[3]){ canBuyA = true; } break;
												case 4: if(p.zones[map[yS][xS].zone].res.iron[1] >= costs[3]){ canBuyA = true; } break;
											}
										}
									}
								}
							}
							if(canBuyA){
								p.manpower -= costs[0];
								if(retUnit.type == 2){
									p.zones[map[yS][xS].zone].res.horses -= costs[0];
								}
								p.zones[map[yS][xS].zone].res.wood -= costs[2];
								p.zones[map[yS][xS].zone].res.wellbeing -= 10*costs[4];
								retUnit.size = costs[0];
								switch(retUnit.material){
									case 0: p.zones[map[yS][xS].zone].res.wood -= costs[3]; break;
									case 1: p.zones[map[yS][xS].zone].res.stone -= costs[3];  break;
									case 2: p.zones[map[yS][xS].zone].res.copper[1] -= costs[3];  break;
									case 3: p.zones[map[yS][xS].zone].res.bronze[1] -= costs[3];  break;
									case 4: p.zones[map[yS][xS].zone].res.iron[1] -= costs[3]; break;
								}
								if(retUnit.num > -1){
									let nums = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
									for(let i = 0; i < p.armies.length; i++){
										if(p.armies[i].num < nums.length){
											nums[p.armies[i].num] = -1;
										}
									}
									if(nums.indexOf(0) > -1){
										retUnit.num = nums.indexOf(0);
									}
									else{
										retUnit.num = p.armies[p.armies.length-1].num+1;
									}
								}
								p.armies[retUnit.num] = retUnit;
								for(let i = 1; i < map[yS][xS].building[3].length; i++){ //If artifact in treasury 
									let wep = weapons[map[yS][xS].building[3][i].wI[0]][map[yS][xS].building[3][i].wI[1]];
									if(map[yS][xS].building[3][i].wI[0] == p.armies[retUnit.num].type){
										for(let j = 0; j < 2; j++){
											let numLoop = 1;
											if(map[yS][xS].building[3][i].bloodline == p.bloodline){ numLoop = 2; }
											for(let k = 0; k < numLoop; k++){
												let statBuff = 0;
												if(map[yS][xS].building[3][i].wI[0] == weapons[retUnit.type][retUnit.weapons[j]]){
													if(wep.attack > wep.defense){
														statBuff = 1;
													}
													if(statBuff == 1){
														p.armies[retUnit.num].stats[0]+=.5;
													} else { p.armies[retUnit.num].stats[1] += .5; }
												}
												if(weapons[retUnit.type][retUnit.weapons[j]].hands == 2){
													j=3;
													if(statBuff == 1){
														p.armies[retUnit.num].stats[0]+=.5;
													} else { p.armies[retUnit.num].stats[1] += .5; }
												}
											}
										}
									}
								}
								retUnit = JSON.parse(JSON.stringify(retUnit));
								if(p.armies[retUnit.num].type == 0){ //Infantry
									p.armies[retUnit.num].stats[1] += 2 + retUnit.material;
									p.armies[retUnit.num].stats[0] += 1 + Math.floor(retUnit.material/1.1);
								}
								else if(p.armies[retUnit.num].type == 1){ //Archer
									p.armies[retUnit.num].stats[2] += 3;
									p.armies[retUnit.num].stats[0] += 2 + retUnit.material;
								}
								else if(p.armies[retUnit.num].type == 2){ //Cavalry
									p.armies[retUnit.num].stats[3] += 2;
									p.armies[retUnit.num].stats[0] += 2 + retUnit.material;
									p.armies[retUnit.num].stats[1] += Math.floor(retUnit.material/2);
								}
								p.armies[retUnit.num].y = yS;
								p.armies[retUnit.num].x = xS;
								p.armies[retUnit.num].owner = p.turn;
								p.armies[retUnit.num].maxSize = p.armies[retUnit.num].size;
								p.armies[retUnit.num].ID = createID(p.armies[retUnit.num], p.zones[map[yS][xS].zone].res.wellbeing);
								map[yS][xS].army = p.armies[retUnit.num];
								tileChange(yS, xS);
								armyChange(p.armies[retUnit.num], true);
								retUnit = new Unit();
								retUnit.stats = [0, 0, 0, 0, 4];
								p.menView[2] = -1;
								delta = true;
								drawDelta = true;
								return;
							}
						}
						else if(x > 205 && y > 565 && y < 600 && x < 295){ //Back button (205, 565, 90, 35);
							p.menView[2] = -1;
							delta = true;
							return;
						}
					}
				}
				else if(ab0 == 1 && ab1 == 3 && map[yS][xS].owner == p.turn){ //Dock
					rtx.fillStyle = "white";
					rtx.font = "20px Bookman";
					rtx.fillText("Points Remaining: " + curShip.pts, 10, 100);
					rtx.fillText("Attack: " + curShip.stats[0] , 10, 170);
					rtx.fillText("Strength: " + curShip.stats[1], 10, 200);
					rtx.fillText("Storage: " + curShip.stats[2], 10, 230);
					rtx.fillText("Transport: " + curShip.stats[3], 10, 260);
					rtx.fillText("Fishing: " + curShip.stats[4], 10, 290);
					rtx.fillText("Ship Speed: " + curShip.stats[5], 10, 320);
					var costs = [0, 0, 0];
					/*var costs = [5, 7, 0] //manpower, wood, gold COSTS -- - - - 
					costs[0] += (50-curShip.pts) + curShip.stats[0] + curShip.stats[3] + curShip.stats[4] + curShip.stats[5];
					costs[1] += costs[0]/1.5 + curShip.stats[1]*2 +curShip.stats[2];
					costs[2] += (Math.floor(costs[1]) - curShip.stats[4])*5 -40 + curShip.stats[1]*1.5 +curShip.stats[2];
					costs[1] = Math.floor(costs[1]);*/
					rtx.fillText("Costs", 10, 380);
					rtx.fillText("Manpower: " + costs[0], 15, 415);
					rtx.fillText("Wood: " + Math.floor(10*costs[1])/10, 15, 445);
					rtx.fillText("Gold: " + Math.floor(100*costs[2])/100, 15, 475);
					rtx.font = "23px Bookman";
					rtx.fillText("Begin Construction", 68, 545);
					if(p.gold >= costs[2] && p.manpower >= costs[0] && p.zones[map[yS][xS].zone].res.wood >= costs[1]){
						rtx.strokeStyle = "white";
					}
					else{ rtx.strokeStyle = "grey"; }
					rtx.strokeRect(58, 520, 205, 45);
					for(i = 0; i < 6; i++){ //draw little squares
						rtx.fillStyle = "#ff0000";
						rtx.fillRect(200, 152 + (30*i), 18, 18)
						rtx.fillStyle = "#d0f0c0";
						rtx.fillRect(240, 152 + (30*i), 18, 18)
						rtx.fillStyle = "black";
						rtx.fillRect(202, 160 + (30*i), 14, 1); // --
						rtx.fillRect(242, 160 + (30*i), 14, 1); //      -.-
						rtx.fillRect(249, 154 + (30*i), 1, 14); //.......|
					}
					//HANDLE DOCK CLICKS
					if(e.type == 'mousedown'){
						if(y >= 150 && y <= 330){
							if(x >= 200 && x <= 260){
								let numLoops = 1;
								if(e.ctrlKey){ numLoops = 20; }
								else if(e.shiftKey){ numLoops = 5; }
									for(let i = 0; i < numLoops; i++){
									if(x <= 220 && x >= 200){ //click - or +
										if(curShip.stats[Math.floor((y - 150)/29)] > 0){
											curShip.stats[Math.floor((y - 150)/29)]--;
											curShip.pts++;
										}
									}
									else if(x < 260 && x > 240 && curShip.pts > 0){
										curShip.stats[Math.floor((y - 150)/29)]++;
										curShip.pts--;
									}
								}
							} 
						}
						else if(x>=58&&y>=520&&x<=213&&y<=565){ //buy the ship
							if(p.gold >= costs[2] && p.manpower >= costs[0] && p.zones[map[yS][xS].zone].res.wood >= costs[1]){
								let canBuy = false;
								for(let i = -1; i < 2; i++){
									for(let j = -1; j < 2; j++){
										if(i==0||j==0&&i!=j){
											if(map[safeC(i+yS)][safeC(j+xS)].elevation < 0){
												if(map[safeC(i+yS)][safeC(j+xS)].navy == -1){
													canBuy = true;
													curShip.y = safeC(i+yS);
													curShip.x = safeC(j+xS);
													curShip.lastDir = 3;
													if(i==-1){
														curShip.lastDir = 2;
													}
													else if(i==1){
														curShip.lastDir = 0;
													}
													else if(j==-1){
														curShip.lastDir = 1;
													}
													j = 2; i = 2;
												}
											}
										}
									}
								}
								if(canBuy){
									p.gold -= costs[2];
									p.manpower -= costs[0];
									p.zones[map[yS][xS].zone].res.wood-=costs[1];
									for(let i = 0; i < p.navies.length; i++){
										if(p.navies[i] == -1){
											curShip.num = i;
											i = p.navies.length;
										}
									}
									if(curShip.num == -1){
										curShip.num = p.navies.length;
									}
									curShip.owner = p.turn;
									curShip.health[1] = .25 + .075 * curShip.stats[1];
									curShip.health[0] = .05 + .025 * curShip.stats[1];
									p.navies[curShip.num] = curShip;
									curShip = JSON.parse(JSON.stringify(curShip));
									map[curShip.y][curShip.x].navy = p.navies[curShip.num];
									navyChange(p.navies[curShip.num], true);
									curShip.num = -1;
									drawTile(curShip.y,curShip.x);
									tileChange(curShip.y, curShip.x);
								}
							}
						}
						delta = true;
						return;
					}
				}
				else if(ab0 == 0 && ab1 == 8 && map[yS][xS].owner == p.turn){ //MARKET
					let quantity = 0;
					for(let i = 0; i < drawRightBar.mVS[0].length; i++){
						quantity += drawRightBar.mVS[0][i];
						quantity += drawRightBar.mVS[1][i];
					}
					rtx.fillStyle = "#293134";
					rtx.fillRect(0,0, rect.width,rect.height);
					drawMenus();
					rtx.fillStyle = "white";
					rtx.fillRect(25, 65, 1, 300);
					rtx.fillRect(25, 365, 275, 1); //perf, lwood, spices, pearl, silk, hides, iron, bronze, copper, manpower, wood, stone, food
					let mcols = ["#bd7194", "#604E42", "#B35D51", "black", "#B7A99B", "#a07b60","#B0E0E6", "#b85233", "#b87333", "#a61000", "#855d19", "grey", "#767600"];
					rtx.fillText(15, 5, 370); 
					rtx.fillText(45, 5, 70+(300/160)*(175-45));
					rtx.fillText(60, 5, 70+(300/160)*(175-60));
					rtx.fillText(99, 5, 70+(300/160)*(175-99));
					rtx.fillText(150, 5, 70+(300/160)*(175-150));
					rtx.fillText(175, 5, 78);
					let goldDisp = 0;
					if(e.type == 'mousedown' || e.type == 'keydown' || e.type == 'mousemove'){
						if(e.type == 'mousedown'){
							if(y > 395 && y < 584 && x > rect.width-37 && x < rect.width){
								r.addEventListener('mousemove', drawRightBar);
								r.addEventListener('mouseup', drawRightBar);
							}
							else if(y>=400&&y<=580){
								if(x>=150&&x<=210){ //sell
									drawRightBar.mVS[2][0] = 0;
									drawRightBar.mVS[2][1] = Math.floor((y-400)/30) + Math.floor(drawRightBar.mVS[3]/21);
									document.addEventListener('keydown', drawRightBar);
								}
								else if(x>=220&& x<=280){ //buy
									drawRightBar.mVS[2][0] = 1;
									drawRightBar.mVS[2][1] = Math.floor((y-400)/30) + Math.floor(drawRightBar.mVS[3]/21);
									document.addEventListener('keydown', drawRightBar);
								}
							}
							else if((x>=30&&y>=590&&x<=130&&y<=640)||(x>=150&&y>=605&&x<=220&&y<=645)){//confirm and clear
								if(x>=30&&y>=590&&x<=130&&y<=640){
									p.zones[map[yS][xS].zone].res.perfs += drawRightBar.mVS[1][0] - drawRightBar.mVS[0][0];
									p.zones[map[yS][xS].zone].res.woods += drawRightBar.mVS[1][1] - drawRightBar.mVS[0][1];
									p.zones[map[yS][xS].zone].res.spices += drawRightBar.mVS[1][2] - drawRightBar.mVS[0][2];
									p.zones[map[yS][xS].zone].res.pearls += drawRightBar.mVS[1][3] - drawRightBar.mVS[0][3];
									p.zones[map[yS][xS].zone].res.silks += drawRightBar.mVS[1][4] - drawRightBar.mVS[0][4];
									p.zones[map[yS][xS].zone].res.hides += drawRightBar.mVS[1][5] - drawRightBar.mVS[0][5];
									p.zones[map[yS][xS].zone].res.iron[1] += drawRightBar.mVS[1][6] - drawRightBar.mVS[0][6];
									p.zones[map[yS][xS].zone].res.bronze[1] += drawRightBar.mVS[1][7] - drawRightBar.mVS[0][7];
									p.zones[map[yS][xS].zone].res.copper[1] += drawRightBar.mVS[1][8] - drawRightBar.mVS[0][8];
									p.manpower += drawRightBar.mVS[1][9] - drawRightBar.mVS[0][9];
									p.zones[map[yS][xS].zone].res.wood += drawRightBar.mVS[1][10] - drawRightBar.mVS[0][10];
									p.zones[map[yS][xS].zone].res.stone += drawRightBar.mVS[1][11] - drawRightBar.mVS[0][11];
									p.zones[map[yS][xS].zone].res.food += drawRightBar.mVS[1][12] - drawRightBar.mVS[0][12];
									for(let i = 0; i < rates.length; i++){
										p.gold += (rates[i]-p.sSplits[i])*drawRightBar.mVS[0][i]/15 - (rates[i]+p.bSplits[i])*drawRightBar.mVS[1][i]/15;
									}
									p.zones[map[yS][xS].zone].res.marketCap -= quantity;
									drawLeftBar(0);
								}
								drawRightBar.mVS = [[0, 0, 0, 0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0], [-1,-1], 0]; //clear, also triggers after purchases
							}
						}
						else if(e.type == 'keydown' && drawRightBar.mVS[2][0] > -1 && drawRightBar.mVS[2][1] > -1){
							if(e.keyCode >= 48 && e.keyCode <= 57){
								quantity -= drawRightBar.mVS[drawRightBar.mVS[2][0]][drawRightBar.mVS[2][1]];
								drawRightBar.mVS[drawRightBar.mVS[2][0]][drawRightBar.mVS[2][1]]*=10;
								drawRightBar.mVS[drawRightBar.mVS[2][0]][drawRightBar.mVS[2][1]]+=e.keyCode-48;
								let numToMax = Math.min(p.zones[map[yS][xS].zone].res.marketCap-quantity, 9999, drawRightBar.mVS[drawRightBar.mVS[2][0]][drawRightBar.mVS[2][1]]);
								if(drawRightBar.mVS[2][0] == 0){//selling
									switch(drawRightBar.mVS[2][1]){
										case 0: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.perfs); break;
										case 1: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.woods); break;
										case 2: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.spices); break;
										case 3: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.pearls); break;
										case 4: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.silks); break;
										case 5: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.hides); break;
										case 6: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.iron[1]); break;
										case 7: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.bronze[1]); break;
										case 8: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.copper[1]); break;
										case 9: numToMax = Math.min(numToMax, p.manpower); break;
										case 10: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.wood); break;
										case 11: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.stone); break;
										case 12: numToMax = Math.min(numToMax, p.zones[map[yS][xS].zone].res.food); break;
									}
								}
								else{//buying
									goldDisp = 0;
									for(let i = 0; i < rates.length; i++){
										if(i != drawRightBar.mVS[2][1]){
											goldDisp += (rates[i]-p.sSplits[i])*drawRightBar.mVS[0][i]/15 - (rates[i]+p.bSplits[i])*drawRightBar.mVS[1][i]/15;
										}
									}
									numToMax = Math.min(numToMax, (p.gold+goldDisp)/((rates[drawRightBar.mVS[2][1]]+p.bSplits[drawRightBar.mVS[2][1]])/15)); //buying
								}
								numToMax = Math.max(numToMax, 0);
								drawRightBar.mVS[drawRightBar.mVS[2][0]][drawRightBar.mVS[2][1]] = Math.floor(numToMax);
							}
							else if(e.keyCode == 8){
								let temp = drawRightBar.mVS[drawRightBar.mVS[2][0]][drawRightBar.mVS[2][1]]/10;
								drawRightBar.mVS[drawRightBar.mVS[2][0]][drawRightBar.mVS[2][1]]=Math.floor(temp);
							}
						}
						else if(e.type == 'mousemove'){
							if(y > 385 && y < 595 && x > rect.width-37 && x < rect.width){
								drawRightBar.mVS[3] = Math.min(160, Math.max((y-400), 2));
							}
							else{
								r.removeEventListener('mousemove', drawRightBar);
							}
						}
						else{
							document.removeEventListener('keydown', drawRightBar);
						}
					}
					rtx.strokeRect(30, 590, 100, 60);
					rtx.strokeRect(150, 605, 70, 40);
					rtx.font = "25px Bookman";
					rtx.fillText("Confirm", 39 , 630);
					rtx.font = "20px Bookman";
					rtx.fillText("Clear", 159,630);
					goldDisp = 0;
					for(let i = 0; i < rates.length; i++){
						goldDisp += (rates[i]-p.sSplits[i])*drawRightBar.mVS[0][i]/15 - (rates[i]+p.bSplits[i])*drawRightBar.mVS[1][i]/15;
					}
					rtx.fillStyle = "grey";
					if(goldDisp < 0){ rtx.fillStyle = "red"; } else if(goldDisp > 0){rtx.fillStyle = "green"; }
					rtx.fillText(Math.floor(10*goldDisp)/10, 230, 630);
					//draw scroll bar
					rtx.strokeRect(rect.width-38, 400, 35, 180); 
					rtx.fillStyle = "grey";
					rtx.fillRect(rect.width-37, Math.min(580, 400+Math.max(2, drawRightBar.mVS[3])), 34, 20);
					for(let i = 0; i < 6; i++){
						let ind = Math.floor(drawRightBar.mVS[3]/21)+i;
						rtx.beginPath();
						rtx.strokeStyle = mcols[ind];
						rtx.fillStyle = mcols[ind];
						rtx.fillRect(20, 30*i+405, 20, 20); 
						for(let j = 0; j < pastRates[i].length-1; j++){
							rtx.moveTo(25+(j*28), 65 + (300/160)*(175 - pastRates[ind][j]));
							rtx.lineTo(25+((j+1)*28), 65 + (300/160)*(175 - pastRates[ind][(j+1)]));
							rtx.stroke();
						}
						rtx.fillStyle = "white";
						rtx.strokeStyle = "white";
						rtx.fillText("Sell", 155, 395); rtx.fillText("Buy", 225, 395);
						if(drawRightBar.mVS[2][0] == 0 && drawRightBar.mVS[2][1] == ind){
							rtx.strokeStyle = "gold";
						}
						rtx.strokeRect(150, 400+(i*30), 60, 30);
						rtx.strokeStyle = "white";
						if(drawRightBar.mVS[2][0] == 1 && drawRightBar.mVS[2][1] == ind){
							rtx.strokeStyle = "gold";
						}
						rtx.strokeRect(220, 400+(i*30), 60, 30);
						rtx.strokeStyle = "white";
						rtx.fillText(drawRightBar.mVS[0][ind], 153, 420+(i*30));
						rtx.fillText(drawRightBar.mVS[1][ind], 223, 420+(i*30));
						let matNames = ["Perfumes", "L.Woods", "Spices", "Pearls", "Silk", "Hides", "Iron", "Bronze", "Copper", "Manpower", "Wood", "Stone", "Food"];
						rtx.fillText(matNames[ind], 45, 420 + 30*i);
					}
				}
				else if(map[yS][xS].building[0] == 3){ //Army Creation
					var type = -1;
					rtx.strokeStyle = "white";
					if(map[yS][xS].building[1] < 4){
						var type = map[yS][xS].building[1]-1;
					}
					if(type > -1 && map[yS][xS].owner == p.turn){
						let word = "";
						let mats = ["Wood", "Stone", "Copper", "Bronze", "Iron"];
						if(type == 0){ word = "Infantry"; }
						else if(type == 1){ word = "Archer"; }
						else{ word = "Cavalry"; }
						rtx.fillStyle = "#d5d8ef";
						rtx.fillText("Points Remaining: " + curUnit[type].pts, 10, 85);
						curUnit[type].type = type;
						rtx.strokeRect(70, 108, 45, 27); 
						rtx.fillText("Size:  " + curUnit[type].size, 20, 125); //Type, Number, Attack, Defense, Skirmish, Mobility, Discipline, Owner
						rtx.fillText("+ 10", 125, 125);
						rtx.fillText("Attack: " + curUnit[type].stats[0] , 10, 170);
						rtx.fillText("Defense: " + curUnit[type].stats[1], 10, 200);
						rtx.fillText("Skirmish: " + curUnit[type].stats[2], 10, 230);
						rtx.fillText("Mobility: " + curUnit[type].stats[3], 10, 260);
						rtx.fillText("Foraging: " + curUnit[type].stats[4], 10, 290);
						rtx.fillText("Weapon 1: " + weapons[curUnit[type].type][curUnit[type].weapons[0]].name, 10, 320);
						rtx.fillText("Atk: " + weapons[curUnit[type].type][curUnit[type].weapons[0]].attack, 10, 340);
						rtx.fillText("Pen: " + weapons[curUnit[type].type][curUnit[type].weapons[0]].pierce, 140, 340);
						rtx.fillText("Def: " + weapons[curUnit[type].type][curUnit[type].weapons[0]].defense, 10, 360);
						rtx.fillText("Upkeep: " + weapons[curUnit[type].type][curUnit[type].weapons[0]].upkeep, 140, 360);
						rtx.fillText("Skirmish: " + weapons[curUnit[type].type][curUnit[type].weapons[0]].skirmish, 10, 380);
						rtx.fillStyle = "#ff0000";
						rtx.fillRect(200, 302, 20, 20)
						rtx.fillStyle = "#d0f0c0";
						rtx.fillRect(240, 302, 20, 20)
						rtx.fillStyle = "black";
						rtx.fillRect(202, 312, 16, 1);
						rtx.fillRect(242, 312, 16, 1);
						rtx.fillRect(250, 305, 1, 14);
						if(weapons[curUnit[type].type][curUnit[type].weapons[0]].hands < 2){
							rtx.fillStyle = "#d5d8ef";
							rtx.fillText("Weapon 2: " + weapons[curUnit[type].type][curUnit[type].weapons[1]].name, 10, 400);
							rtx.fillText("Atk: " + weapons[curUnit[type].type][curUnit[type].weapons[1]].attack, 10, 420);
							rtx.fillText("Pen: " + weapons[curUnit[type].type][curUnit[type].weapons[1]].pierce, 140, 420);
							rtx.fillText("Def: " + weapons[curUnit[type].type][curUnit[type].weapons[1]].defense, 10, 440);
							rtx.fillText("Upkeep: " + weapons[curUnit[type].type][curUnit[type].weapons[1]].upkeep, 140, 440);
							rtx.fillText("Skirmish: " + weapons[curUnit[type].type][curUnit[type].weapons[1]].skirmish, 10, 460);
							rtx.fillStyle = "#ff0000";
							rtx.fillRect(200, 382, 20, 20)
							rtx.fillStyle = "#d0f0c0";
							rtx.fillRect(240, 382, 20, 20)
							rtx.fillStyle = "black";
							rtx.fillRect(202, 392, 16, 1);
							rtx.fillRect(242, 392, 16, 1);
							rtx.fillRect(250, 385, 1, 14);
						}
						for(i = 0; i < 5; i++){ //draw little squares
							rtx.fillStyle = "#ff0000";
							rtx.fillRect(180, 150 + (30*i), 18, 18)
							rtx.fillStyle = "#d0f0c0";
							rtx.fillRect(220, 150 + (30*i), 18, 18)
							rtx.fillStyle = "black";
							rtx.fillRect(182, 158 + (30*i), 14, 1); // --
							rtx.fillRect(222, 158 + (30*i), 14, 1); //      -.-
							rtx.fillRect(229, 152 + (30*i), 1, 14); //.......|
						}
							var costs = [(curUnit[type].size + 10), 3*(curUnit[type].size+10), 0, 0, (curUnit[type].size + 10)*.85]; //Calc Unit costs: manpower, food, wood, material, gold
							costs[4] += curUnit[type].material * .15 * costs[0];
							if(type == 1){
								costs[4] -= curUnit[type].stats[4] * .75;
							}
							if(type == 2){
								costs[1] += (costs[0]);
								costs[4] += .4 * costs[0];
							}
							else if(type == 1){
								costs[4] += .1 * costs[0];
							}
							costs[1] -= 30 * curUnit[type].stats[4]; costs[1] = Math.max(0, costs[1]);
							costs[2] += weapons[curUnit[type].type][curUnit[type].weapons[0]].cost[0] * costs[0];
							costs[4] += costs[0]*weapons[curUnit[type].type][curUnit[type].weapons[0]].upkeep*5;
							costs[3] += 1.5*weapons[curUnit[type].type][curUnit[type].weapons[0]].cost[1] * costs[0];
							if(weapons[curUnit[type].type][curUnit[type].weapons[0]].hands < 2){
								costs[2] += weapons[curUnit[type].type][curUnit[type].weapons[1]].cost[0] * costs[0];
								costs[3] += 1.5*weapons[curUnit[type].type][curUnit[type].weapons[1]].cost[1] * costs[0];
								costs[4] += costs[0]*weapons[curUnit[type].type][curUnit[type].weapons[1]].upkeep*5;
							}
							rtx.fillStyle = "white";
							rtx.fillText("Costs", 10, 485);
							if(type == 2){
								rtx.fillText("Manpower/Horses: " + costs[0], 40, 510);
							}
							else{
								rtx.fillText("Manpower: " + costs[0], 40, 510);
							}
							rtx.fillText("Food: " + Math.floor(10*costs[1])/10, 40, 535 );
							rtx.fillText("Gold: " + Math.floor(100*costs[4])/100, 40, 560);
							rtx.fillText("Wood: " + Math.ceil(costs[2]), 40, 585);
							rtx.fillText(mats[curUnit[type].material] + ": " + Math.ceil(costs[3]), 40, 610);
							rtx.strokeRect(35, 590, 80 + 5*mats[curUnit[type].material].length, 30);
							rtx.font = "32px Bookman";
							rtx.fillText("Create", 215, 565);
							rtx.fillStyle = "#DCDCDC";
							rtx.strokeRect(200, 535, 105, 40);
							if(e.type == "mousedown" && y > 60 && y < 430){
								if(y>= 108 && y <= 135 && x < 175){
									document.addEventListener('keydown', drawRightBar);
								}
								else if(y > 150 && y < 298){
									if(x > 175 && x < 245){
										if(x < 200 && x > 180){ //click - or +
											if(curUnit[type].stats[Math.floor((y - 145)/30)] > 0){
												curUnit[type].stats[Math.floor((y - 145)/30)]--;
												curUnit[type].pts++;
											}
										}
										else if(x < 240 && x > 220){
											if(curUnit[type].pts > 0){
												curUnit[type].stats[Math.floor((y - 145)/30)]++;
												curUnit[type].pts--;
											}
										}
									} 
								}
								else if(y >= 297 && y < 322){
									if(x < 230 && x > 190){
										curUnit[type].weapons[0]--;
									}
									else if(x > 230 && x < 270){
										curUnit[type].weapons[0]++;
									}
									if(curUnit[type].weapons[0] < 0){ curUnit[type].weapons[0] = weapons[curUnit[type].type].length-1; }
									if(curUnit[type].weapons[0] > weapons[curUnit[type].type].length-1){ curUnit[type].weapons[0] = 0; }
								}
								else if(y < 402 && y > 380){	
									if(x < 230 && x > 190){
										curUnit[type].weapons[1]--;
										while(curUnit[type].weapons[1] < 0 || weapons[curUnit[type].type][curUnit[type].weapons[1]].hands > 1){
											curUnit[type].weapons[1]--;
											if(curUnit[type].weapons[1] < 0){
												curUnit[type].weapons[1] = weapons[curUnit[type].type].length-1;
											}
										}
									}
									else if(x > 230 && x < 270){
										curUnit[type].weapons[1]++;
										while(curUnit[type].weapons[1] > weapons[curUnit[type].type].length-1 || weapons[curUnit[type].type][curUnit[type].weapons[1]].hands > 1){
											curUnit[type].weapons[1]++;
											if(curUnit[type].weapons[1] > weapons[curUnit[type].type].length-1){
												curUnit[type].weapons[1] = 0;
											}
										}
									}
								}
								delta = true;
								return;
							}
							else if(e.type == 'keydown'){
								if(e.keyCode >= 48 && e.keyCode <= 57){
									if(curUnit[type].size == 0){
										curUnit[type].size = e.keyCode-48;
									}
									else if((10*curUnit[type].size + e.keyCode-48) <= Math.max(10, (p.manpower-10)) && 10*curUnit[type].size < 90) {
										curUnit[type].size *= 10;
										curUnit[type].size += e.keyCode-48;
										if(curUnit[type].size > 30){
											curUnit[type].size = 30;
										}
									}
									else{ 
										curUnit[type].size = Math.min(90, Math.max(10, Math.floor(p.manpower)-10));
									}
								}
								else if(e.keyCode == 8){
									curUnit[type].size = Math.floor(curUnit[type].size/10);
								}
								delta = true;
								return;
							}
							else if(e.type == 'mousedown'){
								if(x >= 35 && y >= 590 && x <= 35 + 80 + 5*mats[curUnit[type].material].length && y <= 635){
									curUnit[type].material++;
									if(curUnit[type].material > 4){
										curUnit[type].material = 0;
									}
									delta = true;
									return;
								}
								if(y >= 535 && x >= 200 && x < 325 && y < 585){ // Buy the Unit && Bring it to the world
									var canBuyA = false;
									if(p.manpower >= costs[0]){
										if(p.zones[map[yS][xS].zone].res.horses >= costs[0] || type != 2){
											if(p.zones[map[yS][xS].zone].res.food >= costs[1]){
												if(p.zones[map[yS][xS].zone].res.wood >= costs[2]){
													switch(curUnit[type].material){
														case 0: if(p.zones[map[yS][xS].zone].res.wood >= costs[3]+costs[2]){ canBuyA = true; } break;
														case 1: if(p.zones[map[yS][xS].zone].res.stone >= costs[3]){ canBuyA = true; } break;
														case 2: if(p.zones[map[yS][xS].zone].res.copper[1] >= costs[3]){ canBuyA = true; } break;
														case 3: if(p.zones[map[yS][xS].zone].res.bronze[1] >= costs[3]){ canBuyA = true; } break;
														case 4: if(p.zones[map[yS][xS].zone].res.iron[1] >= costs[3]){ canBuyA = true; } break;
													}
												}
											}
										}
									}
									if(canBuyA){
										p.manpower -= costs[0];
										if(type == 2){
											p.zones[map[yS][xS].zone].res.horses -= costs[0];
										}
										p.zones[map[yS][xS].zone].res.food -= costs[1];
										p.zones[map[yS][xS].zone].res.wood -= costs[2];
										p.gold -= costs[4];
										curUnit[type].food = costs[1];
										curUnit[type].size = costs[0];
										switch(curUnit[type].material){
											case 0: p.zones[map[yS][xS].zone].res.wood -= costs[3]; break;
											case 1: p.zones[map[yS][xS].zone].res.stone -= costs[3]; curUnit[type].upkeep += .03; break;
											case 2: p.zones[map[yS][xS].zone].res.copper[1] -= costs[3]; curUnit[type].upkeep += .05; break;
											case 3: p.zones[map[yS][xS].zone].res.bronze[1] -= costs[3]; curUnit[type].upkeep += .07; break;
											case 4: p.zones[map[yS][xS].zone].res.iron[1] -= costs[3]; curUnit[type].upkeep += .09; break;
										}
										for(let i = 0; i < p.armies; i++){
											if(p.armies[i] == -1){
												curUnit[type].num = i;
												i = p.armies.length;
											}
										}
										if(curUnit[type].num == -1){
											curUnit[type].num = p.armies.length;
										}
										curUnit[type].upkeep += weapons[curUnit[type].type][curUnit[type].weapons[0]].upkeep;
										if(weapons[curUnit[type].type][curUnit[type].weapons[0]].hands < 2){
											curUnit[type].upkeep += weapons[curUnit[type].type][curUnit[type].weapons[1]].upkeep;
										}
										curUnit[type].upkeep += .08;
										p.armies[curUnit[type].num] = curUnit[type];
										curUnit[type] = JSON.parse(JSON.stringify(curUnit[type]));
										if(p.armies[curUnit[type].num].type == 0){ //Infantry
											p.armies[curUnit[type].num].stats[1] += 1 + curUnit[type].material;
											p.armies[curUnit[type].num].stats[0] += Math.floor(curUnit[type].material/1.1);
										}
										else if(p.armies[curUnit[type].num].type == 1){ //Archer
											p.armies[curUnit[type].num].stats[2] += 2;
											p.armies[curUnit[type].num].stats[0] += 1 + curUnit[type].material;
											p.armies[curUnit[type].num].upkeep+=.01;
											p.armies[curUnit[type].num].upkeep-=p.armies[curUnit[type].num].stats[4]/190;
										}
										else if(p.armies[curUnit[type].num].type == 2){ //Cavalry
											p.armies[curUnit[type].num].stats[3] += 2;
											p.armies[curUnit[type].num].stats[0] += 1 + curUnit[type].material;
											p.armies[curUnit[type].num].stats[1] += Math.floor(curUnit[type].material/2);
											p.armies[curUnit[type].num].upkeep+=.08;
										}
										p.armies[curUnit[type].num].upkeep *= .5 * costs[0];
										p.armies[curUnit[type].num].y = yS;
										p.armies[curUnit[type].num].x = xS;
										p.armies[curUnit[type].num].owner = p.turn;
										p.armies[curUnit[type].num].maxSize = p.armies[curUnit[type].num].size;
										p.armies[curUnit[type].num].ID = createID(p.armies[curUnit[type].num], p.gold);
										map[yS][xS].army = (p.armies[curUnit[type].num]);
										tileChange(yS, xS);
										armyChange(p.armies[curUnit[type].num], true);
										curUnit[type].ID = ""; curUnit[type].size -= 10; 
										curUnit[type].upkeep = 0;
										curUnit[type].num = -1;
										delta = true;
										drawDelta = true;
										return;
									}
								}
								document.removeEventListener('keydown', drawRightBar);
							}						
					}
					else if(map[yS][xS].building[0] == 3 && map[yS][xS].building[1] == 0){
						if(map[yS][xS].owner == p.turn && map[yS][xS].zone > -1 && map[yS][xS].zone < p.zones.length){
							rtx.strokeRect((rect.width/2)-90, 100, 180, 30);
							rtx.fillText("Well Being: " + Math.floor(10 * p.zones[map[yS][xS].zone].res.wellbeing)/10, 5, 440);
							rtx.fillText("Recruit Army", (rect.width/2)-75, 120, 180);
							if(e!=0){
								if(y > 10 && y < 130 && x > (rect.width/2)-90 && x < rect.width/2 + 90){
									if(p.zones[map[yS][xS].zone].res.wellbeing >= 150 && p.zones[map[yS][xS].zone].res.population > 25){
										let num = -1;
										let nums = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
										for(let i = 0; i < p.armies.length; i++){
											if(p.armies[i].num < nums.length){
												nums[p.armies[i].num] = -1;
											}
										}
										if(nums.indexOf(0) > -1){
											num = nums.indexOf(0);
										}
										else{
											num = p.armies[p.armies.length-1].num+1;
										}
										p.zones[map[yS][xS].zone].res.wellbeing -= 150;
										p.zones[map[yS][xS].zone].res.population -= 20;
										createRandomUnit(map[yS][xS].zone, p.turn, num, p);
										drawDelta = true;
										delta = true;
										return;
									}
								}
							}
						}
					}
					else if(map[yS][xS].building[0] == 3 && map[yS][xS].building[1] == 4){ //Siege Yard
						let treb = new Unit();
						treb.trebuchet = true;
						treb.stats = [0, 15, 10, 1, 4];
						treb.owner = p.turn;
						treb.size = 40; treb.maxSize = 40;
						rtx.strokeRect((rect.width/2)-90, 80, 180, 30);
						rtx.fillText("Build Trebuchet", (rect.width/2)-75, 100);
						rtx.fillText("30 wood, 200g, 40 manpower", 20, 75);
						if(y > 80 && y < 110 && x > (rect.width/2)-90 && x < rect.width/2 + 90){
							if(p.manpower >= 40 && p.gold >= 200 && p.zones[map[yS][xS].zone].res.wood >= 30){
								p.manpower -= 40;
								p.gold -= 200;
								p.zones[map[yS][xS].zone].res.wood -= 30;
								let nums = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
								for(let i = 0; i < p.armies.length; i++){
									if(p.armies[i].num < nums.length){
										nums[p.armies[i].num] = -1;
									}
								}
								if(nums.indexOf(0) > -1){
									treb.num = nums.indexOf(0);
								}
								else{
									treb.num = p.armies[p.armies.length-1].num+1;
								}
								delta = true;
								p.armies[treb.num] = treb;
								p.armies[treb.num].y = yS;
								p.armies[treb.num].x = xS;
								p.armies[treb.num].upkeep = 20;
								map[yS][xS].army = (p.armies[treb.num]);
								tileChange(yS, xS);
								armyChange(p.armies[treb.num], true);
								delta = true;
								drawDelta = true;
								return;
							}
						}
					}
				}	
			break;
			case 2: //Army is selected
				rtx.fillStyle = "white";
				rtx.font = "26px Bookman";
				if(map[yS][xS].army.trebuchet){
					rtx.fillText("It's a trebuchet.", 20, 90);
					rtx.fillText("It has 3 range.", 20, 120);
					rtx.fillText("Upkeep: 15g", 20, 150);
				}
				else{
					switch(map[yS][xS].army.type){
						case 0:	rtx.fillText("Infantry", 20, 90); break;
						case 1:	rtx.fillText("Archers", 20, 90); break;
						case 2: rtx.fillText("Cavalry", 20, 90); break;
					}
					rtx.fillText("Lvl: "+map[yS][xS].army.level+"  "+(Math.floor(10*map[yS][xS].army.experience)/10)+"/"+(map[yS][xS].army.level+1)*50,160, 90);
					rtx.fillText("Size: " + Math.floor(map[yS][xS].army.size), 20, 120);
					rtx.fillText("Food: " + Math.floor(map[yS][xS].army.food), 160, 120);
					rtx.fillText("Upkeep: " + Math.floor(100*map[yS][xS].army.upkeep * map[yS][xS].army.size/map[yS][xS].army.maxSize)/100, 160, 140);
					rtx.fillText("Attack: " + map[yS][xS].army.stats[0], 20, 150);
					rtx.fillText("Defense: " + map[yS][xS].army.stats[1], 20, 180);
					rtx.fillText("Morale: " + Math.floor(100*map[yS][xS].army.morale[0])/100+"/"+map[yS][xS].army.morale[1], 160, 180);
					rtx.lineWidth = "2px";
					rtx.strokeStyle = "white";
					rtx.strokeRect(155, 188, 150, 33); rtx.lineWidth = "1px";
					rtx.fillText("Commander",160, 210);
					rtx.fillText("Skirmish: " + map[yS][xS].army.stats[2], 20, 210);
					rtx.fillText("Mobility: " + map[yS][xS].army.stats[3], 20, 240);
					rtx.fillText("Foraging: " + map[yS][xS].army.stats[4], 20, 270);
					rtx.fillText("Weapon 1: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[0]].name, 20, 300);
					rtx.fillText("Atk: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[0]].attack, 20, 320);
					rtx.fillText("Pen: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[0]].pierce, 140, 320);
					rtx.fillText("Def: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[0]].defense, 20, 340);
					rtx.fillText("Upkeep: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[0]].upkeep, 140, 340);
					rtx.fillText("Skirmish: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[0]].skirmish, 20, 360);
					if(weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[0]].hands < 2){
						rtx.fillStyle = "white";
						rtx.fillText("Weapon 2: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[1]].name, 20, 400);
						rtx.fillText("Atk: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[1]].attack, 20, 420);
						rtx.fillText("Pen: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[1]].pierce, 140, 420);
						rtx.fillText("Def: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[1]].defense, 20, 440);
						rtx.fillText("Upkeep: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[1]].upkeep, 140, 440);
						rtx.fillText("Skirmish: " + weapons[map[yS][xS].army.type][map[yS][xS].army.weapons[1]].skirmish, 20, 460);
					}
					//disband button
					if(map[yS][xS].army.owner == p.turn){
						rtx.font = "28px Bookman";
						if(map[yS][xS].army.state[1] != "disbanding"){
							rtx.strokeStyle = "red";
							rtx.strokeRect(200, 485, 120, 40);
							rtx.fillText("Disband", 210, 515);
						}
						rtx.strokeStyle = "white";
						rtx.strokeRect(200, 545, 120, 40);
						if(map[yS][xS].army.state[0] != "patrolling"){
							rtx.fillText("Moving", 214, 575);
						}
						else{
							rtx.fillText("Patrolling", 205, 575);
						}
						rtx.font = "26px Bookman";
						rtx.strokeRect(20, 490, 30, 30);
						rtx.fillText("Move Unit", 60, 520);
					}
					rtx.fillText("Battle Report:", 20, 550);
					rtx.fillText("Distance:" + Math.floor(10*map[yS][xS].army.battleReport[0])/10, 20, 580);
					rtx.fillText("Atk:" + Math.floor(10*map[yS][xS].army.battleReport[1])/10, 20, 610);
					rtx.fillText("Def:" + Math.floor(10*map[yS][xS].army.battleReport[2])/10, 140, 610);
					rtx.fillText("Kills: " + Math.ceil(map[yS][xS].army.battleReport[3]), 20, 640);
					if(p.following == map[yS][xS].army.num){
						rtx.fillStyle = "green";
						rtx.fillRect(25, 495, 20, 20);
					}
					if(e.type == "mousedown"){
						if(map[yS][xS].army.owner == p.turn){
							if(x > 20 && y > 490 && x < 50 && y < 520){
								if(p.following == map[yS][xS].army.num){
									p.following = -1;
									for(let i = 0; i < map[yS][xS].army.path.length; i++){
										drawTile(map[yS][xS].army.path[i][0], map[yS][xS].army.path[i][1]);
									}
								}
								else {
									if(p.following > -1){
										let oldFollow = p.following;
										p.following = map[yS][xS].army.num;
										for(let i = 0; i < p.armies[oldFollow].path.length; i++){
											drawTile(p.armies[oldFollow].path[i][0], p.armies[oldFollow].path[i][1]);
										}
									}
									p.following = map[yS][xS].army.num;
									for(let i = 0; i < p.armies[p.following].path.length; i++){
										drawTile(p.armies[p.following].path[i][0], p.armies[p.following].path[i][1]);
									}
									drawArmyPath();
									p.action = "moving";
								}
							}
							else if(x>155 && y>188&& x< 305 && y < 221){
								if(map[yS][xS].army.owner == p.turn || map[yS][xS].army.commander != -1){
									p.menView[0] = 3;
								}
							}
							else if(map[yS][xS].army.state[1] != "disbanding" && x > 200 && y >= 485 && x <= 320 && y<= 525){
								map[yS][xS].army.state[1] = "disbanding";
								p.armies[map[yS][xS].army.num].state[1] = "disbanding";
								armyChange(map[yS][xS].army, false);
							}
							else if(x > 200 && y >= 545 && x <= 320 && y<= 585){
								if(map[yS][xS].army.state[0] != "patrolling"){
									map[yS][xS].army.state[0] = "patrolling";
									p.armies[map[yS][xS].army.num].state[0] = "patrolling";
								}
								else{
									map[yS][xS].army.state[0] = "";
									p.armies[map[yS][xS].army.num].state[0] = "";
								}
								armyChange(map[yS][xS].army, false);
							}
						}
						delta = true;
						return;
					}
				}
			break;
			case 3: //Commander of a unit
				rtx.clearRect(0, 0, r.width, r.height);
				drawMenus();
				let arm = map[yS][xS].army
				if(e.type == "mousedown"){
					if(x > 160 && y > 330 && x < 230 && y < 360){
						p.menView[0] = 1;
					}
					else if(arm.commander == -1 && arm.owner == p.turn){
						if(p.gold > 100){
							if(x>90&&y>150 && x < 290 && y<205){
								p.armies[map[yS][xS].army.num].commander = genCommander();
								map[yS][xS].army = p.armies[map[yS][xS].army.num];
								armyChange(p.armies[map[yS][xS].army.num], false);
								p.gold -= 100;
								delta = true;
								return;
							}
						}
					}
				}
				if(arm == -1 || p.menView[0] != 3){
					p.menView[0] = 1;
					delta = true;
					return;
				}
				else{
					rtx.fillStyle = "white";
					rtx.strokeStyle = "white";
					rtx.fillText("Back", 170, 350);
					rtx.strokeRect(160, 330, 70, 30);
					if(arm.commander == -1 && arm.owner == p.turn){
						rtx.fillText("Recruit Commander", 100, 180);
						rtx.font = "18px Bookman";
						rtx.fillText("100g", 100, 190);
						rtx.strokeRect(90, 150, 200, 55);
					}
					else if(arm.commander != -1){
						rtx.fillText("Lvl: "+arm.commander.level+" "+(Math.floor(10*arm.commander.experience)/10)+"/"+(arm.commander.level+1)*100,20, 120);
						rtx.fillText(arm.commander.name, 20, 90);
						rtx.fillText(arm.commander.description, 20, 150);
					}
				}
			break;
			case 4: //Navy is selected
			let n = map[yS][xS].navy; //Att, Def, Cargo, Transp, Fishing, Speed
			if(n != -1){
				rtx.strokeStyle = "white";
				rtx.font = "24px Bookman";
				rtx.fillText("Integrity: " + Math.floor(100*n.health[0])/100+"/"+Math.floor(100*n.health[1])/100, 20, 100);
				rtx.fillText("Attack: " + n.stats[0], 20, 130);
				rtx.fillText("Strength: " + n.stats[1], 20, 150);
				rtx.fillText("Speed: " + n.stats[5], 20, 170);
				rtx.fillText("Fishing: " + n.stats[4], 20, 190);
				rtx.fillText("Food: "+n.cargo.food+"/"+(35*n.stats[4]+300+90*n.stats[2]),40,230);
				rtx.fillText("Pearls: " + n.cargo.pearls +"/"+(5 + n.stats[2]*3), 40, 260);
				rtx.fillText("Storage: " + n.stats[2], 20, 290);
				rtx.fillText("Gold: "+Math.floor(100*n.cargo.gold)/100,40,330);
				rtx.fillText("Transport: " + n.stats[3],20, 390);
				if(n.owner == p.turn){
					rtx.lineWidth = "2px";
					if(!n.unloading){
						rtx.fillText("Unload Cargo", 170, 280);
					}
					else{
						rtx.fillText("Stop Unload", 170, 280);
					}
					rtx.strokeRect(165, 250, 150, 45);
					rtx.strokeRect(20, 500, 30, 30);
					rtx.fillText("Move Ship", 60, 520);
					if(p.nFollowing == n.num){
						rtx.fillStyle = "green";
						rtx.fillRect(25, 505, 20, 20);
					}
					if(e.type == 'mousedown'){
						if(x>=20&&y>=500&&x<=50&&y<=530){
							if(p.nFollowing != n.num){
								p.nFollowing = n.num;
								p.action = "nMoving";
							}
							else{
								for(let i = 0; i < p.navies[p.nFollowing].path.length; i++){
									drawTile(p.navies[p.nFollowing].path[i][0], p.navies[p.nFollowing].path[i][1]);
								}
								p.nFollowing = -1;
							}
							drawNavyPath();
						}
						else if(x>=165&&y>=250&&x<=315&&y<=295){
							p.navies[n.num].unloading = !p.navies[n.num].unloading;
						}
						delta = true;
						return;
					}
				}
			}
			break;
		default:
			rtx.fillStyle = "rgb(213, 216, 239)";
			rtx.fillText("Tab is Incomplete: " + tab, 50, 300); break;
	}
}
function drawLeftBar(ev){
	if(typeof drawLeftBar.tab == 'undefined'){ drawLeftBar.tab = 0; }
	var e = ev || 0;
	var rect = l.getBoundingClientRect();
	if(e!=0 && e.type == 'mousedown'){
		var y = e.clientY - rect.top;
		var x = e.clientX - rect.left;
	}
	ltx.fillStyle = "rgb(53, 65, 68)";
	ltx.fillRect(0, 0, l.width, l.height);
	ltx.lineWidth = 2;
	ltx.fillStyle = "rgb(213, 216, 239)";
	ltx.font = "18px Arial";
	if(x > 5 && x < rect.width/2 && y < 120 && y > 100){
		if(p.action == "claiming"){
			p.action = "clearing";
		}
		else if(p.action == "clearing"){ p.action = "planting"; }
		else { p.action = "claiming"; }
	}
	else if(y < 60){
		drawLeftBar.tab = 1;
		if(x < rect.width/2){
			drawLeftBar.tab = 0;
		}
	}
	ltx.strokeStyle = "white";
	if(drawLeftBar.tab == 0){ ltx.strokeStyle = "gold"; }
	ltx.strokeRect(0,0,rect.width/2-1,60);
	ltx.strokeStyle = "white";
	if(drawLeftBar.tab == 1){ ltx.strokeStyle = "gold"; }
	ltx.strokeRect(rect.width/2,0,rect.width/2-2,60);
	ltx.strokeStyle = "white";
	ltx.font = "20px Arial";
	ltx.fillText("Goods", rect.width/2 + rect.width/7, 40);
	ltx.fillText("Building", rect.width/8,40);
	ltx.font = "18px Arial";
	ltx.fillText("Draw: " + p.draw, 5, 100);
	if(p.action != "nMoving"){
		ltx.fillText("Action: " + p.action, 5, 120);
	}
	else{
		ltx.fillText("Action: Moving Ship", 5, 120);
	}
	ltx.fillText("Manpower: " + Math.floor(10*p.manpower)/10, 5, 150);
	ltx.fillText("Gold: " + Math.floor(100*p.gold)/100, 5, 170);
	let totGoldIncome = 0;
	for(let i = 0; i < p.zones.length; i++){
		totGoldIncome += p.zones[i].income.gold;
	}
	ltx.fillText("Gold Income: " + Math.floor(100*(totGoldIncome))/100, 5, 190);
	if(tileSelected.length > 0 && map[tileSelected[0]][tileSelected[1]].owner == p.turn){
		let t = map[tileSelected[0]][tileSelected[1]];
		var a = -1; var r = -1;
		if(t.manager == -1 && t.zone > -1){
			a = p.zones[map[tileSelected[0]][tileSelected[1]].zone]; r = p.roads[map[tileSelected[0]][tileSelected[1]].zone].length || 0;
		}
		else if(t.manager > -1 && p.vassals[t.manager].roads.length > 0){
			a = p.vassals[t.manager].zones[0];
			r = p.vassals[t.manager].roads[0].length;
		}
		if(a != -1 && typeof a != 'undefined'){
			if(drawLeftBar.tab == 0){
				ltx.fillText("Size: " + (a.size-r) + " / " + a.maxSize, 5, 245);
				let modif = 1;
				if(typeof r != 'undefined' && (a.size-r) > a.maxSize){
					if(a.maxSize <= 1){
						modif = 0;
					}
					else {
						modif = .3 + .7 * (a.maxSize/(a.size-r));
					}
				}
				ltx.fillText("Efficiency: " + Math.floor(100*modif)/100, 5, 225);
				ltx.fillText("Wellbeing: " + Math.floor(10 * a.res.wellbeing)/10, 5, 270);
				ltx.fillText("Wellbeing Income: " + Math.floor(100*(a.income.wellbeing))/100, 5, 290);
				
				ltx.fillText("Wood: " + Math.floor(10*a.res.wood)/10 + " / " + a.rMax.wood, 5, 320);
				ltx.fillText("Wood Income: " + Math.floor(10*a.income.wood)/10 + " / " + Math.floor(10*a.max.wood)/10, 5, 340);
				
				ltx.fillText("Stone: " + Math.floor(10*a.res.stone)/10, 5, 360);
				ltx.fillText("Stone Income: " + Math.floor(100*a.income.stone)/100, 5, 390);
				
				ltx.fillText("Food: " + Math.floor(10*a.res.food)/10 + " / " + a.rMax.food, 5, 420);
				ltx.fillText("Food Income: " + Math.floor(10*a.income.food)/10 + " / " + Math.floor(10*a.max.food)/10, 5, 440);
				
				ltx.fillText("Population: " + Math.floor(10*a.res.population)/10 + " / " + Math.floor(10*a.rMax.population)/10, 5, 470);
				ltx.fillText("Population Income: " + Math.floor(10*a.income.population)/10, 5, 490);
				ltx.fillText("Manpower Income: " + Math.floor(10*a.income.manpower)/10+ " / " + Math.floor(10*a.max.manpower)/10, 5, 510);
			}
			else if(drawLeftBar.tab == 1){
				ltx.fillText("Market Cap: " + Math.floor(10*a.res.marketCap)/10 + " / " + Math.floor(10*a.rMax.marketCap)/10 + " ( " + Math.floor(10*a.income.marketCap)/10 + " )", 5, 220);
				ltx.fillText("Raw: " + Math.floor(10*a.res.rWood)/10, 120,285); ltx.fillText(Math.floor(rates[1]),225,285);
				ltx.fillText("Raw: " + Math.floor(10*a.res.rPerf)/10, 120,310); ltx.fillText(Math.floor(rates[0]),225,310);
				ltx.fillText("Raw: " + Math.floor(10*a.res.rHide)/10, 120,260); ltx.fillText(Math.floor(rates[5]),225,260);
				ltx.fillText("Raw: " + Math.floor(10*a.res.rSilk)/10, 120,335); ltx.fillText(Math.floor(rates[4]),225,335);
				ltx.fillText("Hides: " + Math.floor(10*a.res.hides)/10, 5, 260);
				ltx.fillText("Woods: " + Math.floor(10*a.res.woods)/10, 5,285);
				ltx.fillText("Perfumes: " + Math.floor(10*a.res.perfs)/10,5, 310);
				ltx.fillText("Silk: " + Math.floor(10*a.res.silks)/10,5,335);
				ltx.fillText("Spices: " + Math.floor(10*a.res.spices)/10 + "  ("+Math.floor(100*a.income.spices)/100+")",5,360); ltx.fillText(Math.floor(rates[2]),225, 360);
				ltx.fillText("Pearls: " + Math.floor(10*a.res.pearls)/10,5,385);
				ltx.fillText(Math.floor(rates[3]),225, 385);
				ltx.fillText("Copper: " + Math.floor(10*a.res.copper[1])/10 + "  Ore: " + Math.floor(10*a.res.copper[0])/10, 5, 430);
				ltx.fillText("Bronze: " + Math.floor(10*a.res.bronze[1])/10 + "  Ore: " + Math.floor(10*a.res.bronze[0])/10, 5, 450);
				ltx.fillText("Iron: " + Math.floor(10*a.res.iron[1])/10 + "  Ore: " + Math.floor(10*a.res.iron[0])/10, 5, 470);
				
				ltx.fillText("Horses: " + Math.floor(a.res.horses) + " / " + Math.floor(a.rMax.horses)+" (" + Math.floor(100*a.income.horses)/100 + " )", 5, 510);
			}
		}
	}
}