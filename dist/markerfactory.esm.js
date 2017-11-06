var MarkerFactory = {};

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

var defaults = {
    h: 1,
    s: 78, // constant saturation
    l: 63, // constant luminance
    a: 1
};

var getColor = function (val, range) {
    defaults.h = Math.floor((360 / range) * val);
    return "hsla(" + defaults.h + "," + defaults.s + "%," + defaults.l + "%," + defaults.a + ")";
};

var getColor1 = function () {
    return "hsla(" + defaults.h + "," + defaults.s + "%," + (defaults.l - 30) + "%," + defaults.a + ")";
};

var parseHalf = function (foo) {
    return parseInt(foo / 2, 10);
};

var darken = function (stringcolor, factor) {
    var darkercolor = {};
    if (!factor) {
        factor = 1;
    }
    if (stringcolor.fillColor.indexOf('rgb') !== -1) {
        darkercolor.r = factor * parseHalf(stringcolor.r);
        darkercolor.g = factor * parseHalf(stringcolor.g);
        darkercolor.b = factor * parseHalf(stringcolor.b);
        darkercolor.fillColor = 'rgba(' + darkercolor.r + ',' + darkercolor.g + ',' + darkercolor.b + ',0.99)';
    } else if (stringcolor.fillColor.indexOf('hsl') !== -1) {
        darkercolor.h = stringcolor.h;
        darkercolor.s = stringcolor.s;
        darkercolor.l = factor * stringcolor.l - 30;
        darkercolor.fillColor = 'hsl(' + darkercolor.h + ',' + darkercolor.s + '%,' + darkercolor.l + '%)';
    }

    return darkercolor;
};

var parseHex = function (hexstring, opacity) {
    var hexcolor = {
        hex: hexstring
    };

    hexstring = hexstring.replace('#', '');
    if (hexstring.length === 3) {
        hexstring = hexstring[0] + hexstring[0] + hexstring[1] + hexstring[1] + hexstring[2] + hexstring[2];
    }
    if (isNaN(parseFloat(opacity, 10))) {
        opacity = 1;
    }

    hexcolor.r = parseInt(hexstring.substring(0, 2), 16);
    hexcolor.g = parseInt(hexstring.substring(2, 4), 16);
    hexcolor.b = parseInt(hexstring.substring(4, 6), 16);
    hexcolor.a = opacity;
    hexcolor.fillColor = 'rgba(' + hexcolor.r + ',' + hexcolor.g + ',' + hexcolor.b + ',' + hexcolor.a + ')';
    hexcolor.strokeColor = ['rgba(' + parseHalf(hexcolor.r), parseHalf(hexcolor.g), parseHalf(hexcolor.b), hexcolor.a + ')'].join(',');
    hexcolor.rgb = hexcolor.fillColor;
    return hexcolor;
};

var parseHSL = function (hslstring, opacity) {
    var hslcolor = {},
        hslparts = compact(hslstring.split(/hsla?\(|\,|\)|\%/));

    if (hslparts[3] === undefined) {
        hslparts[3] = 1;
    }
    if (isNaN(parseFloat(opacity, 10))) {
        opacity = 1;
    }

    hslcolor.h = parseFloat(hslparts[0], 10);
    hslcolor.s = parseFloat(hslparts[1], 10);
    hslcolor.l = parseFloat(hslparts[2], 10);
    hslcolor.a = parseFloat(opacity * hslparts[3], 10);

    hslcolor.fillColor = 'hsla(' + hslcolor.h + ',' + hslcolor.s + '%,' + hslcolor.l + '%,' + hslcolor.a + ')';
    hslcolor.strokeColor = 'hsla(' + hslcolor.h + ',' + hslcolor.s + '%,' + parseInt(hslcolor.l / 2, 10) + '%,' + hslcolor.a + ')';
    hslcolor.hsl = hslcolor.fillColor;
    return hslcolor;
};

var parseRGB = function (rgbstring, opacity) {
    var rgbcolor = {},
        rgbparts = compact(rgbstring.split(/rgba?\(|\,|\)/));

    if (rgbparts[3] === undefined) {
        rgbparts[3] = 1;
    }

    if (isNaN(parseFloat(opacity, 10))) {
        opacity = 1;
    }

    rgbcolor.r = parseInt(rgbparts[0], 10) % 256;
    rgbcolor.g = parseInt(rgbparts[1], 10) % 256;
    rgbcolor.b = parseInt(rgbparts[2], 10) % 256;
    rgbcolor.a = parseFloat(opacity * rgbparts[3], 10);
    rgbcolor.fillColor = 'rgba(' + rgbcolor.r + ',' + rgbcolor.g + ',' + rgbcolor.b + ',' + rgbcolor.a + ')';
    rgbcolor.strokeColor = 'rgba(' + rgbcolor.r / 2 + ',' + rgbcolor.g / 2 + ',' + rgbcolor.b / 2 + ',' + rgbcolor.a + ')';
    rgbcolor.rgb = rgbcolor.fillColor;
    return rgbcolor;
};

var rgbToHSL = function (r, g, b, a) {
    r = (r % 256) / 255;
    g = (g % 256) / 255;
    b = (b % 256) / 255;
    if (a === undefined) {
        a = 1;
    }
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        default:
            h = 0;
            break;
        }

        h /= 6;
    }
    var hsl = {
        h: Math.round(360 * h),
        s: Math.round(100 * s),
        l: Math.round(100 * l),
        a: Math.round(100 * a) / 100
    };

    hsl.fillColor = 'hsla(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%,' + hsl.a + ')';

    return hsl;
};

var hslToRGB = function (h, s, l, a) {
    var r, g, b;

    h = parseFloat(h, 10) / 360;
    s = parseFloat(s, 10) / 100;
    l = parseFloat(l, 10) / 100;
    if (a === undefined) {
        a = 1;
    }
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function (p, q, t) {
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
        };

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
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a: parseFloat(a, 10)
    };

    rgb.fillColor = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';

    return rgb;

};

var toDecColor = function (stringcolor) {
    var parsedcolor = {};
    if (!stringcolor) {
        parsedcolor.fillColor = 'rgba(100,250,50,0.99)';
    } else if (stringcolor.indexOf('rgb') !== -1) {
        parsedcolor = parseRGB(stringcolor);
    } else if (stringcolor.indexOf('hsl') !== -1) {
        parsedcolor = parseHSL(stringcolor);
    } else {
        parsedcolor = parseHex(stringcolor);
    }

    return parsedcolor;
};

var IconObject = function (canvas, markerOpts) {
    this.url = canvas.toDataURL();
    this.markerOpts = markerOpts;
    Object.assign(this, markerOpts);
    return this;
};
IconObject.prototype.toJSON = function () {
    return {
        url: null,
        markerOpts: this.markerOpts
    };
};

var createTextMarker = function (theoptions) {

    var generateCanvas = function (options) {
        var canvas = document.createElement("canvas");
        var ancho = 30,
            alto = 40;
        canvas.width = ancho + 18;
        canvas.height = alto;
        var x = canvas.width / 2,
            y = canvas.height - 2,
            radius = ancho / 2,
            angulo = 0.6;

        var font = "'" + options.font + "'" || 'Arial';
        var fontsize = options.fontsize || 11;

        var context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        var radius0 = 2 * radius,
            cx = x + 0.95 * radius0,
            cy = y + 0.45 * radius0;

        var grad = context.createLinearGradient(0, 0, 0, canvas.height),
            color0, color1;
        if (options.index !== undefined && options.count > 0) {
            color0 = getColor(options.index, options.count);
            color1 = getColor1();
        } else {
            var deccolor = toDecColor(options.color);
            color0 = deccolor.fillColor;
            color1 = darken(deccolor).fillColor;
        }

        grad.addColorStop(0, color0);
        grad.addColorStop(1, color1);

        context.fillStyle = grad;
        context.strokeStyle = 'rgba(200,200,200,0.7)';

        context.beginPath();

        //arco izquierdo
        context.arc(cx - 1, cy, radius0, 9 * Math.PI / 8, -6 * Math.PI / 8, false);

        // arco superior
        context.arc(x, (y - 7) / 2, radius, angulo, Math.PI - angulo, true);

        //arco derecho
        context.arc(2 * x - cx + 1, cy, radius0, -0.95 * Math.PI / 3, -Math.PI / 8, false);
        context.fill();
        context.stroke();

        context.beginPath();
        context.arc(x, 0.40 * y, 2 * radius / 3, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();

        context.beginPath();

        // Render Label
        //context.font = "11pt Arial";
        context.font = fontsize + "pt " + font;
        context.textBaseline = "top";

        var textWidth = context.measureText(options.label);

        if (textWidth.width > ancho || String(options.label).length > 3) {
            context.rect(x - 2 - textWidth.width / 2, y - 30, x - 2 + textWidth.width / 2, y - 23);
            context.fillStyle = '#F7F0F0';
            context.fill();
            context.stroke();
        }

        context.fillStyle = "black";
        context.strokeStyle = "black";
        // centre the text.
        context.fillText(options.label, 1 + Math.floor((canvas.width / 2) - (textWidth.width / 2)), 8);

        return canvas;

    };
    theoptions.scale = theoptions.scale || 0.75;
    var markerCanvas = generateCanvas(theoptions),
        markerOpts = {};

    Object.assign(markerOpts, theoptions);

    if (window.google && window.google.maps) {
        Object.assign(markerOpts, {
            size: new google.maps.Size(48, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(24 * theoptions.scale, 40 * theoptions.scale),
            scaledSize: new google.maps.Size(48 * theoptions.scale, 40 * theoptions.scale)
        });
    }
    var iconObj = new IconObject(markerCanvas, markerOpts);

    return iconObj;
};

var createFatMarkerIcon = function (theoptions) {

    var generateFatCanvas = function (options) {
        var canvas = options.canvas || document.createElement("canvas"),
            anchorX = 27,
            anchorY = 53,
            radius = (anchorX - 9),
            angulo = 1.1,
            font = options.font || 'fontello',
            fontsize = options.fontsize || 14,
            context = canvas.getContext("2d"),
            grad = context.createLinearGradient(0, 0, 0, anchorY),
            color0, color1;

        canvas.width = anchorX * 2;
        canvas.height = anchorY + 1;

        if (options.index !== undefined && options.count > 0) {
            color0 = getColor(options.index, options.count);
            color1 = getColor1();
        } else {
            var deccolor = toDecColor(options.color);
            color0 = deccolor.fillColor;
            color1 = darken(deccolor).fillColor;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        grad.addColorStop(0, color0);
        grad.addColorStop(1, color1);

        context.fillStyle = grad;
        context.strokeStyle = color1;
        context.beginPath();

        context.moveTo(anchorX, anchorY);

        // arco superior
        context.arc(anchorX, 2 + (0.50 * anchorY), radius, angulo, Math.PI - angulo, true);

        //punta inferior
        context.lineTo(anchorX, anchorY);

        context.fill();
        context.stroke();

        // Círculo blanco
        context.beginPath();
        context.arc(anchorX, 2 + (0.50 * anchorY), (radius - 3), 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();

        context.beginPath();

        context.font = 'normal normal normal ' + fontsize + 'px ' + font;
        console.log('context font', context.font);
        context.fillStyle = color1;
        context.textBaseline = "top";
        var textWidth = context.measureText(options.unicodelabel);

        // centre the text.
        context.fillText(options.unicodelabel, Math.floor((canvas.width / 2) - (textWidth.width / 2)), 1 + Math.floor(canvas.height / 2 - fontsize / 2));

        return canvas;

    };
    var scale = theoptions.scale || 1,
        markerCanvas = generateFatCanvas(theoptions),
        markerOpts = {};
    Object.assign(markerOpts, theoptions);

    if (window.google && window.google.maps) {
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
};

var createTransparentMarkerIcon = function (theoptions) {

    var generateTransparentCanvas = function (options) {
        var canvas = options.canvas || document.createElement("canvas"),
            context = canvas.getContext("2d"),
            font = options.font || 'fontello',
            fontsize = options.fontsize || 30,
            color0, color1;

        canvas.width = 54;
        canvas.height = 48;
        context.clearRect(0, 0, canvas.width, canvas.height);

        /*context.rect(1, 1, canvas.width - 2, canvas.height - 2);
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();*/

        if (options.index !== undefined && options.count > 0) {
            color0 = getColor(options.index, options.count);
            color1 = getColor1();
        } else {
            var deccolor = toDecColor(options.color);
            color0 = deccolor.fillColor;
            color1 = darken(deccolor).fillColor;
        }

        context.beginPath();

        context.font = 'normal normal normal ' + fontsize + 'px ' + font;

        context.textBaseline = "top";
        var textWidth = context.measureText(options.unicodelabel),
            text_x = Math.floor((canvas.width / 2) - (textWidth.width / 2));

        if (options.shadow) {
            var grad = context.createLinearGradient(text_x, 0, canvas.width, canvas.height);

            grad.addColorStop(0, '#FFFFFF');
            grad.addColorStop(1, color0);

            //console.debug('applying shadow');
            context.shadowOffsetX = -2;
            context.shadowOffsetY = -2;
            context.shadowBlur = 0;

            context.fillStyle = '#FFFFFF';
            context.shadowColor = '#666666';

            context.fillText(options.unicodelabel, text_x - 4, 0);
            context.fillText(options.unicodelabel, text_x, 3);
            context.fillStyle = grad;
            context.fillText(options.unicodelabel, text_x + 4, 6);

            context.strokeStyle = '#FFFFFF';
            context.strokeText(options.unicodelabel, text_x + 4, 6);

        } else {

            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 0;
            context.shadowColor = '#FFFFFF';
            context.fillStyle = color0;
            context.fillText(options.unicodelabel, text_x + 1, 0);

            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 1;
            context.shadowColor = '#FFFFFF';
            context.strokeStyle = color1;
            context.strokeText(options.unicodelabel, text_x + 1, 0);

        }

        canvas.fillColor = color0;

        return canvas;

    };

    theoptions.scale = theoptions.scale || 1;
    theoptions.fontsize = theoptions.fontsize || 30;

    var markerCanvas = generateTransparentCanvas(theoptions),
        markerOpts = {};

    var scale = theoptions.scale;
    if (theoptions.shadow) {
        scale = 0.9 * scale;
    }

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
};

MarkerFactory.toDecColor = toDecColor;

function parseColorString(somecolor, opacity) {
    var parsedcolor = {
            original: somecolor
        },
        hsl, rgb;

    opacity = opacity || 1;

    if (somecolor.indexOf('hsl') !== -1) {
        hsl = parseHSL(somecolor, opacity);
        rgb = hslToRGB(hsl.h, hsl.s, hsl.l, hsl.a);

    } else {
        if (somecolor.indexOf('rgb') !== -1) {
            rgb = parseRGB(somecolor, opacity);
        } else {
            rgb = parseHex(somecolor, opacity);
        }
        hsl = rgbToHSL(rgb.r, rgb.g, rgb.b, rgb.a);

    }

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
    parsedcolor.strokeColor = rgb.strokeColor;
    parsedcolor.hex = ['#', rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)].join('');
    return parsedcolor;
};

var getHexColor = function (color) {
    var hexcolor = color;
    if (color.indexOf('rgb') !== -1) {
        var rgbArr = color.split(/[\(,\)]/ig);
        hexcolor = [
            (1 * rgbArr[1]).toString(16), (1 * rgbArr[2]).toString(16), (1 * rgbArr[3]).toString(16)
        ].join('');
    } else if (color.indexOf('#') !== -1) {
        hexcolor = color.replace(/#/g, '');
    }
    return hexcolor;
};

var ButtonFactory = {
    parseColorString: parseColorString,
    autoIcon: function (options) {
        options.font = options.font || 'Arial';
        options.color = options.color || '#FF0000';
        options.hexcolor = getHexColor(options.color);

        // En frontdev el icono debe aparecer solo, sin envoltorio
        if (options.transparent_background === undefined) {
            options.transparent_background = true;
        }
        if (options.font === 'fontawesome-webfont' ||
            options.font === 'fontello' ||
            options.font === 'Material Icons' ||
            options.font === 'Material-Design-Icons') {

            // Fontello obligatorio
            options.font = 'fontello';

            options.label = (options.label || 'e836').slice(-4);

            options.unicodelabel = String.fromCharCode('0x' + options.label);
            options.scale = options.scale || 1;
            if (options.transparent_background) {
                return createTransparentMarkerIcon(options);
            } else {
                return createFatMarkerIcon(options);
            }

        } else {
            options.scale = options.scale || 0.75;
            options.label = String(options.label || 'A');
            // This is text I should print literally
            return createTextMarker(options);
        }

    }
};
export {
    ButtonFactory
};
export default ButtonFactory;
