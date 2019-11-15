		//Create Canvases
			var c = document.getElementById("map");
			var r = document.getElementById("rightBar");
			var l = document.getElementById("leftBar");
			var ctx = c.getContext("2d");
			var rtx = r.getContext("2d");
			var ltx = l.getContext("2d");
			//Scaling for high dpi canvas
			const devZoom = Math.round(100*window.devicePixelRatio)/100;
			var sval = Math.floor(100 * (screen.width * devZoom/1920) * (screen.height * devZoom/1080))/100;
			const scale = Math.max(1,sval);
			const wScale = (screen.width/1920);
			const hScale = (screen.height/1080);
			r.width *= wScale;
			r.height *= hScale;
			l.width *= wScale;	
			l.height *= hScale;
			c.width *= wScale;
			c.height *= hScale;
		if(sval >= 1){
			c.style.height = "" + c.height + "px";
			c.style.width = "" + c.width + "px";
			r.style.height = "" + r.height + "px";
			r.style.width = "" + r.width + "px";
			l.style.height = "" + l.height + "px";
			l.style.width = "" + l.width + "px";
			r.width *= scale;
			r.height *= scale;
			l.width *= scale;
			l.height *= scale;
			c.width *= scale;
			c.height *= scale;
			rtx.scale(scale, scale);
			ctx.scale(scale, scale);	
			ltx.scale(scale, scale);
			c.style.left = 10 + l.offsetLeft + l.width/scale + "px";
			r.style.left = 10 + c.offsetLeft + c.width/scale + "px";
		}
		else{
			c.style.height = "" + (c.height/.9) + "px";
			c.style.width = "" + (c.width/.9) + "px";
			r.style.height = "" + (r.height/.9) + "px";
			r.style.width = "" + (r.width/.9) + "px";
			l.style.height = "" + (l.height/.9) + "px";
			l.style.width = "" + (l.width/.9) + "px";
			r.width /= .9;
			r.height /= .9;
			l.width /= .9;
			l.height /= .9;
			c.width /= .9;
			c.height /= .9;
			
			c.style.left = 10 + l.offsetLeft + l.width+ "px";
			r.style.left = 10 + c.offsetLeft + c.width+ "px";
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