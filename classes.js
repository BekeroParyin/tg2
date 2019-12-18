	//Classes: -----------------
	function Building(){
		this.draw = ["brown", .5];
		this.name;
		this.type;
		this.effect = function(){};
		this.cost;		
		this.description;
	}
	function Culture(){
		this.womensRights = 0;
	}
	var buildings = [[], [], [], []];
	var bNames = [["Road","Farm", "Orchard", "Lumber Mill","Granary","Warehouse","Mine","Metalworks","Market", "Bazaar", "Stable", "Spice Plantation", "Silk Orchard", "Ebony Orchard"],
	
	["House","Plaza","Tax Office","Dock","Temple","Town Office","Manor", "Woodworker's Shop", "Perfumery", "Leather Worker", "Tavern", "Winery", "Weavery", "Theatre", "Library"],
	
	["Palisade","Low Wall","High Wall","Gatehouse","Moat","Guard Tower","Small Keep","Castle"],
	
	["Training Ground","Infantry Yard","Archery Yard","Cavalry Yard","Siege Yard", "Barracks", "Military Academy", "Mercenary Yard"]];
	for(i = 0; i < bNames.length; i++){
		for(j = 0; j < bNames[i].length; j++){
			buildings[i][j] = new Building();
			buildings[i][j].name = bNames[i][j];
			buildings[i][j].type = i;
			buildings[i][j].description = "Incomplete";
			buildings[i][j].cost = [0,0,0,0,[-1,0]];
		}
	}
	function Weapon(){
		this.cost = [.1,.05];
		this.upkeep = 0;
		this.name = "";
		this.attack = 0;
		this.defense = 0;
		this.skirmish = 0;
		this.pierce = 0;
		this.hands = 1;
		this.type = 0;
	}
	var effects = [0, 0, 0, 0]; //List of effects
	function Treasure(){
		this.name = "";
		this.status = -1;
		this.material;
		this.specMat;
		this.legend = "";
		this.index = 0;
		this.quality = 0;
		this.detail = [];
		this.description = ["", "", "", ""];
		this.wI = [-1, -1];
		this.numExist = 1;
		this.value = 0;
		this.effect = -1;
	}
	buildings[0][0].draw[0] = "tan"; buildings[0][0].draw[1] = .4; //Road
	buildings[0][1].draw[0] = "#767600"; buildings[0][1].draw[1] = .7; //Farm
	buildings[0][2].draw[0] = "rgb(0, 80, 0)"; buildings[0][2].draw[1] = .6; //Orchard
	buildings[0][3].draw[0] = "#6F4827"; buildings[0][3].draw[1] = .4; //Lumber Mill
	buildings[0][4].draw[0] = "#767600"; buildings[0][4].draw[1] = .4; //Granary
	buildings[0][5].draw[0] = "#64561E"; buildings[0][5].draw[1] = .8; //Warehouse
	buildings[0][6].draw[0] = "#400000"; buildings[0][6].draw[1] = .8; //Mine
	buildings[0][7].draw[0] = "#543c49"; buildings[0][7].draw[1] = .6; //Metalworks
	buildings[0][8].draw[0] = "#2e496a"; buildings[0][8].draw[1] = .75; //Market
	buildings[0][9].draw[0] = "#948b7f"; buildings[0][9].draw[1] = .9; //Bazaar
	buildings[0][10].draw[0] = "#83423b"; buildings[0][10].draw[1] = .6; //stable
	buildings[0][11].draw[0] = "#B35D51"; buildings[0][11].draw[1] = .6; //spice
	buildings[0][12].draw[0] = "#B7A99B"; buildings[0][12].draw[1] = .6; //silk orchard
	buildings[0][13].draw[0] = "#604E42"; buildings[0][13].draw[1] = .6; //luxury orchard
	
	buildings[1][0].draw[0] = "#463800"; buildings[1][0].draw[1] = .4; //House
	buildings[1][1].draw[0] = "#77BE98"; buildings[1][1].draw[1] = .4; //Plaza
	buildings[1][2].draw[0] = "#FCF092"; buildings[1][2].draw[1] = .4; //Tax Office
	buildings[1][3].draw[0] = "#855d19"; buildings[1][3].draw[1] = .7; //Dock
	buildings[1][4].draw[0] = "#e0fffe"; buildings[1][4].draw[1] = .5; //Temple
	buildings[1][5].draw[0] = "#88b4bd"; buildings[1][5].draw[1] = .45; //admin office
	buildings[1][6].draw[0] = "#bd8888"; buildings[1][6].draw[1] = .85; //manor
	buildings[1][7].draw[0] = "#604E42"; buildings[1][7].draw[1] = .6; //woodworker
	buildings[1][8].draw[0] = "#bd7194"; buildings[1][8].draw[1] = .5; //perfumery
	buildings[1][9].draw[0] = "#a07b60"; buildings[1][9].draw[1] = .55; //Tanner
	buildings[1][10].draw[0] = "#261806"; buildings[1][10].draw[1] = .7; //Tavern
	buildings[1][11].draw[0] = "#496456"; buildings[1][11].draw[1] = .45; //Winery
	buildings[1][12].draw[0] = "brown"; buildings[1][12].draw[1] = .6; //weavery
	buildings[1][13].draw[0] = "#92bf8a"; buildings[1][13].draw[1] = .7; //theatre
	buildings[1][14].draw[0] = "#948b7f"; buildings[1][14].draw[1] = .55; //Library
	
	buildings[2][0].draw[0] = "brown"; buildings[2][0].draw[1] = .3; //palisade
	buildings[2][1].draw[0] = "DarkGray"; buildings[2][1].draw[1] = .4; //wall
	buildings[2][2].draw[0] = "Gray"; buildings[2][2].draw[1] = .5; //high wall
	buildings[2][3].draw[0] = "Brown"; buildings[2][3].draw[1] = .4; //gate house
	buildings[2][4].draw[0] = "rgb(0, 106, 220)"; buildings[2][4].draw[1] = .5; //moat
	buildings[2][5].draw[0] = "Gray"; buildings[2][5].draw[1] = .3; //moat
	
	buildings[3][0].draw[1] = .75; //tgrounds
	buildings[3][1].draw[0] = "#83423b"; buildings[3][1].draw[1] = .55; //infyard
	buildings[3][2].draw[0] = "#855d19"; buildings[3][2].draw[1] = .55; //archyard
	buildings[3][3].draw[0] = "#83423b"; buildings[3][3].draw[1] = .55; //cavyard
	buildings[3][4].draw[0] = "#83423b"; buildings[3][4].draw[1] = .8; //barracks
	
	//Economic
	buildings[0][0].cost = [0,0,0,1,[-1,0]];
	buildings[0][0].description = "Road";
	buildings[0][0].effect = function(m){ map[tS[0]][tS[1]].zone = -1; p = Roads(p); p = scanRoads(p, tS[0], tS[1]);}
	buildings[0][1].cost = [2,0,0,2,[-1,0]];
	buildings[0][1].description = "Farm";
	
	buildings[0][2].cost = [4,0,0,1,[-1,0]];
	buildings[0][2].description = "Orchard";
	
	buildings[0][3].cost = [5,0,0,5,[-1,0]];
	buildings[0][3].description = "Lumber Mill";
	
	buildings[0][4].cost = [6,0,0,6,[-1,0]];
	buildings[0][4].description = "Granary";

	buildings[0][5].cost = [10,0,0,8,[-1,0]];
	buildings[0][5].description = "Warehouse";
	
	buildings[0][6].cost = [10,0,25,25,[-1,0]];
	buildings[0][6].description = "Mine"
	
	buildings[0][7].cost = [5,15,0,15,[-1,0]];
	buildings[0][7].description = "Metalworks";
	
	buildings[0][8].cost = [3,0,100,20,[-1,0]];
	buildings[0][8].description = "Market"; 
	
	buildings[0][9].cost = [5,0,10,5,[-1,0]];
	buildings[0][9].description = "Bazaar"; 
	buildings[0][10].cost = [18,0,0,15,[-1,0]];
	buildings[0][10].description = "Stable";
	buildings[0][11].cost = [5,0,25,30,[16,10]];
	buildings[0][11].description = "Spice Plantation";
	buildings[0][12].cost = [5,0,10,7,[15,7.5]];
	buildings[0][12].description ="Silk Orchard";
	buildings[0][13].cost = [5,0,10,7,[12,7.5]];
	buildings[0][13].description ="Ebony Orchard";

	//SOCIAL
	buildings[1][0].cost = [0,0,0,0,[-1,0]];
	buildings[1][0].description = "House";
	buildings[1][1].cost = [4,0,0,5,[-1,0]];
	buildings[1][1].description = "Place by Houses. Gives Wellbeing";
	buildings[1][2].cost = [3,0,5,3,[-1,0]];
	buildings[1][2].description = "Place by Houses. Gives Gold";
	buildings[1][3].cost = [5, 2, 10, 0, [-1,0]];
	buildings[1][3].cost = [0, 0, 0, 0, [-1,0]];
	buildings[1][3].description = "Dock. Place by Water"; 
	buildings[1][4].cost = [12, 8, 75, 15,[-1,0]];
	buildings[1][4].description = "Temple";
	buildings[1][5].cost = [5, 5, 50, 5,[-1,0]];
	buildings[1][5].description = "+15 Max Size";
	buildings[1][6].cost = [100, 40, 600, 70,[-1,0]];
	buildings[1][6].description = "Manor";
	buildings[1][7].cost = [10, 2, 30, 7,[-1,0]];
	buildings[1][7].description = "Refines Luxury Woods";
	buildings[1][8].cost = [5, 4, 50, 10,[-1,0]];
	buildings[1][8].description = "Refines Perfume";
	buildings[1][9].cost = [12, 2, 25, 10,[-1,0]];
	buildings[1][9].description = "Refines Hides";
	buildings[1][10].cost = [14, 8, 50, 12,[-1,0]]; 
	buildings[1][10].description = "Visitor Housing and drinks";
	buildings[1][11].cost = [10, 4, 25, 10,[-1,0]];
	buildings[1][11].description = "Turns food into wine";
	buildings[1][12].cost = [8,4,65,10,[-1,0]];
	buildings[1][12].description = "Weavery";
	buildings[1][13].cost = [999, 999, 999, 999,[-1,0]];
	buildings[1][13].description = "Library - Incomplete";
	buildings[1][14].cost = [999, 999, 999, 999,[-1,0]];
	buildings[1][14].description = "University - Incomplete";
	
	buildings[2][0].cost = [1,0,0,1,[-1,0]];
	buildings[2][0].description = "Palisade";
	buildings[2][0].effect = function(m){ map[tS[0]][tS[1]].pass = m-1;}
	buildings[2][1].cost = [2,0,0,2,[-1,0]];
	buildings[2][1].description = "Low Wall";
	buildings[2][1].effect = function(m){ map[tS[0]][tS[1]].pass = m-1;}
	buildings[2][2].cost = [2,2,0,2,[-1,0]];
	buildings[2][2].description = "High Wall";
	buildings[2][2].effect = function(m){ map[tS[0]][tS[1]].pass = m-1;}
	buildings[2][3].cost = [4, 4, 0, 4,[-1,0]];
	buildings[2][3].description = "Gate House";
	buildings[2][3].effect = function(m){ map[tS[0]][tS[1]].zone = -1; p = Roads(p); p = scanRoads(p, tS[0], tS[1]);}
	buildings[2][4].cost = [4, 4, 0, 6,[-1,0]];
	buildings[2][4].description = "moat";
	buildings[2][4].effect = function(m){ map[tS[0]][tS[1]].elevation = -1; map[tS[0]][tS[1]].pass = m-1;}
	buildings[2][5].cost = [5, 10, 0, 15,[-1,0]];
	buildings[2][5].description = "Guard Tower";
	buildings[2][6].cost = [999, 999, 999, 999,[-1,0]];
	buildings[2][6].description = "Small Keep-Inc";
	buildings[2][7].cost = [999, 999, 999, 999,[-1,0]];
	buildings[2][7].description = "castle-Inc";
	//Offense
	buildings[3][0].cost = [3,0,0,3,[-1,0]];
	buildings[3][0].description = "Recruitment Yard";
	buildings[3][0].effect = function(m){ }
	buildings[3][1].cost = [5,0,0,5,[-1,0]];
	buildings[3][1].description = "Infantry Yard";
	buildings[3][1].effect = function(m){ }
	buildings[3][2].cost = [6,0,0,5,[-1,0]];
	buildings[3][2].description = "Archer Yard";
	buildings[3][2].effect = function(m){ }
	buildings[3][3].cost = [7,0,0,10,[-1,0]];
	buildings[3][3].description = "Cavalry Yard";
	buildings[3][3].effect = function(m){ }
	buildings[3][4].cost = [12,8,50,12,[-1,0]];
	buildings[3][4].description = "Siege Yard";
	buildings[3][4].effect = function(m){ }
	buildings[3][5].cost = [8,4,25,5,[-1,0]];
	buildings[3][5].description = "It and adjacent houses garrison troops";
	buildings[3][5].effect = function(m){ }
	buildings[3][6].cost = [999,3,1,999,[-1,0]];
	buildings[3][6].description = "Mercenary Yard - Incomplete";
	buildings[3][6].effect = function(m){ }
	buildings[3][7].cost = [999, 5, 0, 999,[-1,0]];
	buildings[3][7].description = "Military Academy - Incomplete";
	buildings[3][7].effect = function(m){ }
	
	
	var weapons = [];
	var infWeapons = [];
	var archWeapons = [];
	var cavWeapons = [];
	var allWeps = [];
	infWeapons[0] = new Weapon(); infWeapons[1] = new Weapon();infWeapons[2] = new Weapon(); infWeapons[3] = new Weapon();infWeapons[4] = new Weapon(); infWeapons[5] = new Weapon();
	infWeapons[0].name = "Spear"; infWeapons[0].upkeep = .015;
	infWeapons[0].attack = 4;
	infWeapons[0].defense = 9;
	infWeapons[0].pierce = 2;
	infWeapons[0].hands = 2;
	infWeapons[0].cost = [.2, .07];
	 
	infWeapons[1].name = "Axe"; infWeapons[1].upkeep = .085;
	infWeapons[1].attack = 6;
	infWeapons[1].pierce = 1;
	infWeapons[1].cost = [.1, .12];
	 
	infWeapons[2].name = "Sword"; infWeapons[2].upkeep = .1;
	infWeapons[2].attack = 4;
	infWeapons[2].defense = 3;
	infWeapons[2].pierce = 1;
	infWeapons[2].cost = [.04, .2];
	
	infWeapons[3].name = "Halberd"; infWeapons[3].upkeep = .125;
	infWeapons[3].attack = 8;
	infWeapons[3].defense = 5;
	infWeapons[3].skirmish = 0;
	infWeapons[3].pierce = 4;
	infWeapons[3].hands = 2;
	infWeapons[3].cost = [.2, .1];
	
	infWeapons[4].name = "Short Spear";
	infWeapons[4].attack = 3;
	infWeapons[4].defense = 3;
	infWeapons[4].pierce = 2;
	infWeapons[4].cost = [.1, .04];
	
	infWeapons[5].name = "Maul"; infWeapons[5].upkeep = .135;
	infWeapons[5].attack = 8;
	infWeapons[5].pierce = 8; 
	infWeapons[5].hands = 2;
	infWeapons[5].cost = [.16, .2];
	 
	archWeapons[0] = new Weapon(); archWeapons[1] = new Weapon(); archWeapons[2] = new Weapon(); archWeapons[3] = new Weapon(); archWeapons[4] = new Weapon();
	archWeapons[0].name = "Longbow"; archWeapons[0].upkeep = .1;
	archWeapons[0].attack = 4;
	archWeapons[0].skirmish = 10; //6.25 = 25dmg
	archWeapons[0].pierce = 1; archWeapons[0].type = 1;
	archWeapons[0].hands = 2;
	archWeapons[0].cost = [.2, .1];
	
	archWeapons[1].name = "Crossbow"; archWeapons[1].upkeep = .225;
	archWeapons[1].attack = 6;
	archWeapons[1].skirmish = 6; archWeapons[1].type = 1;
	archWeapons[1].pierce = 5;
	archWeapons[1].hands = 2;
	archWeapons[1].cost = [.3, .2];
	
	archWeapons[2].name = "Shortbow";
	archWeapons[2].attack = 4; archWeapons[2].upkeep = .1;
	archWeapons[2].skirmish = 5;  archWeapons[2].type = 1;
	archWeapons[2].pierce = 3;
	archWeapons[2].hands = 2;
	archWeapons[2].cost = [.15, .09];
	
	archWeapons[4].name = "Sling";
	archWeapons[4].attack = 3; //3.75 = 11.25
	archWeapons[4].skirmish = 4;  archWeapons[4].type = 1;
	archWeapons[4].pierce = 1;
	archWeapons[4].cost = [.025, .02];
	
	archWeapons[3].name = "Knife";
	archWeapons[3].upkeep = 0;
	archWeapons[3].attack = 1;
	archWeapons[3].hands = 2;
	archWeapons[3].pierce = 1;
	archWeapons[3].cost = [0.1, 0.02];
	
	cavWeapons[0] = new Weapon(); cavWeapons[1] = new Weapon(); cavWeapons[2] = new Weapon(); cavWeapons[3] = new Weapon();
	
	cavWeapons[0].name = "Lance"; cavWeapons[0].upkeep = .25;
	cavWeapons[0].attack = 18;
	cavWeapons[0].skirmish = 0;
	cavWeapons[0].pierce = 3;
	cavWeapons[0].hands = 2;
	cavWeapons[0].cost = [.35, .2]
	
	cavWeapons[1].name = "Scimitar"; cavWeapons[1].upkeep = .085;
	cavWeapons[1].attack = 6;
	cavWeapons[1].defense = 2;
	cavWeapons[1].cost = [.07, .13]
	
	cavWeapons[2].name = "Bow"; cavWeapons[2].upkeep = .045;
	cavWeapons[2].attack = 3;
	cavWeapons[2].pierce = 4;
	cavWeapons[2].hands = 2; cavWeapons[2].type = 1;
	cavWeapons[2].skirmish = 7;
	cavWeapons[2].cost = [.15, .15]
	
	cavWeapons[3].name = "War Pick"; cavWeapons[3].upkeep = .135;
	cavWeapons[3].attack = 2;
	cavWeapons[3].pierce = 8;
	cavWeapons[3].hands = 1;
	cavWeapons[3].cost = [.12, .17]

	allWeps[0] = new Weapon(); allWeps[1] = new Weapon(); allWeps[2] = new Weapon(); allWeps[3] = new Weapon();
	allWeps[0].name = "Shield";
	allWeps[0].attack = 0;
	allWeps[0].defense = 5;
	allWeps[0].skirmish = 10;
	allWeps[0].cost = [.1, .05];
	
	allWeps[1].name = "Javelin";
	allWeps[1].attack = 3;
	allWeps[1].defense = 0;
	allWeps[1].skirmish = 4; 
	allWeps[1].pierce = 3;
	allWeps[1].cost = [.1, .05];
	
	allWeps[2].name = "Halfbow"; allWeps[2].upkeep = .05;
	allWeps[2].hands = 1.5;
	allWeps[2].pierce = 3;
	allWeps[2].attack = 2; allWeps[2].type = 1;
	allWeps[2].skirmish = 9; //6 = 12 dmg
	allWeps[2].cost = [.1, .07];
	
	allWeps[3].name = "Mace"; allWeps[3].upkeep = .12;
	allWeps[3].attack = 4; allWeps[3].type = 2;
	allWeps[3].pierce = 6;
	allWeps[3].cost = [.12, .135]
	
	for(let i = 0; i < allWeps.length; i++){
		infWeapons.push(allWeps[i]);
		if(allWeps[i].type  < 2){ archWeapons.push(allWeps[i]); }
		cavWeapons.push(allWeps[i]);
	}
	weapons.push(infWeapons);
	weapons.push(archWeapons);
	weapons.push(cavWeapons);
	var tiers = ["Abysmal", "Poor", "Average", "Decent", "Competent", "Great", "Excellent", "Brilliant"];
	function genName(male){
		var name = "";
		var mBegs = ["Le", "Ke", "Je", "Be", "Me", "Ko", "Ye", "E", "Cy", "Ce", "Ci", "A"];
		var mMids = ["k", "r", "ke", "re", "vin", "t", "s", "d", "v"];
		var mEnds = ["os", "ih", "o", "it", "en", "in", "de", "des", "re", "ro", "ov", "us", "on", "ic", "am"];
		
		var fBegs = [["A", "E", "O", "Ke","Ti", "Di", "De", "Li", "Ki", "Ve", "Ma", "Ni", "Ari", "So", "Ky"], ["Al", "Ev", "Ky"]];
		var fMids = [["or", "ex", "an"], ["r", "n", "c", "s", "r", "ret", "ken", "y"]];
		var fEnds = ["a", "i", "ei", "is", "ia", "a", "iev", "ana", "in"];
		if(male){
			return "" + mBegs[Math.floor(Math.random() * mBegs.length)] + "" + mMids[Math.floor(Math.random() * mMids.length)] + "" + mEnds[Math.floor(Math.random() * mEnds.length)];
		}
		else{
			var lon = Math.random();
			if(lon > fBegs[0].length/(fBegs[0].length + fBegs[1].length)){ lon = 1; } else { lon = 0; }
			name += fBegs[lon][Math.floor(Math.random() * fBegs[lon].length)];
			lon = (lon+1) % 2;
			name += fMids[lon][Math.floor(Math.random()* fMids[lon].length)];
			lon = 0;
			name += fEnds[lon][Math.floor(Math.random()* fEnds[lon].length)];
			return name;
		}
	}
	function cap(string) { 
	  return string[0].toUpperCase() +  
		string.slice(1); 
	} 
	var rgbToHex = function(rgb) { 
	  var hex = Number(rgb).toString(16);
	  if (hex.length < 2) {
		   hex = "0" + hex;
	  }
	  return hex;
	};
	var fullColorHex = function(r,g,b) {   
	  var red = rgbToHex(r);
	  var green = rgbToHex(g);
	  var blue = rgbToHex(b);
	  return red+green+blue;
	};
	
	function genCommander(){
		var skills = [["Attacker", "Leader", "Tactician"],["Defender", "Organizer", "Strategist"]];
		var level = 6;
		let rsd = Math.random();
		if(rsd < .05){ level = 0; }
		else if(rsd < .1){
			level = 1;
		}
		else if(rsd < .35){
			level = 2;
		}
		else if(rsd < .7){
			level = 3;
		}
		else if(rsd < .9){
			level = 4;
		}
		else if(rsd < .95){
			level = 5;
		}
		let gen = Math.round(Math.random());
		let name = genName(gen);
		let co = new Commander(gen, name, level);
		co.trait = skills[Math.round(Math.random())][Math.floor(3*Math.random())];
		co.description ="";
		if(gen){
			co.description += "He ";
		}
		else { co.description += "She ";}
		co.description += "is a " + tiers[level] + " " + co.trait;
		return co;
	}
	function srand(seed){ //Returns a seed;
		let a = 1103515245;
		let c = 12345;
		const m = Math.pow(2,32);
		return ((a*seed + c) % m);
	}
	function rand(seed){ //Returns a decimal
		let a = 1103515245;
		let c = 12345;
		const m = Math.pow(2,32);
		return ((a*seed + c) % m)/m;
	}
	var treasures = [];
	var index = 0;
	var legends = [];
	var bCount = 0; var pCount = 0;
	var gears = [];
	var materials = [ ["Ebony", "Petrified Wood", "Oak"], ["Ruby", "Emerald", "Jade", "Agate", "Garnet"], ["Ivory", "Ivory", "Horn", "Horn", "Antler", "Antler"], ["Flint", "Obsidian", "Chert"], ["Copper"], ["Bronze"], ["Iron", "Steel"], ["Gold"]];
	let animals = ["Wolf", "Lion", "Elk", "Tiger", "Bear", "Deer", "Bison"]
	for(let i = 0; i < animals.length; i++){
		materials[2].push((animals[i]+" Bone"));
	}
	var mats = ["Wooden", "Crystal", "Bone", "Stone", "Copper", "Bronze", "Iron", "Golden"];
	
	var sats = ["Cursed", "Demonic", "Evil", "Enchanted", "Arcane", "Magic", "Divine", "Blessed", "Holy", "Legendary", "Ancient", "Antique", "Old"];
	var ordinals = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh"];
	var adjs = ["masterwork",  "well made", "fine", "ornate", "elegant", "exquisite"];
	function genArtifacts(){
		for(let i = index; i < 240; i++){ //Generate Random Treasures
			treasures[i] = new Treasure();
			let rT = Math.floor(Math.random()*3);
			let rI = Math.floor(Math.random() * weapons[rT].length);
			treasures[i].wI = [rT, rI];
			treasures[i].quality = 2 + Math.round(Math.random()*3);
			treasures[i].material = Math.floor(Math.random() * mats.length); //Wood, Bone, Stone, Copper, Bronze, Iron, Gold
			treasures[i].specMat = Math.floor(materials[treasures[i].material].length*Math.random());
			let adjSeed = Math.floor(Math.random()*adjs.length);
			if(adjSeed < 3){
				treasures[i].description[0] = "A " + adjs[adjSeed];
			}
			else { treasures[i].description[0] = "An " + adjs[adjSeed]; }
			if(weapons[rT][rI].type != 1){
				let mVerbs = [" made of ", " wrought of ", " of ", " crafted of "]
				treasures[i].description[0]+=" "+weapons[rT][rI].name+mVerbs[Math.floor(Math.random()*mVerbs.length)]+materials[treasures[i].material][treasures[i].specMat];
			}
			else{
				let word = "";
				switch(weapons[rT][rI].name){
					case "Longbow": 
					case "Shortbow": 
					case "Halfbow": 
					case "Bow": word = "Arrows"; break;
					case "Crossbow": word = "Bolts"; break;
					case "Sling": word = "Bullets"; break;
				}
				treasures[i].description[0] += " " + weapons[rT][rI].name+" with " + word + " of " +materials[treasures[i].material][treasures[i].specMat];
			}
			if(Math.random() > .5){
				let seed = Math.random();
				if(seed < .4){
					treasures[i].legend = genName(1);
				}
				else if( seed < .75 || legends.length == 0){
					treasures[i].legend = genName(0);
				}
				else {
					treasures[i].legend = legends[Math.floor(Math.random() * legends.length)];
				}
				if(legends.indexOf(treasures[i].legend) == -1){
					legends.push(treasures[i].legend);
					gears[legends.length-1] = 1;
				}
				else{
					gears[legends.indexOf(treasures[i].legend)]++;
					treasures[i].quality += Math.min(2, Math.floor(Math.floor(gears[legends.indexOf(treasures[i].legend)]/1.5)));
				}
				treasures[i].description[2] = "The " + ordinals[gears[legends.indexOf(treasures[i].legend)]-1] + " work of " + treasures[i].legend;
				if(gears[legends.indexOf(treasures[i].legend)] >= 12){
					treasures[i].description[2] = "One of the many great works of " + treasures[i].legend;
				}
				if(gears[legends.indexOf(treasures[i].legend)] > 1){
					
				}
				treasures[i].name = mats[treasures[i].material] + " " + weapons[rT][rI].name + " of " + treasures[i].legend;
			}
			else {
				treasures[i].status = Math.min(sats.length-1, Math.floor(Math.random() * (sats.length+2)));
				treasures[i].name = sats[treasures[i].status] + " " + mats[treasures[i].material] + " " + weapons[rT][rI].name;
				if(treasures[i].status <= 8){
					let verbs = [["is shrouded in"], ["glows with"], ["shines"], ["is basked in", "glows", "radiates", "is surrounded by"]];
					let auras = [["Darkness", "Shadow", "Malice", "Unease", "Dread", "Hatred"], ["Strong Magic", "Energy", "Dark Magic", "Eldritch Power"], ["Light", "Power", "Purity"]]; 
					treasures[i].description[2] = "It ";
					let vaInd = Math.floor(Math.min(7, treasures[i].status)/3);
					if(Math.random() < .2){
						treasures[i].description[2] += verbs[vaInd][0] + " an Aura of ";
					}
					else{
						treasures[i].description[2] += verbs[3][Math.floor(Math.random()*3)]+ " an Aura of ";
					}
					treasures[i].description[2] += auras[vaInd][Math.floor(Math.random()*auras[vaInd].length)];
				}
				else if(treasures[i].status == 9){
					treasures[i].quality+=2;
					treasures[i].description[2] = "An artifact of great renown and without equal";
				}
				else if(treasures[i].status == 10){
					treasures[i].description[2] = "A once-legendary item from antique times";
				}
				else if(treasures[i].status == 11){
					treasures[i].quality--;
					treasures[i].description[2] = "A prized item from long ago, now tarnished";
				}
				else if(treasures[i].status == 12){
					treasures[i].quality-=2;
					treasures[i].description[2] = "An ancient item which has fallen into disrepair";
				}
			}
			treasures[i].description[1] = "It is ";
			switch(treasures[i].quality){
				case 0: treasures[i].description[1] += "barely recognizable at all"; bCount++; break;
				case 1: treasures[i].description[1] += "in shambles"; break;
				case 2: treasures[i].description[1]	+= "in poor condition"; break;
				case 3: treasures[i].description[1] += "in decent condition"; break;
				case 4: treasures[i].description[1] += "in great condition"; break;
				case 5: treasures[i].description[1] += "in perfect condition"; break;
				case 6: treasures[i].description[1] += "beyond perfection or compare"; break;
				case 7: treasures[i].description[1] = "The gods weep in jealousy of its quality"; pCount++; break;
			}
		}
		console.log(bCount);
		console.log(pCount);
	}
	function createID(unit, key){
		return "" + unit.owner + unit.num + unit.maxSize + unit.weapons[0] + unit.weapons[1] + unit.stats[0] + unit.stats[1] + unit.stats[2] + unit.material + key;
	}
	function Unit(){
		this.state = ["", "", false]; //Deserting, Replenishing, Feeding, [patrolling,etc], fighting or not
		this.morale = [1,1];
		this.experience = 0;
		this.level = 1;
		this.commander = -1;
		this.type = 0;
		this.trebuchet = false;
		this.maxSize = 0;
		this.battleReport = [0,0,0,0];
		this.y;
		this.x;
		this.ID = "";
		this.num = 0;
		this.path = [];
		this.patrol = [];
		this.material = 0; //wood, stone, copper, bronze, iron
		this.pts = 12;
		this.owner = -1;
		this.upkeep = 0;
		this.name = "";
		this.nextMove = 0;
		this.weapons = [0, 4];
		this.stats = [0, 0, 0, 0, 0]; //Att, Def, Skirmish, Mobility, Foraging
		this.size = 0;
		this.food = 0;
		this.idle = 0;
	}
	function Ship(){
		this.nextMove = 0;
		this.path = [];
		this.num = -1;
		this.health = [.1, 1]
		this.y;
		this.x;
		this.lastDir = -1;
		this.pts = 50;
		this.stats = [0, 0, 0, 0, 0, 0]; //Att, Def, Cargo, Transp, Fishing, Speed
		this.cargo =  new Resources();
		this.costs = [0, 0, 0];
		this.carrying = 0;
		this.unloading = false;
		this.fighting = false;
		this.transport = [];
		this.owner = -1;
	}
	function Siege(){
		this.path = [];
		this.structure = 1;
		this.fighting = false;
		this.y;
		this.x;
		this.stats = [];
		this.owner;
	}
	function Tile()
	{
		this.aiClaimable = true;
		this.damage = 0;
		this.rPerc = 0;
		this.it = -1;
		this.resource = -1;
		this.curred = 0;
		this.owner = -1;
		this.manager = -1;
		this.army = -1;
		this.navy = -1;
		this.heat = 1;
		this.elevation = .1;
		this.wetness = 0;
		this.pass = 0;
		this.type = 'g';
		this.id = [-1,-1];
		this.checked = -1;
		this.building = [-1, -1, 0, [false]];
		this.road = -1;
		this.zone = -1;
		this.zStrength = 0;
	}
	function Noble()
	{
		this.name = "";
		this.seed = 0;
		this.skill = 0;
		this.gender = 1;
		this.Rand = function(){ let r = rand(this.seed); this.seed = srand(this.seed); return r; }
		this.area = 0;
		this.branch = 0;
		this.position = 0;
		this.posString = "";
		this.loyalties = [];
	}
	function Resources(w1, s1, f1, p1, wb, mc1, m1){ //Copper Ore, Bronze Ore, Iron Ore, Hides, Perfume, Luxury Wood
	var w = w1 || 0; var s = s1 || 0; var f = f1 || 0; var p = p1 || 0; var b = wb || 0; var mC = mc1 || 0; var m = m1||0;
		this.wood = w; 
		this.stone = s;
		this.food = f;
		this.population = p;
		this.wellbeing = b;
		this.rHide = 0;
		this.rWood = 0;
		this.rPerf = 0;
		this.rSilk = 0;
		this.hides = 0;
		this.woods = 0;
		this.perfs = 0;
		this.spices = 0;
		this.silks = 0;
		this.pearls = 0;
		this.copper = [0,0];
		this.bronze = [0,0];
		this.iron = [0,0];
		this.marketCap = mC;
		this.culture = 0;
		this.knowledge = 0;
		this.gold = 0;
		this.manpower = m;
		this.horses=0;
		this.research=0;
		this.culture=0;
	}
	function Domain(){
		this.owner = [0, -1];
		this.dead = false;
		this.name = "";
		this.territory = [];
		this.taxes = [50, 50, 50, 50, 50, 50]; //Wood, Food, Gold, Copper, Bronze, Iron
		this.size = 0;
		this.maxSize = 600;
		this.buildingNums = [[], [], [], []];
		this.development = 0;
		this.income = new Resources();
		this.res = new Resources();
		this.max = new Resources(2, 0, 50, Infinity, Infinity, Infinity, 3);
		this.rMax = new Resources(15, Infinity, 200, 25, Infinity, 25);
	}
	function AI(){
		this.startTile = [];
		this.bloodline = "";
		this.armies = [];
		this.defenseLevel = 0;
		this.manpower = 100;
		this.gold = 30;
		this.zones = [];
		this.territory = [];
		this.armies = [];
		this.manors = [];
		this.roads = [];
		this.goals = [];
		this.defSpots = [[],[],[]]; //Production Buildings, Barracks, Guard Towers
		this.turn = 0;
		this.index = 0;
		this.claimGoal = [];
		this.size = 0;
		this.color = "red";
	}
	function Commander(g,n,v){
		this.loyalty = 100;
		this.trait = "";
		this.description = "";
		this.level = v;
		this.experience = 0;
		this.levels = [0,0,0];
		this.name =n;
		this.gender=g;
	}
	function Player(){
		this.bloodline = "";
		this.following = -1;
		this.nFollowing = -1;
		this.sprites = true;
		this.navies = [];
		this.armies = [];
		this.commanders = [];
		this.sSplits = [4,4,4,4,4,4,5,5,5,25,23,35,15.6];//perfumes, lwoods, spices, pearls, silk, hides, iron, bronze, copper, manpower, wood, stone, food
		this.bSplits = [4,4,4,4,4,4,5,5,5,8,3,10,-13];
		this.draw = "normal";
		this.manpower = 100;
		this.gold = 0;
		this.culturePts = 50;
		this.researchPts = 0;
		this.zones = [];
		this.territory = [];
		this.manors = [];
		this.curredTwo = 0;
		this.roads = [];	
		this.menView = [0, [-1, -1, 0], -1];
		this.appraising = false;
		this.action = "claiming";
		this.turn = 0;
		this.index = -1;
		this.size = 0;
		this.color = "red";
		this.tS = [];
		this.yView = 0;
		this.xView = 0;
		this.zoom = 10;
		this.vassals = [];
		this.government = [[], [], []];
		this.culture = new Culture;
	}
	function genAdministrator(a){
		let p = a;
		let areas = ["Commerce", "Agriculture", "Defense"];
		let positions = ["Secretary of", "Minister of", "Bookkeeper of", "Record Keeper of"];
		let n = new Noble();
		n.seed = Math.floor(Math.random()*Math.pow(2,32));
		if(p.culture.womensRights >= .4){
			n.gender = Math.round(n.Rand());
			if(p.culture.womensRights > .6){
				n.gender = 0;
			}
		}
		n.skill = 2+Math.floor(n.Rand() * 5);
		n.name = genName(n.gender);
		n.area = Math.floor(n.Rand()*3);
		n.branch = Math.min(Math.floor(n.Rand()*8));
		if(n.branch < 3){
			n.branch = 0;
			n.posString = "Senator";
		}
		else if(n.branch >= 4){
			n.branch = 2;
			n.position = Math.floor(n.Rand()*positions.length);
			n.posString = positions[n.position] + " "+areas[n.area];
		}
		else {
			n.branch = 1; 
			n.posString = "Council" + ((n.gender == 0) ? 'woman' : 'man');
		}
		p.government[n.branch].push(n);
		return p;
	}
	function getValue(y, x, r, playerParam){
		let p = playerParam;
		var vals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Wood, Food, 2-Manpower, Population, 4-Gold, 5-Well Being, Stone, market cap // 8-culture, 9-tech, 10- horses
		var imVals = [0, 0, 0]; //Wood, Food, Manpower
		var rmVals = [0, 0, 0, 0, 0, 0]; //Wood, Food, Population, size, market cap, horses
		var luxVals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Copper Ore, Bronze Ore, 2Iron Ore, rHd, rLux, 5-rPerf, 6-Copper, Bronze, Iron, Hides, 10-Perf, Lux, 12-rSk, Sk, 14-Sp
		let month = Math.floor(day/100);
		if(map[y][x].building[0] == 0){
			if(map[y][x].damage > 0){
				map[y][x].damage -= .05;
			}
			switch(map[y][x].building[1]){
				case 0:vals[3]+=.05; vals[2] += .01;break; //Road
				case 1:vals[1] += 10; vals[2] += .025; vals[3] += .2;
				for(let t = -1; t < 2; t+=2){
					for(let u = 0; u < 2; u++){
						if(u == 0){ temp = safeC(y+t); temp1 = x;} else { temp = y; temp1 = safeC(x+t); }
						if(map[temp][temp1].building[0] == 0){
							switch(map[temp][temp1].building[0] == 1){
								case 1: vals[1]+= 1; vals[2] += .00125; break;
								case 4: vals[1]+= 3; vals[2] += .005; rmVals[1] += 25; break;
							}
						}
					}
				}
				break; //Farm
				case 2:vals[1] += 6; vals[5] += .2; vals[0] += .06; 
				for(let t = -1; t < 2; t+=2){
					for(let u = 0; u < 2; u++){
						if(u == 0){ temp = safeC(y+t); temp1 = x;} else { temp = y; temp1 = safeC(x+t); }
						if(map[temp][temp1].building[0] == 0){
							switch(map[temp][temp1].building[0] == 1){
								case 1: vals[1]+= .75; break;
								case 4: vals[1]+= 3; rmVals[1] += 25; break;
							}
						}
					}
				}break; //Orchard
				case 3:imVals[0] += 1.25; vals[2] += .05;
				let wInc = 0;
				for(let i = -2; i < 3; i++){
					for(let j = -2; j < 3; j++){
						if(map[safeC(y+i)][safeC(x+j)].resource >= 11  && map[safeC(y+i)][safeC(x+j)].resource <= 13){
							luxVals[map[safeC(y+i)][safeC(x+j)].resource-8] += .018;
						}	
						else if(map[safeC(y+i)][safeC(x+j)].resource >= 15){
							if(map[safeC(y+i)][safeC(x+j)].resource == 15){
								luxVals[12] += .016;
							}
							else{
								luxVals[14] += .016;
							}
						}
						if(map[safeC(y+i)][safeC(x+j)].type == 'f'){
							wInc+=.7;
						}
						else if(map[safeC(y+i)][safeC(x+j)].building[0] == 0 && map[safeC(y+i)][safeC(x+j)].building[1] == 2){
							wInc += .7;
						}
					}
				}
				vals[0] += Math.sqrt(wInc)/10;
				break; //Lumber Mill
				case 4:rmVals[1] += 300; imVals[1] += 100; vals[2]+=.05; break; //Granary
				case 5:rmVals[0] += 15; imVals[1] += 25; rmVals[1] += 200; rmVals[2]+=2;vals[2]+=.05; break; //Warehouse
				case 6:vals[6] += .25; vals[2] -= .5; vals[5] -= .75; var temp, temp1; //Mine
				for(let t = -1; t < 2; t++){
					for(let u = 0; u < 2; u++){
						if(!(u == 1 && t == 0)){
							if(u == 0){ temp = safeC(y+t); temp1 = x;} else { temp = y; temp1 = safeC(x+t); }
							if(map[temp][temp1].building[0]==1){
								vals[5]-=.3;
							}
							if(map[temp][temp1].resource < 11){
								if(map[temp][temp1].resource < 7){
									vals[6] += .1;
								}
								else {
									if(r>=map[temp][temp1].resource-7){
										luxVals[map[temp][temp1].resource-7] += .075+(map[temp][temp1].resource-6)*.075;
									}
									else if(map[temp][temp1].resource == 10){//gold
										vals[5] -= .5;
										vals[4] += 17;
									}
								}
							}
						}
					}
				}
				break; //Quarry/Mine
				case 7: luxVals[6] += .1; luxVals[7] += .1; luxVals[8] += .1; break; //Metalworks
				case 8: vals[7] += 5; rmVals[4] += 25; break; //Market
				case 9: vals[7] += 3; vals[3] += .25; rmVals[2] += 1.5; imVals[2] += .1; rmVals[4] += 5;  //bazaar s
				for(let i = -1; i < 2; i++){
					for(let j = -1; j < 2; j++){
						if(!(i==0&&j==0)){
							let b0 = map[safeC(y+i)][safeC(x+j)].building[0];
							let b1 = map[safeC(y+i)][safeC(x+j)].building[1];
							if(b0==0&&b1==9){
								vals[4]+=.75;
								imVals[2] += .2;
							}
						}
					}
				}
				break; //Bazaar e
				case 10: //stable
				let hasChecked = [[y,x]];
				function isValid(y,x, cArr){
					if(!(map[y][x].building[0] == 2 && map[y][x].building[1] < 4)){
						for(let i = 0; i < cArr.length; i++) {
							if(cArr[i][0] == y && cArr[i][1] == x) {
								return false;  
							}
						}
						return true;
					}
					return false;   // Not found
				}
				let stack = [[y,x]]; let size = 0; let numStables = 0; let numTrash = 0;
				while(stack.length > 0 && ++size < 22){
					let loc = stack.pop();
					let yy = safeC(loc[0]); let xx = safeC(loc[1]);
					if(map[yy][xx].building[0] == 0 && map[yy][xx].building[1] == 10){
						numStables++;
					}
					else if(map[yy][xx].building[0] != -1){
						numTrash++;
					}
					else {
						switch(map[yy][xx].type){
							case 'c': break;
							case 'h': break;
							case 's': break;
							case 'i': break;
							case 'k': break;
							case 'h': break;
							case 'g': break;
							default: numTrash++; break;
						}
					}
					if(isValid(safeC(yy+1),xx,hasChecked)){
						stack.push([safeC(yy+1), xx]);
						hasChecked.push([safeC(yy+1), xx]);
					}
					if(isValid(safeC(yy-1),xx,hasChecked)){
						stack.push([safeC(yy-1), xx]);
						hasChecked.push([safeC(yy-1), xx]);
					}
					if(isValid(yy,safeC(xx+1),hasChecked)){
						stack.push([yy, safeC(xx+1)]);
						hasChecked.push([yy, safeC(xx+1)]);
					}
					if(isValid(yy,safeC(xx-1),hasChecked)){
						stack.push([yy, safeC(xx-1)]);
						hasChecked.push([yy, safeC(xx-1)]);
					}
				}
				if(size < 22 && numStables > 0){
					let modifier = (((size-numTrash)-numStables)/4);
					if(modifier > 1){
						modifier = Math.sqrt(modifier);
					}
					else{ modifier = Math.pow(modifier,2); }
					vals[10] += .25*modifier;
					
					rmVals[5] += Math.round(40*modifier);
					vals[1] += 30*modifier;
				}
				break; //Stable
				case 11: luxVals[14] += .5; vals[2] -= .5; break;//spice plantation
				case 12: luxVals[12] += .1;  break;//silk orchard
				case 13: luxVals[4] += .1; break; //lux wood orchard
			}
		}
		else if(map[y][x].building[0] == 1){ 
			switch(map[y][x].building[1]){
				case 0:rmVals[2] += 6.5; //house
				vals[3] += .25;	vals[4] += 1; vals[5] += .01; vals[2] += .01; imVals[2]+=.3;
				var temp, temp1;
				for(let t = -1; t < 2; t+=2){
					for(let u = 0; u < 2; u++){
						if(u == 0){ temp = safeC(y+t); temp1 = x;} else { temp = y; temp1 = safeC(x+t); }
						switch(map[temp][temp1].building[0]){
								case 0:vals[4]+=.2; break;
							case 1:vals[5]+=.025; if(map[temp][temp1].building[1] == 0 || map[temp][temp1].building[1] == 2){ vals[5] -= (.045 + .01*map[temp][temp1].building[1]); vals[2]+=.01; }break;
							case 2:vals[2]+=.05; vals[5] += .05; break;
							case 3:vals[2]+=.05; break;
						}
					}
				}
				break;
				case 1: vals[2] += .1; var temp, temp1; //plaza
				for(let t = -1; t < 2; t+=2){
					for(let u = 0; u < 2; u++){
						if(u == 0){ temp = safeC(y+t); temp1 = x;} else { temp = y; temp1 = safeC(x+t); }
						let b0 = map[temp][temp1].building[0];
						let b1 = map[temp][temp1].building[1];
						if((b0==1&&b1==0) || (b0==0&&b1==9)){
							vals[5]+=.15;
							if(b0==1){
								vals[5]+=.05;
							}
						}
					}
				}
				break;
				case 2: vals[5] -= .1; vals[2]+=.1; var temp, temp1; //tax office
				for(let t = -1; t < 2; t+=2){
					for(let u = 0; u < 2; u++){
						if(u == 0){ temp = safeC(y+t); temp1 = x;} else { temp = y; temp1 = safeC(x+t); }
						let b0 = map[temp][temp1].building[0];
						let b1 = map[temp][temp1].building[1];
						if((b0==1&&b1==0) || (b0==0&&b1==9)){
							vals[5] -= .35;
							vals[4] += 4;
						}
					}
				}
				break; //tax office
				case 3: vals[7]+=2; rmVals[4] += 25; break; //Dock
				case 4: if(typeof p.zones[map[y][x].zone] != 'undefined'){ vals[5] += Math.max(10,p.zones[map[y][x].zone].res.population * .005); }break; //temple
				case 5: rmVals[3] += 15; vals[4] -= 30; break; //admin building
				case 6: //Manor
				let stack = [[y,x]]; let spots = [];
				for(let i = -2; i < 3; i++){
					spots.push([]);
					for(let j = -2; j < 3; j++){
						spots[i+2][j+2] = -1;
					}
				}
				while(stack.length > 0){
					let loc = stack.pop();
					let yy = loc[0]; let xx = loc[1];
					if(yy-y > -2 && spots[yy-y+1][xx-x+2] == -1){
						m = map[safeC(yy-1)][safeC(xx)]
						if(m.elevation > .9 || m.elevation < 0 || (m.building[0] == 2 && m.building[1] <= 4)){
							spots[yy-y+1][xx-x+2] = 0;
						}
						else{
							spots[yy-y+1][xx-x+2] = 1;
							stack.push([yy-1, xx]);
						}
					}
					if(yy-y < 2 && spots[yy-y+3][xx-x+2] == -1){
						m = map[safeC(yy+1)][safeC(xx)]
						if(m.elevation > .9 || m.elevation < 0 || (m.building[0] == 2 && m.building[1] <= 4)){
							spots[yy-y+3][xx-x+2] = 0;
						}
						else{
							spots[yy-y+3][xx-x+2] = 1;
							stack.push([yy+1, xx]);
						}
					}
					if(xx-x > -2 && spots[yy-y+2][xx-x+1] == -1){
						m = map[safeC(yy)][safeC(xx-1)]
						if(m.elevation > .9 || m.elevation < 0 || (m.building[0] == 2 && m.building[1] <= 4)){
							spots[yy-y+2][xx-x+1] = 0;
						}
						else{
							spots[yy-y+2][xx-x+1] = 1;
							stack.push([yy, xx-1]);
						}
					}

					if(xx-x < 2 && spots[yy-y+2][xx-x+3] == -1){
						m = map[safeC(yy)][safeC(xx+1)]
						if(m.elevation > .9 || m.elevation < 0 || (m.building[0] == 2 && m.building[1] <= 4)){
							spots[yy-y+2][xx-x+3] = 0;
						}
						else{
							spots[yy-y+2][xx-x+3] = 1;
							stack.push([yy, xx+1]);
						}
					}
				}
				let walled = true;
				var mod = .2;
				for(let i = -2; i < 3; i++){
					for(let j = -2; j < 3; j++){
						if(spots[i+2][j+2] != -1){
							if(map[safeC(i+y)][safeC(j+x)].elevation > .6){
								vals[6] += 1;
							}
							if(map[safeC(i+y)][safeC(j+x)].elevation <= 0){
								vals[1] += 10;
								vals[5] -= .5;
							}
							switch(map[safeC(i+y)][safeC(j+x)].building[0]){
								case -1:
									switch(map[safeC(i+y)][safeC(j+x)].type){
										case 's': vals[0] += 1; vals[1] += 10; luxVals[3]++; break; //steppe
										case 'm': vals[6] += 1; break; //mountain
										case 'f': vals[0] += 1; vals[1] += 25; break; //forest
									}
								break;
								case 0: //eco buildings
									switch(map[safeC(i+y)][safeC(j+x)].building[1]){
										case 1: vals[1] += 45; vals[2]++; break; //Farm
										case 2: vals[1] += 20; vals[0] += 1; vals[5] += 2.5; break; //Orchard
										case 3: vals[0] += 1.5; rmVals[0] += 15; imVals[0] += 5; break; // Lumber mill
										case 4: imVals[1] += 150; rmVals[1] += 900; vals[1] += 10; break;  //Granary
										case 5: rmVals[1] += 450; rmVals[0] += 75; break; //Warehouse
										case 6: vals[6]+=2.5; vals[4] += 15; break; //Mine
										case 7: luxVals[6] += 1.5; luxVals[7] += 1.5; luxVals[8] += 1.5; break; //Metalworks
										case 8: vals[7] += 25; rmVals[4] += 75; vals[4] += 15;break; //market
									}
								break;
								case 1: //social buildings
									switch(map[safeC(i+y)][safeC(j+x)].building[1]){
										case 0: vals[2] += 3; vals[3] -= 3; break; //house
										case 1: vals[5] += 5; break; //plaza
										case 2: vals[4] += 30; vals[5] -= 4; break; //tax office
										case 3: vals[5]--; vals[1] += 15; vals[2]++; break; //dock
										case 4: vals[4] += 30; vals[5] -= 6; break; //temple
										case 5: rmVals[3] += 35; vals[4]-=45; vals[5]--; break; //Administration Office
										case 7: luxVals[10] += 2;
										case 8: luxVals[11] += 2;
										case 9: luxVals[9] += 2;
										case 9: luxVals[9] += 2; break; //Tanner
										case 10: vals[5] += .5; break; //Tavern
										case 11: vals[1] -= 25; vals[5]+=4; vals[8]+=3; break; //Winery
										case 12: luxVals[13] += 2; //weavery
									}
								break;
								case 2:
									switch(map[safeC(i+y)][safeC(j+x)].building[1]){
										case 0: vals[5] += .1; break;
										case 1: vals[5] += .1; vals[2] += .1; break;
										case 2: vals[5] += .2; vals[2] += .15; break;
										case 3: vals[4] += 10; break; vals[5] -= 1; break;
										case 4: vals[5] += .1; vals[1] += 5; break;
										case 5: vals[5] += .1; break;
										case 6: rmVals[1] += 400; break;
									}
								break;
								case 3:
									vals[2] += 2;
									vals[5] += 1;
								break;
							}
						}
						if(Math.abs(i) == 2 || Math.abs(j == 2)){
							if(spots[i+2][j+2] == 1){
								vals[5] -= 25;
								walled = false; i = 3; j = 3;
							}
						}
					}
				}
				if(walled){ //0:Wood, 1:Food, 2Manpower, 3Population, 4Gold, 5Well Being, 6Stone
					vals[2] += 1;
					vals[4] += 7.5;
					vals[5] += 1;
					mod = 1;
				}
				break; //manor
				case 7: luxVals[10] += 1; break; //perfumery
				case 8: luxVals[11] += 1; break; //woodworker's shop
				case 9: luxVals[9] += 1; break; //Tanner
				case 10: vals[1] += 10; imVals[2]++; vals[2] += .1; vals[3] += .5; vals[4] += 9; vals[5] += .5; rmVals[2] += 35; break; //Tavern
				case 11: vals[1] -= 20; vals[5] += 1.5; vals[8]++; break; //Winery
				case 12: luxVals[13] += 1.25;  break;//weavery
				case 13: vals[5]++; vals[8]++; vals[4] -= 15; break; //theatre
				case 14: vals[4]-=15; vals[5]+=.5; vals[8]+=.25; vals[9]+=.75; //library
				case 15: vals[4]-=30; vals[9]+=2;
			}
		}
		if(month == 0){
			vals[1] *= 1.1;
		}
		if(month == 2){
			vals[1] *= 1.5;
			vals[3] *= 1.33;
		}
		if(month == 3){
			vals[1] *= .5;
			if(vals[5] > 0){
				vals[5] *= .7;
			}
		}
		var allVals = [vals, imVals, rmVals, luxVals];
		if(r > 0 && (map[y][x].building[0] != 1 || map[y][x].building[1] != 6)){
			for(let i = 0; i < allVals.length; i++){
				for(let j = 0; j < allVals[i].length; j++){
					allVals[i][j] *= (1-(.25*r));
				}
			}
		}
		else if(map[y][x].building[0] == 1 && map[y][x].building[1] == 6){  //Manor Treasure Income
			for(let i = 0; i < allVals.length; i++){
				for(let j = 0; j < allVals[i].length; j++){
					allVals[i][j] *= mod;
				}
			}
			for(let i = 1; i < map[y][x].building[3].length; i++){ //["Cursed", "Demonic", "Evil", "Enchanted", "Arcane", "Magic", "Divine", "Blessed", "Holy", "Legendary", "Ancient", "Antique", "Old"];
				allVals[0][4] += 15*(2 + 1.55*map[y][x].building[3][i].quality);
				allVals[0][8] += map[y][x].building[3][i].quality/2;
				if(map[y][x].building[3][i].material == 5){
					allVals[0][4] += 90;
				}
				if(map[y][x].building[3][i].status > -1){
					if(map[y][x].building[3][i].status < 4){
						allVals[0][5] -= 6;
					}
					if(map[y][x].building[3][i].status > 6 && map[y][x].building[3][i].status < 9){
						allVals[0][4] -= 15*(1.55*map[y][x].building[3][i].quality);
						allVals[0][5] += 2 + 2*map[y][x].building[3][i].quality;
					}
					if(map[y][x].building[3][i].status == 9){
						allVals[0][5] += 1 + map[y][x].building[3][i].quality;
					}
				}
				else{
					allVals[0][5] += 4;
					if(map[y][x].building[3][i].material.legend == p.bloodline){
						allVals[0][4] += 60;
						allVals[0][5] += 3 + 1.5*map[y][x].building[3][i].quality;
					}
				}
			}
			if(map[y][x].building[3][0]){
				allVals[0][4] -= 450;
			}
			allVals[2][3] -= 150;
		}
		return allVals;
	}
	
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for(var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	function getTCost(y1,x1,u){
		if(u == -1){
			return 1;
		}
		let y = safeC(y1);
		let x = safeC(x1);
		let running = 4;
		switch(map[y][x].type){
			case 'f': running+=6/(1+u.stats[4]);
			case 'h': running+=6/(1+u.stats[4]);
			case 'k': running+=6/(1+u.stats[4]); break;
			case 'd': running+=6; break;
		}
		if(map[y][x].building[0] > -1){
			if(map[y][x].building[1] == 0 && map[y][x].building[0] == 0){
				running -= 2;
			}
			else{
				running += 2;
			}
		}
		if(map[y][x].owner > -1){
			if(map[y][x].owner == u.owner){
				running-=2;
			}
			else{
				running+=2;
			}
		}
		return running;
	}
	function pathfind(y1, x1, yD, xD, claiming, t, u){ //Uses A*
		let unit = u || -1;
		let naval = false;
		if(unit != -1){
			naval = unit.stats.length == 6;
		}
		if(!naval && (map[safeC(yD)][safeC(xD)].elevation <= 0 || map[safeC(yD)][safeC(xD)].elevation > .9 || map[safeC(yD)][safeC(xD)].type == 'd') && !map[yD][xD].building[0] == 4){
			return [];
		}
		let claimCheck = claiming || false;
		let turn = t || -1;
		let y = safeC(y1);
		let x = safeC(x1);
		function dist(ys,xs,y2,x2){
			let yI = safeC(ys);
			let xI = safeC(xs);
			if(naval){
				if(map[yI][xI].elevation > 0){
					return 999;
				}
			}
			else if(claiming){
				if(map[yI][xI].owner != t && map[yI][xI].owner != -1){
					return 999;
				}
				if((claiming && map[yI][xI].owner != t && map[yI][xI].owner != -1) || (map[yI][xI].elevation <= 0 || map[yI][xI].elevation > .85 || map[yI][xI].pass < 0 || map[safeC(yD)][safeC(xD)].type == 'd')){
					return 999;
				}
			}
			else if((map[yI][xI].elevation <= 0 || map[yI][xI].elevation > .85 || map[yI][xI].pass < 0 || map[safeC(yD)][safeC(xD)].type == 'd')&& map[yD][xD].building[0] != 4){
				return 999;
			}
			let dist = Math.abs(yI-y2) + Math.abs(xI-x2); //This is 'Manhattan dist', since units can't move diagonallyI
			if(dist > MAPSIZE/2){
				return Math.abs(MAPSIZE - dist);
			}
			return dist;
		}
		function spot(){
			this.parent = -1;
			this.coords = [-1, -1];
			this.distEnd = -1;
			this.distStart = -1;
			this.f = function() { return this.distEnd + this.distStart; };
		}
		let counter = 0;
		var open = [];
		open[0] = new spot();
		open[0].coords = [y, x];
		open[0].distEnd = dist(y, x, yD, xD);
		open[0].distStart = 0;
		var path = [];
		var arr = [];
		arr[safeC(y)] = [];
		arr[safeC(y)][safeC(x)] = -1;
		let min = 998;
		let minDex = -1;
		let parent;
		let vary = false;
		let shortDist = dist(y,x,yD,xD) < 100;
		while(open.length > 0){
			if(open.length > 25 && claiming){
				return [];
			}
			if(open.length > 1500){
				console.log("ERR: HIGH PATHFIND");
				console.log("y1: " + y1);
				console.log("x1: " + x1);
				console.log("yD: " + yD);
				console.log("xD: " + xD);
				return [];
			}
			min = 998;
			let lastI = -1;
			for(let i = 0; i < open.length; i++){
				if(open[i].f() <= min){
					min = open[i].f();
					if(vary){ min = Math.floor(min) + .1; }
					parent = open[i];
					lastI = i;
				}
			}
			open.splice(lastI, 1);
			if(lastI > -1){
				y = safeC(parent.coords[0]);
				x = safeC(parent.coords[1]);
				if(y == yD && x == xD){ //At Destination, return path
					while(parent.parent != -1){
						path.unshift(parent.coords);
						parent = parent.parent;
					}
					return path;
				}
				let a = -1;
				if(vary){ a = 1; }
				while((a > -2 && vary) || (!vary && a < 2)){
					let b = -1;
					if(vary){ b = 1; }
					while((b > -2 && vary) || (!vary && b < 2)){
						if(a == 0 || b == 0){
							if(!naval || ((a >= 0 || y > yD) && (b >= 0 || x > xD)) || shortDist){
								if(parent.parent == -1 || parent.parent.coords[0] != safeC(y+a) || parent.parent.coords[1] != safeC(x+b)){
									if(typeof arr[safeC(y+a)] == 'undefined' || typeof arr[safeC(y+a)][safeC(x+b)] == 'undefined'){
										arr[safeC(y+a)] = arr[safeC(y+a)] || [];
										arr[safeC(y+a)][safeC(x+b)] = -1;
										let s = new spot();
										s.coords = [safeC(y+a), safeC(x+b)]; s.parent = parent;
										s.distEnd = dist(y+a, x+b, yD, xD);
										s.distStart = parent.distStart+1;
										if(!naval){
											s.distStart += (getTCost(y+a, x+b, unit)-1);
										}
										if(s.distEnd + s.distStart < 999){
											open.push(s);
										}
									}
								}
							}
						}
						b++;
						if(vary){b-=2;}
					}
					a++;
					if(vary){a-=2;}
				}
				vary = !(naval && vary);
			}
		}
		return [];
	}

	function createRandomUnit(zoneIndex, owner, num, p){
		var loc = [0, 0];
		var stop = false;
		var counter = 0;
		do{
			counter++;
			loc = p.zones[zoneIndex].territory[Math.floor(Math.random()*p.zones[zoneIndex].territory.length)];
			if(counter > 2*p.zones[zoneIndex].territory.length){
				stop = true;
			}
		} while((map[loc[0]][loc[1]].owner != p.turn || map[loc[0]][loc[1]].army.length > 0) && !stop);
		if(!stop){
			let rebUnit = new Unit();
			rebUnit.owner = owner;
			rebUnit.upkeep = .5;
			rebUnit.num = num;
			rebUnit.y = loc[0]; rebUnit.x = loc[1];
			rebUnit.size = 10 + Math.floor(Math.random() * 25);
			rebUnit.food = rebUnit.size;
			rebUnit.maxSize = rebUnit.size;
			rebUnit.stats = [1, 0, 0, 0, Math.ceil(rebUnit.size/10)]
			while(rebUnit.pts > 5){
				rebUnit.stats[Math.floor(Math.random()*4)]++;
				rebUnit.pts--;
			}
			if(Math.random() < .5){
				rebUnit.type = 0;
				rebUnit.stats[1] += 3;
				rebUnit.weapons[0] = Math.floor(Math.random() * infWeapons.length);
				if(infWeapons[rebUnit.weapons[0]].hands < 2){
					do{
						rebUnit.weapons[1] = Math.floor(Math.random() * infWeapons.length);
					}while(infWeapons[rebUnit.weapons[1]].hands > 1);
				}
			}
			else {
				rebUnit.type = 1;
				rebUnit.stats[2] += 4;
				rebUnit.weapons[0] = Math.floor(Math.random() * archWeapons.length);
				if(archWeapons[rebUnit.weapons[0]].hands < 2){
					do{
						rebUnit.weapons[1] = Math.floor(Math.random() * archWeapons.length);
					}while(archWeapons[rebUnit.weapons[1]].hands > 1);
				}
			}
			rebUnit.ID = createID(rebUnit, p.gold);
			map[rebUnit.y][rebUnit.x].army = rebUnit;
			armyChange(rebUnit, false);
			if(owner == p.turn){
				p.armies[rebUnit.num] = rebUnit;
			}
			return true;
		}
		else {
			return false;
		}
	}
	function rebelCheck(a){
		let p = a;
		for(i = 0; i < p.zones.length; i++){
			if(p.zones[i].res.wellbeing < 0 && p.zones[i].res.population > 30){
				if(Math.random() < Math.abs(p.zones[i].res.wellbeing/1000)){
					let succ = createRandomUnit(i, -1, -1, a);
					drawDelta = true;
					if(succ){
						p.zones[i].res.population -= 15;
						p.zones[i].res.wellbeing += 15;
					}
				}
			}
		}
		return p;
	}
	function tHunt(){
		let num = 0;
		for(let i = p.manors.length-1; i >= 0; i--){
			let y = safeC(p.manors[i][0]);
			let x = safeC(p.manors[i][1]);
			if(map[y][x].building[0] != 1 || map[y][x].building[1] != 6){
				p.manors.splice(i,1);
			}
			else{
				if(map[y][x].building[3][0]){
					num++;
				}
			}
		}
		if(num > 0){
			socket.emit('tHunt', {
				s: p.turn,
				n: num,
			});
		}
	}
	function rIncome(a){
		let p = a;
		for(i = p.zones.length-1; i >= 0; i--){
				if(p.zones[i].territory.length > 0){
				p.zones[i].res.marketCap += p.zones[i].income.marketCap;
				p.zones[i].res.marketCap = Math.min(p.zones[i].res.marketCap, p.zones[i].rMax.marketCap);
				p.zones[i].income.wood *= .8 + (p.zones[i].taxes[0]/250); //Wood, Food, Gold, Copper, Bronze, Iron
				p.zones[i].income.food *= .8 + (p.zones[i].taxes[1]/250);
				p.zones[i].income.gold *= .8 + (p.zones[i].taxes[2]/250);
				p.zones[i].income.copper[0] *= .8 + (p.zones[i].taxes[3]/250);
				p.zones[i].income.bronze[0] *= .8 + (p.zones[i].taxes[4]/250);
				p.zones[i].income.iron[0] *= .8 + (p.zones[i].taxes[5]/250);
				for(let t = 0; t < p.zones[i].taxes.length; t++){
					if(p.zones[i].taxes[t] > 50){
						p.zones[i].taxes[t]-.5;
					}
				}
				let modif = 1;
				let month = Math.floor(day/100); //spring summer fall winter== 
				if((p.zones[i].size-p.roads[i].length) > p.zones[i].maxSize){
					if(p.zones[i].maxSize <= 1){
						modif = 0;
					}
					else {
						modif = .3 + .7 * (p.zones[i].maxSize/(p.zones[i].size-p.roads[i].length));
					}
				}
				p.zones[i].income.food -= (p.zones[i].res.food * .06)
				if(month == 2){
					p.zones[i].income.wellbeing += 2;
					p.zones[i].income.gold++;
				}
				if(month == 3){
					p.zones[i].income.manpower++;
					p.zones[i].income.wellbeing -= 2;
					p.zones[i].income.gold--;
				}
				p.zones[i].income.population *= 1.4 - .8*(p.zones[i].res.population/p.zones[i].rMax.population);
				p.zones[i].income.population = Math.min(5 + p.zones[i].res.population/15, p.zones[i].income.population);
				p.zones[i].income.manpower = Math.min(5 + p.zones[i].res.population/20, p.zones[i].income.manpower);
				
				if(p.zones[i].res.population > p.zones[i].rMax.population){ //overpopulated
					p.zones[i].income.gold -= 4;
					p.zones[i].income.population *= .9;
					p.zones[i].income.food -= (p.zones[i].res.population-p.zones[i].rMax.population);
					p.zones[i].income.wellbeing -= (2 + (p.zones[i].res.population - p.zones[i].rMax.population) * .75);
					p.zones[i].income.manpower++;
				}
				p.zones[i].income.food = Math.min(p.zones[i].income.food, p.zones[i].res.population/.4);
				p.zones[i].res.food += p.zones[i].income.food - p.zones[i].res.population * modif;
				if(p.zones[i].res.food <= 0 && p.zones[i].res.population > 18){ //famine
					if(p.zones[i].res.population > 40){
						p.zones[i].income.gold *= .25;
						p.zones[i].income.gold-= 2 + (.2 * p.zones[i].res.population);
					}
					else{
						p.zones[i].income.gold--;
					}
					p.zones[i].income.wellbeing -= 4 + (.4 * p.zones[i].res.population);
					p.zones[i].income.population *= .5;
					if(p.zones[i].res.population > 4){
						p.zones[i].income.population -= (4 + (.12 * p.zones[i].res.population));
					}
				}
				p.zones[i].income.manpower = Math.min(p.zones[i].income.manpower, p.zones[i].max.manpower);
				p.zones[i].income.manpower += p.zones[i].res.population *.005;
				if(p.zones[i].size > 150){
					p.zones[i].income.manpower *= .85;
				}
				p.manpower += p.zones[i].income.manpower * modif;
				p.zones[i].income.gold = Math.min(p.zones[i].income.gold, p.zones[i].res.population/4);
				p.gold += Math.min(p.zones[i].income.gold,p.zones[i].income.gold*modif);
				p.zones[i].income.population*=modif;
				p.zones[i].income.population -= p.zones[i].res.population*.06;
				p.zones[i].res.population += p.zones[i].income.population;
				p.zones[i].income.wood = Math.min(p.zones[i].income.wood, .5 + p.zones[i].res.population/20);
				p.zones[i].res.wood += p.zones[i].income.wood*modif;
				p.zones[i].res.stone += p.zones[i].income.stone*modif;
				//Ore and Luxury Good Income
				p.zones[i].income.rSilk = Math.min(p.zones[i].income.rSilk, .2 + p.zones[i].res.population/40);
				p.zones[i].income.spices = Math.min(p.zones[i].income.spices, .2 + p.zones[i].res.population/40);
				p.zones[i].income.copper[1] = Math.min(p.zones[i].res.copper[0]/2, p.zones[i].income.copper[1]);
				p.zones[i].income.bronze[1] = Math.min(p.zones[i].res.bronze[0]/2, p.zones[i].income.bronze[1]);
				p.zones[i].income.iron[1] = Math.min(p.zones[i].res.iron[0]/2, p.zones[i].income.iron[1]);
				p.zones[i].res.copper[0] += p.zones[i].income.copper[0] - 2*p.zones[i].income.copper[1] * modif;
				p.zones[i].res.bronze[0] += p.zones[i].income.bronze[0] - 2*p.zones[i].income.bronze[1] * modif; //Ore
				p.zones[i].res.iron[0] += p.zones[i].income.iron[0] - 2*p.zones[i].income.iron[1] * modif;
				p.zones[i].res.copper[1] += p.zones[i].income.copper[1] * modif;
				p.zones[i].res.bronze[1] += p.zones[i].income.bronze[1] * modif;
				p.zones[i].res.iron[1] += p.zones[i].income.iron[1] * modif;
				p.zones[i].res.rHide += p.zones[i].income.rHide * modif;
				p.zones[i].res.rWood += p.zones[i].income.rWood * modif;
				p.zones[i].res.rPerf += p.zones[i].income.rPerf * modif;
				p.zones[i].res.hides += Math.min(p.zones[i].res.rHide, p.zones[i].income.hides);
				p.zones[i].res.woods += Math.min(p.zones[i].res.rWood, p.zones[i].income.woods);
				p.zones[i].res.perfs += Math.min(p.zones[i].res.rPerf, p.zones[i].income.perfs);
				p.zones[i].res.rHide -= Math.min(p.zones[i].res.rHide, p.zones[i].income.hides);
				p.zones[i].res.rWood -= Math.min(p.zones[i].res.rWood, p.zones[i].income.woods);
				p.zones[i].res.rPerf -= Math.min(p.zones[i].res.rPerf, p.zones[i].income.perfs);
				p.zones[i].res.rSilk += p.zones[i].income.rSilk * modif;
				p.zones[i].res.silks += Math.min(p.zones[i].res.rSilk, p.zones[i].income.silks);
				p.zones[i].res.rSilk -= Math.min(p.zones[i].res.rSilk, p.zones[i].income.silks);
				p.zones[i].res.spices += p.zones[i].income.spices;
				p.zones[i].res.horses += p.zones[i].income.horses; p.zones[i].res.horses = Math.min(p.zones[i].res.horses, p.zones[i].rMax.horses);
				//
				if(p.zones[i].res.wood > p.zones[i].rMax.wood){
					p.zones[i].res.wood = p.zones[i].rMax.wood;
				}
				if(p.zones[i].res.food > p.zones[i].rMax.food){
					p.zones[i].res.food = p.zones[i].rMax.food;
				}
				p.zones[i].res.food = Math.max(p.zones[i].res.food, 0);
				p.zones[i].res.wellbeing += Math.min(p.zones[i].income.wellbeing,p.zones[i].income.wellbeing*modif);
			}
			else{
				p.zones.splice(i,1);
			}
		}
		if(p.manpower > 40+(p.size/4)){
			p.manpower *= .85;
		}
		return p;
	}
	function navyPay(a){
		let p = a;
		for(let i = 0; i < p.navies.length; i++){
			let stop = false;
			if(p.navies[i] != -1 && typeof p.navies[i].y != 'undefined'){
				if(map[p.navies[i].y][p.navies[i].x].navy == -1){
					p.navies[i] = -1;
					stop = true;
				}
				else{
					let n = map[p.navies[i].y][p.navies[i].x].navy;
					n.cargo.food += (8 *n.stats[4]);
					n.cargo.food = Math.min(35*n.stats[4]+300+90*n.stats[2], n.cargo.food);
					if(map[n.y][n.x].resource == 14){
						if(n.stats[4] >= 15){
							if(n.carrying < 5 + n.stats[2]){
								n.cargo.pearls += n.stats[4]/30;
								n.carrying += n.stats[4]/30;
							}
						}
					}
					if(map[n.y][n.x].zone != -1){ //In allied waters
						let adjAlliedDock = false;
						for(let i = -1; i < 2; i++){ //This loop looks for an adjacent dock
							for(let j = -1; j < 2; j++){
								if(!(i==0&&j==0)){
									if(map[safeC(n.y+i)][safeC(n.x+j)].owner == p.turn){
										if(map[safeC(n.y+i)][safeC(n.x+j)].building[0] == 1){
											if(map[safeC(n.y+i)][safeC(n.x+j)].building[1] == 3){
												adjAlliedDock = true;
												i=2;j=2;
											}
										}
									}
								}
							}
						}
						if(adjAlliedDock){
							if(n.unloading){//Unload goods to port
								p.zones[map[n.y][n.x].zone].res.food += n.cargo.food;
								p.zones[map[n.y][n.x].zone].res.pearls += n.cargo.pearls;
								p.gold += n.cargo.gold;
								n.carrying = 0;
								n.cargo = new Resources();
							}
							if(!n.fighting && n.health[0] < n.health[1]){
								n.health[0] += n.health[1]/15;
								n.health[0] = Math.min(n.health[1], n.health[0]);
							}
						}
					}
					p.navies[n.num] = n;
					map[n.y][n.x].navy = n;
					//tileChange(n.y, n.x);
					navyChange(n, false);
				}
			}
		}
		return p;
	}
	function armyPay(a){
		let p = a;
		for(let i = 0; i < p.armies.length; i++){
			let stop = false;
			if(p.armies[i] != -1 && typeof p.armies[i].y != 'undefined'){
				if(map[p.armies[i].y][p.armies[i].x].army == -1){
					p.armies[i] = -1;
					stop = true;
				}
				else if(map[p.armies[i].y][p.armies[i].x].owner == p.turn && p.armies[i].state[1] != "disbanding"){
					if(map[p.armies[i].y][p.armies[i].x].zone > -1){
						if(p.armies[i].stats[4] >= p.armies[i].size/10){
							if(p.armies[i].type == 1){
								let diff = p.armies[i].stats[4]-(p.armies[i].size/10);
								if(p.zones[map[p.armies[i].y][p.armies[i].x].zone].res.food < p.zones[map[p.armies[i].y][p.armies[i].x].zone].max.food){
									p.zones[map[p.armies[i].y][p.armies[i].x].zone].res.food += p.armies[i].size*diff/3;
									p.zones[map[p.armies[i].y][p.armies[i].x].zone].res.rHides += p.armies[i].stats[4]/50;
									if(day > 300){
										p.zones[map[p.armies[i].y][p.armies[i].x].zone].res.food -= .25 * (p.armies[i].size*diff/5);
									}
								}
							}
						}
						else{
							if(p.zones[map[p.armies[i].y][p.armies[i].x].zone].res.food > p.armies[i].size){
								if(p.armies[i].food < p.armies[i].maxSize * 30){
									p.armies[i].food += p.armies[i].size*2;
									p.zones[map[p.armies[i].y][p.armies[i].x].zone].res.food -= p.armies[i].size;
								}
							}
						}
					}
				}
				if(!stop && p.armies[i].size > 4 && p.armies[i].state[1] != "disbanding"){
					p.gold -= p.armies[i].upkeep * p.armies[i].size/p.armies[i].maxSize;
					let aY = p.armies[i].y; let aX = p.armies[i].x;
					let adjB = false;
					for(let a = -1; a < 2; a++){
						for(let b = -1; b < 2; b++){
							if(a == 0 || b == 0){
								let m = map[safeC(aY+a)][safeC(aX+b)];
								if(m.owner == p.turn){
									if(m.building[0] == 3 && m.building[1] == 5){ //Barracks
										if(a==b){ adjB = true; }
										else if(map[safeC(aY)][safeC(aX)].building[0] == 1 && map[safeC(aY)][safeC(aX)].building[1]==0){
											adjB = true;
										}
									}
								}
							}
						}
					}
					if(adjB){
						p.gold += p.armies[i].upkeep/2;
					}
					if(p.gold < -100 && p.armies[i].upkeep > 0){
						p.armies[i].state[1] = "deserting";
					}
					else{
						if(p.armies[i].size < p.armies[i].maxSize){
							if(map[p.armies[i].y][p.armies[i].x].owner == p.turn){
								if(map[p.armies[i].y][p.armies[i].x].zone > -1){
									p.armies[i].state[1] = "replenishing";
								}
							}
						}
						else {
							p.armies[i].state[1] = "";
						}
						if(p.armies[i].commander != -1){
							if(p.armies[i].commander.level < 7&&p.armies[i].commander.experience > 100*(1+p.armies[i].commander.level)){
								p.armies[i].commander.description ="";
								if(p.armies[i].commander.gender){
									p.armies[i].commander.description += "He ";
								}
								else { p.armies[i].commander.description += "She ";}
								p.armies[i].commander.description += "is a " + tiers[p.armies[i].commander.level] + " " + p.armies[i].commander.trait;
								p.armies[i].commander.level++;
								p.armies[i].commander.experience=0;
							}
							p.armies[i].commander.experience++;
							p.armies[i].experience++;
							if(p.armies[i].commander.trait=="Organizer"){
								if(p.armies[i].commander.level == 0){
									p.armies[i].commander.experience+=3;
								}
								p.armies[i].experience += p.armies[i].commander.level-1;
								let uCo = p.armies[i].upkeep * p.armies[i].size/p.armies[i].maxSize;
								if(p.armies[i].commander.level > 1){
									p.gold += uCo * p.armies[i].commander.level/14;
								}
							}
							if(p.armies[i].experience > (p.armies[i].level+1)*50){
								p.armies[i].level++;
								p.armies[i].morale[1]+=.2;
								if(p.armies[i].commander != -1 && p.armies[i].commander.trait == "Leader"){
									p.armies[i].morale[1] += p.armies[i].commander.level/35
								}
								else if(p.armies[i].commander != -1 && p.armies[i].commander.trait == "Organizer"){
									p.armies[i].morale[1] += p.armies[i].commander.level/100;
								}
								p.armies[i].experience = 0;
							}
						}
					}
					armyChange(p.armies[i], false);
				}	
			}
		}
		while(p.armies.length > 0 && p.armies[p.armies.length-1] == -1){
			p.armies.pop();
		}
		return p;
	}
	function scanRoads(a, y1, x1){ //res needs to pass on/merge
		let p = a;
		var yS1 = y1 || -1;
		var xS1 = x1 || -1;
		var chosen = -1;
		var merge = [];
		for(i = p.zones.length-1; i> -1; i--){
			if(p.zones[i].dead){
				p.zones.splice(i,1);
			}
		}
		if(yS1 && xS1 && p.roads.length < p.zones.length){ //If adjacent building is road or gatehouse, roads need to merge
			for(let a = -1; a < 2; a++){
				for(let b = -1; b < 2; b++){
					if((a == 0 || b == 0) && a != b){
						var b0 = map[safeC(yS1+a)][safeC(xS1+b)].building[0]; var b1 = map[safeC(yS1+a)][safeC(xS1+b)].building[1];
						if((b0 == 0 && b1 == 0) || (b0 == 2 && b1 == 3)|| (b0 == 4 && b1 == 0)){
							merge.push(map[yS1+a][xS1+b].zone);
						}
					}
				}
			}
		}
		for(i = 0; i < p.territory.length; i++){
			map[safeC(p.territory[i][0])][safeC(p.territory[i][1])].zone = -1;
			map[safeC(p.territory[i][0])][safeC(p.territory[i][1])].zStrength = -1;
		}
		var zStack = [];
		for(i = 0; i < p.roads.length; i++){
			zStack[i] = -1;
			if(map[safeC(p.roads[i][0][0])][safeC(p.roads[i][0][1])].manager == p.index){
				zStack[i] = new Domain();
				for(j = 0; j < p.roads[i].length; j++){
					var y = p.roads[i][j][0];
					var x = p.roads[i][j][1];
					if(y == yS1 && x == xS1){ chosen = i; }
					for(a = -2; a < 3; a++){
						for(b = -2; b < 3; b++){
							let t = map[safeC(a+y)][safeC(b+x)];
							if(t.owner != p.turn){
								if(t.elevation < .9){
									if(t.zStrength < Math.sqrt(a*a + b*b)){
										map[safeC(a+y)][safeC(b+x)].zone = i;
										map[safeC(a+y)][safeC(b+x)].zStrength = Math.sqrt(a*a + b*b);
									}
								}
							}
							else if(t.elevation > 0 && t.owner == p.turn && t.manager == p.index){
								if(Math.sqrt(a*a + b*b) < t.zStrength){
									if(t.zone != i){
										map[safeC(a+y)][safeC(b+x)].zone = i;
										zStack[i].territory.push([safeC(a+y), safeC(b+x)]);
									}
									map[safeC(a+y)][safeC(b+x)].zStrength = Math.sqrt(a*a + b*b);
								}
								else if(t.zone == -1){	
									map[safeC(a+y)][safeC(b+x)].zone = i;
									map[safeC(a+y)][safeC(b+x)].zStrength = Math.sqrt(a*a + b*b);
									zStack[i].territory.push([safeC(a+y), safeC(b+x)]);
									zStack[i].size++;
									zStack[i].rMax.population += .2;
									zStack[i].income.population	 += .01;
									zStack[i].income.food += .01;
									switch(t.type){
										case 'f': zStack[i].income.wood+=.05; zStack[i].income.food+=2; break;
										case 'k':
										case 'h': zStack[i].income.stone += .009;
										case 'c':
										case 'i':
										case 'g': zStack[i].income.manpower+=.01;zStack[i].income.population+=.01; break;
									}
									if(t.building[0] != -1){
										zStack[i].buildingNums[t.building[0]][t.building[1]] = zStack[i].buildingNums[t.building[0]][t.building[1]] || 0;
										zStack[i].buildingNums[t.building[0]][t.building[1]]++;
										for(let r = 0; r < Math.min(4, t.building[2]); r++){
											zStack[i].development++;
											var ins = getValue(safeC(a+y), safeC(b+x), r, p); //getValue calculates building incomes
											zStack[i].income.wood += ins[0][0]; zStack[i].max.wood += ins[1][0]; zStack[i].rMax.wood += ins[2][0];
											zStack[i].income.food += ins[0][1]; zStack[i].max.food += ins[1][1]; zStack[i].rMax.food += ins[2][1];
											zStack[i].income.manpower += ins[0][2]; zStack[i].max.manpower += ins[1][2];
											zStack[i].income.population += ins[0][3]; zStack[i].rMax.population += ins[2][2];
											zStack[i].income.gold += ins[0][4]/20;
											zStack[i].maxSize += ins[2][3];
											zStack[i].income.wellbeing += ins[0][5]; 
											zStack[i].income.stone += ins[0][6];
											zStack[i].income.copper[0]+= ins[3][0]; zStack[i].income.copper[1] += ins[3][6];
											zStack[i].income.bronze[0]+= ins[3][1]; zStack[i].income.bronze[1] += ins[3][7];
											zStack[i].income.iron[0]+= ins[3][2]; zStack[i].income.iron[1] += ins[3][8];
											zStack[i].income.rHide+= ins[3][3]; zStack[i].income.hides += ins[3][9]; 
											zStack[i].income.rWood+= ins[3][4]; zStack[i].income.woods += ins[3][10];
											zStack[i].income.rPerf+= ins[3][5]; zStack[i].income.perfs += ins[3][11];
											zStack[i].income.marketCap+=ins[0][7]; zStack[i].rMax.marketCap+=ins[2][4];
											zStack[i].income.horses+=ins[0][10]; zStack[i].rMax.horses+=ins[2][5];
											zStack[i].income.rSilk+=ins[3][12]; zStack[i].income.silks+=ins[3][13];
											zStack[i].income.spices += ins[3][14];
											//Copper Ore, Bronze Ore, Iron Ore, Hides, Perfume, Luxury Wood, Copper, Bronze, Iron
										}
									}
								}
							}
							if(t.navy != -1 && map[safeC(a+y)][safeC(b+x)].navy.owner == p.turn){
								zStack[i].rMax.marketCap += map[safeC(a+y)][safeC(b+x)].navy.stats[2]*2.5;
							}
						}
					}
				}
				if(zStack[i].income.wood > zStack[i].max.wood){
					zStack[i].income.wood = zStack[i].max.wood;
				}
				if(zStack[i].income.food > zStack[i].max.food){
					zStack[i].income.food = zStack[i].max.food;
				}
				if(zStack[i].income.manpower > zStack[i].max.manpower){
					zStack[i].income.manpower = zStack[i].max.manpower;
				}
			}
		}
		if(merge.length >= 1){
			for(z = 0; z < merge.length; z++){
				zStack[chosen].res.wood += p.zones[merge[z]].res.wood;
				zStack[chosen].res.food += p.zones[merge[z]].res.food;
				zStack[chosen].res.stone += p.zones[merge[z]].res.stone;
				zStack[chosen].res.copper[0] += p.zones[merge[z]].res.copper[0];
				zStack[chosen].res.bronze[0] += p.zones[merge[z]].res.bronze[0];
				zStack[chosen].res.iron[0] += p.zones[merge[z]].res.iron[0];
				zStack[chosen].res.copper[1] += p.zones[merge[z]].res.copper[1];
				zStack[chosen].res.bronze[1] += p.zones[merge[z]].res.bronze[1];
				zStack[chosen].res.iron[1] += p.zones[merge[z]].res.iron[1];
				zStack[chosen].res.population += p.zones[merge[z]].res.population;
				zStack[chosen].res.wellbeing += p.zones[merge[z]].res.wellbeing;
				zStack[chosen].res.rHide += p.zones[merge[z]].res.rHide;
				zStack[chosen].res.rWood += p.zones[merge[z]].res.rWood;
				zStack[chosen].res.rPerf += p.zones[merge[z]].res.rPerf;
				zStack[chosen].res.hides += p.zones[merge[z]].res.hides;
				zStack[chosen].res.woods += p.zones[merge[z]].res.woods;
				zStack[chosen].res.perfs += p.zones[merge[z]].res.perfs;
				zStack[chosen].res.rSilk += p.zones[merge[z]].res.rSilk;
				zStack[chosen].res.silks += p.zones[merge[z]].res.silks;
				zStack[chosen].res.pearls += p.zones[merge[z]].res.pearls;
				zStack[chosen].res.spices += p.zones[merge[z]].res.spices;
				zStack[chosen].res.marketCap += p.zones[merge[z]].res.marketCap;
				zStack[chosen].res.horses += p.zones[merge[z]].res.horses;
			}
		}
		for(let y = 0; y < Math.min(zStack.length, p.zones.length); y++){
			if(merge.indexOf(y) == -1 && zStack[y] != -1){
				zStack[y].taxes = p.zones[y].taxes;
				zStack[y].res.wood += p.zones[y].res.wood;
				zStack[y].res.food += p.zones[y].res.food;
				zStack[y].res.stone += p.zones[y].res.stone;
				zStack[y].res.copper[0] += p.zones[y].res.copper[0];
				zStack[y].res.bronze[0] += p.zones[y].res.bronze[0];
				zStack[y].res.iron[0] += p.zones[y].res.iron[0];
				zStack[y].res.copper[1] += p.zones[y].res.copper[1];
				zStack[y].res.bronze[1] += p.zones[y].res.bronze[1];
				zStack[y].res.iron[1] += p.zones[y].res.iron[1];
				zStack[y].res.population += p.zones[y].res.population;
				zStack[y].res.wellbeing += p.zones[y].res.wellbeing;
				zStack[y].res.rHide += p.zones[y].res.rHide;
				zStack[y].res.rWood += p.zones[y].res.rWood;
				zStack[y].res.rPerf += p.zones[y].res.rPerf;
				zStack[y].res.hides += p.zones[y].res.hides;
				zStack[y].res.woods += p.zones[y].res.woods;
				zStack[y].res.perfs += p.zones[y].res.perfs;
				zStack[y].res.marketCap += p.zones[y].res.marketCap;
				zStack[y].res.horses += p.zones[y].res.horses;
				zStack[y].res.rSilk += p.zones[y].res.rSilk;
				zStack[y].res.silks += p.zones[y].res.silks;
				zStack[y].res.pearls += p.zones[y].res.pearls;
				zStack[y].res.spices += p.zones[y].res.spices;
			}
		}
		for(let i = zStack.length-1; i >= 0; i--){
			if(zStack[i] == -1){
				zStack.splice(i,1);
			}
		}
		p.zones = zStack;
		return p;
	}
	function canBuy(y, x, b0, b1, p){
		var z = map[y][x].zone;
		var a0 = b0;
		var a1 = b1;
		if(map[y][x].owner == p.turn && map[y][x].manager == p.index && p.manpower >= buildings[a0][a1].cost[3]){
			if(z == -1 && (a0 == 0 && a1 == 0)){
				return true;
			}
			else if(z > -1){
				let bsVar = true;
				if(buildings[a0][a1].cost[4][0] != -1){
					if(buildings[a0][a1].cost[4][0] == 12){
						bsVar = p.zones[z].res.rWood >= buildings[a0][a1].cost[4][1];
					}
					if(buildings[a0][a1].cost[4][0] == 15){
						bsVar = p.zones[z].res.rSilk >= buildings[a0][a1].cost[4][1];
					}
					else if(buildings[a0][a1].cost[4][0] == 16){
						bsVar = p.zones[z].res.spices >= buildings[a0][a1].cost[4][1];
					}
				}
				return bsVar && (map[y][x].zone > -1 && p.zones[map[y][x].zone].res.wood >= buildings[a0][a1].cost[0] && p.zones[map[y][x].zone].res.stone >= buildings[a0][a1].cost[1] && (buildings[a0][a1].cost[2] == 0 || p.gold >= buildings[a0][a1].cost[2]));
			}
		}
		return false;
	}
	function safeC(a, maplen)
	{
		let ms = maplen || MAPSIZE;
		if(a >= ms){
			return a%ms;
		}
		else if(a < 0){
			return safeC(a+ms);
		}
		return a;
	}
	function simulateBattle(mirror){
		var maxAtk = 0;
		var maxDef = 0;
		var maxPen = 0;
		var side1 = {
			skirmish: 0,
			size: 40,
			attack: 8,
			defense: 4,
			pen: 0,
			weapon1: [],
			weapon2: [],
		};
		var side2 = {
			skirmish: 0,
			attack: 8,
			size: 40,
			defense: 4,
			pen: 0,
			weapon1: [],
			weapon2: [],
		};
		var dists = [1, Math.sqrt(2), 2, 1+Math.sqrt(2), Math.sqrt(8)];
		var distInd = 0;
		function cSkirmish(d, s){
			return .41 + 2/(3+(.5*s)) + s*Math.pow(d, 2)/30 - Math.pow(d, 2.6)/15;
		}
		for(let i = 0; i < infWeapons.length; i++){
			if(infWeapons[i].attack == 0){
				i++;
			}
			if(infWeapons[i].hands != 1.5){
				side1.weapon1 = [0, i];
			}
			for(let j = i-1; j < infWeapons.length; j++){
				if(infWeapons[i].hands == 1){
					do{
						side1.weapon2 = [0, j];
						j++;
					} while(j < infWeapons.length && infWeapons[side1.weapon2[1]].hands > 1);
					if(j < infWeapons.length){
						j--;
					}
				}
				if(j <= infWeapons.length){
					for(let k = 0; k < infWeapons.length; k++){
						if(infWeapons[i].hands != 1.5){
							side2.weapon1 = [0, k];
						}
						if(mirror){side2.weapon1 = [0, i]}
						for(let l = k-1; l < infWeapons.length; l++){
							if(infWeapons[k].hands == 1){
								do{
									side2.weapon2 = [0, l];
									l++;
								} while(l < infWeapons.length && infWeapons[side2.weapon2[1]].hands > 1);
								if(l < infWeapons.length){
									l--;
								}
							}
							if(mirror){side2.weapon2 = [0, j];}
							if(side2.weapon2[1] < infWeapons.length){
								let dmg1 = 0; let wep1a = -1; let wep1b = -1;
								let pen1 = 0; let pen2 = 0;
								let def1 = 0; let wep2a = -1; let wep2b = -1;
								let dmg2 = 0;
								let def2 = 0;
								wep1a = weapons[side1.weapon1[0]][side1.weapon1[1]];
								dmg1 += wep1a.attack * cSkirmish(dists[distInd], wep1a.skirmish);
								def1 += 1.1*(1+wep1a.defense) * cSkirmish(dists[distInd], wep1a.skirmish);
								pen1 += 1.2*wep1a.pierce * cSkirmish(dists[distInd], wep1a.skirmish);
								wep2a = weapons[side2.weapon1[0]][side2.weapon1[1]];
								dmg2 += wep2a.attack * cSkirmish(dists[distInd], wep2a.skirmish);
								def2 += 1.1*(1+wep2a.defense) * cSkirmish(dists[distInd], wep2a.skirmish);
								pen2 += 1.2*wep2a.pierce * cSkirmish(dists[distInd], wep2a.skirmish);
								if(side1.weapon2[0] > -1 && wep1a.hands < 1.5){
									wep1b = weapons[side1.weapon2[0]][side1.weapon2[1]];
									dmg1 += wep1b.attack * cSkirmish(dists[distInd], wep1b.skirmish);
									def1 += 1.1*(1+wep1b.defense) * cSkirmish(dists[distInd], wep1b.skirmish);
									pen1 += wep1b.pierce * cSkirmish(dists[distInd], wep1b.skirmish);
								}
								else{
									j = infWeapons.length;
								}
								if(side2.weapon2[0] > -1 && wep2a.hands < 1.5){
									wep2b = weapons[side2.weapon2[0]][side2.weapon2[1]];
									dmg2 += wep2b.attack * cSkirmish(dists[distInd], wep2b.skirmish);
									def2 += 1.1*(1+wep2b.defense) * cSkirmish(dists[distInd], wep2b.skirmish);
									pen2 += wep2b.pierce * cSkirmish(dists[distInd], wep2b.skirmish);
								}
								else{
									l = infWeapons.length;
								}
								def1 *= .1 + .6*(side1.defense);
								def2 *= .1 + .6*(side2.defense);
								dmg1 *= .5+.2*side1.attack
								dmg2 *= .5+.2*side2.attack
								let skirm1 = cSkirmish(dists[distInd], side1.skirmish);
								let skirm2 = cSkirmish(dists[distInd], side2.skirmish);
								pen1 *= .5 * Math.sqrt(side2.size)*Math.sqrt(Math.min(side1.size, side2.size));
								pen2 *= .5 * Math.sqrt(side1.size)*Math.sqrt(Math.min(side1.size, side2.size));
								dmg1 *= Math.sqrt(side1.size) * skirm1;
								dmg2 *= Math.sqrt(side2.size) * skirm2;
								def1 *= Math.sqrt(side1.size); def1 += 5.5 * side1.size;
								def2 *= Math.sqrt(side2.size); def2 += 5.5 * side2.size;
								def1 -= pen2;
								def1 = Math.max(def1, 3.5 * side1.size);
								def2 -= pen1;
								def2 = Math.max(def2, 3.5 * side2.size);
								let output = ""; let stop = false;
								output += wep1a.name;
								if(wep1b != -1){
									output += " and " + wep1b.name;
								}
								output += " versus " + wep2a.name;
								if(wep2b != -1){
									output += " and " + wep2b.name;
								}
								maxAtk = Math.max(maxAtk, dmg1, dmg2);
								maxDef = Math.max(maxDef, def1, def2);
								maxPen = Math.max(maxPen, pen1, pen2);
								if(dmg1/def2 < dmg2/def1){
									output += " Winner: Side 2";
									console.log(output);
								}
								else if(mirror && dmg2/def1 > dmg1/def2){
									output += " Winner: Side 1";
									console.log(output);
								}
								if(mirror){ k = 100;
								l = 100; }
							}
						}
					}
				}
			}
		}
		console.log("Max Atk: " + maxAtk);
		console.log("Max Def: " + maxDef);
		console.log("Max Pen: " + maxPen);
	}
	function Roads(a){
		let p = a;
		var index = p.roads.length;
		var rStack = [];
		for(let i = 0; i < p.roads.length; i++){
			for(let j = 0; j < p.roads[i].length; j++){
				for(let a = -2; a < 3; a++){
					for(let b = -2; b < 3; b++){
						let b0 = map[safeC(p.roads[i][j][0]+a)][safeC(p.roads[i][j][1]+b)].building[0];
						let b1 = map[safeC(p.roads[i][j][0]+a)][safeC(p.roads[i][j][1]+b)].building[1];
						let o = map[safeC(p.roads[i][j][0]+a)][safeC(p.roads[i][j][1]+b)].owner;
						let m = map[safeC(p.roads[i][j][0]+a)][safeC(p.roads[i][j][1]+b)].manager;
						if(!(b0 == 0 && b1 == 0) || (b0 == 2 && b1 == 3) || (b0 == 4 && b1 == 0) || o != p.turn || m != p.index){
							map[safeC(p.roads[i][j][0]+a)][safeC(p.roads[i][j][1]+b)].zone = -1;
							map[safeC(p.roads[i][j][0]+a)][safeC(p.roads[i][j][1]+b)].zStrength = -1;
						}
					}
				}
			}
		}
		function runInner(y0, x0){
			var stack = [[y0, x0]];
			while(stack.length > 0){
				spot = stack.pop();
				rStack[rStack.length-1].push(spot);
				y = safeC(spot[0]);
				x = safeC(spot[1]);
				map[y][x].road = index;
				for(let a = -1; a < 2; a++){
					for(let b = -1; b < 2; b++){
						if((a == 0 || b == 0) && a != b){
							if(map[safeC(y+a)][safeC(x+b)].road != index){
								var b0 = map[safeC(y+a)][safeC(x+b)].building[0]; var b1 = map[safeC(y+a)][safeC(x+b)].building[1];
								let o = map[safeC(y+a)][safeC(x+b)].owner;
								let m = map[safeC(y+a)][safeC(x+b)].manager;
								if(o == p.turn && m == p.index){
									if((b0 == 0 && b1 == 0) || (b0 == 2 && b1 == 3) || (b0 == 4 && b1 == 0)){
										stack.push([y+a,x+b]);
									}
								}
							}
						}
					}
				}
			}
		}
		for(let a = p.roads.length-1; a > -1; a--){ //Check to see if an existing road should be deleted
			for(let i = p.roads[a].length-1; i > -1; i--){
				let aY = safeC(p.roads[a][i][0]);
				let aX = safeC(p.roads[a][i][1]);
				var b0 = map[aY][aX].building[0]; var b1 = map[aY][aX].building[1];
				let m = map[aY][aX].manager; let o = map[aY][aX].owner;
				if(!(b0 == 0 && b1 == 0) || (b0 == 2 && b1 == 3) || (b0 == 4 && b1 == 0) || o != p.turn || m != p.index){
					p.roads[a].splice(i, 1);
				}
			}
			if(p.roads[a].length == 0){
				p.zones[a].dead = true;
			}
		}
		for(let a = p.territory.length-1; a >=0; a--){
			var aY = p.territory[a][0];
			var aX = p.territory[a][1];
			var b0 = map[aY][aX].building[0]; var b1 = map[aY][aX].building[1];
			let m = map[aY][aX].manager; let o = map[aY][aX].owner;
			if(o == p.turn){
				if(m == p.index){
					if(((b0 == 0 && b1 == 0) || (b0 == 2 && b1 == 3) || (b0 == 4 && b1 == 0)) && map[aY][aX].road == -1){
						rStack.push([]);
						runInner(aY, aX);
						index++;
					}
				}
			}
			else{p.territory.splice(a, 1);}
		}
		for(let i = 0; i < rStack.length; i++){
			for(let j = 0; j < rStack[i].length; j++){
				map[safeC(rStack[i][j][0])][safeC(rStack[i][j][1])].road = -1;
			}
		}
		p.roads = rStack;
		return p;
	}