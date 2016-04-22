!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define("1", [], function() {
      return factory();
    });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.MarkerFactory = factory();
  }
}(this, function() {
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
    s: 78,
    l: 63,
    a: 1
  };
  var getColor = function(val, range) {
    defaults.h = Math.floor((360 / range) * val);
    return "hsla(" + defaults.h + "," + defaults.s + "%," + defaults.l + "%," + defaults.a + ")";
  };
  var getColor1 = function() {
    return "hsla(" + defaults.h + "," + defaults.s + "%," + (defaults.l - 30) + "%," + defaults.a + ")";
  };
  var parseHalf = function(foo) {
    return parseInt(foo / 2, 10);
  };
  var darken = function(stringcolor) {
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
  var parseHex = function(hexstring, opacity) {
    var hexcolor = {hex: hexstring};
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
  var parseHSL = function(hslstring, opacity) {
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
  var parseRGB = function(rgbstring, opacity) {
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
  var rgbToHSL = function(r, g, b, a) {
    r = (r % 256) / 255;
    g = (g % 256) / 255;
    b = (b % 256) / 255;
    if (a === undefined) {
      a = 1;
    }
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
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
  var hslToRGB = function(h, s, l, a) {
    var r,
        g,
        b;
    h = parseFloat(h, 10) / 360;
    s = parseFloat(s, 10) / 100;
    l = parseFloat(l, 10) / 100;
    if (a === undefined) {
      a = 1;
    }
    if (s === 0) {
      r = g = b = l;
    } else {
      var hue2rgb = function(p, q, t) {
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
  var toDecColor = function(stringcolor) {
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
  var createFatMarkerIcon = function(theoptions) {
    var generateFatCanvas = function(options) {
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
          color0,
          color1;
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
      context.arc(anchorX, 2 + (0.50 * anchorY), radius, angulo, Math.PI - angulo, true);
      context.lineTo(anchorX, anchorY);
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(anchorX, 2 + (0.50 * anchorY), (radius - 3), 0, 2 * Math.PI, false);
      context.fillStyle = 'white';
      context.fill();
      context.beginPath();
      var font = "'" + options.font + "'" || 'fontello';
      context.font = fontsize + "pt " + font;
      context.fillStyle = color1;
      context.textBaseline = "top";
      var textWidth = context.measureText(options.label);
      context.fillText(options.label, 1 + Math.floor((canvas.width / 2) - (textWidth.width / 2)), 49 - canvas.height);
      return canvas;
    };
    theoptions.scale = theoptions.scale || 1;
    var markerCanvas = generateFatCanvas(theoptions);
    var iconObj = {url: markerCanvas.toDataURL()};
    if (window.google && window.google.maps) {
      Object.assign(iconObj, {
        size: new google.maps.Size(42, 36),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(21, 36),
        scaledSize: new google.maps.Size(42, 36)
      });
    }
    return iconObj;
  };
  var createTextMarker = function(theoptions) {
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
      var font = "'" + options.font + "'" || 'Arial';
      var fontsize = options.fontsize || 11;
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      var radius0 = 2 * radius,
          cx = x + 0.95 * radius0,
          cy = y + 0.45 * radius0;
      var grad = context.createLinearGradient(0, 0, 0, canvas.height),
          color0,
          color1;
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
      context.arc(cx - 1, cy, radius0, 9 * Math.PI / 8, -6 * Math.PI / 8, false);
      context.arc(x, (y - 7) / 2, radius, angulo, Math.PI - angulo, true);
      context.arc(2 * x - cx + 1, cy, radius0, -0.95 * Math.PI / 3, -Math.PI / 8, false);
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(x, 0.40 * y, 2 * radius / 3, 0, 2 * Math.PI, false);
      context.fillStyle = 'white';
      context.fill();
      context.beginPath();
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
      context.fillText(options.label, 1 + Math.floor((canvas.width / 2) - (textWidth.width / 2)), 8);
      return canvas;
    };
    theoptions.scale = theoptions.scale || 0.75;
    var markerCanvas = generateCanvas(theoptions);
    var iconObj = {url: markerCanvas.toDataURL()};
    if (window.google && window.google.maps) {
      Object.assign(iconObj, {
        size: new google.maps.Size(48, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(24 * theoptions.scale, 40 * theoptions.scale),
        scaledSize: new google.maps.Size(48 * theoptions.scale, 40 * theoptions.scale)
      });
    }
    return iconObj;
  };
  var createTransparentMarkerIcon = function(theoptions) {
    var generateTransparentCanvas = function(options) {
      var canvas = document.createElement("canvas");
      canvas.width = 54;
      canvas.height = 48;
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      var grad = context.createLinearGradient(0, 0, 0, canvas.height),
          color0,
          color1;
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
      context.beginPath();
      context.font = "40px '" + options.font + "'";
      context.fillStyle = color1;
      context.textBaseline = "top";
      var textWidth = context.measureText(options.label);
      context.fillText(options.label, 1 + Math.floor((canvas.width / 2) - (textWidth.width / 2)), 49 - canvas.height);
      canvas.fillColor = color0;
      return canvas;
    };
    var markerCanvas = generateTransparentCanvas(theoptions);
    theoptions.scale = theoptions.scale || 1;
    var iconObj = {
      url: markerCanvas.toDataURL(),
      fillColor: markerCanvas.fillColor
    };
    if (window.google && window.google.maps) {
      Object.assign(iconObj, {
        size: new google.maps.Size(54 * theoptions.scale, 48 * theoptions.scale),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(27 * theoptions.scale, 48 * theoptions.scale),
        scaledSize: new google.maps.Size(54 * theoptions.scale, 48 * theoptions.scale)
      });
    }
    return iconObj;
  };
  MarkerFactory.toDecColor = toDecColor;
  MarkerFactory.parseColorString = function(somecolor, opacity) {
    var parsedcolor = {original: somecolor},
        hsl,
        rgb;
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
  var getHexColor = function(color) {
    var hexcolor = color;
    if (color.indexOf('rgb') !== -1) {
      var rgbArr = color.split(/[\(,\)]/ig);
      hexcolor = [(1 * rgbArr[1]).toString(16), (1 * rgbArr[2]).toString(16), (1 * rgbArr[3]).toString(16)].join('');
    } else if (color.indexOf('#') !== -1) {
      hexcolor = color.replace(/#/g, '');
    }
    return hexcolor;
  };
  MarkerFactory.autoIcon = function(options) {
    if (typeof(options) !== 'object') {
      console.warn('autoIcon expects an object as its only parameter');
      return null;
    }
    options.label = options.label || 'A';
    options.color = options.color || '#FF0000';
    options.fontsize = options.fontsize || 11;
    options.font = options.font || 'Arial';
    options.hexcolor = getHexColor(options.color);
    if (String(options.label).substring(0, 2) === '0x') {
      options.label = String.fromCharCode(String(options.label));
      if (options.transparent_background === true) {
        return createTransparentMarkerIcon(options);
      } else {
        return createFatMarkerIcon(options);
      }
    } else {
      return createTextMarker(options);
    }
  };
  return MarkerFactory;
}));

})();
})
(function(factory) {
  main = factory();
});

export default main;