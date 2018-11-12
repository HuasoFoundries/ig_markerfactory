var testColors = {
		hex3: "#C40",
		hex6: "#CC4400",
		hsl: "hsl(20,100,40)",
		hsla: "hsla(20,100,40,1)",
		rgb: "rgb(204,68,0)",
		rgba: "rgba(204,68,0,1)"
	},
	parsedColorWO = {
		rgb: {
			r: 204,
			g: 68,
			b: 0,
			a: 0.5
		},
		rgba: "rgba(204,68,0,0.5)",
		hsl: {
			h: 20,
			s: 100,
			l: 40,
			a: 0.5
		},
		hsla: "hsla(20,100%,40%,0.5)",
		hex: "#cc4400"
	};

describe("Parsing color, using opacity", function() {
	_.each(testColors, function(value, key) {
		var parsedObjectWO = MarkerFactory.parseColorString(value, 0.5);
		it(
			"should match RGBA Object result of parsed " +
				key +
				" color with 50% opacity",
			function() {
				expect(parsedObjectWO.rgb).toEqual(parsedColorWO.rgb);
			}
		);
		it(
			"should match HSLA Object result of parsed " +
				key +
				" color with 50% opacity",
			function() {
				expect(parsedObjectWO.hsl).toEqual(parsedColorWO.hsl);
			}
		);
		it(
			"should match RGBA string result of parsed " +
				key +
				" color with 50% opacity",
			function() {
				expect(parsedObjectWO.rgba).toEqual(parsedColorWO.rgba);
			}
		);
		it(
			"should match HSLA string result of parsed " +
				key +
				" color with 50% opacity",
			function() {
				expect(parsedObjectWO.hsla).toEqual(parsedColorWO.hsla);
			}
		);
	});
});
