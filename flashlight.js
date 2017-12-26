'use strict';

function flashlight(config){

	config = config || {};

	let DEFAULT_RADIUS = 150;

	let c = document.createElement('canvas');
	let ctx = c.getContext('2d');
	let mouseX = -10000;
	let mouseY = -10000;

	c.style.top = "0px";
	c.style.left = "0px";
	c.style.position = "absolute";
	c.style.zIndex = 1000;
	c.style.cursor = 'none';

	let radius = config.radius || DEFAULT_RADIUS;

	let flashlightUpdate = function(){

		c.width = window.innerWidth;
		c.height = window.innerHeight;

		// paint entire canvas in black, then substract a white to invisible radial gradient
  		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, c.width, c.height);

		let g = ctx.createRadialGradient(mouseX, mouseY, 1, mouseX, mouseY, radius);
  		g.addColorStop(0, 'rgba(255,255,255,1)');
  		g.addColorStop(1, 'rgba(0,0,0,0)');

  		ctx.globalCompositeOperation = "destination-out";

  		ctx.fillStyle = g;
  		ctx.arc(mouseX, mouseY, radius, 0, Math.PI*2, false);
  		ctx.fill();

	}

	c.onmousemove = function(e){
		mouseX = e.clientX;
		mouseY = e.clientY;

		flashlightUpdate();
	}

	document.body.appendChild(c);

	flashlightUpdate();
}
