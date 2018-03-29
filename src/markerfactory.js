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

 function padHex(str_in) {
    if (('' + str_in).length === 1) {
        return '0' + String(str_in);
    } else {
        return String(str_in);
    }
 }

 var defaults = {
    h: 1,
    s: 78, // constant saturation
    l: 63, // constant luminance
    a: 1
 };

 function getColor(val, range) {
    defaults.h = Math.floor((360 / range) * val);
    return "hsla(" + defaults.h + "," + defaults.s + "%," + defaults.l + "%," + defaults.a + ")";
 }

 function getColor1() {
    return "hsla(" + defaults.h + "," + defaults.s + "%," + (defaults.l - 30) + "%," + defaults.a + ")";
 }

 function parseHalf(foo) {
    return parseInt(foo / 2, 10);
 }



 function darken(stringcolor, factor) {
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

 function parseHex(hexstring, opacity, darkenfactor) {
    var hexcolor = {
        hex: hexstring
    };
    darkenfactor = darkenfactor || 1;

    hexstring = hexstring.replace('#', '');
    if (hexstring.length === 3) {
        hexstring = hexstring[0] + hexstring[0] + hexstring[1] + hexstring[1] + hexstring[2] + hexstring[2];
    }
    if (isNaN(parseFloat(opacity, 10))) {
        opacity = 1;
    }

    hexcolor.r = parseInt(darkenfactor * (parseInt(hexstring.substring(0, 2), 16)), 10);
    hexcolor.g = parseInt(darkenfactor * (parseInt(hexstring.substring(2, 4), 16)), 10);
    hexcolor.b = parseInt(darkenfactor * (parseInt(hexstring.substring(4, 6), 16)), 10);
    hexcolor.a = opacity;
    hexcolor.fillColor = 'rgba(' + hexcolor.r + ',' + hexcolor.g + ',' + hexcolor.b + ',' + hexcolor.a + ')';
    hexcolor.strokeColor = ['rgba(' + parseHalf(hexcolor.r), parseHalf(hexcolor.g), parseHalf(hexcolor.b), hexcolor.a + ')'].join(',');
    hexcolor.rgb = hexcolor.fillColor;
    return hexcolor;
 }

 function parseHSL(hslstring, opacity) {
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

 function parseRGB(rgbstring, opacity, darkenfactor) {
    var rgbcolor = {},
        rgbparts = compact(rgbstring.split(/rgba?\(|\,|\)/));

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
    rgbcolor.fillColor = 'rgba(' + rgbcolor.r + ',' + rgbcolor.g + ',' + rgbcolor.b + ',' + rgbcolor.a + ')';
    rgbcolor.strokeColor = 'rgba(' + rgbcolor.r / 2 + ',' + rgbcolor.g / 2 + ',' + rgbcolor.b / 2 + ',' + rgbcolor.a + ')';
    rgbcolor.rgb = rgbcolor.fillColor;
    return rgbcolor;
 }

 function rgbToHSL(r, g, b, a) {
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
        r: Math.round(r * 255 * darkenfactor),
        g: Math.round(g * 255 * darkenfactor),
        b: Math.round(b * 255 * darkenfactor),
        a: parseFloat(a, 10)
    };

    rgb.fillColor = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';

    return rgb;

 };

 function toDecColor(stringcolor) {
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
    this.fillColor = canvas.fillColor;
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
            colors = getColors(options),
            color0 = colors[0],
            color1 = colors[1];

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

    theoptions.type = 'textmarker';

    Object.assign(markerOpts, theoptions);

    if (window && window.google && window.google.maps) {
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



 var createClusterIcon = function (theoptions) {

    var generateClusterCanvas = function (options) {
        var canvas = options.canvas || document.createElement("canvas"),
            anchorX = 27,
            anchorY = 53,
            radius = (anchorX - 9),
            angulo = 1.1,
            font = options.font || 'fontello',
            fontsize = options.fontsize || 14,
            context = canvas.getContext("2d"),
            grad = context.createLinearGradient(0, 0, 0, anchorY);

        canvas.width = anchorX * 2;
        canvas.height = anchorY + 1;

        var colors = getColors(options),
            color0 = colors[0],
            color1 = colors[1];


        context.clearRect(0, 0, canvas.width, canvas.height);
        context.moveTo(anchorX, anchorY);

        var labelvalue = parseInt(options.label);
        if (labelvalue < 10) {
            color1 = 'orange';
            fontsize = 14;
        } else if (labelvalue < 30) {
            color1 = 'red';
            fontsize = 15;
        } else {
            color1 = 'purple';
            fontsize = 16;
        }
        if (labelvalue > 99) {
            radius = radius + 3;
            context.setLineDash([5, 5])
            context.beginPath();
            context.arc(anchorX, 2 + (0.50 * anchorY), (radius + 7), 0, 2 * Math.PI, false);
            context.fillStyle = 'transparent';
            context.strokeStyle = color1;
            context.lineWidth = 2;
            context.fill();
            context.stroke();
        }

        context.setLineDash([5, 5])
        context.beginPath();
        context.arc(anchorX, 2 + (0.50 * anchorY), (radius + 2), 0, 2 * Math.PI, false);
        context.fillStyle = 'transparent';
        context.strokeStyle = color1;
        context.lineWidth = 2;
        context.fill();
        context.stroke();

        // Círculo blanco
        context.setLineDash([5, 0])
        context.beginPath();
        context.arc(anchorX, 2 + (0.50 * anchorY), (radius - 3), 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.strokeStyle = color1;
        context.lineWidth = 4;
        context.fill();
        context.stroke();

        context.beginPath();

        context.font = 'normal normal normal ' + fontsize + 'px ' + font;
        console.log('context font', context.font);
        context.fillStyle = '#333';
        context.textBaseline = "top";
        var textWidth = context.measureText(options.label);

        // centre the text.
        context.fillText(options.label, Math.floor((canvas.width / 2) - (textWidth.width / 2)), 1 + Math.floor(canvas.height / 2 - fontsize / 2));

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
        //console.log('context font', context.font);
        context.fillStyle = color1;
        context.textBaseline = "top";
        var textWidth = context.measureText(options.unicodelabel);

        // centre the text.
        context.fillText(options.unicodelabel, Math.floor((canvas.width / 2) - (textWidth.width / 2)), 1 + Math.floor(canvas.height / 2 - fontsize / 2));
        canvas.fillColor = color0;
        return canvas;

    };
    var scale = theoptions.scale || 1,
        markerCanvas = generateFatCanvas(theoptions),
        markerOpts = {};

    theoptions.type = 'fatmarker';

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
 };

 var createTransparentMarkerIcon = function (theoptions) {

    var generateTransparentCanvas = function (options) {
        var canvas = options.canvas || document.createElement("canvas"),
            context = canvas.getContext("2d"),
            font = options.font || 'fontello',
            fontsize = options.fontsize || 26;

        canvas.width = 54;
        canvas.height = 48;
        context.clearRect(0, 0, canvas.width, canvas.height);

        /*context.rect(1, 1, canvas.width - 2, canvas.height - 2);
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();*/

        var colors = getColors(options),
            color0 = colors[0],
            color1 = colors[1];
        context.beginPath();

        if (options.shadow) {

            context.font = 'normal normal normal ' + fontsize + 'px ' + font;

            context.textBaseline = "top";
            var textWidth = context.measureText(options.unicodelabel),
                text_x = Math.floor((canvas.width / 2) - (textWidth.width / 2));

            context.shadowOffsetX = -2;
            context.shadowOffsetY = -2;
            context.shadowBlur = 0;

            context.fillStyle = '#FFFFFF';
            context.shadowColor = '#666666';

            context.fillText(options.unicodelabel, text_x - 4, 2);
            context.fillText(options.unicodelabel, text_x, 5);
            context.fillStyle = color0;
            context.fillText(options.unicodelabel, text_x + 4, 8);

            context.strokeStyle = '#FFFFFF';
            context.strokeText(options.unicodelabel, text_x + 4, 8);

        } else {

            context.font = 'normal normal normal ' + (fontsize - 3) + 'px ' + font;

            context.textBaseline = "top";
            var textmetric = context.measureText(options.unicodelabel),
                text_x = Math.floor((canvas.width / 2) - (textmetric.width / 2));

            //console.debug('textmetric', textmetric);

            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 0;
            context.shadowColor = '#FFFFFF';
            context.fillStyle = color0;
            context.fillText(options.unicodelabel, text_x + 1, 6);

            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 1;
            context.shadowColor = '#FFFFFF';
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
    /*if (theoptions.shadow) {
        scale = 0.9 * scale;
    }*/
    theoptions.type = 'transparent';

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




 var MarkerFactory = {
    createTransparentMarkerIcon: createTransparentMarkerIcon,
    createFatMarkerIcon: createFatMarkerIcon,
    createTextMarker: createTextMarker,
    /**
     * Receives a color string rgb(a), hsl(a) or hex, returns its components
     * in rgba and hsla, with optional transparency
     * plus a darkened version (default is half of each RGB component) and a 
     *
     * @param {string} somecolor          - A color string in  rgb(a), hsl(a) or hex format
     * @param {Number} [opacity=1]        - Opacity to apply to the color
     * @param {Number} [darkenfactor=1] - How much darker should the resulting color be
     * 
     * @return     {Object}  input color parsed and modified as requested
     */
    parseColorString: function (somecolor, opacity, darkenfactor) {
        var parsedcolor = {
                original: somecolor
            },
            hsl, rgb;

        darkenfactor = darkenfactor || 1;
        opacity = opacity || 1;

        if (somecolor.indexOf('hsl') !== -1) {
            hsl = parseHSL(somecolor, opacity);
            rgb = hslToRGB(hsl.h, hsl.s, hsl.l, hsl.a, darkenfactor);

        } else {
            if (somecolor.indexOf('rgb') !== -1) {
                rgb = parseRGB(somecolor, opacity, darkenfactor);
            } else {
                rgb = parseHex(somecolor, opacity, darkenfactor);
            }


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
        parsedcolor.hex = ['#', padHex(rgb.r.toString(16)), padHex(rgb.g.toString(16)), padHex(rgb.b.toString(16))].join('');
        return parsedcolor;
    },
    /**
     * Generates an google maps marker (or an image as dataurl from the given options)
     *
     * @param      {Object}  options  The options
     * @return     {Object}  { description_of_the_return_value }
     */
    autoIcon: function (options) {

        if (typeof (options) !== 'object') {
            console.warn('autoIcon expects an object as its only parameter');
            return null;
        }

        options.label = String(options.label || 'A');
        options.color = options.color || '#FF0000';

        // unless explicitly set to false, the icon doesn't have a marker-like wrapper
        if (options.transparent_background === undefined) {
            options.transparent_background = true;
        }

        if (options.label.length === 4 || options.label.substring(0, 2) === '0x') {


            options.font = options.font || 'fontello';
            options.label = (options.label || 'e836').slice(-4);
            options.unicodelabel = String.fromCharCode('0x' + options.label);
            options.scale = options.scale || 1;

            if (options.transparent_background) {
                console.log('createTransparentMarkerIcon', options.font);
                return MarkerFactory.createTransparentMarkerIcon(options);
            } else {
                console.log('createFatMarkerIcon', options.font);
                return MarkerFactory.createFatMarkerIcon(options);
            }
        } else if (options.shadow) {
            return createClusterIcon(options);
        } else {
            options.scale = options.scale || 0.75;
            options.label = String(options.label || 'A');
            options.fontsize = options.fontsize || 11;
            options.font = options.font || 'Arial';
            // This is text I should print literally
            return MarkerFactory.createTextMarker(options);
        }

    }
 };


 export {
    MarkerFactory
 };
 export default MarkerFactory;