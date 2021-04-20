import { CanvasImageColorExtension, Image } from '@e2d/image';
import { CanvasEngine } from '@e2d/canvas-engine';
import { Container } from '@e2d/core';

// create engine
const engine = new CanvasEngine();
// add image extension
CanvasImageColorExtension.init(engine);
// set fullscreen mode
engine.screen.fullscreen = true;
// start update loop
engine.ticker.play();

// setup page
document.body.style.margin = '0';
document.body.style.padding = '0';
// add engine view to page
document.body.appendChild(engine.platform.view);

const ring = {
	type: 'image',
	src: 'assets/Rings_promo_mythic.png',
	scale: 0.4,
	// tint: { color: 0x00ff00, value: 0.5 },
} as Image;

// create container with image
engine.root = {
	type: 'container',
	children: [
		{
			type: 'container',
			children: ring,
			x: 20,
			y: 20,
		} as Container,
		{
			type: 'container',
			children: ring,
			x: 160,
			y: 20,
			alpha: 0.5,
		} as Container,
		{
			type: 'container',
			children: ring,
			x: 300,
			y: 20,
			tint: { color: 0xff0000, value: 0.5 },
		} as Container,
	],
} as Container;
