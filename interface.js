$(function() {
$("#resgood").change(function() {
	$('#resource-list').fadeToggle();
	$('#goods-list').fadeToggle();
});});
function drawLeftBar(){
	if($('a#resource-tab').hasClass('active')){
		$('#manpower').html(Math.floor(p.manpower));
		$('#gold').html(Math.floor(10*p.gold)/10);
		if(tS.length > 0 && map[tS[0]][tS[1]].owner == p.turn && map[tS[0]][tS[1]].zone > -1 && map[tS[0]][tS[1]].manager == -1){
			let z = p.zones[map[tS[0]][tS[1]].zone];
			if(document.getElementById("resgood").checked){
				$('#size').html(z.size + "/" + z.maxSize);
				$('#sizebar').css('width', (Math.min(100, 100*(z.size/z.maxSize)))+"%");
				$('#wood').html(Math.floor(z.res.wood)+"/"+Math.floor(100*z.rMax.wood)/100);
				$('#woodInc').html(Math.round(20*z.income.wood)/20+"/"+Math.floor(20*z.max.wood)/20);
				$('#stone').html(Math.floor(10*z.res.stone)/10);
				$('#stoneInc').html(Math.round(20*z.income.stone)/20);
				$('#food').html(Math.floor(z.res.food)+"/"+Math.floor(z.rMax.food));
				$('#foodInc').html(Math.round(z.income.food)+"/"+Math.floor(z.max.food));
				$('#pop').html(Math.floor(z.res.population)+"/"+Math.floor(z.rMax.population));
				$('#popInc').html(Math.round(z.income.population));
				$('#wellbeing').html(Math.round(z.res.wellbeing));
				$('#wellbeingInc').html(Math.round(100*z.income.wellbeing)/100);
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