/** global: google, r, g, b */

import {
    hslaString,
    rgbaString,
    parseHalf,
    compact
} from './helpers.js';

export function parseHex(hexstring, opacity, darkenfactor) {
    let hexcolor = {
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
    hexcolor.fillColor = rgbaString(hexcolor);
    hexcolor.strokeColor = [
        'rgba(' + parseHalf(hexcolor.r),
        parseHalf(hexcolor.g),
        parseHalf(hexcolor.b), hexcolor.a + ')'
    ].join(',');
    hexcolor.rgb = hexcolor.fillColor;
    return hexcolor;
}


export function parseHSL(hslstring, opacity) {
    let hslcolor = {},
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

export function parseRGB(rgbstring, opacity, darkenfactor) {
    let rgbcolor = {},
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
    rgbcolor.strokeColor = 'rgba(' + rgbcolor.r / 2 + ',' + rgbcolor.g / 2 + ',' + rgbcolor.b / 2 + ',' + rgbcolor.a + ')';
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

export function hslToRGB(h, s, l, a, darkenfactor) {
    let r, g, b;

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


        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    if (a === undefined) {
        a = 1;
    }

    let rgb = {
        r: Math.round(r * 255 * darkenfactor),
        g: Math.round(g * 255 * darkenfactor),
        b: Math.round(b * 255 * darkenfactor),
        a: parseFloat(a, 10)
    };

    rgb.fillColor = rgbaString(rgb);

    return rgb;

}

export function rgbToHSL(in_r, in_g, in_b, in_a) {

    let h,
        r = (in_r % 256) / 255,
        g = (in_g % 256) / 255,
        b = (in_b % 256) / 255,
        a = in_a === undefined ? 1 : in_a,
        max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        sum = (max + min),
        diff = (max - min),
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

    let hsl = {
        h: Math.round(360 * h),
        s: Math.round(100 * s),
        l: Math.round(50 * sum),
        a: Math.round(100 * a) / 100
    };

    hsl.fillColor = hslaString(hsl);

    return hsl;
}


function toDecColor(stringcolor) {
    let parsedcolor = {};
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
}


function getColor(val, range) {
    const defaults = {
        h: Math.floor((360 / range) * val),
        s: 78, // constant saturation
        l: 63, // constant luminance
        a: 1
    };

    return hslaString(defaults);
}

function getColor1() {
    const defaults1 = {
        h: 1,
        s: 78, // constant saturation
        l: 33, // constant luminance
        a: 1
    };
    return hslaString(defaults1);
}

function darken(stringcolor, factor) {
    const darkercolor = {};
    if (!factor) {
        factor = 1;
    }
    if (stringcolor.fillColor.indexOf('rgb') !== -1) {
        darkercolor.r = factor * parseHalf(stringcolor.r);
        darkercolor.g = factor * parseHalf(stringcolor.g);
        darkercolor.b = factor * parseHalf(stringcolor.b);
        darkercolor.a = 0.99;
        darkercolor.fillColor = rgbaString(darkercolor);
    } else if (stringcolor.fillColor.indexOf('hsl') !== -1) {
        darkercolor.h = stringcolor.h;
        darkercolor.s = stringcolor.s;
        darkercolor.l = factor * stringcolor.l - 30;
        darkercolor.fillColor = hslaString(darkercolor);
    }

    return darkercolor;
}

export function getColors(options) {
    let color0, color1;
    if (options.index !== undefined && options.count > 0) {
        color0 = getColor(options.index, options.count);
        color1 = getColor1();
    } else {
        let deccolor = toDecColor(options.color);
        color0 = deccolor.fillColor;
        color1 = darken(deccolor).fillColor;
    }
    return [color0, color1];
}
