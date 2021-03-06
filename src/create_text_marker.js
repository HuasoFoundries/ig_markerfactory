/** global: google */
import { IconObject } from "./icon_object.js";

import { getColors } from "./parsers.js";
const generateCanvas = function(options) {
    let canvas = document.createElement("canvas");
    let ancho = 30,
        alto = 40;
    canvas.width = ancho + 18;
    canvas.height = alto;
    let x = canvas.width / 2,
        y = canvas.height - 2,
        radius = ancho / 2,
        angulo = 0.6;

    let font = "'" + options.font + "'" || "Arial";
    let fontsize = options.fontsize || 11;

    let context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    let radius0 = 2 * radius,
        cx = x + 0.95 * radius0,
        cy = y + 0.45 * radius0;

    let grad = context.createLinearGradient(0, 0, 0, canvas.height),
        colors = getColors(options),
        color0 = colors[0],
        color1 = colors[1];

    grad.addColorStop(0, color0);
    grad.addColorStop(1, color1);

    context.fillStyle = grad;
    context.strokeStyle = "rgba(200,200,200,0.7)";

    context.beginPath();

    //arco izquierdo
    context.arc(
        cx - 1,
        cy,
        radius0,
        (9 * Math.PI) / 8,
        (-6 * Math.PI) / 8,
        false
    );

    // arco superior
    context.arc(x, (y - 7) / 2, radius, angulo, Math.PI - angulo, true);

    //arco derecho
    context.arc(
        2 * x - cx + 1,
        cy,
        radius0,
        (-0.95 * Math.PI) / 3,
        -Math.PI / 8,
        false
    );
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(x, 0.4 * y, (2 * radius) / 3, 0, 2 * Math.PI, false);
    context.fillStyle = "white";
    context.fill();

    context.beginPath();

    // Render Label
    //context.font = "11pt Arial";
    context.font = fontsize + "pt " + font;
    context.textBaseline = "top";

    let textWidth = context.measureText(options.label);

    if (textWidth.width > ancho || String(options.label).length > 3) {
        context.rect(
            x - 2 - textWidth.width / 2,
            y - 30,
            x - 2 + textWidth.width / 2,
            y - 23
        );
        context.fillStyle = "#F7F0F0";
        context.fill();
        context.stroke();
    }

    context.fillStyle = "black";
    context.strokeStyle = "black";
    // centre the text.
    context.fillText(
        options.label,
        1 + Math.floor(canvas.width / 2 - textWidth.width / 2),
        8
    );
    canvas.fillColor = color0;

    return canvas;
};
export function createTextMarker(theoptions) {
    let scale = theoptions.scale || 0.75,
        markerCanvas = generateCanvas(theoptions),
        markerOpts = {};

    theoptions.type = "textmarker";

    Object.assign(markerOpts, theoptions);

    Object.assign(markerOpts, {
        origin: { x: 0, y: 0 },
        anchor: { x: 24 * scale, y: 40 * scale },
        size: { width: 48, height: 40 },
        scaledSize: { width: 48 * scale, height: 40 * scale }
    });

    let url = markerCanvas.toDataURL(),
        fillColor = markerCanvas.fillColor,
        iconObj = new IconObject(url, fillColor, markerOpts);

    return iconObj;
}
