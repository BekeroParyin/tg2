
function manageAI(incomeTick, AIList, player){
	let p = player || -1;
	for(let i = AIList.length-1; i >= 0; i--){
		let ai = AIList[i];	
		if(ai != -1){
			if(ai.territory.length > 0 && (ai.zones.length == 0 || ai.zones[0].res.wellbeing > -300)){
				if(incomeTick){
					ai = Roads(ai);
					ai = scanRoads(ai);
					let curGold = ai.gold;
					ai = rIncome(ai);
					let newGold = ai.gold;
					if(newGold - curGold > 0 && p != -1){
						p.gold += (newGold-curGold)/5;
						ai.gold -= (newGold-curGold)/5;
					}
					ai = armyPay(ai);
					ai = rebelCheck(ai);
					ai.manpower += 3;
				}
				if(ai.manpower > 1){
					for(let z = 0; z < ai.zones.length; z++){
						let n = ai.zones[z];
						if(typeof ai.goals[z] == 'undefined' || ai.goals[z].length == 0){
							ai.goals[z] = [];
						}
						if(ai.manpower > 1){
							if(ai.goals[z].length < 7){
								if(n.size > n.maxSize && n.res.stone > 5 && ai.gold > 50){
									ai.goals[z].push("office");
								}
								if(ai.manpower > 5 && n.income.wood < Math.max(5, n.res.population/50) && n.res.population > 4){
									ai.goals[z].push("woodInc");
									if(n.res.wood > .5 && ai.manpower >= 3){
										ai.goals[z].push("plant");
									}
								}
								if(ai.size < 15){
									ai.goals[z].push("expand");
								}
								if(ai.manpower > 2 && n.res.wood > 2 && (n.res.food < 1.5*n.res.population || n.income.food < n.rMax.population) && n.income.food < Math.max(.5 * n.max.food, n.max.food-75) || day > 200 && n.res.food < n.rMax.population*8){
									if(n.res.food < 1.5*n.res.population){
										ai.goals[z].push("feed");
									}
									else{ ai.goals[z].push("feed"); }
								}
								if(n.income.food > Math.max(.5 * n.max.food,n.max.food-75) || n.res.food == n.rMax.food){
									ai.goals[z].unshift("granary");
								}
								else if((n.res.population > n.rMax.population * .6 || n.res.wood > 4.25) && n.income.food > n.res.population){
									ai.goals[z].push("buildHouses");
								}
								if(n.income.wood >= .75 * n.max.wood || (n.res.wood > 15)){
									ai.goals[z].push("lMill");	
								}
								if(ai.manpower > 10 && (n.res.wood >= n.rMax.wood-2)){
									ai.goals[z].push("warehouse");
								}
								if(n.res.wellbeing <= 0 || (n.res.population > 40 && n.income.wellbeing < n.res.population/20)){
									ai.goals[z].push("wellImprove");
								}
								if(n.res.stone > 20 && n.res.wood > 20 && ai.gold > 75){
									ai.goals[z].push("tavern");
								}
								if(n.res.stone > 10 && n.res.wood > 10){
									ai.goals[z].push("tower");
								}
								if(ai.manpower > 10 && n.size < n.maxSize -100){
									ai.goals[z].push("expand");
								}
								if(n.res.wellbeing > 150 && n.income.gold < (n.res.population-100)/60){
									ai.goals[z].push("gold");
								}
								if(n.size > 45){
									if(n.res.spices > 7.5 && n.income.manpower > 7){
										ai.goals[z].push("spices");
										ai.goals[z].push("bazaar");
									}
									if(n.income.stone < 1){
										ai.goals[z].push("stoneInc");
									}
									if(n.res.stone > 5 && n.size > 175 && ai.manpower >= 25){
										if(n.income.copper[0] > n.income.copper[1] || n.income.bronze[0] > n.income.bronze[1] || n.income.iron[0] > n.income.iron[1]){
											ai.goals[z].push("metalworks");
										}
										if(ai.manpower > 50){
											ai.goals[z].push("metalInc");
										}
									}
									if(n.income.rSilk > n.income.silks){
										ai.goals[z].push("weavery");
										ai.goals[z].push("bazaar");
									}
									if(n.income.rHide > n.income.hides){
										ai.goals[z].push("hides");
										ai.goals[z].push("bazaar");
									}
									if(n.income.rPerf > n.income.perfs){
										ai.goals[z].push("perfumery");
										ai.goals[z].push("bazaar");
									}
									if(n.income.rWood > n.income.woods){
										ai.goals[z].push("lWoods");
										ai.goals[z].push("bazaar");
									}
									if(ai.gold > 10 && n.res.wood > 5 && n.manpower > 5){
										ai.goals[z].push("bazaar");
									}
									if(n.size > n.maxSize-150. && n.income.gold > 4){
										if(n.size > n.maxSize-50 && ai.manpower > 5 && ai.gold > 50 && n.res.stone > 5){
											ai.goals[z].push("office");
										}
										
									}
									if(n.size > 200 && ai.gold > 100 && ai.manpower > 20){
										if(n.res.marketCap < n.size/4){
											ai.goals[z].push("market");
										}
									}
								}
							}
							else if(ai.goals.length < 15){
								if(n.size > n.maxSize && n.res.stone > 5 && ai.gold > 50){
									ai.goals[z].unshift("office");
								}
								else if(n.size > n.maxSize && n.income.stone < 1){
									ai.goals[z].push("stoneInc");
								}
							}
							let curGoal = -1;
							if(typeof ai.goals[z] != 'undefined'){
								curGoal = ai.goals[z].shift();
							}
							let foundWood = false;
							let foundStone = false;
							if(typeof curGoal != 'undefined' && curGoal != -1){
								if(curGoal == "woodInc" || curGoal == "expand" || curGoal == "clear" || curGoal == "stoneInc"){
									for(let rL = 0; rL < ai.roads[z].length; rL++){
										for(let a = -2; a < 3; a++){
											for(let b = -2; b < 3; b++){
												if(a != 0 || b != 0){
													let y = safeC(ai.roads[z][rL][0] + a);
													let x = safeC(ai.roads[z][rL][1] + b);
													if(map[y][x].building[0] == -1){
														if((Math.abs(a) + Math.abs(b) == 1 || curGoal == "clear") && map[y][x].type == 'f' && (map[y][x].owner == ai.turn && map[y][x].resource <= 11 || ai.zones[z].size < 300)){
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
															ai.manpower--;
															ai.zones[z].res.wood++;
															if(map[y][x].resource >= 11){
																map[y][x].resource = -1;
															}
															tileChange(y,x);
														}
														else if(canP(y, x, 0, 1) && ai.manpower >= 2 && curGoal == "plant" && map[y][x].owner == ai.turn){
															if(ai.zones[z].res.wood >= .5){
																ai.zones[z].res.wood -= .5;
																ai.manpower -= 2;
																map[y][x].type = 'f';
																tileChange(y, x);	
															}
														}
														else if(curGoal == "stoneInc"){
															if((map[y][x].type == 'k' || map[y][x].type == 'h') && map[y][x].owner == -1 && map[y][x].aiClaimable){
																let path = pathfind(ai.roads[z][rL][0], ai.roads[z][rL][1], y, x, true, ai.turn);
																if(path.length <= 4 && ai.manpower >= path.length){
																	ai.claimGoal = path;
																	for(let p = 0; p < path.length; p++){
																		let y = safeC(path[p][0]); let x = safeC(path[p][1]);
																		if(map[y][x].owner != ai.turn){
																			foundStone = true;
																			ai.manpower--;
																			map[y][x].owner = ai.turn;
																			map[y][x].manager = ai.index;
																			ai.size++;
																			ai.territory.push([y, x]);
																			tileChange(y, x);
																		}
																	}
																}
																else if(path.length == 0){
																	map[y][x].aiCliamable = false;
																}
															}
														}
														if((map[y][x].type == 'f' || ((canP(y, x, 0, 1) || canP(y,x,1,1)) && curGoal == "expand")) && map[y][x].owner == -1 && map[y][x].aiClaimable){
															let path = pathfind(ai.roads[z][rL][0], ai.roads[z][rL][1], y, x, true, ai.turn);
															if(path.length <= 4 && ai.manpower >= path.length){
																ai.claimGoal = path;
																for(let p = 0; p < path.length; p++){
																	let y = safeC(path[p][0]); let x = safeC(path[p][1]);
																	if(map[y][x].owner != ai.turn){
																		foundWood = true;
																		ai.manpower--;
																		map[y][x].owner = ai.turn;
																		map[y][x].manager = ai.index;
																		ai.size++;
																		ai.territory.push([y, x]);
																		tileChange(y, x);
																	}
																}
															}
															else if(path.length == 0){
																map[y][x].aiCliamable = false;
															}
														}
														if(curGoal == "expand" && (ai.size < 20 || ai.manpower > 5)){ //Roads
															if(map[y][x].owner == ai.turn){
																if(canP(y,x,0,0) && (ai.roads[z].length/ai.zones[z].territory.length < .4 || ai.size < 20 || ai.manpower > 20)){
																	ai.manpower--;
																	map[y][x].building = [0, 0, 1, [false]];
																	tileChange(y, x);
																}
															}
														}
													}
												}
											}
										}
									}
									if(curGoal == "woodInc" && !foundWood || curGoal == "stoneInc" && !foundStone && ai.goals[z].length<5){
										ai.goals[z].push("expand");	
									}
								}
								else {
									let b0 = -1;
									let b1 = -1;
									let didPlace = false; let couldFarm = false; let oneStop = false;
									if(curGoal == "feed"){
										b0 = 0; b1 = 1; oneStop = false;
										if(Math.random() > .6){
											b1 = 2;
										}
									}
									else if(curGoal == "buildHouses"){
										b0 = 1; b1 = 0; oneStop = false;
									}
									else if(curGoal == "granary"){
										b0 = 0; b1 = 4; oneStop = false;
									}
									else if(curGoal == "lMill"){
										b0 = 0; b1 = 3; oneStop = true;
									}
									else if(curGoal == "warehouse"){
										b0 = 0; b1 = 5; oneStop = true;
									}
									else if(curGoal == "metalInc"){
										b0 = 0; b1 = 6; oneStop = true;
									}
									else if(curGoal == "metalworks"){
										b0 = 0; b1 = 7; oneStop = true;
									}
									else if(curGoal == "lWoods"){
										b0 = 1; b1 = 7; oneStop = true;
									}
									else if(curGoal == "weavery"){
										b0 = 1; b1 = 12; oneStop = true;
									}
									else if(curGoal == "perfumery"){
										b0 = 1; b1 = 8; oneStop = true;
									}
									else if(curGoal == "bazaar"){
										b0 = 0; b1 = 9;
									}
									else if(curGoal == "spices"){
										b0 = 0; b1 = 11;
									}
									else if(curGoal == "market"){
										b0 = 0; b1 = 8; oneStop = true;
									}
									else if(curGoal == "hides"){
										b0 = 1; b1 = 9; oneStop = true;
									}
									else if(curGoal == "office"){
										b0 = 1; b1 = 5; oneStop = false;
									}
									else if(curGoal == "tavern"){
										b0 = 1; b1 = 10; oneStop = true;
									}
									else if(curGoal == "tower"){
										b0 = 2; b1 = 5; oneStop = true;
									}
									else if(curGoal == "wellImprove"){
										if(ai.gold < 50 || ai.zones[z].res.stone < 5 || ai.zones[z].res.population < 250 || Math.random() < .2){
											b0 = 1; b1 = 1; oneStop = false;
										}
										else{
											b0 = 1; b1 = 4; oneStop = true;
										}
									}
									else if(curGoal == "gold"){
										b0 = 1; b1 = 2;
									}
									if(b0 > -1){
										for(let rL = 0; rL < ai.roads[z].length; rL++){
											for(let a = -2; a < 3; a++){
												for(let b = -2; b < 3; b++){
													if(a != 0 || b != 0){
														let y = safeC(ai.roads[z][rL][0] + a);
														let x = safeC(ai.roads[z][rL][1] + b);
														let t = map[y][x];
														if(t.owner == ai.turn && t.manager == ai.index){
															let canB = canBuy(y, x, b0, b1, ai);
															if(!canB){
																couldFarm = true;
																rL = ai.roads[z].length;
																b = 3; a = 3;
															}
															else if((!didPlace || !oneStop)){
																if(t.building[0] == -1){
																	if(canP(y, x, b0, b1) && !canP(y, x, 0, 0)){
																		couldFarm = true;
																		map[y][x].building = [b0, b1, 1, [false]];
																		tileChange(y, x);
																		ai.manpower -= buildings[b0][b1].cost[3];
																		ai.gold -= buildings[b0][b1].cost[2];
																		ai.zones[z].res.wood -= buildings[b0][b1].cost[0];
																		ai.zones[z].res.stone -= buildings[b0][b1].cost[1];
																		if(buildings[b0][b1].cost[4][0] != -1){
																			if(buildings[b0][b1].cost[4][0] == 12){
																				ai.zones[z].res.rWood -= buildings[b0][b1].cost[4][1];
																			}
																			if(buildings[b0][b1].cost[4][0] == 15){
																				ai.zones[z].res.rSilk -= buildings[b0][b1].cost[4][1];
																			}
																			else if(buildings[b0][b1].cost[4][0] == 16){
																				ai.zones[z].res.spices -= buildings[a0][a1].cost[4][1];
																			}
																		}
																		didPlace = true;
																	}
																}
																else if(ai.zones[z].size > 400 && !didPlace && t.building[2] < 4){
																	if(map[y][x].building[0] == b0 && t.building[1] == b1){
																		map[y][x].building[2]++;
																		ai.manpower -= buildings[b0][b1].cost[3];
																		ai.gold -= buildings[b0][b1].cost[2];
																		ai.zones[z].res.wood -= buildings[b0][b1].cost[0];
																		ai.zones[z].res.stone -= buildings[b0][b1].cost[1];
																		tileChange(y, x);
																	}
																}
															}
															else{
																a = 3;
																b = 3;
																rL = ai.roads[z].length;
															}
														}
													}
												}
											}
										}
										if(!couldFarm && ((b0 == 0 && b1 == 1) || b0 == 3)){
											ai.goals[z].push("clear");
										}
										else if(!didPlace && ai.goals[z].length < 3){
											if(curGoal == "wellImprove"){
												if(!couldFarm){
													ai.goals[z].push("buildHouses");
												} else { 
													ai.goals[z].push(curGoal);
												}
											}
											ai.goals[z].push(curGoal);
									}
								}
							}
						}
					}
				}
			}
			AIList[i] = ai;
		}
		else{
			let listofCries = ["O, yet defend me, friends; I am but hurt.", "Caesar, now be still: I kill’d not thee with half so good a will.", "Et tu, Brute! Then fall, Caesar", "Behind O, I am slain!", "The rest is silence.", "A horse! a horse! my kingdom for a horse!"];
			console.log(listofCries[Math.floor(Math.random()*listofCries.length)]);
			AIList[i] = -1;;
		}
		}
	}
	return p;
}
function canP(yS, xS, b0, b1, s){
		let shallow = s || false;
		let canPl = (map[yS][xS].type == 'g' || map[yS][xS].type == 'i' ||  map[yS][xS].type == 'k' || map[yS][xS].type == 'h'|| map[yS][xS].type == 'c' || map[yS][xS].type == 'l' || map[yS][xS].type == 's' || (shallow && map[yS][xS].type == 'f'));
		if(!canPl){
			return false;
		}
		let numAdj = 0;
		let numHouses = 0; let numPlazas = 0; let numOff = 0;
		let numTrees = 0; let numSpecial = 0; let numOres = 0; let numBazaars = 0;
		let adj = []; let numMines = 0; let numGranaries = 0; let numWater = 0; let numRoads = 0;
		for(let a = -1; a < 2; a++){
			for(let b = -1; b < 2; b++){
				if((a == 0 || b == 0) && a != b){
					let t = map[safeC(yS+a)][safeC(xS+b)];
					if(t.building[0] == 0){
						switch(t.building[1]){
							case 0: numRoads++; break;
							case 4: numGranaries++; break;
							case 6: numMines++; break;
							case 9: numBazaars++; break;
						}
					}
					if(t.building[0] == 1){
						switch(t.building[1]){
							case 0: numHouses++; break;
							case 1: numPlazas++; break;
							case 2: numOff++; break;	
						}
					}
					if(t.type == 'f'){
						numTrees++;
						if(t.resource > 11){
							numSpecial++;
						}
					}
					else if(t.elevation < 0){
						numWater++;
					}
					if(t.resource > 6 && t.resource < 11){
						numOres++;
					}
					if(t.building[0] == b0 && t.building[1] == b1){
						numAdj++;
						adj = [a, b];
					}
					
				}
			}
		}
		if(numOres >= 3 && numMines == 0){
			return b0 == 0 && b1 == 6;
		}
		if(numRoads >= 3){
			return b0 == 1 && b1 == 5;
		}
		if(b0 == 0 && b1 == 6){
			return numHouses == 0 && numOres > 1;
		}
		if(numTrees >= 3){
			return b0 == 0 && b1 == 3;
		}
		if(numBazaars >= 1 && !(b0==0 && b1==0)){
			return b0 == 0 && b1 == 9;
		}
		if(numPlazas + numOff > 0){
			return (b0 == 0 && b1 == 9) || (b0 == 1 && b1 == 0);
		}
		if(numGranaries > 0){
			return (b0 == 0 && (b1 == 1 && b1 == 2)) || b1 >= 5;
		}
		if(numWater >= 3){
			return b0 == 1 && b1 == 3;
		}
		if(b0 == 0 && b1 == 3){
			return numTrees > 1 && numSpecial > 0;
		}
		else if(numSpecial >= 2){
			return false;
		}
		if(b0 == 1 && (b1 == 1 || b1 == 2)){
			return numHouses >= 3;
		}
		if(b0 == 0 && b1 == 0){
			if(numMines == 0){
				if(shallow){
					return numAdj == 0;
				}
				else if(numAdj == 1){
					let a = adj[0];
					let b = adj[1];	
					for(let h = 1; h < 3; h++){
						switch(a){
							case 0:switch(b){
									case 1: canPl = canPl && (canP(yS, safeC(xS-h), 0, 0, true) || map[yS][safeC(xS-h)].type == 'f'); break;
									case -1: canPl = canPl && (canP(yS, safeC(xS+h), 0, 0, true) || map[yS][safeC(xS+h)].type == 'f'); break;
								} break;
							case 1: canPl = canPl && (canP(safeC(yS-h), xS, 0, 0, true) || map[safeC(yS-h)][xS].type == 'f'); break;
							case -1: canPl = canPl && (canP(safeC(yS+h), xS, 0, 0, true) || map[safeC(yS+h)][xS].type == 'f'); break;
						}
					}
					if(canPl){
						let numR = 0;
						let numR1 = 0;
						for(let a = -2; a < 3; a++){
							for(let b = -2; b < 3; b++){
								if(map[safeC(yS+a)][safeC(xS+b)].building[0] == 0 && map[safeC(yS+a)][safeC(xS+b)].building[1] == 0){
									if(Math.abs(a) <= 1 && Math.abs(b) <= 1){
										numR1++;
									}
									numR++;
								}
							}
						}
						canPl = (numR < (7-numR1));
					}
					return canPl;
				}
			}
			return false;
		}
		else if(b0 == 1 && b1 == 0){
			if(numPlazas > 0 || numOff > 0){
				return true;
			}
			else if(numAdj > 0){
				return false;
			}
		}
		else if(numHouses >= 3){
			return false;
		}
		return canPl;
	}
function armyAI(AIList, player){
	for(let i = 0; i < AIList.length; i++){
		for(let j = 0; j < AIList[i].armies.length; j++){
			//Goals: Sit on Barracks, Move to army
		}
	}
}	
function marketAI(AIList, a){
	let p = a;
	let sSplits = [4,4,4,4,4,4,5,5,5,25,23,35,15.6];//perfumes, lwoods, spices, pearls, silk, hides, iron, bronze, copper, manpower, wood, stone, food
	let bSplits = [4,4,4,4,4,4,5,5,5,8,3,10,-13];
	for(let i = 0; i < AIList.length; i++){
		let ai = AIList[i];
		if(ai != -1){
			for(let z = 0; z < ai.zones.length; z++){
				let n = ai.zones[z];
				if(n.res.marketCap > 65){
					let numSell = 0;
					let totGold = 0;
					//perfumes, lwoods, spices, pearls, silk, hides
					if(ai.zones[z].res.food < 15 && ai.gold > 50){
						numSell = Math.min(ai.zones[z].res.marketCap, ai.gold/(rates[12]+bSplits[12]));
						ai.gold -= numSell * (rates[12]+bSplits[12]);
						totGold -= numSell * (rates[12]+bSplits[12]);
						ai.zones[z].res.marketCap -= numSell;
						ai.zones[z].res.food += numSell;
					}
					if(ai.zones[z].size > ai.zones[z].maxSize && ai.zones[z].res.stone < 5 && ai.gold > 100){
						numSell = Math.min(ai.zones[z].res.marketCap, ai.gold/(rates[11]+bSplits[11]));
						ai.gold -= numSell * (rates[11]+bSplits[11]);
						totGold -= numSell * (rates[11]+bSplits[11]);
						ai.zones[z].res.marketCap -= numSell;
						ai.zones[z].res.stone += numSell;
					}
					if(ai.zones[z].res.marketCap > 0 && ai.zones[z].res.perfs > 5){
						numSell = Math.min(ai.zones[z].res.marketCap, ai.zones[z].res.perfs);
						ai.gold += numSell * (rates[0]-sSplits[0]);
						totGold += numSell * (rates[0]-sSplits[0]);
						ai.zones[z].res.marketCap -= numSell;
						ai.zones[z].res.perfs -= numSell;
					}
					if(ai.zones[z].res.marketCap > 0 && ai.zones[z].res.woods > 5){
						numSell = Math.min(ai.zones[z].res.marketCap, ai.zones[z].res.woods);
						ai.gold += numSell * (rates[1]-sSplits[1]);
						totGold += numSell * (rates[1]-sSplits[1]);
						ai.zones[z].res.marketCap -= numSell;
						ai.zones[z].res.woods -= numSell;
					}
					if(ai.zones[z].res.marketCap > 0 && ai.zones[z].res.spices > 5){
						numSell = Math.min(ai.zones[z].res.marketCap, ai.zones[z].res.spices);
						ai.gold += numSell * (rates[2]-sSplits[2]);
						totGold += numSell * (rates[2]-sSplits[2]);
						ai.zones[z].res.marketCap -= numSell;
						ai.zones[z].res.spices -= numSell;
					}
					if(ai.zones[z].res.marketCap > 0 && ai.zones[z].res.silks > 5){
						numSell = Math.min(ai.zones[z].res.marketCap, ai.zones[z].res.silks);
						ai.gold += numSell * (rates[4]-sSplits[4]);
						totGold += numSell * (rates[4]-sSplits[4]);
						ai.zones[z].res.marketCap -= numSell;
						ai.zones[z].res.silks -= numSell;
					}
					if(ai.zones[z].res.marketCap > 0 && ai.zones[z].res.hides > 5){
						numSell = Math.min(ai.zones[z].res.marketCap, ai.zones[z].res.hides);
						ai.gold += numSell * (rates[5]-sSplits[5]);
						totGold += numSell * (rates[5]-sSplits[5]);
						ai.zones[z].res.marketCap -= numSell;
						ai.zones[z].res.hides -= numSell;
					}
					if(totGold > 0){
						ai.gold -= .25 * totGold;
						p.gold += .25 * totGold;
					}
				}
			}
		}
	}
	return p;
}

function createVassal(p, y, x){
	let a = new AI();
	a.color = getRandomColor();
	a.turn = p.turn;
	a.index = p.vassals.length;
	a.bloodline = legends[Math.floor(Math.random() * legends.length)];
	map[y][x].owner = a.turn;
	map[y][x].manager = a.index;
	a.startTile = [y, x];
	map[y][x].building = [0, 0, 1, []];
	a.manpower -= 2;
	a.size = 1;
	a.territory.push([y, x]);
	tileChange(y,x);
	p.vassals.push(a);
	return p;
}