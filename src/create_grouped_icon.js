/** global: google */
import { IconObject } from "./icon_object.js";

import { getColors } from "./parsers.js";
const generateGroupedCanvas = function(options) {
    let text_x,
        canvas = options.canvas || document.createElement("canvas"),
        context = canvas.getContext("2d"),
        font = options.font || "fontello",
        fontsize = options.fontsize || 26;

    canvas.width = 54;
    canvas.height = 48;
    context.clearRect(0, 0, canvas.width, canvas.height);

    let colors = getColors(options),
        color0 = colors[0];
    context.beginPath();

    context.font = "normal normal normal " + fontsize + "px " + font;

    context.textBaseline = "top";
    let textWidth = context.measureText(options.unicodelabel);
    text_x = Math.floor(canvas.width / 2 - textWidth.width / 2);

    context.shadowOffsetX = -2;
    context.shadowOffsetY = -2;
    context.shadowBlur = 0;

    context.fillStyle = "#FFFFFF";
    context.shadowColor = "#666666";

    context.fillText(options.unicodelabel, text_x - 4, 2);
    context.fillText(options.unicodelabel, text_x, 5);
    context.fillStyle = color0;
    context.fillText(options.unicodelabel, text_x + 4, 8);

    context.strokeStyle = "#FFFFFF";
    context.strokeText(options.unicodelabel, text_x + 4, 8);

    canvas.fillColor = color0;

    return canvas;
};

export function createGroupedIcon(theoptions) {
    theoptions.scale = theoptions.scale || 1;
    theoptions.fontsize = theoptions.fontsize || 26;

    let markerCanvas = generateGroupedCanvas(theoptions),
        markerOpts = {};

    let scale = theoptions.scale;

    theoptions.type = "transparent";

    Object.assign(markerOpts, theoptions);

    Object.assign(markerOpts, {
        origin: { x: 0, y: 0 },
        anchor: { x: 27 * scale, y: 24 * scale },
        size: { width: 54, height: 48 },
        scaledSize: { width: 54 * scale, height: 48 * scale }
    });

    let url = markerCanvas.toDataURL(),
        fillColor = markerCanvas.fillColor,
        iconObj = new IconObject(url, fillColor, markerOpts);

    return iconObj;
}
