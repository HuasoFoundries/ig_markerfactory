var assert = require('assert'),
	_ = require('lodash'),
	/*canvas = require('canvas-prebuilt'),
	jsdom = require("jsdom"),
	dom = new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`),
	window = dom.window,
	document = dom.window.document,*/
	MarkerFactory = require('../dist/markerfactory');

MarkerFactory = MarkerFactory.default ? MarkerFactory.default : MarkerFactory;

var iconObjs = {
	'one': {
		label: '1',
		color: '#CC0000',
		fontsize: 25,
		scale: 0.8
	},
	'two': {
		label: '2',
		color: '#0C0',
		fontsize: 25,
		scale: 0.8
	},
	'three': {
		label: '3',
		color: '#00C',
		fontsize: 32,
		scale: 0.8
	}
};
var testColors = {
		hex3: "#C40",
		hex6: "#CC4400",
		hsl: "hsl(20,100,40)",
		hsla: "hsla(20,100,40,1)",
		rgb: "rgb(204,68,0)",
		rgba: "rgba(204,68,0,1)"
	},

	parsedColor = {
		rgb: {
			r: 204,
			g: 68,
			b: 0,
			a: 1
		},
		rgba: 'rgba(204,68,0,1)',
		hsl: {
			h: 20,
			s: 100,
			l: 40,
			a: 1
		},
		hsla: 'hsla(20,100%,40%,1)',
		hex: '#cc4400'
	},
	parsedColorWO = {
		rgb: {
			r: 204,
			g: 68,
			b: 0,
			a: 0.5
		},
		rgba: 'rgba(204,68,0,0.5)',
		hsl: {
			h: 20,
			s: 100,
			l: 40,
			a: 0.5
		},
		hsla: 'hsla(20,100%,40%,0.5)',
		hex: '#cc4400'
	},
	parsedColorDarker = {
		rgb: {
			r: 51,
			g: 17,
			b: 0,
			a: 0.5
		},
		rgba: 'rgba(51,17,0,0.5)',
		hsl: {
			h: 20,
			s: 100,
			l: 10,
			a: 0.5
		},
		hsla: 'hsla(20,100%,10%,0.5)',
		hex: '#cc4400'
	};

/*
_.each(iconObjs, function (obj, name) {
	describe('It should create a marker with the number ' + name, function () {

		var icon = MarkerFactory.autoIcon(obj, window);
		it('should generate the same dataurl as expected for icon with number ' + name, function () {
			assert.equal(icon.url, obj.url);
		});
	});
});
*/

_.each(testColors, function (value, key) {
	describe('Parsing of ' + key + ' color', function () {

		var parsedObject = MarkerFactory.parseColorString(value),
			parsedObjectWO = MarkerFactory.parseColorString(value, 0.5),
			parsedObjectDarker = MarkerFactory.parseColorString(value, 0.5, 0.25);


		it('should match HEX result of parsed ' + key + ' color', function () {
			assert.equal(parsedObject.hex, parsedColor.hex);
		});


		it('should match RGBA Object result of parsed ' + key + ' color', function () {
			assert.deepEqual(parsedObject.rgb, parsedColor.rgb);
		});

		it('should match HSLA Object result of parsed ' + key + ' color', function () {
			assert.deepEqual(parsedObject.hsl, parsedColor.hsl);
		});

		it('should match RGBA Object result of parsed ' + key + ' color with 50% opacity', function () {
			assert.deepEqual(parsedObjectWO.rgb, parsedColorWO.rgb);
		});

		it('should match HSLA Object result of parsed ' + key + ' color with 50% opacity', function () {
			assert.deepEqual(parsedObjectWO.hsl, parsedColorWO.hsl);
		});

		it('should match RGBA Object result of parsed ' + key + ' color with 50% opacity and darkened to 25%', function () {
			assert.deepEqual(parsedObjectDarker.rgb, parsedColorDarker.rgb);
		});

		it('should match HSLA Object result of parsed ' + key + ' color with 50% opacity and darkened to 25%', function () {
			assert.deepEqual(parsedObjectDarker.hsl, parsedColorDarker.hsl);
		});





		it('should match RGBA string result of parsed ' + key + ' color', function () {
			assert.deepEqual(parsedObject.rgba, parsedColor.rgba);
		});

		it('should match HSLA string result of parsed ' + key + ' color', function () {
			assert.deepEqual(parsedObject.hsla, parsedColor.hsla);
		});

		it('should match RGBA string result of parsed ' + key + ' color with 50% opacity', function () {
			assert.deepEqual(parsedObjectWO.rgba, parsedColorWO.rgba);
		});

		it('should match HSLA string result of parsed ' + key + ' color with 50% opacity', function () {
			assert.deepEqual(parsedObjectWO.hsla, parsedColorWO.hsla);
		});

		it('should match RGBA string result of parsed ' + key + ' color with 50% opacity and darkened to 25%', function () {
			assert.deepEqual(parsedObjectDarker.rgba, parsedColorDarker.rgba);
		});

		it('should match HSLA string  result of parsed ' + key + ' color with 50% opacity and darkened to 25%', function () {
			assert.deepEqual(parsedObjectDarker.hsla, parsedColorDarker.hsla);
		});

	});
});