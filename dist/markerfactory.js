(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global = global || {})));
}(this, (function (exports) { 'use strict';

	function IconObject(canvas, markerOpts) {
		this.url = canvas.toDataURL();
		this.fillColor = canvas.fillColor;
		this.markerOpts = markerOpts;
		Object.assign(this, markerOpts);
		return this;
	}

	IconObject.prototype.toJSON = function() {
		return {
			url: null,
			markerOpts: this.markerOpts
		};
	};

	/** global: google */

	function createClusterIcon(theoptions) {
	    var generateClusterCanvas = function(options) {
	        var canvas = options.canvas || document.createElement("canvas"),
	            anchorX = 27,
	            anchorY = 53,
	            radius = anchorX - 9,
	            color1,
	            font = options.font || "fontello",
	            fontsize = options.fontsize || 14,
	            context = canvas.getContext("2d");

	        canvas.width = anchorX * 2;
	        canvas.height = anchorY + 1;

	        context.clearRect(0, 0, canvas.width, canvas.height);
	        context.moveTo(anchorX, anchorY);

	        var labelvalue = parseInt(options.label, 10);
	        if (labelvalue < 10) {
	            color1 = "orange";
	            fontsize = 14;
	        } else if (labelvalue < 30) {
	            color1 = "red";
	            fontsize = 15;
	        } else {
	            color1 = "purple";
	            fontsize = 16;
	        }
	        if (labelvalue > 99) {
	            radius = radius + 3;
	            context.setLineDash([5, 5]);
	            context.beginPath();
	            context.arc(
	                anchorX,
	                2 + 0.5 * anchorY,
	                radius + 7,
	                0,
	                2 * Math.PI,
	                false
	            );
	            context.fillStyle = "transparent";
	            context.strokeStyle = color1;
	            context.lineWidth = 2;
	            context.fill();
	            context.stroke();
	        }

	        context.setLineDash([5, 5]);
	        context.beginPath();
	        context.arc(
	            anchorX,
	            2 + 0.5 * anchorY,
	            radius + 2,
	            0,
	            2 * Math.PI,
	            false
	        );
	        context.fillStyle = "transparent";
	        context.strokeStyle = color1;
	        context.lineWidth = 2;
	        context.fill();
	        context.stroke();

	        // Círculo blanco
	        context.setLineDash([5, 0]);
	        context.beginPath();
	        context.arc(
	            anchorX,
	            2 + 0.5 * anchorY,
	            radius - 3,
	            0,
	            2 * Math.PI,
	            false
	        );
	        context.fillStyle = "white";
	        context.strokeStyle = color1;
	        context.lineWidth = 4;
	        context.fill();
	        context.stroke();

	        context.beginPath();

	        context.font = "normal normal normal " + fontsize + "px " + font;
	        context.fillStyle = "#333";
	        context.textBaseline = "top";

	        var textWidth = context.measureText(options.label),
	            text_x = options.label,
	            label_x = Math.floor(canvas.width / 2 - textWidth.width / 2),
	            label_y = 1 + Math.floor(canvas.height / 2 - fontsize / 2);

	        // centre the text.
	        context.fillText(text_x, label_x, label_y);

	        return canvas;
	    };
	    theoptions.scale = theoptions.scale || 1;
	    var markerCanvas = generateClusterCanvas(theoptions),
	        markerOpts = {},
	        scale = theoptions.scale;

	    Object.assign(markerOpts, theoptions);

	    if (window && window.google && window.google.maps) {
	        Object.assign(markerOpts, {
	            size: new google.maps.Size(54, 48),
	            origin: new google.maps.Point(0, 0),
	            anchor: new google.maps.Point(27 * scale, 24 * scale),
	            scaledSize: new google.maps.Size(54 * scale, 48 * scale)
	        });
	    }

	    var iconObj = new IconObject(markerCanvas, markerOpts);

	    return iconObj;
	}

	function hslaString(hslcolor) {
		if (hslcolor.a !== undefined) {
			return (
				"hsla(" +
				hslcolor.h +
				"," +
				hslcolor.s +
				"%," +
				hslcolor.l +
				"%," +
				parseFloat(hslcolor.a, 10) +
				")"
			);
		}
		return "hsl(" + hslcolor.h + "," + hslcolor.s + "%," + hslcolor.l + "%)";
	}

	function rgbaString(hexcolor) {
		if (hexcolor.a !== undefined) {
			return (
				"rgba(" +
				hexcolor.r +
				"," +
				hexcolor.g +
				"," +
				hexcolor.b +
				"," +
				parseFloat(hexcolor.a, 10) +
				")"
			);
		}
		return "rgb(" + hexcolor.r + "," + hexcolor.g + "," + hexcolor.b + ")";
	}

	function parseHalf(foo) {
		return parseInt(foo / 2, 10);
	}

	function compact(array) {
		var index = -1,
			length = array ? array.length : 0,
			resIndex = 0,
			result = [];

		while (++index < length) {
			var value = array[index];
			if (value) {
				result[resIndex++] = value;
			}
		}
		return result;
	}

	/** global: google, r, g, b */

	function parseHex(hexstring, opacity, darkenfactor) {
	    var hexcolor = {
	        hex: hexstring
	    };
	    darkenfactor = darkenfactor || 1;

	    hexstring = hexstring.replace("#", "");
	    if (hexstring.length === 3) {
	        hexstring =
	            hexstring[0] +
	            hexstring[0] +
	            hexstring[1] +
	            hexstring[1] +
	            hexstring[2] +
	            hexstring[2];
	    }
	    if (isNaN(parseFloat(opacity, 10))) {
	        opacity = 1;
	    }

	    hexcolor.r = parseInt(
	        darkenfactor * parseInt(hexstring.substring(0, 2), 16),
	        10
	    );
	    hexcolor.g = parseInt(
	        darkenfactor * parseInt(hexstring.substring(2, 4), 16),
	        10
	    );
	    hexcolor.b = parseInt(
	        darkenfactor * parseInt(hexstring.substring(4, 6), 16),
	        10
	    );
	    hexcolor.a = opacity;
	    hexcolor.fillColor = rgbaString(hexcolor);
	    hexcolor.strokeColor = [
	        "rgba(" + parseHalf(hexcolor.r),
	        parseHalf(hexcolor.g),
	        parseHalf(hexcolor.b),
	        hexcolor.a + ")"
	    ].join(",");
	    hexcolor.rgb = hexcolor.fillColor;
	    return hexcolor;
	}

	function parseHSL(hslstring, opacity) {
	    var hslcolor = {},
	        hslcolor_stroke = {},
	        hslparts = compact(hslstring.split(/hsla?\(|,|\)|%/));

	    if (hslparts[3] === undefined) {
	        hslparts[3] = 1;
	    }
	    if (isNaN(parseFloat(opacity, 10))) {
	        opacity = 1;
	    }

	    hslcolor.h = hslcolor_stroke.h = parseFloat(hslparts[0], 10);
	    hslcolor.s = hslcolor_stroke.s = parseFloat(hslparts[1], 10);
	    hslcolor.l = parseFloat(hslparts[2], 10);
	    hslcolor.a = hslcolor_stroke.a = parseFloat(opacity * hslparts[3], 10);
	    hslcolor_stroke.l = parseInt(hslcolor.l / 2, 10);

	    hslcolor.fillColor = hslaString(hslcolor);
	    hslcolor.strokeColor = hslaString(hslcolor_stroke);
	    hslcolor.hsl = hslcolor.fillColor;
	    return hslcolor;
	}

	function parseRGB(rgbstring, opacity, darkenfactor) {
	    var rgbcolor = {},
	        rgbparts = compact(rgbstring.split(/rgba?\(|,|\)/));

	    darkenfactor = darkenfactor || 1;

	    if (rgbparts[3] === undefined) {
	        rgbparts[3] = 1;
	    }

	    if (isNaN(parseFloat(opacity, 10))) {
	        opacity = 1;
	    }

	    rgbcolor.r = parseInt(darkenfactor * (parseInt(rgbparts[0], 10) % 256), 10);
	    rgbcolor.g = parseInt(darkenfactor * (parseInt(rgbparts[1], 10) % 256), 10);
	    rgbcolor.b = parseInt(darkenfactor * (parseInt(rgbparts[2], 10) % 256), 10);
	    rgbcolor.a = parseFloat(opacity * rgbparts[3], 10);
	    rgbcolor.fillColor = rgbaString(rgbcolor);
	    rgbcolor.strokeColor =
	        "rgba(" +
	        rgbcolor.r / 2 +
	        "," +
	        rgbcolor.g / 2 +
	        "," +
	        rgbcolor.b / 2 +
	        "," +
	        rgbcolor.a +
	        ")";
	    rgbcolor.rgb = rgbcolor.fillColor;
	    return rgbcolor;
	}

	function hue2rgb(p, q, t) {
	    if (t < 0) {
	        t += 1;
	    }
	    if (t > 1) {
	        t -= 1;
	    }
	    if (t < 1 / 6) {
	        return p + (q - p) * 6 * t;
	    }
	    if (t < 1 / 2) {
	        return q;
	    }
	    if (t < 2 / 3) {
	        return p + (q - p) * (2 / 3 - t) * 6;
	    }
	    return p;
	}

	function hslToRGB(h, s, l, a, darkenfactor) {
	    var r, g, b;

	    darkenfactor = darkenfactor || 1;
	    h = parseFloat(h, 10) / 360;
	    s = parseFloat(s, 10) / 100;
	    l = parseFloat(l, 10) / 100;
	    if (a === undefined) {
	        a = 1;
	    }
	    if (s === 0) {
	        r = g = b = l; // achromatic
	    } else {
	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1 / 3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1 / 3);
	    }

	    if (a === undefined) {
	        a = 1;
	    }

	    var rgb = {
	        r: Math.round(r * 255 * darkenfactor),
	        g: Math.round(g * 255 * darkenfactor),
	        b: Math.round(b * 255 * darkenfactor),
	        a: parseFloat(a, 10)
	    };

	    rgb.fillColor = rgbaString(rgb);

	    return rgb;
	}

	function rgbToHSL(in_r, in_g, in_b, in_a) {
	    var h,
	        r = (in_r % 256) / 255,
	        g = (in_g % 256) / 255,
	        b = (in_b % 256) / 255,
	        a = in_a === undefined ? 1 : in_a,
	        max = Math.max(r, g, b),
	        min = Math.min(r, g, b),
	        sum = max + min,
	        diff = max - min,
	        s = sum > 1 ? diff / (2 - sum) : diff / sum;

	    switch (max) {
	        case r:
	            h = (g - b) / diff + (g < b ? 6 : 0);
	            break;
	        case g:
	            h = (b - r) / diff + 2;
	            break;
	        case b:
	            h = (r - g) / diff + 4;
	            break;
	        default:
	            h = 0;
	            break;
	    }

	    h /= 6;

	    if (diff === 0) {
	        h = s = 0; // achromatic
	    }

	    var hsl = {
	        h: Math.round(360 * h),
	        s: Math.round(100 * s),
	        l: Math.round(50 * sum),
	        a: Math.round(100 * a) / 100
	    };

	    hsl.fillColor = hslaString(hsl);

	    return hsl;
	}

	function toDecColor(stringcolor) {
	    var parsedcolor = {};
	    if (!stringcolor) {
	        parsedcolor.fillColor = "rgba(100,250,50,0.99)";
	    } else if (stringcolor.indexOf("rgb") !== -1) {
	        parsedcolor = parseRGB(stringcolor);
	    } else if (stringcolor.indexOf("hsl") !== -1) {
	        parsedcolor = parseHSL(stringcolor);
	    } else {
	        parsedcolor = parseHex(stringcolor);
	    }

	    return parsedcolor;
	}

	function getColor(val, range) {
	    var defaults = {
	        h: Math.floor((360 / range) * val),
	        s: 78, // constant saturation
	        l: 63, // constant luminance
	        a: 1
	    };

	    return hslaString(defaults);
	}

	function getColor1() {
	    var defaults1 = {
	        h: 1,
	        s: 78, // constant saturation
	        l: 33, // constant luminance
	        a: 1
	    };
	    return hslaString(defaults1);
	}

	function darken(stringcolor, factor) {
	    var darkercolor = {};
	    if (!factor) {
	        factor = 1;
	    }
	    if (stringcolor.fillColor.indexOf("rgb") !== -1) {
	        darkercolor.r = factor * parseHalf(stringcolor.r);
	        darkercolor.g = factor * parseHalf(stringcolor.g);
	        darkercolor.b = factor * parseHalf(stringcolor.b);
	        darkercolor.a = 0.99;
	        darkercolor.fillColor = rgbaString(darkercolor);
	    } else if (stringcolor.fillColor.indexOf("hsl") !== -1) {
	        darkercolor.h = stringcolor.h;
	        darkercolor.s = stringcolor.s;
	        darkercolor.l = factor * stringcolor.l - 30;
	        darkercolor.fillColor = hslaString(darkercolor);
	    }

	    return darkercolor;
	}

	function getColors(options) {
	    var color0, color1;
	    if (options.index !== undefined && options.count > 0) {
	        color0 = getColor(options.index, options.count);
	        color1 = getColor1();
	    } else {
	        var deccolor = toDecColor(options.color);
	        color0 = deccolor.fillColor;
	        color1 = darken(deccolor).fillColor;
	    }
	    return [color0, color1];
	}

	/** global: google */

	function createTextMarker(theoptions) {
	    var generateCanvas = function(options) {
	        var canvas = document.createElement("canvas");
	        var ancho = 30,
	            alto = 40;
	        canvas.width = ancho + 18;
	        canvas.height = alto;
	        var x = canvas.width / 2,
	            y = canvas.height - 2,
	            radius = ancho / 2,
	            angulo = 0.6;

	        var font = "'" + options.font + "'" || "Arial";
	        var fontsize = options.fontsize || 11;

	        var context = canvas.getContext("2d");

	        context.clearRect(0, 0, canvas.width, canvas.height);

	        var radius0 = 2 * radius,
	            cx = x + 0.95 * radius0,
	            cy = y + 0.45 * radius0;

	        var grad = context.createLinearGradient(0, 0, 0, canvas.height),
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

	        var textWidth = context.measureText(options.label);

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

	        return canvas;
	    };
	    theoptions.scale = theoptions.scale || 0.75;
	    var markerCanvas = generateCanvas(theoptions),
	        markerOpts = {};

	    theoptions.type = "textmarker";

	    Object.assign(markerOpts, theoptions);

	    if (window && window.google && window.google.maps) {
	        Object.assign(markerOpts, {
	            size: new google.maps.Size(48, 40),
	            origin: new google.maps.Point(0, 0),
	            anchor: new google.maps.Point(
	                24 * theoptions.scale,
	                40 * theoptions.scale
	            ),
	            scaledSize: new google.maps.Size(
	                48 * theoptions.scale,
	                40 * theoptions.scale
	            )
	        });
	    }
	    var iconObj = new IconObject(markerCanvas, markerOpts);

	    return iconObj;
	}

	/** global: google */

	function createFatMarkerIcon(theoptions) {
		var generateFatCanvas = function(options) {
			var canvas = options.canvas || document.createElement("canvas"),
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

			var colors = getColors(options),
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
			context.arc(
				anchorX,
				2 + 0.5 * anchorY,
				radius - 3,
				0,
				2 * Math.PI,
				false
			);
			context.fillStyle = "white";
			context.fill();

			context.beginPath();

			context.font = "normal normal normal " + fontsize + "px " + font;
			//console.log('context font', context.font);
			context.fillStyle = color1;
			context.textBaseline = "top";

			var textWidth = context.measureText(options.unicodelabel),
				text_x = options.unicodelabel,
				label_x = Math.floor(canvas.width / 2 - textWidth.width / 2),
				label_y = 1 + Math.floor(canvas.height / 2 - fontsize / 2);

			// centre the text.
			context.fillText(text_x, label_x, label_y);
			canvas.fillColor = color0;
			return canvas;
		};

		var scale = theoptions.scale || 1,
			markerCanvas = generateFatCanvas(theoptions),
			markerOpts = {};

		theoptions.type = "fatmarker";

		Object.assign(markerOpts, theoptions);

		if (window && window.google && window.google.maps) {
			Object.assign(markerOpts, {
				size: new google.maps.Size(54, 48),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(21 * scale, 36 * scale),
				scaledSize: new google.maps.Size(42 * scale, 36 * scale),
				scale: scale
			});
		}
		var iconObj = new IconObject(markerCanvas, markerOpts);
		return iconObj;
	}

	/** global: google */

	function createTransparentMarkerIcon(theoptions) {
	    var generateTransparentCanvas = function(options) {
	        var text_x,
	            canvas = options.canvas || document.createElement("canvas"),
	            context = canvas.getContext("2d"),
	            font = options.font || "fontello",
	            fontsize = options.fontsize || 26;

	        canvas.width = 54;
	        canvas.height = 48;
	        context.clearRect(0, 0, canvas.width, canvas.height);

	        var colors = getColors(options),
	            color0 = colors[0],
	            color1 = colors[1];
	        context.beginPath();

	        if (options.shadow) {
	            context.font = "normal normal normal " + fontsize + "px " + font;

	            context.textBaseline = "top";
	            var textWidth = context.measureText(options.unicodelabel);
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
	            var textmetric = context.measureText(options.unicodelabel);
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

	    var markerCanvas = generateTransparentCanvas(theoptions),
	        markerOpts = {};

	    var scale = theoptions.scale;

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
	    var iconObj = new IconObject(markerCanvas, markerOpts);

	    return iconObj;
	}

	/** global: google, r, g, b */

	function padHex(str_in) {
	    if (("" + str_in).length === 1) {
	        return "0" + String(str_in);
	    } else {
	        return String(str_in);
	    }
	}

	var MarkerFactory = {
	    createTransparentMarkerIcon: createTransparentMarkerIcon,
	    createFatMarkerIcon: createFatMarkerIcon,
	    createTextMarker: createTextMarker,
	    createClusterIcon: createClusterIcon,
	    serializeOptions: function(options) {
	        if (typeof options !== "object") {
	            return null;
	        }
	        var sortedOpts = Object.entries(options)
	            .filter(function(item) {
	                return (
	                    typeof item[1] !== "function" && typeof item[1] !== "object"
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
	        var parsedcolor = {
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

	exports.MarkerFactory = MarkerFactory;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
