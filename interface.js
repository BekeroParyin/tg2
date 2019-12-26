var curShip = new Ship();
var retUnit = new Unit(); retUnit.stats[4] = 4;
var infUnit = new Unit();
var archUnit = new Unit();
var cavUnit = new Unit();
var sInfUnit = new Unit();
var sArchUnit = new Unit();
var sCavUnit = new Unit();
curUnit = [infUnit, archUnit, cavUnit];
$(document).ready(function() {
$("#resgood").change(function() {
	if($(this).is(':checked')){
		$('#goods-list').fadeToggle();
		$('#resource-list').delay(500).fadeToggle();
	}
	else{
		$('#resource-list').fadeToggle();
		$('#goods-list').delay(500).fadeToggle();
	}
	drawLeftBar();
});});

function ement(e){
	let chng = 1;
	if($(this).hasClass('decr')){
		chng = -1;
	}
	let p = $(this).parent().parent().attr('id');
	let temp = curShip.pts;
	let spot = 0;
	let numRun = 1;
	if(e.shiftKey){
		numRun = 5;
	}
	for(let i = 0; i < numRun; i++){
		switch(p){
			case "dockAtk": if((chng==-1&&curShip.stats[0]>0) ||(chng==1&&curShip.pts>0)){ curShip.pts-=chng; curShip.stats[0]+=chng;}break
			case "dockStr": if((chng==-1&&curShip.stats[1]>0) ||(chng==1&&curShip.pts>0)){ spot = 1;curShip.pts-=chng; curShip.stats[1]+=chng;}break
			case "dockSto": if((chng==-1&&curShip.stats[2]>0) ||(chng==1&&curShip.pts>0)){ spot = 2;curShip.pts-=chng; curShip.stats[2]+=chng;}break
			case "dockTra": if((chng==-1&&curShip.stats[3]>0) ||(chng==1&&curShip.pts>0)){ spot = 3;curShip.pts-=chng; curShip.stats[3]+=chng;}break
			case "dockFis": if((chng==-1&&curShip.stats[4]>0) ||(chng==1&&curShip.pts>0)){ spot = 4;curShip.pts-=chng; curShip.stats[4]+=chng;}break
			case "dockSpd": if((chng==-1&&curShip.stats[5]>0) ||(chng==1&&curShip.pts>0)){ spot = 5;curShip.pts-=chng; curShip.stats[5]+=chng;}break
		}
	}
	curShip.costs = [5, 7, 0] //manpower, wood, gold curShip.costs -- - - - 
	curShip.costs[0] += (50-curShip.pts) + curShip.stats[0] + curShip.stats[3] + curShip.stats[4] + curShip.stats[5];
	curShip.costs[1] += 1.5*(curShip.costs[0]/1.5 + curShip.stats[1]*2 +curShip.stats[2]);
	curShip.costs[2] += (Math.floor(curShip.costs[1]) - curShip.stats[4])*5 -40 + curShip.stats[1]*1.5 +curShip.stats[2];
	if(curShip.pts != temp){
		$("#"+p + "> td > span").html(curShip.stats[spot])
		$('#dockPts').html(curShip.pts);
	}
	$('#mSC').html(Math.floor(curShip.costs[0]*20)/20);
	$('#wSC').html(Math.floor(curShip.costs[1]*20)/20);
	$('#gSC').html(Math.floor(curShip.costs[2]*20)/20);
}
$(".decr, .incr").click(ement);
$('#beginSC').click(function(){
	curShip.costs = [5, 7, 0] //manpower, wood, gold curShip.costs -- - - - 
	curShip.costs[0] += (50-curShip.pts) + curShip.stats[0] + curShip.stats[3] + curShip.stats[4] + curShip.stats[5];
	curShip.costs[1] += 1.5*(curShip.costs[0]/1.5 + curShip.stats[1]*2 +curShip.stats[2]);
	curShip.costs[2] += (Math.floor(curShip.costs[1]) - curShip.stats[4])*5 -40 + curShip.stats[1]*1.5 +curShip.stats[2];
	let yS = tS[0];
	let xS = tS[1];
	if(p.gold >= curShip.costs[2] && p.manpower >= curShip.costs[0] && p.zones[map[yS][xS].zone].res.wood >= curShip.costs[1]){
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
			p.gold -= curShip.costs[2];
			p.manpower -= curShip.costs[0];
			p.zones[map[yS][xS].zone].res.wood-=curShip.costs[1];
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
delta = true;
});
$(document).on("click", "#actionChange", function(){
	if(p.action == "claiming"){
		p.action = "clearing";
	}
	else if(p.action == "clearing"){ p.action = "planting"; }
	else { p.action = "claiming"; }
	$('#pact').html(cap(p.action));
});
function drawLeftBar(){
	if($('a#resource-tab').hasClass('active')){
		$('#manpower').html(Math.floor(p.manpower));
		$('#gold').html(Math.floor(10*p.gold)/10);
		$('#pact').html(cap(p.action));
		if(tS.length > 0 && map[tS[0]][tS[1]].owner == p.turn && map[tS[0]][tS[1]].zone > -1 && map[tS[0]][tS[1]].manager == -1){
			let z = p.zones[map[tS[0]][tS[1]].zone];
			if(document.getElementById("resgood").checked){
				$('#size').html(z.size + "/" + z.maxSize);
				$('#sizebar').css('width', (Math.min(100, 100*(z.size/z.maxSize)))+"%");
				$('#wood').html(Math.floor(z.res.wood)+"/"+Math.floor(100*z.rMax.wood)/100);
				$('#woodInc').html(Math.round(20*z.income.wood)/20+"/"+Math.floor(20*z.max.wood)/20);
				$('#stone').html(Math.floor(10*z.res.stone)/10);
				$('#stoneInc').html(Math.round(20*z.income.stone)/20);
				if(Math.floor(z.res.food) <= 0){
					$("#food").css({'color': 'red', 'font-size': '150%'});
				}
				else{ $("#food").css({'color': '#fff', 'font-size': '100%'}); }
				$('#food').html(Math.floor(z.res.food)+"/"+Math.floor(z.rMax.food));
				if(Math.round(z.income.food) <= 0 || Math.round(z.income.food) >= (z.max.food-1)){
					$("#foodInc").css({'color': 'red', 'font-size': '150%'});
				}
				else{ $("#foodInc").css({'color': '#fff', 'font-size': '100%'}); }
				$('#foodInc').html(Math.round(z.income.food)+"/"+Math.floor(z.max.food));
				
				if(Math.floor(z.res.population) >= z.rMax.population){
					$("#pop").css({'color': 'red', 'font-size': '150%'});
				}
				else{ $("#pop").css({'color': '#fff', 'font-size': '100%'}); }
				$('#pop').html(Math.floor(z.res.population)+"/"+Math.floor(z.rMax.population));
				if(Math.round(z.income.population) < 0){
					$("#popInc").css({'color': 'red', 'font-size': '150%'});
				}
				else{ $("#popInc").css({'color': '#fff', 'font-size': '100%'}); }
				$('#pop').html(Math.floor(z.res.population)+"/"+Math.floor(z.rMax.population));
				$('#popInc').html(Math.round(z.income.population));
				if(Math.round(z.res.wellbeing) < 0){
					$("#wellbeing").css({'color': 'red', 'font-size': '150%'});
				}
				else{ $("#wellbeing").css({'color': '#fff', 'font-size': '100%'}); }
				$('#wellbeing').html(Math.round(z.res.wellbeing));
				if(Math.round(z.income.wellbeing) < 0){
					$("#wellbeingInc").css({'color': 'red', 'font-size': '150%'});
				}
				else{ $("#wellBeingInc").css({'color': '#fff', 'font-size': '100%'}); }
				$('#wellbeingInc').html(Math.round(100*z.income.wellbeing)/100);
				let max = 0; let sMax = 0; let tMax = 0; let fMax = 0; let f = [-1, -1]; let s = [-1, -1]; let t = [-1, -1]; let fourth = [-1, -1];
				for(let i = 0; i < z.buildingNums.length; i++){
					for(let j = 0; j < z.buildingNums[i].length; j++){
						if(i+j > 0){
							let ape = z.buildingNums[i][j];
							if(ape > max){
								fMax = tMax; fourth = t;
								tMax = sMax; t = s;
								sMax = max; s = f;
								max = ape; f = [i, j];
							}
							else if(ape > sMax){
								fMax = tMax; fourth = t;
								tMax = sMax; t = s;
								sMax = ape; s = [i, j];
							}
							else if(ape > tMax){
								fMax = tMax; fourth = t;
								tMax = ape; t = [i, j];
							}
							else if(ape > fMax){
								fMax = ape; fourth = [i, j];
							}
						}
					}
				}
				$("#buildingsInZone").hide();
				if(max > 0){
					$("#2mostcom").html("");
					$("#2most").html("");
					$("#3mostcom").html("");
					$("#3most").html("");
					$("#4mostcom").html("");
					$("#4most").html("");
					$("#buildingsInZone").show();
					$("#mostcom").html(max);
					$("#most").html(buildings[f[0]][f[1]].name);
					if(sMax > 0){
						$("#2mostcom").html(sMax);
						$("#2most").html(buildings[s[0]][s[1]].name);
						if(tMax > 0){
							$("#3mostcom").html(tMax);
							$("#3most").html(buildings[t[0]][t[1]].name);
							if(fMax > 0){
								$("#4mostcom").html(fMax);
								$("#4most").html(buildings[fourth[0]][fourth[1]].name);
							}
						}
					}
				}
			}
			else{ //GOODS TAB
				$("#mCap").html(Math.floor(z.res.marketCap)+"/"+Math.floor(z.rMax.marketCap));
				$("#mCapInc").html(Math.floor(z.income.marketCap));
				$("#hide").html(Math.floor(20*z.res.hides)/20);
				$("#hideInc").html(Math.floor(20*z.income.hides)/20);
				$("#lWood").html(Math.floor(20*z.res.woods)/20);
				$("#lWoodInc").html(Math.floor(20*z.income.woods)/20);
				$("#perf").html(Math.floor(20*z.res.perfs)/20);
				$("#perfInc").html(Math.floor(20*z.income.perfs)/20);
				$("#silk").html(Math.floor(20*z.res.silks)/20);
				$("#silkInc").html(Math.floor(20*z.income.silks)/20);
				$("#spice").html(Math.floor(20*z.res.spices)/20);
				$("#spiceInc").html(Math.floor(20*z.income.spices)/20);
				$("#pearl").html(Math.floor(20*z.res.pearls)/20);
				$("#pearlInc").html(Math.floor(20*z.income.pearls)/20);
				$("#copper").html(Math.floor(20*z.res.copper[0])/20);
				$("#copperInc").html(Math.floor(20*z.income.copper[0])/20);
				$("#bronze").html(Math.floor(20*z.res.bronze[0])/20);
				$("#bronzeInc").html(Math.floor(20*z.income.bronze[0])/20);
				$("#iron").html(Math.floor(20*z.res.iron[0])/20);
				$("#ironInc").html(Math.floor(20*z.income.iron[0])/20);
				$("#horse").html(z.res.horses+"/"+Math.floor(z.rMax.horses));
				$("#horseInc").html(Math.floor(z.income.horses));
				$("#rhide").html(Math.floor(20*z.res.rHide)/20);
				$("#rwood").html(Math.floor(20*z.res.rWood)/20);
				$("#rsilk").html(Math.floor(20*z.res.rSilk)/20);
				$("#rperf").html(Math.floor(20*z.res.rPerf)/20);
				$("#rcopper").html(Math.floor(20*z.res.copper[1])/20);
				$("#rbronze").html(Math.floor(20*z.res.bronze[1])/20);
				$("#riron").html(Math.floor(20*z.res.iron[1])/20);
			}
		}
	}
	else if($('a#faction-tab').hasClass('active')){
		
	}
	else if($('a#cultech-tab').hasClass('active')){
		
	}
	else{
		
	}
}
function drawRightBar(e){
	if(tS.length > 0){
		var t = map[tS[0]][tS[1]];
	}
	if($('a#selected-tab').hasClass('active')){
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
	else if($('a#building-special').hasClass('active')){ //ie Dock, Market, Military Building
		if(t.building[0] == 1 && t.building[1] == 3){ //DOCK
			curShip.costs = [5, 7, 0] //manpower, wood, gold curShip.costs -- - - - 
			curShip.costs[0] += (50-curShip.pts) + curShip.stats[0] + curShip.stats[3] + curShip.stats[4] + curShip.stats[5];
			curShip.costs[1] += 1.5*(curShip.costs[0]/1.5 + curShip.stats[1]*2 +curShip.stats[2]);
			curShip.costs[2] += (Math.floor(curShip.costs[1]) - curShip.stats[4])*5 -40 + curShip.stats[1]*1.5 +curShip.stats[2];
			$('#mSC').html(Math.floor(curShip.costs[0]*20)/20);
			$('#wSC').html(Math.floor(curShip.costs[1]*20)/20);
			$('#gSC').html(Math.floor(curShip.costs[2]*20)/20);
		}
	}
	else if($('a#building-upgrade').hasClass('active')){
	
	}
}