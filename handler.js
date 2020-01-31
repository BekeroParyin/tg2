var MAPSIZE = 1000;
		var socket = io();
		var drawing = false;
		var colors = [];
		var legends = [];
		var drawDelta = false;
		var delta = false;
		var start = false; var mapLoaded = false;
		var view = 1;
		var tS = [];
		var establishing = false;
		var p = new Player();
		p.manpower = 100;
		p.gold = 10;
		socket.emit('pConnected', function(data){});
		socket.on('pNum', function(data){
			p.color = data.color;
			legends = data.legends;
			colors = data.colors;
			p.bloodline = data.bloodline;
			p.turn = data.number;
			MAPSIZE = data.mapsize;
			delta = true;
			var map = new Array(MAPSIZE);
		});
		socket.on('mapPart', function(data){
			map[data.index] = data.row;
			if(data.index >= MAPSIZE-1){
				mapLoaded = true;
				drawDelta = true;
			}
		});
		socket.on('treasureFound', function(data){
			if(data.finder == p.turn){
				delta = true;
				var succ = false;
				if(p.manors.length > 0){
					let counter = 0;
					let mS = -1;
					do{
						mS = p.manors[Math.floor(Math.random() * p.manors.length)];
						counter++;
					}while(!map[mS[0]][mS[1]].building[3][0] && counter < p.manors.length*4);
					map[mS[0]][mS[1]].building[3].push(data.treasure);
					tileChange(mS[0], mS[1]);
				}
				else{
					console.log("FAILED TO DEPOSIT ARTIFACT; NO MANORS");
					retTreas(data.treasure);
				}
			}
		});
		function retTreas(r){
			socket.emit('retT', {
				t: r,
			});
		}
		function dayChange(d){
			socket.emit('dayChange', {
				day: d,
			});
		}
		function marketAction(val, res){
			socket.emit('marketAction', {
				val: val,
				res: res,
			});
		}
		socket.on('goldChange', function(data){
			if(data.player == p.turn){
				p.gold += data.amount;
			}
		});
		socket.on('armyLChange', function(data){
			let a = data.army;
			if(a.owner == p.turn){
				p.armies[a.num] = a;
				if(a.size < 1){
					p.armies[a.num] = -1;
					if(p.following == a.num){
						p.following = -1;	
					}
				}
			}
		});
		socket.on('navyLChange', function(data){
			let a = data.navy;
			if(a.owner == p.turn){
				p.navies[a.num] = a;
				if(p.following == a.num){
					for(let i = 0; i < a.path.length; i++){
						drawTile(a.path[i][0], a.path[i][1]);
					}
				}
				if(a.health[0] <= 0){
					p.navies[a.num] = -1;
					if(p.following == a.num){
						p.following = -1;	
					}
				}
			}
		});
		socket.on('tileChange', function(data){
			if(data.s != p.turn){
				let b0 = map[data.y][data.x].building[0];
				let b1 = map[data.y][data.x].building[1];
				map[data.y][data.x] = data.tile;
				if((b0 == 0 && b1 == 0) || (b0 == 2 && b1 == 3) || (b0 == 4 && b1 == 0)){
					p = Roads(p);
					p = scanRoads(p);
				}
				drawTile(data.y, data.x);
				drawTile(data.y-1, data.x);
				drawTile(data.y, data.x-1);
				drawTile(data.y, data.x+1);
				drawTile(data.y+1, data.x);
				drawTile(data.y-1, data.x-1);
				drawTile(data.y+1, data.x+1);
				drawTile(data.y-1, data.x+1);
				drawTile(data.y+1, data.x-1);
			}
		});
		socket.on('armyChange', function(data){
			if(mapLoaded){
				map[data.y][data.x].army = data.army;
				drawTile(data.y, data.x);
				drawTile(data.y-1, data.x);
				drawTile(data.y, data.x-1);
				drawTile(data.y, data.x+1);
				drawTile(data.y+1, data.x);
			}
		});
		socket.on('navyChange', function(data){
			if(mapLoaded){
				map[data.y][data.x].navy = data.navy;
				let ld = data.navy.lastDir;
				drawTile(data.y, data.x);
				switch(ld){
					case 0: drawTile(data.y-1, data.x); break;
					case 3: drawTile(data.y, data.x-1); break;
					case 1: drawTile(data.y, data.x+1); break;
					case 2: drawTile(data.y+1, data.x); break;
				}
			}
		});
		function armyChange(arm, n){
			if(arm != -1){
				socket.emit('armyCh', {
					army: arm,
					n: n,
				});
			}
		}
		function navyChange(arm, n){
			if(arm != -1){
				socket.emit('navyCh', {
					navy: arm,
					n: n,
				});
			}
		}
		function navyPathChange(n){
			socket.emit('navyPCh', {
				n: n,
			});
		}
		function tileChange(y1, x1){
			var y = safeC(y1);
			var x = safeC(x1);
			socket.emit('tileCh', {
				tile: map[y][x],
				y: y,
				x: x,
				sender: p.turn,
			});
		}
		var drawDir = -1;
		var timeout = false;
		function mapV(event){ //left
			if(!drawing && !timeout){
				if(event.keyCode == 37){
					p.xView = safeC(--p.xView);
					drawDelta = true;
					drawDir = 3;
					if(p.zoom > 6 && event.ctrlKey){ p.xView = safeC(p.xView - 12); drawDir = -1;}
				}
				else if(event.keyCode == 38){ //up
					p.yView = safeC(--p.yView);
					drawDelta = true;
					drawDir = 0;
					if(p.zoom > 6 && event.ctrlKey){ p.yView = safeC(p.yView - 12); drawDir = -1;}
				}
				else if(event.keyCode == 39){ //right
					p.xView = safeC(++p.xView);
					drawDelta = true;
					drawDir = 1;
					if(p.zoom > 6 && event.ctrlKey){ p.xView = safeC(p.xView + 12); drawDir = -1; }
				}
				else if(event.keyCode == 40){ //down
					p.yView = safeC(++p.yView);
					drawDelta = true;
					drawDir = 2;
					if(p.zoom > 6 && event.ctrlKey){ p.yView = safeC(p.yView + 12); drawDir = -1;}
				}
				else if(event.keyCode == 90){ //Z
					if(p.zoom < 200 ){
						p.zoom++;
						drawDelta = true;
						drawDir = 6;
						if(p.zoom > 60){
							p.zoom += 3;
						}
					}
				}
				else if(event.keyCode == 88){ //X
					if(p.zoom > 1 && cWidth/(p.zoom-1) <= MAPSIZE){
						p.zoom--;
						drawDelta = true; 
						drawDir = 5;
						if(p.zoom > 60){
							p.zoom -= 3; 
						}
					}
				}
				else if(event.keyCode == 68){ //D
					if(p.draw == "normal"){
						p.draw = "resources";
					}
					else if(p.draw == "resources"){
						p.draw = "zones";
					}
					else { p.draw = "normal"; }
					drawDelta = true;
					delta = true;
					drawDir = -1;
				}
				else if(event.keyCode == 65){
					if(p.action == "claiming"){
						p.action = "clearing";
					}
					else if(p.action == "clearing"){ p.action = "planting"; }
					else { p.action = "claiming"; }
					delta = true;
				}
				else { drawDelta = false; }
				timeout = true;
			}
		}
		function clear(e, y1, x1){
			var x, y;
			var tY = tS[0];
			var tX = tS[1];
			if(e == 0){
				x = x1; y = y1;
			}
			else{
				x = safeC(p.xView + Math.floor((e.clientX - c.getBoundingClientRect().x)/(p.zoom)));
				y = safeC(p.yView + Math.floor((e.clientY - c.getBoundingClientRect().y)/(p.zoom)));
			}
			tS[0] = y;
			tS[1] = x;
			if(e.type == "mousemove" || e == 0){
				if(map[y][x].zone > -1 && map[y][x].owner == p.turn && map[y][x].type == 'f'){
					if(p.manpower >= 3){
						if(p.zones[map[y][x].zone].res.wood < p.zones[map[y][x].zone].rMax.wood){
							p.zones[map[y][x].zone].res.wood++;
						}
						p.manpower -= 2;
						if(map[y][x].wetness == 0){
							map[y][x].type = 's';
						}
						else if(map[y][x].elevation >= .6){
							map[y][x].type = 'h';
						}
						else if(map[y][x].elevation >= .5){
							map[y][x].type = 'k';
						}
						else if(map[y][x].elevation > .175){
							map[y][x].type = 'i';
						}
						else { map[y][x].type = 'g'; }
						if(map[y][x].resource >= 11 && map[y][x].resource <= 13){
							map[y][x].resource = -1;
						}
						if(map[y][x].resource >= 15 && map[y][x].resource <= 16){
							map[y][x].resource = -1;
						}
						tileChange(y,x);
					}
				}
			}
			else {
				c.removeEventListener('mousemove', clear);
				c.removeEventListener('mouseup', clear);
			}
			drawTile(tY, tX);
			drawTile(tY-1, tX);
			drawTile(tY+1, tX);
			drawTile(tY, tX-1);
			drawTile(tY, tX+1);
			delta = true;
		}
		function build(e, y1, x1){
			var x, y;
			var tY = tS[0];
			var tX = tS[1];
			if(e == 0){
				x = x1; y = y1;
			}
			else{
				x = safeC(p.xView + Math.floor((e.clientX - c.getBoundingClientRect().x)/(p.zoom)));
				y = safeC(p.yView + Math.floor((e.clientY - c.getBoundingClientRect().y)/(p.zoom)));
			}
			tS[0] = y;
			tS[1] = x;
			drawTile(y, x);
			if(e.type == "mousemove" || e == 0){
				if(canBuy(y, x, p.menView[1][0], p.menView[1][1], p)){
					let t = map[y][x];
					let b0 = p.menView[1][0];
					let b1 = p.menView[1][1];
					let canPlace = t.building[0] == -1 && t.elevation > 0 && t.owner == p.turn;
					for(let a = -1; a < 2; a++){
						for(let b = -1; b < 2; b++){
							if((a == 0 || b == 0) && a != b){
								if(b0 == 1 && b1 == 3){ //if Dock
									if(map[safeC(y+a)][safeC(x+b)].elevation < 0){
										canPlace = true; a = 2; b = 2;
									}
								}
								else if(b0 == 2 && b1 == 3){
									if(map[safeC(y+a)][safeC(x+b)].building[0] == 2 && map[safeC(y+a)][safeC(x+b)].building[1] == 3){
										canPlace = false;
										alert("No adjacent gatehouses u ape");
									}
								}
								else if(b0 == 0 && b1 == 6){ // no adjacent mines
									if(map[safeC(y+a)][safeC(x+b)].building[0] == 0 && map[safeC(y+a)][safeC(x+b)].building[1] == 6){
										canPlace = false;
										alert("No adjacent mines u ape");
									}
								}
							}
						}
					}
					if(t.type == 'l'){
						if(b0 == 2 && b1 <= 3){ //walls on hills
							canPlace = canPlace && true;
						}
					}
					if(canPlace && (t.type == 'k' || t.type == 'h' || t.type == 'g' || t.type == 'i' || t.type == 'c' || (t.type == 'd' && p.culture.desert>0))){
						t.building = [p.menView[1][0], p.menView[1][1], 1, [false]];
						if(buildings[p.menView[1][0]][p.menView[1][1]].cost[0] > 0){
							p.zones[t.zone].res.wood -= buildings[p.menView[1][0]][p.menView[1][1]].cost[0];
						}
						if(buildings[p.menView[1][0]][p.menView[1][1]].cost[1] > 0){
							p.zones[t.zone].res.stone -= buildings[p.menView[1][0]][p.menView[1][1]].cost[1];
						}
						if(buildings[p.menView[1][0]][p.menView[1][1]].cost[2] > 0){
							p.zones[t.zone].res.gold -= buildings[p.menView[1][0]][p.menView[1][1]].cost[2];
						}
						p.manpower -= buildings[p.menView[1][0]][p.menView[1][1]].cost[3];
						switch(buildings[p.menView[1][0]][p.menView[1][1]].cost[4][0]){
							case 12: p.zones[t.zone].res.rWood-=buildings[p.menView[1][0]][p.menView[1][1]].cost[4][1];break;
							case 15: p.zones[t.zone].res.rSilk-=buildings[p.menView[1][0]][p.menView[1][1]].cost[4][1]; break;
							case 16: p.zones[t.zone].res.spices-=buildings[p.menView[1][0]][p.menView[1][1]].cost[4][1]; break;
						}
						buildings[p.menView[1][0]][p.menView[1][1]].effect(0);
						drawTile(y, x);
						if(y > 0){
							drawTile(y-1, x);
						}
						if(x > 0){
							drawTile(y, x-1);
						}
						if(x-p.xView < Math.floor(cWidth/p.zoom)){
							drawTile(y, x+1);
						}
						if(y-p.yView < Math.floor(cHeight/p.zoom)){
							drawTile(y+1, x);
						}
						if(b0 + b1 == 0){
							$("#switchContainer").css("display", "inline-block");
							if(document.getElementById("resgood").checked){
								$('#resource-list').show();
							}
							else { $('#goods-list').show(); }
						}
						tileChange(y,x);
						delta = true;
					}
				}
				else {
					p.action = "claiming";
				}
			}
			else {
				c.removeEventListener('mousemove', build);
				c.removeEventListener('mouseup', build);
			}
			drawTile(tY, tX);
		}
		function move(y1, x1){
			var x=x1;
			var y=y1;
			var tY = tS[0];
			var tX = tS[1];
			if((map[y][x].elevation > 0 && map[y][x].elevation < .85 && map[y][x].pass > -1) || map[y][x].building[0] == 4){
				let pa = p.armies[p.following];
				var pY = p.armies[p.following].y;
				var pX = p.armies[p.following].x;
				let tempPath = pathfind(pY, pX, y, x, false, p.turn, p.armies[p.following]);
				if(tempPath != -1){
					for(let i = 0; i < p.armies[p.following].path.length; i++){
						drawTile(p.armies[p.following].path[i][0], p.armies[p.following].path[i][1]);
					}
					p.armies[p.following].path = tempPath;
					if(p.armies[p.following].state[0] == "patrolling"){
						p.armies[p.following].patrol = [[pY,pX],[y,x]];
					}
					else{ p.armies[p.following].patrol = []; }
					drawArmyPath();
					armyChange(p.armies[p.following], false);
				}
			}
		}
		function nMove(y1, x1){
			var x=x1;
			var y=y1;
			var tY = tS[0];
			var tX = tS[1];
			if(map[y][x].elevation <= 0){
				for(let i = 0; i < p.navies[p.nFollowing].path.length; i++){
					drawTile(p.navies[p.nFollowing].path[i][0], p.navies[p.nFollowing].path[i][1]);
				}
				let pa = p.navies[p.nFollowing];
				var pY = p.navies[p.nFollowing].y;
				var pX = p.navies[p.nFollowing].x;
				let tempPath = pathfind(pY, pX, y, x, false, p.turn, pa);
				if(tempPath != -1){
					p.navies[p.nFollowing].path = tempPath;
					navyPathChange(p.navies[p.nFollowing]);
					drawNavyPath();
				}
			}
		}
		function claim(e, y1, x1){
			var x, y;
			var tY = tS[0];
			var tX = tS[1];
			if(e == 0){
				x = x1; y = y1;
			}
			else{
				x = safeC(p.xView + Math.floor((e.clientX - c.getBoundingClientRect().x)/(p.zoom)));
				y = safeC(p.yView + Math.floor((e.clientY - c.getBoundingClientRect().y)/(p.zoom)));
			}
			tS[0] = y;
			tS[1] = x;
			drawTile(y, x);
			if(e.type == "mousemove" || e == 0){
				var canClaim = p.size == 0 && map[y][x].army == -1 && map[y][x].elevation > 0 && map[y][x].owner == -1 && map[y][x].type != 'm';
				if(!canClaim){
					for(a = -1; a < 2; a++){
						for(b = -1; b < 2; b++){
							if(map[safeC(y+a)][safeC(x+b)].pass > -1 && map[safeC(y+a)][safeC(x+b)].owner == p.turn){
								canClaim = true; a = 2; b = 2;
							}
							else if(map[safeC(y+a)][safeC(x+b)].navy != -1 && map[safeC(y+a)][safeC(x+b)].navy.owner == p.turn){
								canClaim = true; a = 2; b = 2;
							}
						}
					}
					canClaim = canClaim && (p.manpower >= 1) && (map[y][x].owner == -1) && map[y][x].elevation > 0 && map[y][x].type != 'm';
				}
				if(canClaim){	
					p.manpower--;
					if(p.size == 0 && map[y][x].type == 'f'){
						if(map[y][x].elevation >= .6){
							map[y][x].type = 'h';
						}
						else if(map[y][x].elevation >= .5){
							map[y][x].type = 'k';
						}
						else if(map[y][x].elevation > .175){
							map[y][x].type = 'i';
						}
						else { map[y][x].type = 'g'; }
					}
					if(map[y][x].type == 'd'){
						if(Math.random() > .95){
							map[y][x].type = 'o';
						}
					}
					map[y][x].owner = p.turn;
					if(p.vassals.length > 0){
						map[y][x].zone = -1;
					}
					p.size++;
					p.territory.push([y, x]);
					if(p.size == 1){
						start = true;
					}
					if(map[y][x].building[0] != -1){
						map[y][x].building.effect();
					}
					drawTile(y, x);
					if(map[safeC(y + 1)][x].owner == p.turn){ drawTile(y+1, x); }
					if(map[safeC(y - 1)][x].owner == p.turn){ drawTile(y-1, x); }
					if(map[y][safeC(x + 1)].owner == p.turn){ drawTile(y, x+1); }
					if(map[y][safeC(x - 1)].owner == p.turn){ drawTile(y, x-1); }
					if(map[safeC(y - 1)][safeC(x+1)].owner == p.turn){ drawTile(y-1, x+1); }
					if(map[safeC(y - 1)][safeC(x-1)].owner == p.turn){ drawTile(y-1, x-1); }
					if(map[safeC(y+1)][safeC(x + 1)].owner == p.turn){ drawTile(y+1, x+1); }
					if(map[safeC(y+1)][safeC(x - 1)].owner == p.turn){ drawTile(y+1, x-1); }
					tileChange(y,x);
					delta = true;
				}
			}
			else {
				c.removeEventListener('mousemove', claim);
				c.removeEventListener('mouseup', claim);
			}
			drawTile(tY, tX);
		}
		function handleMapClick(e){
			if(e){
				p.appraising = false;
				var x = safeC(p.xView + Math.floor((e.clientX - c.getBoundingClientRect().x)/(p.zoom)));
				var y = safeC(p.yView + Math.floor((e.clientY - c.getBoundingClientRect().y)/(p.zoom)));
				if(x >= 0 && y >= 0 && x < e.clientX < c.width && e.clientY < c.height){
					var tY = y;
					var tX = x;
					if(tS.length == 2){
						tY = tS[0];
						tX = tS[1];
					}
					tS = [y, x];
					drawTile(y, x);
					drawTile(y+1, x);
					if(tY != y || tX != x){	
						drawTile(tY, tX);
					}
					if(e.ctrlKey){
						let reRoute = false;
						let canD = true;
						if(map[y][x].owner == p.turn && map[y][x].building[0] != -1){
							for(let a = -2; a < 3; a++){
								for(let b = -2; b < 3; b++){
									if(map[safeC(y+a)][safeC(x+b)].army != -1){
										if(map[safeC(y+a)][safeC(x+b)].army.owner != p.turn){
											canD = false;
										}
									}
								}
							}
							if(canD){
								if(map[y][x].building[0] == 1 && map[y][x].building[1] == 6){
									for(let i = 1; i < map[y][x].building[3].length; i++){
										retTreas(map[y][x].building[3][i]);
									}
								}
								if((map[y][x].building[0] == 0 && map[y][x].building[1] == 0) ||(map[y][x].building[0] == 2 && map[y][x].building[1] == 3) || (map[y][x].building[0] == 4 && map[y][x].building[1] == 0)){
									reRoute = true //Deleted building is a road or gatehouse, so roads & zones should be recalculated
								}
								map[y][x].building = [-1, -1, 1, [false]]; map[y][x].pass = 0; tileChange(y, x);
								if(reRoute && map[y][x].manager == -1){
									p = Roads(p);
									p = scanRoads(p);
								}
							}
						}
					}
					if(map[y][x].army != -1){
						if(map[y][x].army.owner == p.turn){
							if(p.action != "moving"){
								p.action = "moving";
							}
							else{
								if(p.following > -1){
									for(let i = 0; i < p.armies[p.following].path.length; i++){
										drawTile(p.armies[p.following].path[i][0], p.armies[p.following].path[i][1]);
									}
								}
								p.following = map[y][x].army.num;
								drawArmyPath();
							}
						}
					}
					if(map[y][x].navy != -1){
						if(map[y][x].navy.owner == p.turn){
							if(p.action != "nMoving"){
								p.action = "nMoving";
							}
							else{
								if(p.nFollowing > -1){
									for(let i = 0; i < p.navies[p.nFollowing].path.length; i++){
										drawTile(p.navies[p.nFollowing].path[i][0], p.navies[p.nFollowing].path[i][1]);
									}
								}
								p.nFollowing = map[y][x].navy.num;
								drawNavyPath();
							}
						}
					}
					if(p.action != ""){
						if(p.action == "claiming" && p.manpower > 1){
							if(e.shiftKey){
								c.addEventListener('mousemove', claim);
								c.addEventListener('mouseup', claim);
								claim(0, y, x);
							}
							else{
								claim(0, y, x);
							}
						}
						else if(p.action == "moving"){
							if(event.shiftKey && p.following != -1 && p.armies.length > p.following){
								move(y, x);
							}
							else if(map[y][x].army == -1){
								p.action = "claiming";
							}
						}
						else if(p.action == "nMoving"){
							if(event.shiftKey && p.nFollowing != -1 && p.navies.length > p.nFollowing){
								nMove(y, x);
							}
							else if(map[y][x].navy == -1){
								p.action = "claiming";
							}
						}
						else if(map[y][x].owner == p.turn){
							if(p.action == "clearing" && p.manpower >= 2){
								if(e.shiftKey){
									c.addEventListener('mousemove', clear);
									c.addEventListener('mouseup', clear);
									clear(0, y, x);
								}
								else {
									clear(0, y, x);
								}
								
							}
							else if(p.action == "building"){
								if(e.shiftKey){
									c.addEventListener('mousemove', build);
									c.addEventListener('mouseup', build);
									build(0, y, x);
								}
								else { p.action = "claiming"; }
							}
							else if(p.action == "planting"){
								if(map[y][x].zone > -1 && map[y][x].type != 'f' && map[y][x].elevation > 0 && map[y][x].building[0] == -1){
									if(p.zones[map[y][x].zone].res.wood >= .5 && p.manpower >= 4){
										p.zones[map[y][x].zone].res.wood -= .5;
										p.manpower -= 4;
										map[y][x].type = 'f';
										tileChange(y,x);
										drawTile(y,x);
									}
								}
								else { p.action = "claiming"; }
							}
						}
						else { 
							p.action = "claiming";
						}
					}
					$('#building-select').hide();
					$('#building-upgrade').hide();
					$('#building-special').hide();
					$('#nothing').hide();
					let specialIDs = ["Dock", "Manor", "Market", "Infantry Yard", "Archery Yard", "Cavalry Yard"];
					if(tS.length == 2 && tS[0] > -1){
						let t = map[tS[0]][tS[1]];
						if(t.owner == p.turn){
							if(t.zone == -1){
								$('#resource-list').hide();
								$('#goods-list').hide();
								$('#switchContainer').hide();
							}
							else{
								$("#switchContainer").css("display", "inline-block");
								if(document.getElementById("resgood").checked){
									$('#resource-list').show();
								}
								else { $('#goods-list').show(); }
							}
							if(t.building[0] == -1){
								$('#building-select').show();
							}
							else if(t.building[0] != 2){
								if(t.building[0] == 3 || specialIDs.indexOf(buildings[t.building[0]][t.building[1]].name) != -1){
									$('#dock').hide();
									$('#building-special').fadeIn();
									if(t.building[0] == 1 && t.building[1] == 3){
										$('#dock').show();
									}
									else if(t.building[0] == 3){
										if(t.building[1] > 0 && t.building[1] < 4){
											$('#army-yard').show();
										}
									}
								}
								else{
									$('#building-upgrade').fadeIn();
								}
							}
						}
						else{
							$('#nothing').show();
							$('#resource-list').hide();
							$('#goods-list').hide();
							$('#switchContainer').hide();
						}
					}
					else{
						$('#nothing').show();
						$('#resource-list').hide();
						$('#goods-list').hide();
						$('#switchContainer').hide();
					}
				}
			}
			delta = true;
		}
		//Make sure view is on grass
		var t = 0;
		var day = 0;
		var pastRates = [[],[],[],[], [], [], [], [], [], [], [], [], []];
		rates = [];
		socket.on('dayChange', function(data){
			day = data.day;
			for(let i = 0; i < rates.length; i++){
				pastRates[i].push(rates[i]);
				if(pastRates[i].length > 11){
					pastRates[i].splice(0, 1);
				}
			}
			rates = data.rates;
			if(day %10 == 0 && p.zoom > 5){
				drawDelta = true;
			}
			if(tS.length > 0){
				let bSS = map[safeC(tS[0])][safeC(tS[1])].building;
				let b0 = bSS[0]; let b1 = bSS[1];
				if(map[safeC(tS[0])][safeC(tS[1])].owner == p.turn && b0 == 0 && b1 == 8){
//					drawRightBar(0);
				}
			}
//			drawMenus();
		});
		document.addEventListener('keydown', mapV);
		c.addEventListener('mousedown', handleMapClick);
		r.addEventListener('mousedown', drawRightBar);
//		l.addEventListener('mousedown', drawLeftBar);
		setInterval(function(){
			if(start){
				t++;
				$('#tickbar').css('width', (Math.min(100, 100*(t/1000)))+"%");
			}
			if(t%1==0 && p.vassals.length > 0){
				p = manageAI(t%10==0, p.vassals, p);
				if(t%50==0){
					p = marketAI(p.vassals, p);
				}
				drawDelta = true;
			}
			if(t%250==0 && p.manors.length > 0){
				tHunt();
			}
			if(t==100){
				p = rebelCheck(p);
			}
			else if(t==300){
				p = Roads(p);
				p = scanRoads(p);
			}
			else if(t==900){
				p = armyPay(p);
				p = navyPay(p);
				delta = true;
			}
			else if(t >= 1000){
				if(p.manpower < 25){
					p.manpower+=2;
				}
				p = rIncome(p);
				delta = true;
				t = -1;
			}
			if(drawDelta && mapLoaded){
				drawMap(drawDir);
				drawDir = -1;
				drawDelta = false;
				//t+=4;
				//if(t%250==4||t==104||t==304||t==904){t-=4;}
			}
			if(delta){
				if(!p.appraising){
					drawRightBar(0);
				}
				drawLeftBar();
				delta = false;
			}
			timeout = false;
		}, 8);
