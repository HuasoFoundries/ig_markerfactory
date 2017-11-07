var assert = require('assert'),
	_ = require('lodash'),
	MarkerFactory = require('../dist/markerfactory');

MarkerFactory = MarkerFactory.default ? MarkerFactory.default : MarkerFactory;

console.dir(MarkerFactory);

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
		hsl: {
			h: 20,
			s: 100,
			l: 40,
			a: 1
		},
		hex: '#cc4400'
	},
	parsedColorWO = {
		rgb: {
			r: 204,
			g: 68,
			b: 0,
			a: 0.5
		},
		hsl: {
			h: 20,
			s: 100,
			l: 40,
			a: 0.5
		},
		hex: '#cc4400'
	},
	parsedColorDarker = {
		rgb: {
			r: 51,
			g: 17,
			b: 0,
			a: 0.5
		},
		hsl: {
			h: 20,
			s: 100,
			l: 10,
			a: 0.5
		},
		hex: '#cc4400'
	};



_.each(testColors, function (value, key) {
	describe('Parsing of ' + key + ' color', function () {

		var parsedObject = MarkerFactory.parseColorString(value),
			parsedObjectWO = MarkerFactory.parseColorString(value, 0.5),
			parsedObjectDarker = MarkerFactory.parseColorString(value, 0.5, 0.25);

		it('should match RGBA result of parsed ' + key + ' color', function () {
			assert.deepEqual(parsedObject.rgb, parsedColor.rgb);
		});

		it('should match HSLA result of parsed ' + key + ' color', function () {
			assert.deepEqual(parsedObject.hsl, parsedColor.hsl);
		});

		it('should match HEX result of parsed ' + key + ' color', function () {
			assert.equal(parsedObject.hex, parsedColor.hex);
		});

		it('should match RGBA result of parsed ' + key + ' color with 50% opacity', function () {
			assert.deepEqual(parsedObjectWO.rgb, parsedColorWO.rgb);
		});

		it('should match HSLA result of parsed ' + key + ' color with 50% opacity', function () {
			assert.deepEqual(parsedObjectWO.hsl, parsedColorWO.hsl);
		});

		it('should match RGBA result of parsed ' + key + ' color with 50% opacity and darkened to 25%', function () {
			assert.deepEqual(parsedObjectDarker.rgb, parsedColorDarker.rgb);
		});

		it('should match HSLA result of parsed ' + key + ' color with 50% opacity and darkened to 25%', function () {
			assert.deepEqual(parsedObjectDarker.hsl, parsedColorDarker.hsl);
		});

	});
});