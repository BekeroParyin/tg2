		//Create Canvases
		
			var c = document.getElementById("map");
			 var r = document.getElementById("rightBar");
			// var l = document.getElementById("leftBar");
			c.width = $("#body").width();
			c.height = $("#body").height();
			 r.width = $("#right").width();
			 r.height = $("#right").height();
			// l.width = $("#left").width();
			// l.height = $("#left").height();
			var ctx = c.getContext("2d");
			 var rtx = r.getContext("2d");
			// var ltx = l.getContext("2d");
			//Scaling for high dpi canvas
			const devZoom = Math.round(100*window.devicePixelRatio)/100;
			var sval = Math.floor(100 * (screen.width * devZoom/1920) * (screen.height * devZoom/1080))/100;
			const scale = Math.max(1,sval);
			const wScale = (screen.width/1920);
			const hScale = (screen.height/1080);
			
		if(sval >= 1){
			c.style.height = "" + c.height + "px";
			c.style.width = "" + c.width + "px";
			r.style.height = "" + r.height + "px";
			r.style.width = "" + r.width + "px";
			// l.style.height = "" + l.height + "px";
			// l.style.width = "" + l.width + "px";
			 r.width *= scale;
			 r.height *= scale;
			// l.width *= scale;
			// l.height *= scale;
			   c.width *= scale;
			   c.height *= scale;
			   rtx.scale(scale, scale);
			   ctx.scale(scale, scale);	
			// ltx.scale(scale, scale);
		}
		//Create Map
		function setMapDSize(w, h)
			{
				c.style.width = "" + w +"px";
				c.style.height = "" + h +"px";
				c.width = w;
				c.height = h;
				ctx.scale(scale, scale);
			}
			
		var sprites = new Image();
		sprites.src = "/public/sprites.png";
		ctx.imageSmoothingEnabled = false;