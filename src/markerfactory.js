/* global google:false  */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD & RequireJS
        define(["underscore"], function (_) {
            return factory(_);
        });
    } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // CommonJS
        module.exports = factory(require('underscore'));
    } else {
        // Browser
        root.MarkerFactory = factory(root._);
    }

}(this, function (_) {
    'use strict';
    var MarkerFactory = {};
    MarkerFactory._ = _;

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

    var darken = function (stringcolor) {
        var darkercolor = {};
        if (stringcolor.fillColor.indexOf('rgb') !== -1) {
            darkercolor.r = parseHalf(stringcolor.r);
            darkercolor.g = parseHalf(stringcolor.g);
            darkercolor.b = parseHalf(stringcolor.b);
            darkercolor.fillColor = 'rgba(' + darkercolor.r + ',' + darkercolor.g + ',' + darkercolor.b + ',0.99)';
        } else if (stringcolor.fillColor.indexOf('hsl') !== -1) {
            darkercolor.h = stringcolor.h;
            darkercolor.s = stringcolor.s;
            darkercolor.l = stringcolor.l - 30;
            darkercolor.fillColor = 'hsl(' + darkercolor.h + ',' + darkercolor.s + '%,' + darkercolor.l + '%)';
        }

        return darkercolor;
    };

    var parseHex = function (hexstring) {
        var hexcolor = {
            hex: hexstring
        };

        hexstring = hexstring.replace('#', '');
        hexcolor.r = parseInt(hexstring.substring(0, 2), 16);
        hexcolor.g = parseInt(hexstring.substring(2, 4), 16);
        hexcolor.b = parseInt(hexstring.substring(4, 6), 16);
        hexcolor.a = 1;
        hexcolor.fillColor = 'rgba(' + hexcolor.r + ',' + hexcolor.g + ',' + hexcolor.b + ',' + hexcolor.a + ')';
        hexcolor.strokeColor = ['rgba(' + parseHalf(hexcolor.r), parseHalf(hexcolor.g), parseHalf(hexcolor.b), hexcolor.a + ')'].join(',');
        hexcolor.rgb = hexcolor.fillColor;
        return hexcolor;
    };

    var parseHSL = function (hslstring) {
        var hslcolor = {},
            hslparts = _.compact(hslstring.split(/hsla?\(|\,|\)|\%/));
        hslcolor.h = parseFloat(hslparts[0], 10);
        hslcolor.s = parseFloat(hslparts[1], 10);
        hslcolor.l = parseFloat(hslparts[2], 10);
        hslcolor.a = parseFloat(hslparts[3] || 1, 10);
        hslcolor.fillColor = 'hsla(' + hslcolor.h + ',' + hslcolor.s + '%,' + hslcolor.l + '%,' + hslcolor.a + ')';
        hslcolor.strokeColor = 'hsla(' + hslcolor.h + ',' + hslcolor.s + '%,' + parseInt(hslcolor.l / 2, 10) + '%,' + hslcolor.a + ')';
        hslcolor.hsl = hslcolor.fillColor;
        return hslcolor;
    };

    var parseRGB = function (rgbstring) {
        var rgbcolor = {},
            rgbparts = _.compact(rgbstring.split(/rgba?\(|\,|\)/));

        rgbcolor.r = 2 * parseInt(rgbparts[0] / 2, 10);
        rgbcolor.g = 2 * parseInt(rgbparts[1] / 2, 10);
        rgbcolor.b = 2 * parseInt(rgbparts[2] / 2, 10);
        rgbcolor.a = parseFloat(rgbparts[3] || 1, 10);
        rgbcolor.fillColor = 'rgba(' + rgbcolor.r + ',' + rgbcolor.g + ',' + rgbcolor.b + ',' + rgbcolor.a + ')';
        rgbcolor.strokeColor = 'rgba(' + rgbcolor.r / 2 + ',' + rgbcolor.g / 2 + ',' + rgbcolor.b / 2 + ',' + rgbcolor.a + ')';
        rgbcolor.rgb = rgbcolor.fillColor;
        return rgbcolor;
    };


    var rgbToHSL = function (r, g, b, a) {
        r /= 255;
        g /= 255;
        b /= 255;
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
            l: Math.round(100 * l)

        };
        if (a && a !== 1) {
            hsl.fillColor = 'hsla(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%,' + a + ')';
        } else {
            hsl.fillColor = 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)';
        }


        return hsl;
    };

    var hslToRGB = function (h, s, l, a) {
        var r, g, b;

        h = parseFloat(h, 10) / 360;
        s = parseFloat(s, 10) / 100;
        l = parseFloat(l, 10) / 100;

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

        if (rgb.a !== 1) {
            rgb.fillColor = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + a + ')';
        } else {
            rgb.fillColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
        }

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


    var createFatMarkerIcon = function (theoptions) {
        var generateFatCanvas = function (options) {
            var canvas = document.createElement("canvas");

            canvas.width = 42;
            canvas.height = 36;

            var anchorX = canvas.width / 2,
                anchorY = canvas.height - 1,
                radius = (canvas.width - 18) / 2,
                angulo = 1.1;


            var fontsize = 11;

            var context = canvas.getContext("2d");



            context.clearRect(0, 0, canvas.width, canvas.height);


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
            context.strokeStyle = color1;




            context.beginPath();

            context.moveTo(anchorX, anchorY);


            // arco superior
            context.arc(anchorX, 2 + (0.50 * anchorY), radius, angulo, Math.PI - angulo, true);

            //arco derecho
            context.lineTo(anchorX, anchorY);

            context.fill();
            context.stroke();



            // Círculo blanco
            context.beginPath();
            context.arc(anchorX, 2 + (0.50 * anchorY), (radius - 3), 0, 2 * Math.PI, false);
            context.fillStyle = 'white';
            context.fill();


            context.beginPath();
            // Render Label
            //context.font = "11pt Arial";
            //
            var font = "'" + options.font + "'" || 'fontello';

            context.font = fontsize + "pt " + font;
            context.fillStyle = color1;

            context.textBaseline = "top";

            var textWidth = context.measureText(options.label);





            // centre the text.
            context.fillText(options.label,
                1 + Math.floor((canvas.width / 2) - (textWidth.width / 2)),
                49 - canvas.height
            );

            return canvas;

        };
        theoptions.scale = theoptions.scale || 1;
        var markerCanvas = generateFatCanvas(theoptions);

        return {
            url: markerCanvas.toDataURL(),
            size: new google.maps.Size(42, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(21, 36),
            scaledSize: new google.maps.Size(42, 36)
        };
    };


    var createMarkerIcon = function (theoptions) {
        var generateMarkerCanvas = function (options) {
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
        var markerCanvas = generateMarkerCanvas(theoptions);

        return {
            url: markerCanvas.toDataURL(),
            size: new google.maps.Size(48, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(24 * theoptions.scale, 40 * theoptions.scale),
            scaledSize: new google.maps.Size(48 * theoptions.scale, 40 * theoptions.scale)
        };
    };


    MarkerFactory.parseColorString = function (somecolor) {
        var parsedcolor = {};

        if (somecolor.indexOf('hsl') !== -1) {
            parsedcolor.hsl = parseHSL(somecolor);
            parsedcolor.rgb = hslToRGB(parsedcolor.hsl.h, parsedcolor.hsl.s, parsedcolor.hsl.l, parsedcolor.hsl.a);

            parsedcolor.fillColor = parsedcolor.hsl.fillColor;
            parsedcolor.strokeColor = parsedcolor.hsl.strokeColor;

        } else {
            if (somecolor.indexOf('rgb') !== -1) {
                parsedcolor.rgb = parseRGB(somecolor);
            } else {
                parsedcolor.rgb = parseHex(somecolor);
            }

            parsedcolor.fillColor = parsedcolor.rgb.fillColor;
            parsedcolor.strokeColor = parsedcolor.rgb.strokeColor;


            parsedcolor.hsl = rgbToHSL(parsedcolor.rgb.r, parsedcolor.rgb.g, parsedcolor.rgb.b, parsedcolor.rgb.a);
        }
        return parsedcolor;
    };

    MarkerFactory.autoIcon = function (options) {
        var element = {};

        if (typeof (options) === 'object') {
            _.extend(element, options);

            _.defaults(element, {
                label: 'A',
                color: '#FF0000',
                fontsize: 11,
                font: 'Arial'
            });

        } else {
            // Asumimos que options es un string o número
            element.label = String(options) || 'A';
            element.color = '#FF0000';
            element.scale = 1;
            element.fontsize = 11;
            element.font = 'Arial';
        }

        //console.zdebug('autoIcon', element);

        if (element.color.indexOf('rgb') !== -1) {
            var rgbArr = element.color.split(/[\(,\)]/ig);
            element.hexcolor = [
                (1 * rgbArr[1]).toString(16), (1 * rgbArr[2]).toString(16), (1 * rgbArr[3]).toString(16)
            ].join('');
        } else if (element.color.indexOf('#') !== -1) {
            element.hexcolor = element.color.replace(/#/g, '');
        } else {
            element.hexcolor = element.color;
        }

        if (element.font === 'fontawesome-webfont' ||
            element.font === 'fontello' ||
            element.font === 'Material Icons') {

            element.label = element.label.replace('e8ec', 'e3f3');
            element.label = element.label.replace('e8f9', 'e3b7');
            element.label = element.label.replace('e87d', 'e1db');
            element.label = element.label.replace('e89a', 'e872');
            element.label = element.label.replace('e8c4', 'e872');
            element.label = element.label.replace('e82a', 'eb3f');
            element.label = element.label.replace('e8fd', 'e553');
            element.label = element.label.replace('e8ef', 'e53e');
            element.label = element.label.replace('e8fc', 'e407');
            element.label = element.label.replace('e861', 'e32a');
            element.label = element.label.replace('e864', 'e84f');
            element.label = element.label.replace('e8ee', 'e227');
            element.label = element.label.replace('e8eb', 'e548');
            element.label = element.label.replace('e8e9', 'e545');
            element.label = element.label.replace('e862', 'e8cc');
            element.label = element.label.replace('e8f3', 'e559');
            element.label = element.label.replace('e8da', 'e55f');
            element.label = element.label.replace('e8f5', 'e80c');
            element.label = element.label.replace('e904', 'e04b');
            element.label = element.label.replace('f10c', 'e836');
            element.label = element.label.replace('e8be', 'e837');
            element.label = element.label.replace('e879', 'e80b');
            element.label = element.label.replace('e83b', 'e7ef');
            element.label = element.label.replace('e806', 'e52f');
            element.label = element.label.replace('e805', 'e534');
            element.label = element.label.replace('f007', 'e7fd');
            element.label = element.label.replace('e894', 'e8b4');
            element.label = element.label.replace('e85c', 'e8b4');


            element.label = String.fromCharCode("0x" + element.label);
            return createFatMarkerIcon(element);
        } else {
            return createMarkerIcon(element);
        }


    };

    return MarkerFactory;
}));
