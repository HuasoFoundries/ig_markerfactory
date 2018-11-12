/** global: google, r, g, b */

import { createClusterIcon } from "./create_cluster_icon.js";
import { createTextMarker } from "./create_text_marker.js";

import { createFatMarkerIcon } from "./create_fat_marker_icon.js";

import { createTransparentMarkerIcon } from "./create_transparent_marker_icon.js";

import { parseHex, parseHSL, parseRGB, hslToRGB, rgbToHSL } from "./parsers.js";

import { omit } from "./helpers.js";

function padHex(str_in) {
    if (("" + str_in).length === 1) {
        return "0" + String(str_in);
    } else {
        return String(str_in);
    }
}

const MarkerFactory = {
    createTransparentMarkerIcon: createTransparentMarkerIcon,
    createFatMarkerIcon: createFatMarkerIcon,
    createTextMarker: createTextMarker,
    createClusterIcon: createClusterIcon,
    serializeOptions: function(options) {
        if (typeof options !== "object") {
            return null;
        }
        var cleanOptions = omit(options, function(prop) {
                return prop.indexOf("gm_") === 0;
            }),
            sortedOpts = Object.entries(cleanOptions)
                .filter(function(item) {
                    return (
                        typeof item[1] !== "function" &&
                        typeof item[1] !== "object"
                    );
                })
                .sort();
        return JSON.stringify(sortedOpts);
    },
    generateAutoicon: function(options) {
        var generatorFN = MarkerFactory.createFatMarkerIcon,
            iconObj;
        options.type = "fatmarker";

        if (!options.is_icon) {
            options.type = "textmarker";
            generatorFN = MarkerFactory.createTextMarker;
        } else if (options.transparent_background) {
            options.type = "transparent";
            generatorFN = MarkerFactory.createTransparentMarkerIcon;
        }

        if (!options.no_cache) {
            var cacheKey = MarkerFactory.serializeOptions(options);

            iconObj = window.sessionStorage.getItem(cacheKey);
            if (iconObj !== null && !options.no_cache) {
                return JSON.parse(iconObj);
            }
        }

        iconObj = generatorFN(options);

        if (!options.no_cache) {
            var cached = iconObj.toJSON();
            cached.url = iconObj.url;
            window.sessionStorage.setItem(cacheKey, JSON.stringify(cached));
        }
        return iconObj;
    },
    /**
     * Receives a color string rgb(a), hsl(a) or hex, returns its components
     * in rgba and hsla, with optional transparency
     * plus a darkened version (default is half of each RGB component) and a
     *
     * @param {string} somecolor    - A color string in  rgb(a), hsl(a) or hex format
     * @param {Number} opacity      - Opacity to apply to the color. Optional, default 1
     * @param {Number} darkenfactor - How much darker should the resulting color be. Optional, default 1
     *
     * @return     {Object}  input color parsed and modified as requested
     */
    parseColorString: function(somecolor, opacity, darkenfactor) {
        let parsedcolor = {
                original: somecolor
            },
            hsl,
            rgb;

        darkenfactor = darkenfactor || 1;
        opacity = isNaN(parseFloat(opacity, 10)) ? 1 : parseFloat(opacity, 10);

        if (somecolor.indexOf("hsl") !== -1) {
            hsl = parseHSL(somecolor, opacity);
            rgb = hslToRGB(hsl.h, hsl.s, hsl.l, hsl.a, darkenfactor);
        } else if (somecolor.indexOf("rgb") !== -1) {
            rgb = parseRGB(somecolor, opacity, darkenfactor);
        } else {
            rgb = parseHex(somecolor, opacity, darkenfactor);
        }

        hsl = rgbToHSL(rgb.r, rgb.g, rgb.b, rgb.a);

        parsedcolor.hsl = {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l,
            a: hsl.a
        };
        parsedcolor.rgb = {
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
            a: rgb.a
        };

        parsedcolor.fillColor = rgb.fillColor;
        parsedcolor.rgba = rgb.fillColor;
        parsedcolor.hsla = hsl.fillColor;
        parsedcolor.strokeColor = rgb.strokeColor;
        parsedcolor.hex = [
            "#",
            padHex(rgb.r.toString(16)),
            padHex(rgb.g.toString(16)),
            padHex(rgb.b.toString(16)),
            rgb.a === 0 ? "00" : ""
        ].join("");
        return parsedcolor;
    },

    /**
     * Generates an google maps marker (or an image as dataurl from the given options)
     *
     * @param      {Object}  options  The options
     * @return     {Object}  { description_of_the_return_value }
     */
    autoIcon: function(options) {
        if (typeof options !== "object") {
            console.warn("autoIcon expects an object as its only parameter");
            return null;
        }
        // unless explicitly set to false, the icon doesn't have a marker-like wrapper
        options.transparent_background =
            options.transparent_background !== false;

        options.label = String(options.label || "A");
        options.color = options.color || "#FF0000";

        if (
            options.label.length === 4 ||
            options.label.substring(0, 2) === "0x"
        ) {
            options.font = options.font || "fontello";
            options.label = (options.label || "e836").slice(-4);
            options.unicodelabel = String.fromCharCode("0x" + options.label);
            options.scale = options.scale || 1;
            options.is_icon = true;

            return MarkerFactory.generateAutoicon(options);
        } else if (options.shadow) {
            console.log("createClusterIcon", JSON.stringify(options));

            return MarkerFactory.createClusterIcon(options);
        } else {
            options.scale = options.scale || 0.75;
            options.label = String(options.label || "A");
            options.fontsize = options.fontsize || 11;
            options.font = options.font || "Arial";
            // This is text I should print literally

            return MarkerFactory.generateAutoicon(options);
        }
    }
};

export { MarkerFactory };
