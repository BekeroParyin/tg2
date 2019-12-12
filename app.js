//= require bootstrap
//= require jquery
//= require jquery_ujs
//= require jquery-ui	

const path = require('path');
var fs = require('fs');
const express = require('express');
const app = express();
var server = require('http').Server(app);
var url = require('url');


eval(fs.readFileSync('map.js')+'');
eval(fs.readFileSync('classes.js')+'');
eval(fs.readFileSync('AI.js')+'');
app.use(express.static('public'));
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});
app.get("/public/canvas.js", function (req, res) {
	res.sendFile(__dirname + "/canvas.js");
});
app.get("/public/handler.js", function (req, res) {
	res.sendFile(__dirname + "/handler.js");
});
app.get("/public/classes.js", function (req, res) {
	res.sendFile(__dirname + "/classes.js");
});
app.get("/public/draw.js", function (req, res) {
	res.sendFile(__dirname + "/draw.js");
});
app.get("/public/AI.js", function (req, res) {
	res.sendFile(__dirname + "/AI.js");
});
app.get("/public/style.css", function (req, res) {
	res.sendFile(__dirname + "/style.css");
});
app.get("/public/handler.js", function (req, res) {
	res.sendFile(__dirname + "/handler.js");
});
app.get("/public/interface.js", function (req, res) {
	res.sendFile(__dirname + "/interface.js");
});
app.get("/public/sheet.png", function (req, res) {
	res.sendFile(__dirname + "/sheet.png");
});
app.get("/public/ericsprites.png", function (req, res) {
	res.sendFile(__dirname + "/ericsprites.png");
});
server.listen(process.env.PORT || 3000);
console.log("Ape started on port 3000.");
var io = require('socket.io')(server,{});
	//Code can safely go below:
	var socketList = [];
	var http = require('http'); //importing http
	var active = false;
	function startKeepAlive(){
		setInterval(function() {
			//ape
			if(active){
				active = false;
				console.log("KEEPING ALIVE");
				//http.get("http://terraingen2.herokuapp.com");
			}
		}, 600 * 1000); // load every 10 minutes
	}
	var players = 0;
	var hunters = [];
	var armies = [];
	var navies = [];
	var colors = ["#5B6C44", "#d2f53c", "#46f0f0", "#f58231", "#C336D8", "#79CFF4", "#800000", "#ACAE3A", "#aa6e28", "#EBDF6C", "#aaffc3", "#980632", "#e6194b", "#ffe119", "#F2A2CB", "#fabebe", "#fffac8", "#ffd8b1", "#1E90FF","#1A3F6A", "#3BA073", "#f032e6", "#7C73A5", "#34D3C1", "#911eb4", "#0B0477"];
	colors = shuffle(colors);
	const MAPSIZE = 300;
	const MODI = MAPSIZE/1500;
	var map = new Array(MAPSIZE);
	var day = 0;
	for(let i = 0; i < MAPSIZE; i++){
		map[i] = new Array(MAPSIZE);
		for(let j = 0; j < MAPSIZE; j++){
			map[i][j] = new Tile();
			map[i][j].heat = (3.15 - Math.abs(MAPSIZE/2 - i)/(MAPSIZE/6)) + Math.random() * .155;
			map[i][j].wetness = .1 - map[i][j].heat/18;
		}
	}
	genWorld();
	genArtifacts();
	io.sockets.on('connection', function(socket){
		socket.on('pConnected', function(data){
			socketList.push(socket);
			hunters.push(0);
			console.log("Connected");
			active = true;
			startKeepAlive();
			socket.emit('pNum', {
				number: socketList.length-1,
				color: colors[Math.min(socketList.length-1, colors.length-1)],
				colors: colors,
				legends: legends,
				bloodline: legends[Math.floor(Math.random() * legends.length)],
				mapsize: MAPSIZE,
			});
			for(let i = 0; i < MAPSIZE; i++){
				setTimeout(function(){
					socket.emit('mapPart', {
						index:i,
						row:map[i],
					});
				}, Math.floor(MAPSIZE/40));
			}
		});
		socket.on('tileCh', function(data){
			let til = data.tile;
			til.zone = -1;
			map[safeC(data.y)][safeC(data.x)]= til;
			active = true;
			io.emit('tileChange', {
				s: data.sender,
				tile: til,
				y: data.y,
				x: data.x,
			});
		});
		socket.on('tHunt', function(data){
			hunters[data.s] = data.n;
		});
		socket.on('dayChange', function(data){
			day = data.day;
		});
		socket.on('retT', function(data){
			treasures.push(data.t);
		});
		socket.on('armyCh', function(data){
			let a = data.army;
			active = true;
			if(!data.n){
				for(let i = 0; i < armies.length; i++){
					if(armies[i].owner == a.owner){
						if(armies[i].num == a.num){
							armies[i].path = a.path;
							armies[i].experience = a.experience; armies[i].level = a.level;
							armies[i].commander = a.commander
							armies[i].patrol = a.patrol;
							armies[i].morale[1] = a.morale[1];
							armies[i].food = a.food;
							armies[i].state = a.state;
							i = armies.length;
						}
					}
				}
			}
			else{
				console.log(a);
				armies.push(a);
				map[a.y][a.x].army = a;
			}
		});
		socket.on('navyCh', function(data){
			let n = data.navy;
			active = true;
			let found = false;
			if(!data.n){ //data.n signifies whether or not the army is new
				for(let i = 0; i < navies.length; i++){
					if(navies[i].owner == n.owner){
						if(navies[i].num == n.num){
							if(navies[i].y == n.y && navies[i].x == n.x){
								navies[i] = n;
								navies[i].path = n.path;
								map[n.y][n.x].navy = n;
								i = navies.length;
							}
							else {
								console.log("MISMATCH");
							}
						}
					}
				}
			}
			else{
				navies.push(n);
				map[n.y][n.x].navy = n;
			}
		});
		socket.on('navyPCh', function(data){
			for(let i = 0; i < navies.length; i++){
				if(navies[i].owner == data.n.owner){
					if(navies[i].num == data.n.num){
						navies[i].path = data.n.path;
						return;
					}
				}
			}
		});
	});
	function tileChange(y, x){
		io.emit('tileChange', {
			s: -1,
			tile: map[y][x],
			y: y,
			x: x,
		});
	}
	function goldChange(p, am){
		if(p > -1){
			io.emit('goldChange', {
				player: p,
				amount: am,
			});
		}
	}
	function armyChange(y, x){
		if(typeof x != 'boolean'){
			io.emit('armyChange', {
				army: map[y][x].army,
				y: y,
				x: x,
			});
		}
		else{ armies.push(y); }
	}
	function armyLChange(army){
		if(typeof army != 'undefined' && typeof army.owner != 'undefined' && army.owner > -1 && army.owner < socketList.length){
			io.emit('armyLChange', {
				army: army,
			});
		}
	}
	function navyChange(y, x){
		if(typeof map[y][x].navy == 'undefined'){ map[y][x].navy = -1; }
		io.emit('navyChange', {
			navy: map[y][x].navy,
			y: y,
			x: x,
		});
	}
	function navyLChange(navy){
		if(typeof navy != 'undefined' && typeof navy.owner != 'undefined' && navy.owner > -1 && navy.owner < socketList.length){
			io.emit('navyLChange', {
				navy: navy,
			});
		}
	}
	var bots = [];
	function sendTreasure(i, treas){
		io.emit('treasureFound', {
			finder: i,
			treasure: treas,
		});
	}
	function findTreasure(){
		for(let i = 0; i < hunters.length; i++){
			if(hunters[i] > 0){
				if(Math.random() > .96 - (hunters[i]/100)){
					console.log("sending player " + i + " a treasure");
					let tIndex = Math.floor(Math.random()*treasures.length);
					sendTreasure(i, treasures[tIndex]);
					treasures.splice(tIndex, 1);
				}
				hunters[i] = 0;
			}
			hunters[i] = 0;
		}
	}
	function dayChange(d, r){
		io.emit('dayChange', {
			day: d,
			rates: r,
		});
	}
	function calcBattle(army1, army2){ //passes in two armies
		var losses = 0;
		function cSkirmish(d, s){
			return .41 + 2/(3+(.5*s)) + s*Math.pow(d, 2)/30 - Math.pow(d, 2.6)/15;
		}
		let c = army1; let e = army2;
		let atkModifier = 1 + (.8*(c.level)/10);
		let defModifier = (1 + (.8*(e.level)/10))*(.3+.7*Math.min(1, e.morale[0]/e.morale[1]));
		let penModifier = 1;
		if(map[safeC(c.y)][safeC(c.x)].elevation > .5){
			if(c.type == 2){
				atkModifier *= .85;
			}
			else if(c.type == 1){
				penModifier *= 1.1;
			}
			if(e.type == 0){
				defModifier *= 1.1;
			}
		}
		if(e.type == 2 && c.type == 0){
			if(c.weapons[0] == 0 || (weapons[0][c.weapons[0]].hands<2&&c.weapons[1] == 4)){//spear or short spear
				atkModifier *= 1.4;
			}				
		}
		if(c.commander != -1){
			if(c.commander.trait == "Attacker"){
				atkModifier += (c.commander.level-1) * .04;
			}
			else if(c.commander.trait == "Leader" || c.commander.trait == "Strategist"){
				atkModifier += (c.commander.level-1) * .02;
				if(c.commander.trait == "Leader"){
					atkModifier += (c.commander.level-1) * .01;
				}
			}
			else if(c.commander.trait == "Tactician"){
				if(Math.random() > .5){
					atkModifier += c.commander.level*c.commander.level/100;
				}
				atkModifier += (Math.random()*8 + 2*c.commander.level)/30 - .2;
			}
		}
		if(e.commander != -1){
			if(e.commander.trait == "Defender"){
				defModifier += (e.commander.level-1)*.1;
			}
			else if(e.commander.trait == "Strategist" || e.commander.trait == "Leader"){
				defModifier += (e.commander.level-1)*.02;
				if(e.commander.trait == "Strategist"){
					defModifier += (e.commander.level-1) * .01;
				}
			}
		}
		let dist, iDmg=0, wep1Dmg, wep2Dmg=0, wep1Def, wep2Def=0, skirmish=(1+c.stats[2]), aDef=2, pen;
		dist = Math.sqrt(Math.pow(c.y - e.y, 2) + Math.pow(c.x - e.x, 2));					
		if(c.type == 1){ //Determine if unit is archer on guard tower
			if(map[c.y][c.x].owner == c.owner && map[c.y][c.x].building[0] == 2){
				if(map[c.y][c.x].building[1] == 5){
					iDmg += 1;
					skirmish += 2;
				}
			}
		}
		if(!c.trebuchet){
			wep1Dmg = weapons[c.type][c.weapons[0]].attack * cSkirmish(dist, weapons[c.type][c.weapons[0]].skirmish);
			let wep1Pen = weapons[c.type][c.weapons[0]].pierce * cSkirmish(dist, weapons[c.type][c.weapons[0]].skirmish);
			wep1Def = weapons[e.type][e.weapons[0]].defense* cSkirmish(dist, weapons[e.type][e.weapons[0]].skirmish);
			skirmish = cSkirmish(dist, skirmish);
			if(weapons[c.type][c.weapons[0]].hands < 2){
				wep2Dmg = weapons[c.type][c.weapons[1]].attack;
				wep2Dmg *= cSkirmish(dist, 1+weapons[c.type][c.weapons[1]].skirmish);
				let wep2Pen = weapons[c.type][c.weapons[1]].pierce * cSkirmish(dist, weapons[c.type][c.weapons[1]].skirmish);
				if(weapons[c.type][c.weapons[0]].hands + weapons[c.type][c.weapons[1]].hands == 2){
					iDmg += wep1Dmg;
					iDmg += wep2Dmg;
					pen = wep1Pen + wep2Pen;
				}
				else{
					iDmg += Math.max(wep1Dmg, wep2Dmg);
					pen = wep2Pen;
					if(wep1Dmg > wep2Dmg){
						pen = wep1Pen;
					}
				}
			}
			else {
				iDmg += wep1Dmg;
				pen = wep1Pen;
			}
			iDmg *= 2+.5*c.stats[0];
			iDmg *= Math.sqrt(Math.max(0, c.size)) * skirmish;
			if(weapons[e.type][e.weapons[0]].hands < 2){
				wep2Def = weapons[e.type][e.weapons[1]].defense;
				wep2Def *= cSkirmish(dist, 1+weapons[e.type][e.weapons[1]].skirmish);
				if(weapons[e.type][e.weapons[0]].hands + weapons[e.type][e.weapons[1]].hands == 2){
					aDef += 1.1*(1+wep1Def);
					aDef += 1.1*(1+wep2Def);
				}
				else{
					aDef += 1.1*(1+Math.max(wep1Def, wep2Def));
				}
			}
			else {
				aDef += 1.1*(1+wep1Def);
			}
			iDmg *= 1+(c.level/10)*atkModifier;
			pen *= .5 * Math.sqrt(Math.max(0, c.size))*Math.sqrt(Math.min(c.size, e.size)) * penModifier;
			if(c.commander.trait == "Strategist"){
				pen *= (1+(c.commander.level-1) * .035);
			}
			aDef *= (.1 + .5*(e.stats[1] + .5*e.stats[3]));
			aDef *= Math.sqrt(Math.max(0, e.size));
			aDef += 5 * e.size;
			aDef *= defModifier;
			aDef -= pen;
			aDef = Math.max(aDef, 3*e.size);
			losses = .75 * (iDmg/aDef) * Math.sqrt(Math.max(0, e.size));
			let cKilled = 1/(5*e.size);
			if(e.commander != -1){
				if(e.commander.trait == "Strategist"){
					cKilled *= 1-(.5 + e.commander.level/35);
					losses *= (1-e.commander.level/140);
				}
				else if(e.commander.trait == "Leader"){
					cKilled *= 1.05;
					losses *= (1-e.commander.level/140);
				}
			}
			if(e.size == 1){
				cKilled = 1;
			}
			e.battleReport[0] = dist; c.battleReport[0] = dist;
			c.battleReport[1] = iDmg;
			e.battleReport[2] = aDef
			c.battleReport[3] = losses;
			return [c, e, losses, (Math.random() < cKilled)];
		}
	}
	function tendNavies(){ //deals with guard towers and naval raiding
		for(let i = 0; i < navies.length; i++){
			let n = navies[i];
			let minDist = 99;
			let uCoords = [-99, -99];
			for(let a = -2; a < 3; a++){
				for(let b = -2; b < 3; b++){
					let t = map[safeC(n.y+a)][safeC(n.x+b)];
					if(t.army != -1 && t.army.owner != n.turn){
						if(t.army.type == 2){
							navies[i].health[0] -= .025;
						}
						if(Math.abs(a) + Math.abs(b) < minDist){
							minDist = Math.abs(a) + Math.abs(b);
							uCoords = [a, b];
						}
					}
				}
			}
			if(minDist == 99){
				for(let a = -2; a < 3; a++){
					for(let b = -2; b < 3; b++){
						let t = map[safeC(n.y+a)][safeC(n.x+b)];
						if(t.owner > -1 && t.owner != n.owner && t.building[0] != -1){
							let b0 = t.building[0];
							let b1 = t.building[1];
							let b2 = t.building[2];
							if(b0 < 4){
								if(t.damage < 1){
									let modif = 1;
									if(navies[i].health[0] < navies[i].health[1]){
										modif = Math.max(navies[i].health[0]/1, navies[i].health[0]/navies[i].health[1]);
									}
									let dmgRate = (.01 + navies[i].stats[0]/50.5) * modif;
									if(b0 == 2){ //defensive
										if(b1 < 4){
											dmgRate /= (1 + .8*b1);
										}
										else { dmgRate/= 3; }
										if(b1 == 4){
											dmgRate = 0;
										}
										if(b1 == 5){
											navies[i].health[0] -= .05;
											if(navies[i].health[0] <= 0){
												map[n.y][n.x].navy = -1;
											}
											navyChange(n.y, n.x);
											navyLChange(navies[i]);
										}
									}
									if(!(b0 == 0 && b1 == 0)){
										map[safeC(n.y+a)][safeC(n.x+b)].damage += dmgRate;
									}
									tileChange(safeC(n.y+a), safeC(n.x+b));
								}
								if(t.damage >= 1){
									let worth = 0;
									if(b0 != 2){
										worth += 1+b1*4+b2*4;
										if(b0 == 1){
											worth += b1*2*b2;
											if(b1 == 2 || b1 == 5){
												worth += 20;
											}
											if(b1 == 4){
												worth += 50;
											}
											if(b1 == 6){
												worth += 200;
												for(let t = 1; t < map[safeC(n.y+a)][safeC(n.x+b)].building[3].length; t++){
													if(typeof hunters[armies[i].oaner] != 'undefined'){
														sendTreasure(armies[i].oaner, map[safeC(n.y+a)][safeC(n.x+b)].building[3][t]);
													}
													else{
														treasures.push(map[safeC(n.y+a)][safeC(n.x+b)].building[3][t]);
													}
												}
											}
										}
									}
									navies[i].cargo.gold += worth;
									goldChange(t.owner,-1*worth);
									map[safeC(n.y+a)][safeC(n.x+b)].zone = -1;
									map[safeC(n.y+a)][safeC(n.x+b)].pass = 0;
									map[safeC(n.y+a)][safeC(n.x+b)].building = [-1, -1, 1, []];
									tileChange(safeC(n.y+a), safeC(n.x+b));
									navyChange(n.y, n.x);
									navyLChange(navies[i]);
								}
							}
						}
					}
				}
			}
		}
	}
	function moveArmies(t){ //moves armies
		for(let i = 0; i < armies.length; i++){
			let aY = safeC(armies[i].y);
			let aX = safeC(armies[i].x);
			if(armies[i].nextMove == 0){
				let nM = 60-(5*armies[i].stats[3])+(getTCost(aY,aX,armies[i]));
				if(armies[i].morale[0] < 1){
					nM += (1-armies[i].morale[0])*10;
				}
				if(armies[i].commander != -1){ 
					if(armies[i].commander.trait == "Organizer"){
						nM -= 3;
						nM -= armies[i].commander.level*2;
					}
				}
				nM = Math.max(nM, 3);
				armies[i].nextMove = Math.floor(t+nM);
				while(armies[i].nextMove > 200){
					armies[i].nextMove -= 200;
				}
				armyChange(aY, aX);
				armyLChange(armies[i]);
			}
			if(Math.floor(armies[i].nextMove) == t ){
				if(armies[i].path.length == 0 && armies[i].patrol.length > 0){
					for(let j = 0; j < armies[i].patrol.length; j++){
						if(aY == armies[i].patrol[j][0] && aX == armies[i].patrol[j][1]){
							armies[i].path = pathfind(aY, aX, armies[i].patrol[Math.abs(j-1)][0], armies[i].patrol[Math.abs(j-1)][1]);
						}
					}
				}
				if(armies[i].path.length > 0){
					let pY = armies[i].path[0][0];
					let pX = armies[i].path[0][1];
					if((map[pY][pX].elevation > 0 && map[pY][pX].elevation < .85 && map[pY][pX].pass > -1 && (map[pY][pX].building[0]!=2 || map[pY][pX].owner == armies[i].owner) || map[pY][pX].building[0] == 4)){
						if(map[pY][pX].army == -1){
							armies[i].path.shift();
							map[aY][aX].army = -1;
							armyChange(aY, aX);
							armies[i].y = pY;
							armies[i].x = pX;
							let nM = 60-(5*armies[i].stats[3])+(getTCost(aY,aX,armies[i]));
							if(armies[i].commander != -1){ 
								if(armies[i].commander.trait == "Organizer"){
									nM -= 3;
									nM -= armies[i].commander.level*2;
								}
							}
							nM = Math.max(nM, 2);
							armies[i].nextMove = Math.floor(t+nM);
							while(armies[i].nextMove > 200){
								armies[i].nextMove -= 200;
							}
							map[pY][pX].army = armies[i];
							armyChange(pY, pX);
							armyLChange(armies[i]);
						}
						else if(pY == aY && pX == aX){
							armies[i].path.shift();
						}
					}
					else {
						armies[i].path.shift();
						armyChange(aY, aX);
						armyLChange(armies[i]);
					}
				}
			}
		}
		for(let i = 0; i < navies.length; i++){ //move navies
			let aY = safeC(navies[i].y);
			let aX = safeC(navies[i].x);
			if(navies[i].path.length > 0){
				if(navies[i].nextMove == 0){
					let nM = 30-(.5*navies[i].stats[5]);
					nM = Math.max(nM, 3);
					navies[i].nextMove = Math.floor(t+nM);
					while(navies[i].nextMove > 200){
						navies[i].nextMove -= 200;
					}
					navyChange(aY, aX);
					navyLChange(navies[i]);
				}
				if(Math.floor(navies[i].nextMove) == t ){
					let pY = navies[i].path[0][0];
					let pX = navies[i].path[0][1];
					if(map[pY][pX].elevation <= 0){
						if(map[pY][pX].navy == -1){
							let nM = 30-(.5*navies[i].stats[5]);
							nM = Math.max(nM, 3);
							navies[i].path.shift();
							map[aY][aX].navy = -1;
							if(aY == safeC(pY+1) && aX == pX){ navies[i].lastDir = 2; }
							if(aY == pY && aX == safeC(pX-1)){ navies[i].lastDir = 3; }
							if(aY == safeC(pY-1) && aX == pX){ navies[i].lastDir = 0; }
							if(aY == pY && aX == safeC(pX+1)){ navies[i].lastDir = 1; }
							navies[i].y = pY;
							navies[i].x = pX;
							navies[i].nextMove = Math.floor(t+nM);
							while(navies[i].nextMove > 200){
								navies[i].nextMove -= 200;
							}
							if(navies[i].path.length == 0){
								navies[i].nextMove = 0;
							}
							map[pY][pX].navy = navies[i];
							navyChange(aY, aX);
							navyLChange(navies[i]);
							navyChange(pY, pX);
						}
						else if(pY == aY && pX == aX){
							navies[i].path.shift();
						}
					}
					else {
						navies[i].path.shift();
						navies[i].nextMove = 0;
						navyChange(aY, aX);
						navyLChange(navies[i]);
					}
				}
			}
		}
	}
	function attrition(){ //deals with guard towers && desert attrition
		for(let i = 0; i < armies.length; i++){
			let aY = safeC(armies[i].y);
			let aX = safeC(armies[i].x);
			for(let a = -2; a < 3; a++){
				for(let b = -2; b < 3; b++){
					if(a == 0 && b == 0 && map[safeC(aY+a)][safeC(aX+b)].type == 'd'){
						armies[i].size -= 2; 
						armies[i].morale[0] -= .025;
					}
					if(map[safeC(aY+a)][safeC(aX+b)].building[0] == 2 && map[safeC(aY+a)][safeC(aX+b)].building[1] == 5){
						armies[i].size -= 2; 
						armies[i].morale[0] -= .025;
						a = 3;
						b = 3;
					}
				}
			}
			if(armies[i].morale[0] < 0){ armies[i].morale[0] = 0; }
			map[aY][aX].army = armies[i];
			if(map[aY][aX].army.size <= 0){
				map[aY][aX].army = -1;
			}
			armyChange(aY, aX);
			armyLChange(armies[i]);
		}
	}
	function nBattles(){
		if(navies.length > 0){
			let damage = [];
			let didFight = false;
			for(let i = navies.length-1; i > -1; i--){
				damage[i] = damage[i] || 0;
				let nY = navies[i].y;
				let nX = navies[i].x;
				let n = navies[i];
				let minDist = 99;
				let minCoords = [-99, -99];
				for(let a = -2; a < 3; a++){
					for(let b = -2; b < 3; b++){
						if(!(a==0&&b==0) && Math.abs(a) + Math.abs(b) < minDist){
							if(map[safeC(nY+a)][safeC(nX+b)].navy != -1 && map[safeC(nY+a)][safeC(nX+b)].navy.owner != n.owner){
								minDist = Math.abs(a) + Math.abs(b);
								minCoords = [a, b];
							}
						}
					}
				}
				if(minDist < 99){
					didFight = true;
					navies[i].fighting = true;
					let index = -1;
					for(let j = navies.length-1;j >= 0; j--){
						if(navies[j].y == safeC(nY + minCoords[0]) && navies[j].x == safeC(nX + minCoords[1])){
							index = j; j = -1;
						}
					}
					if(index > -1){
						damage[index] = damage[index] || 0;
						if(damage[index] < navies[index].health){
							let modif = 1;
							if(navies[i].health[0] < 1){
								modif = Math.max(navies[i].health[0]/1, navies[i].health[0]/navies[i].health[1]);
							}
							damage[index] += (.05 + navies[i].stats[0]/52) * modif;
							if(damage[index] >= navies[index].health){
								navies[i].cargo.gold += navies[index].cargo.gold/1.5;
								navies[index].cargo.gold = 0;
							}
						}
					}
				}
				else {
					navies[i].fighting = false;
				}
			}
			if(didFight){
				for(let i = navies.length-1; i >= 0; i--){
					if(damage[i] > 0){
						let aY = safeC(navies[i].y);
						let aX = safeC(navies[i].x);
						navies[i].health[0] -= damage[i];
						map[aY][aX].navy = navies[i];
						navyLChange(navies[i]);
						if(navies[i].health[0] <= 0.01){
							map[aY][aX].navy = -1;
							navies.splice(i, 1);
							console.log("DELETED");
						}
						navyChange(aY, aX);
					}
				}
			}
		}
	}
	function calcBattles(){ //Handles battles, raiding, and rebel pathing
		let losses = [];
		let didFight = false;
		for(let i = 0; i < armies.length; i++){
			let dF = false;
			let didRaid = false;
			losses[i] = losses[i] || 0;
			let aY = safeC(armies[i].y);
			let aX = safeC(armies[i].x);
			let minDist = 99;
			minSpot = [];
			for(let a = -2; a < 3; a++){
				for(let b = -2; b < 3; b++){
					if(map[safeC(aY+a)][safeC(aX+b)].army != -1 && map[safeC(aY+a)][safeC(aX+b)].army.owner != armies[i].owner){
						if(minDist > Math.abs(a) + Math.abs(b)){
							minDist = Math.abs(a) + Math.abs(b);
							minSpot = [a, b];
							didFight = true; dF = true;
						}
					}
				}
			}
			if(minDist < 99){
				armies[i].state[2] = true;
				let enem = -1;
				for(let j = 0; j < armies.length; j++){
					if(armies[j].y == safeC(aY + minSpot[0]) && armies[j].x == safeC(aX+minSpot[1])){
						enem = j;
						j = armies.length;
					}
				}
				if(enem > -1){
					losses[enem] = losses[enem] || 0;
					let report = calcBattle(armies[i], armies[enem]);
					if(report[3]){
						armies[enem].commander = -1;
					}
					losses[enem] += report[2];
					armies[enem].battleReport[0] = report[1].battleReport[0];
					armies[i].battleReport[0] = report[0].battleReport[0];
					armies[i].battleReport[1] = report[0].battleReport[1];
					armies[enem].battleReport[2] = report[1].battleReport[2];
					armies[i].experience+=2*report[2];
					armies[i].commander.experience+=2*report[2];
					if(armies[enem].commander != -1){
						armies[enem].morale[0] += .005;
						if(armies[enem].commander.trait == "Leader"){
							report[2] *= 1-(armies[enem].commander.level-1)/8;
						}
					}
					if(armies[i].commander != -1 && armies[i].commander.trait == "Attacker" || armies[i].commander.trait == "Leader"){
						report[2] *= 1+(armies[enem].commander.level)/37.5;
						if(armies[i].commander.trait == "Attacker"){
							report[2] *= 1+(armies[enem].commander.level)/16;
						}
					}
					armies[enem].morale[0] -= Math.max(0, (.02 + report[2]/armies[enem].maxSize - armies[enem].stats[2]/500));
					if(armies[i].type == 2){
						armies[enem].morale[0] -= .02;
					}
					armies[enem].morale[0] = Math.max(0, armies[enem].morale[0]);
					armies[i].battleReport[3] += report[2];
					map[aY][aX].army = armies[i];
					map[safeC(aY + minSpot[0])][safeC(aX+minSpot[1])].army = armies[enem];
				}
				else{
					console.log("ERR, unable to find unit at " +safeC(aY + minSpot[0]) + ", " +  safeC(aX+minSpot[1]));
				}
			}
			else{
				armies[i].state[2] = false;
				if(armies[i].morale[0] < armies[i].morale[1]){
					armies[i].morale[0] += .05;
					armies[i].morale[0] = Math.min(armies[i].morale[0], armies[i].morale[1]);
				}
				if(armies[i].trebuchet){
					let minDist = 10;
					let minDex = [0, 0];
					let dmgRate = .8;
					for(let w = -3; w < 4; w++){
						for(let z = -3; z < 4; z++){
							if(map[safeC(aY+w)][safeC(aX+z)].owner != armies[i].owner && map[safeC(aY+w)][safeC(aX+z)].building[0] > -1){
								dmgRate = .8;
								if(map[safeC(aY+w)][safeC(aX+z)].building[0] == 2 && map[safeC(aY+w)][safeC(aX+z)].building[1] < 5){
									dmgRate /= (1 + .8*map[safeC(aY+w)][safeC(aX+z)].building[1]);
								}
								if(Math.sqrt(w*w + z*z) < minDist){
									minDist = Math.sqrt(w*w + z*z);
									minDex = [w, z];
								}
							}
						}
					}
					if(minDist < 9){
						let w = minDex[0];
						let z = minDex[1];
						if(b0 == 2 && b1 == 4){
							dmgRate = 0;
						}
						map[safeC(aY+w)][safeC(aX+z)].damage += dmgRate;
						if(map[safeC(aY+w)][safeC(aX+z)].damage >= 1){
							map[safeC(aY+w)][safeC(aX+z)].zone = -1;
							map[safeC(aY+w)][safeC(aX+z)].pass = 0;
							map[safeC(aY+w)][safeC(aX+z)].building = [-1, -1, 1, []]
							map[safeC(aY+w)][safeC(aX+z)].owner = -1;
							map[safeC(aY+w)][safeC(aX+z)].manager = -1;
						}
						tileChange(safeC(aY+w), safeC(aX+z));
					}
				}
				else{
					for(let w = -1; w < 2; w++){
						for(let z = -1; z < 2; z++){
							if(map[safeC(aY+w)][safeC(aX+z)].building[0] != 0 || map[safeC(aY+w)][safeC(aX+z)].building[1] != 0){
								if(map[safeC(aY+w)][safeC(aX+z)].owner > -1 && map[safeC(aY+w)][safeC(aX+z)].owner != armies[i].owner){
									let didRaid = true;
									if(map[safeC(aY+w)][safeC(aX+z)].building[0] == -1){
										map[safeC(aY+w)][safeC(aX+z)].owner = -1;
										map[safeC(aY+w)][safeC(aX+z)].manager = -1;
										tileChange(safeC(aY+w), safeC(aX+z));
									}
									else if(map[safeC(aY+w)][safeC(aX+z)].building[0] < 4){
										if(map[safeC(aY+w)][safeC(aX+z)].damage < 1){
											let dmgRate = .01 + Math.sqrt(Math.max(0, armies[i].size)*(1 + armies[i].stats[0]))/35;
											if(map[safeC(aY+w)][safeC(aX+z)].building[0] == 2){
												if(map[safeC(aY+w)][safeC(aX+z)].building[1] < 4){
													dmgRate /= (1 + .8*map[safeC(aY+w)][safeC(aX+z)].building[1]);
												}
												else { dmgRate/= 3; }
											}
											map[safeC(aY+w)][safeC(aX+z)].damage += dmgRate;
											tileChange(safeC(aY+w), safeC(aX+z));
										}
										if(map[safeC(aY+w)][safeC(aX+z)].damage >= 1){
											let worth = 0;
											if(map[safeC(aY+w)][safeC(aX+z)].building[0] != 2){
												worth += 2+map[safeC(aY+w)][safeC(aX+z)].building[1]*2;
												if(map[safeC(aY+w)][safeC(aX+z)].building[0] == 1){
													if(map[safeC(aY+w)][safeC(aX+z)].building[1] == 2){
														worth += 20;
													}
													if(map[safeC(aY+w)][safeC(aX+z)].building[1] == 4){
														worth += 50;
													}
													if(map[safeC(aY+w)][safeC(aX+z)].building[1] == 6){
														worth += 300;
														for(let t = 1; t < map[safeC(aY+w)][safeC(aX+z)].building[3].length; t++){
															if(typeof hunters[armies[i].owner] != 'undefined'){
																sendTreasure(armies[i].owner, map[safeC(aY+w)][safeC(aX+z)].building[3][t]);
															}
															else{
																treasures.push(map[safeC(aY+w)][safeC(aX+z)].building[3][t]);
															}
														}
													}
												}
											}
											goldChange(armies[i].owner,worth);
											goldChange(map[safeC(aY+w)][safeC(aX+z)].owner,-1*worth);
											map[safeC(aY+w)][safeC(aX+z)].zone = -1;
											map[safeC(aY+w)][safeC(aX+z)].pass = 0;
											map[safeC(aY+w)][safeC(aX+z)].building = [-1, -1, 1, []]
											map[safeC(aY+w)][safeC(aX+z)].owner = -1;
											map[safeC(aY+w)][safeC(aX+z)].manager = -1;
											tileChange(safeC(aY+w), safeC(aX+z));
										}
									}
								}
							}
						}
					}
				}
			}
			if(!dF && !didRaid && armies[i].owner == -1){
				armies[i].idle++;
				let minDist = 9;
				for(let a = -4; a < 5; a++){
					for(let b = -4; b < 5; b++){
						if(map[safeC(aY+a)][safeC(aX+b)].building[0] != 0 || map[safeC(aY+a)][safeC(aX+b)].building[1] != 0){
							if(map[safeC(aY+a)][safeC(aX+b)].owner > -1 && Math.sqrt(a*a + b*b) < minDist){
								if(map[safeC(aY+a)][safeC(aX+b)].building[0] > -1 && map[safeC(aY+a)][safeC(aX+b)].building[0] < 4){
									armies[i].idle = 0;
									minDist = Math.sqrt(a*a + b*b);
									armies[i].path = pathfind(aY, aX, safeC(aY+a), safeC(aX+b), false, -1, armies[i]);
								}
							}
						}
					}
				}
				if(armies[i].idle >= 20){
					armies[i].state[1] = "disbanding";
				}
			}
		}
		if(didFight){
			for(let i = 0; i < armies.length; i++){
				let aY = safeC(armies[i].y);
				let aX = safeC(armies[i].x);
				losses[i] = losses[i] || 0;
				armies[i].size -= Math.max(0,losses[i]);
				armies[i].commander.experience+=5;
				armies[i].commander.experience+=2*losses[i];
				armies[i].experience += 1.5*losses[i];
				map[aY][aX].army = armies[i];
				if(armies[i].size < 1){
					armies.splice(i, 1);
					map[aY][aX].army = -1;
				}
				armyChange(aY, aX);
				armyLChange(armies[i]);
			}
		}
	}
	function tendArmies(){ //Deals with deserting and lack of food
		for(let i = 0; i < armies.length; i++){
			let aY = safeC(armies[i].y);
			let aX = safeC(armies[i].x);
			armies[i].food += Math.min(armies[i].size, armies[i].stats[4]*10*armies[i].size/armies[i].maxSize);
			if(armies[i].commander != 1){
				if(armies[i].commander.trait == "Organizer"){
					if(armies[i].commander.level > 1){
						armies[i].food += Math.floor(20/7 * armies[i].commander.level);
					}
				}
			}
			armies[i].food -= armies[i].size;
			if(armies[i].food < 0){
				armies[i].size = Math.floor(armies[i].size + ( .25 * armies[i].food));
				armies[i].food = 0;
			}
			if(armies[i].state[1] == "deserting" && !armies[i].state[2]){
				armies[i].size-=(4);
				armies[i].morale[0] *= .8;
			}
			else if(armies[i].state[1] == "replenishing" && !armies[i].state[2]){
				if(armies[i].size < armies[i].maxSize){
					armies[i].size = Math.min(armies[i].size+3, armies[i].maxSize);
				}
			}
			else if(armies[i].state[1] == "disbanding"){
				armies[i].size = 0;
			}
			map[aY][aX].army = armies[i];
			if(!(armies[i].size > 0) || armies[i].size < 1){//worded this way to deal with undefined sizes
				map[aY][aX].army = -1;
				armies.splice(i, 1);
				stop = true;
			}
			armyLChange(armies[i]);
			armyChange(aY, aX);
		}
	}
	var t = 0; //perfumes, lwoods, spices, 3pearls, silk, 5hides, iron, 7bronze, copper, manpower, wood, 11stone, food
	var rates = [130, 115, 95, 170, 100, 40, 175, 125, 55, 40, 40, 70, 16];
	var dRates = [.1, .355, .1, .1, .1, 0, 0, 0, 0, 0, 0, 0, 0];
	setInterval(function(){
		t++;
		moveArmies(t);
		if(t==0){
			if(bots.length > 0)
				bots = marketAI(bots);
		}
		if(t==1){
			nBattles();
		}
		if(t == 50){
			attrition();
		}
		if(t==100){
			tendArmies();
		}
		if(t==150){
			tendNavies();
		}
		if(t==200){
			calcBattles();
		}
		if(t%20==0){
			if(bots.length > 0)
				bots = manageAI(t==200, bots);
			for(let i = 0; i < dRates.length; i++){
				dRates[i] += (Math.random() - .5) + dRates[i]/40;
				dRates[i] = Math.min(1, dRates[i]); dRates[i] = Math.max(-1, dRates[i]);
				if(day > 300 && i == 12){
					dRates[i] += .025;
				}
				else if(i==12){ dRates[i] = Math.min(dRates[i], .3); }
				rates[i] = Math.max(rates[i], 17);
				rates[i] += dRates[i];
				if(i == 5){ rates[i] = Math.min(rates[i], 45); if(t==10 &&(rates[i] == 45 || rates[i] == 17)){ dRates[i] *= .75; }} //hides
				else if(i < 2){
					rates[i] = Math.max(rates[i], 80);
					rates[i] = Math.min(rates[i], 165);
					if(rates[i] == 80 || rates[i] == 165 && t==10){
						dRates[i] *= .75;
					}
				}
				else if(i>= 2 && i < 5){
					if(i == 3){
						rates[i] = Math.max(rates[i], 105);
						rates[i] = Math.min(rates[i], 165);
					}
					else{
						rates[i] = Math.max(rates[i], 70);
						rates[i] = Math.min(rates[i], 115);
					}
				}
				else if(i >= 6 && i < 9){ //metals
					rates[i] = Math.max(rates[i], 155-(i-6)*40);
					rates[i] = Math.min(rates[i], 175-(i-6)*35);
				}
				else{
					switch(i){
						case 9: rates[i] = Math.max(rates[i],31); rates[i] = Math.min(rates[i],40); break; //manpower
						case 10: rates[i] = Math.max(rates[i],30); rates[i] = Math.min(rates[i],49); break; //wood
						case 11: rates[i] = Math.max(rates[i],51); rates[i] = Math.min(rates[i],75); break; //stone
						case 12: rates[i] = Math.max(rates[i],16); rates[i] = Math.min(rates[i],17.5); break; //food
					}
				}
			}
			dayChange(day, rates);
		}
		if(t>=200){
			if(treasures.length > 0){
				findTreasure();
			}
			day+=2;
			if(day >= 400){
				day = 0;
			}
			dayChange(day, rates);
			t = -1;
		}
	}, 40);
	










