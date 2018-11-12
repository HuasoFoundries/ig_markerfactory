/** global: google */
import { IconObject } from "./icon_object.js";

import { getColors } from "./parsers.js";
const generateFatCanvas = function(options) {
	let canvas = options.canvas || document.createElement("canvas"),
		anchorX = 27,
		anchorY = 53,
		radius = anchorX - 9,
		angulo = 1.1,
		font = options.font || "fontello",
		fontsize = options.fontsize || 14,
		context = canvas.getContext("2d"),
		grad = context.createLinearGradient(0, 0, 0, anchorY);

	canvas.width = anchorX * 2;
	canvas.height = anchorY + 1;

	let colors = getColors(options),
		color0 = colors[0],
		color1 = colors[1];

	context.clearRect(0, 0, canvas.width, canvas.height);

	grad.addColorStop(0, color0);
	grad.addColorStop(1, color1);

	context.fillStyle = grad;
	context.strokeStyle = color1;
	context.beginPath();

	context.moveTo(anchorX, anchorY);

	// arco superior
	context.arc(
		anchorX,
		2 + 0.5 * anchorY,
		radius,
		angulo,
		Math.PI - angulo,
		true
	);

	//punta inferior
	context.lineTo(anchorX, anchorY);

	context.fill();
	context.stroke();

	// Círculo blanco
	context.beginPath();
	context.arc(anchorX, 2 + 0.5 * anchorY, radius - 3, 0, 2 * Math.PI, false);
	context.fillStyle = "white";
	context.fill();

	context.beginPath();

	context.font = "normal normal normal " + fontsize + "px " + font;
	//console.log('context font', context.font);
	context.fillStyle = color1;
	context.textBaseline = "top";

	let textWidth = context.measureText(options.unicodelabel),
		text_x = options.unicodelabel,
		label_x = Math.floor(canvas.width / 2 - textWidth.width / 2),
		label_y = 1 + Math.floor(canvas.height / 2 - fontsize / 2);

	// centre the text.
	context.fillText(text_x, label_x, label_y);
	canvas.fillColor = color0;
	return canvas;
};

export function createFatMarkerIcon(theoptions) {
	let scale = theoptions.scale || 1,
		markerCanvas = generateFatCanvas(theoptions),
		markerOpts = {};

	theoptions.type = "fatmarker";

	Object.assign(markerOpts, theoptions);

	Object.assign(markerOpts, {
		origin: { x: 0, y: 0 },
		anchor: { x: 21 * scale, y: 36 * scale },
		size: { width: 54, height: 48 },
		scaledSize: { width: 42 * scale, height: 36 * scale },
		scale: scale
	});

	let url = markerCanvas.toDataURL(),
		fillColor = markerCanvas.fillColor,
		iconObj = new IconObject(url, fillColor, markerOpts);
	return iconObj;
}
