// 		if(drawLeftBar.tab == 0){
// 				ltx.fillText("Size: " + (a.size-r) + " / " + a.maxSize, 5, 245);
// 				let modif = 1;
// 				if(typeof r != 'undefined' && (a.size-r) > a.maxSize){
// 					if(a.maxSize <= 1){
// 						modif = 0;
// 					}
// 					else {
// 						modif = .3 + .7 * (a.maxSize/(a.size-r));
// 					}
// 				}
// 				ltx.fillText("Efficiency: " + Math.floor(100*modif)/100, 5, 225);
// 				ltx.fillText("Wellbeing: " + Math.floor(10 * a.res.wellbeing)/10, 5, 270);
// 				ltx.fillText("Wellbeing Income: " + Math.floor(100*(a.income.wellbeing))/100, 5, 290);
				
// 				ltx.fillText("Wood: " + Math.floor(10*a.res.wood)/10 + " / " + a.rMax.wood, 5, 320);
// 				ltx.fillText("Wood Income: " + Math.floor(10*a.income.wood)/10 + " / " + Math.floor(10*a.max.wood)/10, 5, 340);
				
// 				ltx.fillText("Stone: " + Math.floor(10*a.res.stone)/10, 5, 360);
// 				ltx.fillText("Stone Income: " + Math.floor(100*a.income.stone)/100, 5, 390);
				
// 				ltx.fillText("Food: " + Math.floor(10*a.res.food)/10 + " / " + a.rMax.food, 5, 420);
// 				ltx.fillText("Food Income: " + Math.floor(10*a.income.food)/10 + " / " + Math.floor(10*a.max.food)/10, 5, 440);
				
// 				ltx.fillText("Population: " + Math.floor(10*a.res.population)/10 + " / " + Math.floor(10*a.rMax.population)/10, 5, 470);
// 				ltx.fillText("Population Income: " + Math.floor(10*a.income.population)/10, 5, 490);
// 				ltx.fillText("Manpower Income: " + Math.floor(10*a.income.manpower)/10+ " / " + Math.floor(10*a.max.manpower)/10, 5, 510);
// 			}
// 			else if(drawLeftBar.tab == 1){
// 				ltx.fillText("Market Cap: " + Math.floor(10*a.res.marketCap)/10 + " / " + Math.floor(10*a.rMax.marketCap)/10 + " ( " + Math.floor(10*a.income.marketCap)/10 + " )", 5, 220);
// 				ltx.fillText("Raw: " + Math.floor(10*a.res.rWood)/10, 120,285); ltx.fillText(Math.floor(rates[1]),225,285);
// 				ltx.fillText("Raw: " + Math.floor(10*a.res.rPerf)/10, 120,310); ltx.fillText(Math.floor(rates[0]),225,310);
// 				ltx.fillText("Raw: " + Math.floor(10*a.res.rHide)/10, 120,260); ltx.fillText(Math.floor(rates[5]),225,260);
// 				ltx.fillText("Raw: " + Math.floor(10*a.res.rSilk)/10, 120,335); ltx.fillText(Math.floor(rates[4]),225,335);
// 				ltx.fillText("Hides: " + Math.floor(10*a.res.hides)/10, 5, 260);
// 				ltx.fillText("Woods: " + Math.floor(10*a.res.woods)/10, 5,285);
// 				ltx.fillText("Perfumes: " + Math.floor(10*a.res.perfs)/10,5, 310);
// 				ltx.fillText("Silk: " + Math.floor(10*a.res.silks)/10,5,335);
// 				ltx.fillText("Spices: " + Math.floor(10*a.res.spices)/10 + "  ("+Math.floor(100*a.income.spices)/100+")",5,360); ltx.fillText(Math.floor(rates[2]),225, 360);
// 				ltx.fillText("Pearls: " + Math.floor(10*a.res.pearls)/10,5,385);
// 				ltx.fillText(Math.floor(rates[3]),225, 385);
// 				ltx.fillText("Copper: " + Math.floor(10*a.res.copper[1])/10 + "  Ore: " + Math.floor(10*a.res.copper[0])/10, 5, 430);
// 				ltx.fillText("Bronze: " + Math.floor(10*a.res.bronze[1])/10 + "  Ore: " + Math.floor(10*a.res.bronze[0])/10, 5, 450);
// 				ltx.fillText("Iron: " + Math.floor(10*a.res.iron[1])/10 + "  Ore: " + Math.floor(10*a.res.iron[0])/10, 5, 470);				
// 				ltx.fillText("Horses: " + Math.floor(a.res.horses) + " / " + Math.floor(a.rMax.horses)+" (" + Math.floor(100*a.income.horses)/100 + " )", 5, 510);
// 			}
// 		}
// 	}
// }



$("#resources").hasClass("active"){
	
}
$("#culture").hasClass("active"){
	
}
$("#tech").hasClass("active"){
	
}