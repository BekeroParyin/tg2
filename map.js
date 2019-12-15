
		function genWorld()
		{
			console.log("Modifier: " + MODI);
			console.log("Map Size: " + MAPSIZE);
			console.log(map.length);
			genOceans(MAPSIZE*MAPSIZE, 2);
			genOceans(30000 * MODI, 4);
			console.log("genOceans");
			slap(5000, 'g', 'w', -1, 0, 1400);
			slap(400, 'g', 'w', -1, -1);
			console.log("Oceans Generated");
			mountain(20, Math.round(20*MODI));
			mountain(40* MODI, Math.round(20*MODI));
			mountain(320 * MODI, Math.round(20*MODI));
			mountain(400*MODI, Math.round(35*MODI));
			console.log("mountains");
			hill(200, Math.round(20*MODI));
			hill(100, Math.round(150* MODI));
			hill(60, Math.round(150* MODI));
			hill(35, Math.round(150* MODI));
			hill(20, Math.round(150* MODI));
			console.log("hills");
			elevSpread();
			console.log("elevSpread");
			currents(true);
			console.log("currents 1");
			lakes();
			console.log("lakes");
			rivers();
			console.log("rivers");
			currents(false);
			console.log("currents 2");
			elevSpread();
			if(MODI > .5){
				forest(9000*MODI, 30*MODI);
				forest(7000*MODI, 30*MODI);
				forest(4000*MODI, 30*MODI);
				forest(3000*MODI, 30*MODI);
				forest(900*MODI, Math.round(150* MODI));
				forest(500*MODI, Math.round(1000* MODI));
				forest(200*MODI, Math.round(500* MODI));
				forest(35, Math.round(5000* MODI));
				forest(20, Math.round(4000* MODI));
			}
			else{
				forest(1500*MODI, Math.floor(5*MODI));
				forest(850 * MODI, Math.round(10* MODI));
				forest(900*MODI, Math.round(150* MODI));
				forest(500*MODI, Math.round(1000* MODI));
				forest(200*MODI, Math.round(500* MODI));
				forest(35, Math.round(5000* MODI));
				forest(20, Math.round(4000* MODI));
			}
			cleanForests();
			console.log("Forests Generated");
			for(let i=0; i < MAPSIZE; i++){
				for(let j = 0; j < MAPSIZE; j++){
					if(map[i][j].elevation > 0){
						if(map[i][j].elevation > .5){
							//0-6:stone, 7: copper, 8: bronze
							var seed = map[i][j].resource;
							if(seed == -1 || map[i][j].type == 'f'){
								seed = Math.floor(Math.random()*9);
								let t = Math.random();
								if(t > .99){
									seed = 9;
								}
								else if(t > .985){
									seed = 10;
								}
							}
							if(map[i][j].elevation > .875){
								map[i][j].type = 'm';
								map[i][j].resource = seed;
							}
							else if(map[i][j].elevation >= .69){
								map[i][j].type = 'l';
								map[i][j].resource = seed;
							}
							else if(map[i][j].elevation >= .565){
								map[i][j].type = 'h';
								map[i][j].resource = seed;
							}
							else if(map[i][j].elevation > .5){
								map[i][j].type = 'k'
								map[i][j].resource = seed;
							}
						}
						else if(map[i][j].elevation < .05){
							map[i][j].type = 'c';
							if(map[i][j].wetness == 0){
								map[i][j].wetness += Math.random()/10;
							}
						}
						if(map[i][j].type == 'g' && map[i][j].elevation > .15){
							map[i][j].type = 'i';
						}
						var chance = .05;
						var dNum = 0;
						if(map[i][j].type == 'd' || map[i][j].type == 'm'){ chance = 0; }
						for(a = -1; a < 2; a++){
							for(b = -1; b < 2; b++){
								if(map[safeC(i+a)][safeC(j+b)].type == 'd'){
									dNum++;
								}
								if(map[i][j].type == 'g' || map[i][j].type == 'k' || map[i][j].type == 'i' || (map[i][j].type == 'h' && map[i][j].wetness > .1)){
									if(map[safeC(i+a)][safeC(j+b)].type == 'r' || map[safeC(i+a)][safeC(j+b)].type == 'a'){
										chance += .1;
									}
								}
							}
						}
						chance += map[i][j].wetness/4 - .15;
						if(chance > Math.random() && map[i][j].elevation < .7 && map[i][j].elevation > 0)
						{
							map[i][j].type = 'f';
						}
						if(dNum >= 4 && (map[i][j].type == 's' || map[i][j].type == 'f')){
							map[i][j].heat += .2;
							map[i][j].type = 'd';
						}
					}
					else{ 
						map[i][j].elevation = -.5;
						if(map[i][j].type == 'a' || map[i][j].type == 'r'){
							if(Math.random()>.99){
								map[i][j].resource = 14;
							}
						}
					}
					if(map[i][j].type == 'f' && map[i][j].elevation <= 0){ map[i][j].type = 'w'; map[i][j].resource = 14; }
				}
			}
			slap(30, 'd', 'i', 2, 3);
			console.log("Everything Else Completed");
		}
		function forest(treeCount, forestsNumber){
			var arbs = treeCount;
			var forestsC = forestsNumber;
			var ranX = Math.floor(Math.random() * MAPSIZE);
			var ranY = Math.floor(Math.random() * MAPSIZE);
			var dir = Math.floor(Math.random() * 4);
			var seed = Math.floor(Math.random()*14);
			while(arbs > 0 && forestsC > 0){		
				dir = Math.floor(Math.random() * 4);
					if(dir == 0){
						ranY--;
						ranX--;
					}
					else if(dir == 1){
						ranX--;
						ranY++;
					}
					else if(dir == 2){
						ranY++;
						ranX++;
					}
					else if(dir == 3){
						ranX++;
						ranY--;
					}
					ranY = safeC(ranY);
					ranX = safeC(ranX);
				while(forestsC > 0 && (map[ranY][ranX].elevation < .05 || map[ranY][ranX].elevation > .6 || map[ranY][ranX].wetness < .1  ||  arbs == 1)){
					ranX = Math.floor(Math.random() * MAPSIZE);
					ranY = Math.floor(Math.random() * MAPSIZE);
					seed = Math.floor(Math.random()*13);
					let = tom = Math.random();
					if(tom > .93){
						seed = 13;
						if(tom > .96){
							seed = 15;
							if(map[ranY][ranX].heat > 2.5){
								seed = 16;
							}
						}
					}
					arbs = treeCount;
					forestsC--;
				}
				var chance = Math.round(Math.random() * 10);
				if(chance < 8){
					map[ranY][ranX].type = 'f';
					if(seed >= 11){
						map[ranY][ranX].resource = seed;
					}
					else if(Math.random() > .5){
						map[ranY][ranX].resource = 11;
					}
				}
				arbs--;
			}
		}
		function cleanForests(){
			var arbC = 0;
			var considerations = [];
			var seed = -1;
			for(h = 0; h < 2; h++){
				var i = h*(MAPSIZE-1);
				while(i < MAPSIZE && i >= 0){
					var j = h*(MAPSIZE-1);
					while(j < MAPSIZE && j >= 0){
						if(map[i][j].type != 'd' && map[i][j].elevation > 0){
							arbC = 0;
							for(let a = -1; a < 2; a++){
								for(let b = -1; b < 2 ; b++){
									if(map[safeC(a+i)][safeC(b+j)].type == 'f')
									{
										if(seed == -1){
											seed = map[safeC(a+i)][safeC(b+j)].resource;
										}
										arbC++;
									}
								}
							}
							if(arbC > 2){
								considerations.push([i, j, seed]);
							}
							seed = -1;
						}
						if(h == 0){ j++; } else { j--; }
					}
					if(h == 0){ i++; } else { i--; }
				}
				for(let i = 0; i < considerations.length; i++){
					map[considerations[i][0]][considerations[i][1]].type = 'f'; 
					map[considerations[i][0]][considerations[i][1]].resource = considerations[i][2];
				}
			}
		}
		function mountain(rSize, rNum){
			var yC = Math.floor(Math.random() * MAPSIZE);
			var xC = Math.floor(Math.random() * MAPSIZE);
			var rS = 0;
			var rN = 0;
			var dir = 0;
			var lastDir = -1;
			var bannedDir = Math.floor(Math.random() * 4);
			var seed = Math.random();
			while(rN < rNum)
			{
				if(rS >= rSize || rN == 0)
				{
					seed = Math.random();
					if(seed < .5){
					seed = 1;
					}
					else if(seed < .7){
						seed = 7;
					}
					else if(seed < .9){
						seed = 8;
					}
					else if(seed < .93){
						seed = 9;
					}
					else {
						seed = 10;
					}
					rS = 0;
					rN++;
					yC = Math.floor(Math.random() * MAPSIZE);
					xC = Math.floor(Math.random() * MAPSIZE);
					bannedDir = Math.floor(Math.random() * 4);
				}
					do{
						dir = Math.floor(Math.random()*4);
					}while(dir == lastDir || dir == bannedDir);
					switch(dir){
						case 0: yC--; xC--; break;
						case 1: yC--; xC++; break;
						case 2: yC++; xC++; break;
						case 3: yC++; xC--; break;
					}
					yC = safeC(yC);
					xC = safeC(xC);
					if(map[yC][xC].type != 'w' && !(map[yC][xC].type == 'm' && map[yC][xC].resource > -1 && map[yC][xC].resource != seed)){
						map[yC][xC].resource = seed;
						for(let a = -1; a < 2; a++){
							for(let b = -1; b < 2; b++){
								if(map[safeC(yC+a)][safeC(xC+b)].resource == -1 && map[safeC(yC+a)][safeC(xC+b)].elevation > 0 && Math.random() > .8){
									map[safeC(yC+a)][safeC(xC+b)].resource = seed;
								}
							}
						}
						if(Math.random() > .7 || rS == 0){
							map[yC][xC].elevation = 1;
							map[yC][xC].type = 'm';
						}
						else {
							var max = 0;
							for(a = -1; a < 2; a++){
								for(b = -1; b < 2; b++){
									if(map[safeC(yC+a)][safeC(xC+b)].elevation > max){
										max = map[safeC(yC+a)][safeC(xC+b)].elevation;
									}
								}
							}
							if(max > 1){ max = 1; }
							map[yC][xC].elevation = max + .05 - Math.random()*.1;
							map[yC][xC].type = 'm';
						}
						if(dir < 4){
							lastDir = dir + 2;
						}
						else{
							lastDir = dir - 2;
						}
					}
					else { rS = rSize-1; }
				rS++;
			}
		}
		function hill(rSize, rNum){
			var yC = Math.floor(Math.random() * MAPSIZE);
			var xC = Math.floor(Math.random() * MAPSIZE);
			var rS = 0;
			var rN = 0;
			var dir = 0;
			var lastDir = -1;
			var seed = Math.random();
			while(rN < rNum)
			{
				if(rS == rSize || rN == 0){
					seed = Math.random();
					if(seed <= .66){ //66
						seed = 1;
					}
					else if(seed <= .81){ //15
						seed = 7;
					}
					else if(seed <= .96){ //15
						seed = 8;
					}
					else if(seed <= .98){ //2
						seed = 9;
					}
					else { //2
						seed = 10;
					}
					rS = 0;
					rN++;
					yC = Math.floor(Math.random() * MAPSIZE);
					xC = Math.floor(Math.random() * MAPSIZE);
				}
				do{
					dir = Math.floor(Math.random()*8);
				}while(dir == lastDir);
				switch(dir){
					case 0: yC--; xC--; break;
					case 1: yC--; break;
					case 2: yC--; xC++; break;
					case 3: xC++; break;
					case 4: yC++; xC++; break;
					case 5: yC++; break;
					case 6: yC++; xC--; break;
					case 7: xC--; break;
				}
				yC = safeC(yC);
				xC = safeC(xC);
				if(map[yC][xC].type != 'w'){
					map[yC][xC].resource = seed;
					if(Math.random() > .75){
						map[yC][xC].elevation = .62;
						map[yC][xC].type = 'h';
						
					}
					else {
						map[yC][xC].elevation = .4 + (Math.random() * .2);
					}
					if(dir < 4){
						lastDir = dir + 4;
					}
					else{
						lastDir = dir - 4;
					}
				}
				else { rS = rSize-1; }
				rS++;
			}
		}
		function elevSpread(){
			for(let m = 0; m < 4; m++){
				for(let h = 0; h < 2; h++){
					var i = h*(MAPSIZE-1);
					while(i < MAPSIZE && i >= 0){
						var j = h*(MAPSIZE-1);
						while(j < MAPSIZE && j >= 0){
							var add = 0;
							var max = 0;
							if(map[i][j].elevation > 0){
								for(let a = -1; a < 2; a++){
									for(let b = -1; b < 2; b++){
										if(map[safeC(i+a)][safeC(j+b)].elevation > max){ max = map[safeC(i+a)][safeC(j+b)].elevation; }
										add += map[safeC(i+a)][safeC(j+b)].elevation/8;
									}
									if(add <= .0){ map[i][j].elevation/=2; }
									else if(map[i][j].elevation < max || map[i][j].elevation < .6){
										if(max > .9){
											map[i][j].elevation = max * (.66 + .3*Math.random());
										}
										else if(max > .8){
											map[i][j].elevation = max * (.8 + Math.random()/20);
										}
										else if(max > .7){
											map[i][j].elevation = max * (.85 + Math.random()/10);
										}
										else if(max > .6){
											map[i][j].elevation = max * (.9 + Math.random()/20);
										}
										else if(max > .5){
											map[i][j].elevation = max * (.9 + Math.random()/20);
										}
										else if(max > .4){
											map[i][j].elevation = max * (.7 + Math.random()/40);
										}
										else if(max > .35){
											map[i][j].elevation = max * (.7 + Math.random()/2);
										}
										else if(max > .3){
											map[i][j].elevation = max * (.8 + Math.random()/5);
										}
										else if(max > .25){
											map[i][j].elevation = max * (.51 + Math.round(Math.random()*20)/36);
										}
										else if(max > .2){
											map[i][j].elevation = max * (.51 + Math.round(Math.random()*20)/36);
										}
										else if(max >= .1){
											map[i][j].elevation = max * (.51 + Math.round(Math.random()*20)/36);
										}
										else {
											map[i][j].elevation = max;
										}
									}
								}
							}
							if(h==0){j++;} else {j--;}
						}
						if(h==0){i++;} else {i--;}
					}
				}
			}
		}
		function currents(fir){
			function makeCurrent(yC, xC){
				var lastDir = -1;
				var lastlast = -1;
				var bannedDir = -1
				var dir = -1;
				var water = 20 * MODI;
				var y = safeC(yC);
				var x = safeC(xC);
				var cS = 0;
				var limit = 15;
				while(cS < limit && water > 0){
					y = safeC(y);
					x = safeC(x);
					if(map[y][x].type == 'w'){
						if(fir){
							water+=5*MODI;
							cS++;
						}
						else {
							bannedDir = lastDir;
							cS+=2;
						}
					}
					else if(!fir && (map[y][x].type == 'r' || map[y][x].type == 'a')){
						water+=10*MODI;
						cS++;
					}
					else{
						for(let a = 0; a < 13; a+=2){
							let y1 = safeC(y-6+a);
							if(map[y1][x].elevation > 0){
								map[y1][x].wetness += map[y][x].elevation/150;
								map[y1][x].heat -= .008;
								map[y1][x].wetness += .0014;
								if(map[y1][x].wetness < .1){
									map[y1][x].wetness += .08;
								}
								map[y1][x].wetness -= map[y1][x].heat/150;
								if(map[y1][x].heat > 1){
									map[y1][x].wetness += .01;
									water -= map[y1][x].heat/130;
									map[y1][x].heat += .006;
									if(map[y1][x].heat > 2){
										map[y1][x].wetness += map[y1][x].heat/300;
										map[y1][x].wetness += map[y][x].elevation/50;
									}
								}
							}
						}
						water += map[y][x].wetness/5;
						water -= .1;
						if(map[y][x].elevation >= .5){
							water -= map[y][x].elevation;
						}
						map[y][x].curred += .1;
					}
					do{
						dir = Math.floor(Math.random()*4);
					}while(dir == lastDir || dir == bannedDir);
					if(dir == 0){ y--; lastDir = 2;}
					else if(dir == 1){ x++; lastDir = 3;}
					else if(dir == 2){ y++; lastDir = 0;}
					else if(dir == 3){ x--;  lastDir = 1;}
				}
			}
			let count = 0;
			let i = MAPSIZE;
			let j = MAPSIZE;
			while(--i > 1){
				if(fir){ i--;}
				while(--j > 1){
					if(fir){
						--j;
					}
					if((fir && map[i][j].type == 'w') || (!fir && (map[i][j].type == 'a' || map[i][j].type == 'r'))){
						makeCurrent(i, j);
						makeCurrent(i, j);
						count+=2;
					}
				}
				j = MAPSIZE;
			}
			console.log("COUNT: " + count);
		}
		function rivers(){
			var id = 0;
			var temp = 0;
			function makeRiver(yC, xC){
				var spot = new Array(2);
				var interval = Math.ceil(Math.random() * 40 * MODI);
				var dirToSea = -1;
				var stack = [];
				var stop = false;
				stack.push([yC, xC]);
				var lastDir = -1;
				var lastlast = -1;
				var bannedDir = -1;
				var rS = 0;
				var river = [];
				while(stack.length > 0 && !stop){
					spot = stack.pop();
					var y = safeC(spot[0]);
					var x = safeC(spot[1]);
					river.push(spot, rS);
					if(map[y][x].elevation > 0){
						var min = Math.min(.7, map[y][x].elevation + .1);
						map[y][x].id = [id,rS];
						var minDir = -1;
						if(map[safeC(y - 1)][x].elevation < min && lastDir != 0 && lastlast != 0&& bannedDir != 0 && map[safeC(y - 1)][x].id[0] != id){
							min = map[safeC(y - 1)][x].elevation;
							minDir = 0;
						}
						if(map[y][safeC(1+x)].elevation < min && lastDir != 1 && lastlast != 1&& bannedDir != 1 && map[y][safeC(1+x)].id[0] != id){
							min = map[y][safeC(1+x)].elevation;
							minDir = 1;
						}
						if(map[safeC(y + 1)][x].elevation < min && lastDir != 2 && lastlast != 2&& bannedDir != 2 && map[safeC(y + 1)][x].id[0] != id){
							min = map[safeC(y + 1)][x].elevation;
						
						minDir = 2;
						}
						if(map[y][safeC(x-1)].elevation < min && lastDir != 3 && lastlast != 3&& bannedDir != 3 && map[y][safeC(x-1)].id[0] != id){
							min = map[y][safeC(x-1)].elevation;
							minDir = 3;
						}
						if(minDir > -1){
							if(minDir == 0){ stack.push([y-1, x]); }
							else if(minDir == 1){ stack.push([y, x+1]); }
							else if(minDir == 2){ stack.push([y+1, x]); }
							else if(minDir == 3){ stack.push([y, x-1]); }
							//lastlast = lastDir;
							if(minDir < 2){ lastDir = minDir+2;} else { lastDir = minDir -2; }
							if(rS%interval == 0){
								var pal = spill(y, x, temp);
								temp++;
								if(pal == -1){ stop = true; rS = 1 + MAPSIZE;}
								else{
									if(Math.abs(pal[0]) > 0){
										if(pal[0] < 0){
											bannedDir = 2;
										}
										else {
											bannedDir = 0;
										}
										interval = rS + Math.abs(pal[0]);
									}
									if(Math.abs(pal[1]) < Math.abs(pal[1])){
										if(pal[1] < 0){
											bannedDir = 3;
										}
										else {
											bannedDir = 1;
										}
										interval = rS + Math.abs(pal[1]);
									}
								}
							}
						}
					}
					else {stop = true }
					rS++;
				}
				if(stop && rS < MAPSIZE * .8){
					var keep = [];
					var spot = river.shift();
					var y = safeC(spot[0]);
					var x = safeC(spot[1]);
					var cur = 0;
					var dir = -1
					keep.push(spot);
					while(cur < rS){
						dir = -1;
						if((map[safeC(y - 1)][x].id[0] > -1  && map[safeC(y - 1)][x].id[0] < map[safeC(y - 1)][x].id[0]) ||(map[safeC(y - 1)][x].id[0] == id  && map[safeC(y - 1)][x].id[1] >= cur)){
							dir = 0;
							cur = map[safeC(y - 1)][x].id[1]
						}
						if((map[y][safeC(x + 1)].id[0] > -1  && map[y][safeC(x + 1)].id[0] < map[y][safeC(x + 1)].id[0]) ||(map[y][safeC(x + 1)].id[0] == id  && map[y][safeC(x + 1)].id[1] >= cur)){
							dir = 1;
							cur = map[y][safeC(x + 1)].id[1]
						}
						if((map[safeC(y + 1)][x].id[0] > -1  && map[safeC(y + 1)][x].id[0] < map[safeC(y + 1)][x].id[0]) ||(map[safeC(y + 1)][x].id[0] == id  && map[safeC(y + 1)][x].id[1] >= cur)){
							dir = 2;
							cur = map[safeC(y + 1)][x].id[1]
						}
						if((map[y][safeC(x-1)].id[0] > -1  && map[y][safeC(x-1)].id[0] < map[y][safeC(x-1)].id[0]) ||(map[y][safeC(x-1)].id[0] == id  && map[y][safeC(x-1)].id[1] >= cur)){
							dir = 3;
							cur = map[y][safeC(x-1)].id[1]
						}
						switch(dir){
							case 0: keep.push([y-1, x]); y = safeC(y-1); break;
							case 1: keep.push([y, x+1]); x = safeC(x+1); break;
							case 2: keep.push([y+1, x]); y = safeC(y+1); break;
							case 3: keep.push([y, x-1]); x = safeC(x-1); break;
						}
						cur++;
					}
					for(let a = 0; a < keep.length; a++){
						spot = keep[a];
						var y = safeC(spot[0]);
						var x = safeC(spot[1]);
						map[y][x].type = 'r';
						map[y][x].elevation = -.1;
						for(let z = -1; z < 2; z++){
							for(let b = -1; b < 2; b++){
								map[safeC(y+z)][safeC(x+b)].wetness += .25;
							}
						}	
					}
				}
			}
			for(let i = 0; i < MAPSIZE; i++){
				for(let j = 0; j < MAPSIZE; j++){
					let chance = .9925 - Math.min(.99, map[i][j].wetness/100);
					if(map[i][j].elevation > 0 && map[i][j].wetness > 0 && map[i][j].elevation < .5 && Math.random() > chance){
						makeRiver(i, j);
						id++;
					}
				}
			}
		}
		function lakes(){
			var id = 0;
			function makeLake(yC, xC){
				var spot = new Array(2);
				var stack = [];
				var stop = false;
				stack.push([yC, xC]);
				var lastDir = -1;
				var bannedDir = -1;
				var rS = 0;
				while(stack.length > 0){
					spot = stack.shift();
					var y = safeC(spot[0]);
					var x = safeC(spot[1]);
					if(map[y][x].elevation > 0){
						var min = Math.min(.35, map[y][x].elevation *= 1.07);
						if(rS > 0){
							map[y][x].type = 'a';
							map[y][x].id = id;
							map[y][x].elevation = -.75;
							for(let a = -1; a < 2; a++){
								for(let b = -1; b < 2; b++){
									map[safeC(y+a)][safeC(x+b)].wetness += .25;
								}
							}
						}
						if(min > .1){
							var minDir = -1;
							if(map[safeC(y - 1)][x].elevation < min && map[safeC(y - 1)][x].wetness > 0 &&lastDir != 0 && bannedDir != 0 && map[safeC(y - 1)][x].id != id){
								stack.push([y-1, x]);
								minDir = 0;
								if(map[safeC(y - 1)][x].elevation <= 0){
									min = -.1;
								}
							}
							if(map[y][safeC(1+x)].elevation < min && map[y][safeC(1+x)].wetness > 0 && lastDir != 1 && bannedDir != 1 && map[y][safeC(1+x)].id != id){
								stack.push([y, x+1]);
								minDir = 1;
								if(map[y][safeC(1+x)].elevation <= 0){
									min = -.1;
								}
							}
							if(map[safeC(y + 1)][x].elevation < min && map[safeC(y + 1)][x].wetness > 0 && lastDir != 2 && bannedDir != 2 && map[safeC(y + 1)][x].id != id){
								stack.push([y+1, x]);
								minDir = 2;
								if(map[safeC(y + 1)][x].elevation <= 0){
									min = -.1;
								}
							}
							if(map[y][safeC(x-1)].elevation < min && map[y][safeC(x-1)].wetness > 0 && lastDir != 3 && bannedDir != 3 && map[y][safeC(x-1)].id != id){
								min = map[y][safeC(x-1)].elevation;
								minDir = 3;
								if(map[y][safeC(x-1)].elevation <= 0){
									min = -.1;
								}
							}
						}
					}
					else { stop = true; }
					rS++;
				}
			}
			for(let i = 0; i < MAPSIZE; i++){
				for(let j = 0; j < MAPSIZE; j++){
					if(map[i][j].elevation > .1 && map[i][j].elevation <= .325 && map[i][j].wetness > .1 && Math.random() > .9985){
						makeLake(i, j);
						id++;
					}
				}
			}
		}
		function spill(y, x, r){ //finds distance to water currently
			var stack = [];
			stack.push([y, x]);
			map[y][x].it[r] = 0;
			var stop = false;
			while(stack.length > 0 && stack.length < 20*MAPSIZE){
				var loc = stack.shift();
				var y1 = loc[0];
				var x1 = loc[1];
				map[y1][x1].it = r;
				if(!stop){
					let temp = -1;
					let temp1 = -1;
					for(let t = -1; t < 2; t+=2){
						for(let u = 0; u < 2; u++){
							if(u == 0){ temp = safeC(y1+t); temp1 = x1;} else { temp = y1; temp1 = safeC(x1+t); }
							if(map[temp][temp1].it != r){
								if(map[temp][temp1].type == 'w' || map[temp][temp1].type == 'a'){
									stop = true;
									t = 2;
									u = 2;
								}
								stack.push([temp, temp1]);
								map[temp][temp1].it = r;
							}
						}
					}
					if(stop){
						var last = stack.pop();
						var yDist = last[0] - y;
						var xDist = last[1] - x;
						if(Math.abs(yDist) > MAPSIZE){
							let modifier = yDist/Math.abs(yDist);
							yDist = safeC(yDist) * modifier;
						}
						if(Math.abs(xDist) > MAPSIZE){
							let modifier = xDist/Math.abs(xDist);
							xDist = safeC(xDist) * modifier;
						}
						return [yDist, xDist];
					}
				}
			}
			//console.log(stack.length);
			return -1;
		}
		function genOceans(oceanSize, numOceans)
		{
			var oS = oceanSize;
			var nO = numOceans;
			var dir = 0;
			var lastDir = 0;
			var yCoord = Math.floor(Math.random() * MAPSIZE);
			var xCoord = Math.floor(Math.random() * MAPSIZE);
			while(oS > 0 && nO > 0)
			{
				if(oS == 1)
				{
					oS = oceanSize; //Ocean size is too small, go to new location to begin making ocean
					yCoord = Math.floor(Math.random() * MAPSIZE);
					xCoord = Math.floor(Math.random() * MAPSIZE);
					nO--;
				}
				else
				{
					yCoord = safeC(yCoord);
					xCoord = safeC(xCoord);
					map[yCoord][xCoord].type = 'w';
					map[yCoord][xCoord].wetness = 0;
					map[yCoord][xCoord].elevation = -.75;
					do{
						dir = Math.floor(Math.random()*4);
					}while(dir == lastDir);
					if(dir == 0){ yCoord++; }
					else if(dir == 1){ xCoord++; }
					else if(dir == 2){ yCoord--; }
					else { xCoord--; }
					if(lastDir < 2){ lastDir = dir + 2} else { lastDir = dir - 2; } //Asign Last Dir
					oS--;
				}
			}
		}
		function slap(size, typeDetect, typeMake, elevChange, nind, minsize){
			var ms = minsize || -1;
			var ind = 0;
			var counter = 0;
			var stack = [];
			var continents = [];
			function checkValidity(y, x, checking){
				var a = map[safeC(y)][safeC(x)];
				return (a.checked != nind || !checking) && a.type == typeDetect;
			}
			function slapInner(yC, xC, checking){
				var spot = new Array(2);
				stack.push([yC, xC]);
				while(stack.length > 0){
					counter++;
					spot = stack.pop();
					y = safeC(spot[0]);
					x = safeC(spot[1]);
					if(checking){ map[y][x].checked = nind; }
					else { 
						map[y][x].type = typeMake; 
						if(elevChange != 2){
							map[y][x].elevation = elevChange;
							if(elevChange == -1){
								map[y][x].wetness = 0;
							}
						}
					}	
					if(checkValidity(y+1, x, checking)){
						stack.push([y+1, x]);
					}
					if(checkValidity(y, x+1, checking)){
						stack.push([y, x+1]);
					}
					if(checkValidity(y-1, x, checking)){
						stack.push([y-1, x]);
					}
					if(checkValidity(y, x-1, checking)){
						stack.push([y, x-1]);
					}
				}
			}
			let i = MAPSIZE;
			let j = MAPSIZE;
			while(--i >= 0){
				while(--j >= 0){
					if(checkValidity(i, j, true)){
						counter = 0;
						slapInner(i, j, true);
						if(counter < size && counter > ms){
							slapInner(i, j, false);
						}
					}
				}
				j = MAPSIZE;
			}
		}