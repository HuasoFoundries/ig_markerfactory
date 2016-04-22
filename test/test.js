var assert = require('assert'),
	_ = require('lodash'),
	MarkerFactory = require('../dist/markerfactory');

var testColors = {
		hex3: "#F39",
		hex6: "#FF3399",
		hsl: "hsl(330,100,60)",
		hsla: "hsla(330,100,60,1)",
		rgb: "rgb(255,51,153)",
		rgba: "rgba(255,51,153,1)"
	},
	parsedColor = {
		rgb: {
			r: 255,
			g: 51,
			b: 153,
			a: 1
		},
		hsl: {
			h: 330,
			s: 100,
			l: 60,
			a: 1
		},
		hex: '#ff3399'
	},
	parsedColorWO = {
		rgb: {
			r: 255,
			g: 51,
			b: 153,
			a: 0.5
		},
		hsl: {
			h: 330,
			s: 100,
			l: 60,
			a: 0.5
		},
		hex: '#ff3399'
	};


_.each(testColors, function (value, key) {
	describe('Parsing of ' + key + ' color', function () {

		var parsedObject = MarkerFactory.parseColorString(value),
			parsedObjectWO = MarkerFactory.parseColorString(value, 0.5);

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

	});
});
