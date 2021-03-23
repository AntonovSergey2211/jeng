/* eslint-disable no-console */
import {
	ABILITY_FOX, ABILITY_WOLF, ANIMALIST, ARCHER, BACKGROUND,
} from './assets';
import artifact from './artifact';
import { fps, Statistics } from './fps';
import { unit, UnitProperties } from './unit';

interface Main {
	start(): void;
	[key: string]: any;
}

export default function main(statistics: Statistics): Main {
	function onUnitClick(data: UnitProperties) {
		data.health = Math.random();
		console.log('onUnitClick', data.name);
	}

	return {
		type: 'container',
		children: {
			background: {
				type: 'image',
				src: BACKGROUND,
				scaleX: 1,
				scaleY: 1,
			},
			figure: {
				type: 'shape',
				data: {
					type: 'rectangle',
					x: 20,
					y: 20,
					width: 100,
					height: 50,
					fill: 0xff00ff,
					stroke: 0x0000ff,
				},
			},
			shapes: {
				type: 'shape',
				data: [
					{
						type: 'ellipse',
						x: 100,
						y: 100,
						radius: 50,
						fill: { type: 'solid', color: 0xffff00, alpha: 1 },
						stroke: { fill: 0x0000ff, thickness: 10 },
					},
					{
						type: 'path',
						data: 'M 110, 110 H 190 V 190 H 110 Z',
						fill: 0x990000,
					},
					{
						type: 'path',
						data: [
							{ type: 'moveTo', x: 0, y: 0 },
							{ type: 'lineTo', x: 100, y: 0 },
							{ type: 'lineTo', x: 100, y: 100 },
							{ type: 'lineTo', x: 0, y: 100 },
							{ type: 'lineTo', x: 0, y: 0 },
						],
						fill: { type: 'solid', color: 0x999999, alpha: 0.6 },
						stroke: 0x000000,
					},
				],
			},
			units: {
				type: 'container',
				children: [
					unit({
						name: 'Archer', health: 1, image: ARCHER, onClick: onUnitClick,
					}),
					unit({
						name: 'Animalist', health: 1, image: ANIMALIST, onClick: onUnitClick,
					}),
				],
			},
			artifact: {
				type: 'container',
				x: 300,
				y: 350,
				children: [artifact()],
			},
			map: {
				type: 'image',
				y: 450,
				scaleX: 0.2,
				scaleY: 0.2,
				alpha: 0.5,
				src: 'test.canvas',
				onPointerOver() {
					this.alpha = 1;
				},
				onPointerOut() {
					this.alpha = 0.5;
				},
			},
			abilityFox: {
				type: 'image',
				src: ABILITY_FOX,
				x: 450,
				y: 500,
				scale: 0.5,
				tint: {
					color: 0x00ff00,
					value: 1,
				} as any,
				onUpdate(time: number) {
					if (this.tint) {
						this.tint.value += time;
						if (this.tint.value >= 1) {
							this.tint.value = 0;
						}
					}
				},
				onPointerDown(e: any) {
					if (this.tint) {
						this.tint = null;
					} else {
						this.tint = {
							color: 0x00ff00,
							value: 1,
						};
					}
					console.log('fox', e);
				},
			},
			abilityWolf: {
				type: 'container',
				x: 350,
				y: 400,
				children: {
					type: 'image',
					src: ABILITY_WOLF,
					scale: 0.5,
					alpha: 1,
					tween: {
						loop: true,
						phases: [
							{
								time: 1,
								to: { x: 200 },
							},
							{
								easing: 'cubicout',
								time: 1,
								to: { y: 200, alpha: 0.5 },
							},
							{
								easing: 'quadraticIn',
								time: 1,
								to: { x: 0, alpha: 1 },
							},
							{
								easing: 'quadraticOut',
								time: 1,
								to: { y: 0 },
							},
						],
					},
				},
			},
			fps: fps(statistics),
		},
		start() {
			console.log('start');
		},
	};
}
