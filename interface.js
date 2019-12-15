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