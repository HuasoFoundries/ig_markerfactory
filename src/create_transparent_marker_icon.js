/** global: google */
import { IconObject } from "./icon_object.js";

import { getColors } from "./parsers.js";

export function createTransparentMarkerIcon(theoptions) {
    const generateTransparentCanvas = function(options) {
        let text_x,
            canvas = options.canvas || document.createElement("canvas"),
            context = canvas.getContext("2d"),
            font = options.font || "fontello",
            fontsize = options.fontsize || 26;

        canvas.width = 54;
        canvas.height = 48;
        context.clearRect(0, 0, canvas.width, canvas.height);

        let colors = getColors(options),
            color0 = colors[0],
            color1 = colors[1];
        context.beginPath();

        if (options.shadow) {
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
        } else {
            context.font =
                "normal normal normal " + (fontsize - 3) + "px " + font;

            context.textBaseline = "top";
            let textmetric = context.measureText(options.unicodelabel);
            text_x = Math.floor(canvas.width / 2 - textmetric.width / 2);

            //console.debug('textmetric', textmetric);

            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 0;
            context.shadowColor = "#FFFFFF";
            context.fillStyle = color0;
            context.fillText(options.unicodelabel, text_x + 1, 6);

            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 1;
            context.shadowColor = "#FFFFFF";
            context.strokeStyle = color1;
            context.strokeText(options.unicodelabel, text_x + 1, 6);
        }

        canvas.fillColor = color0;

        return canvas;
    };

    theoptions.scale = theoptions.scale || 1;
    theoptions.fontsize = theoptions.fontsize || 26;

    let markerCanvas = generateTransparentCanvas(theoptions),
        markerOpts = {};

    let scale = theoptions.scale;

    theoptions.type = "transparent";

    Object.assign(markerOpts, theoptions);

    if (window.google && window.google.maps) {
        Object.assign(markerOpts, {
            size: new google.maps.Size(54 * scale, 48 * scale),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(27 * scale, 24 * scale),
            scaledSize: new google.maps.Size(54 * scale, 48 * scale)
        });
    }
    let iconObj = new IconObject(markerCanvas, markerOpts);

    return iconObj;
}
