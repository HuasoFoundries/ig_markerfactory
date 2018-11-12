var testColors = {
		hex3: "#C40",
		hex6: "#CC4400",
		hsl: "hsl(20,100,40)",
		hsla: "hsla(20,100,40,1)",
		rgb: "rgb(204,68,0)",
		rgba: "rgba(204,68,0,1)"
	},
	parsedColorTransparent = {
		rgb: {
			r: 204,
			g: 68,
			b: 0,
			a: 0
		},
		rgba: "rgba(204,68,0,0)",
		hsl: {
			h: 20,
			s: 100,
			l: 40,
			a: 0
		},
		hsla: "hsla(20,100%,40%,0)",
		hex: "#cc440000"
	};

describe("Parsing colors, full transparency ", function() {
	_.each(testColors, function(value) {
		var parsedObjectTransparent = MarkerFactory.parseColorString(value, 0);

		it(
			"should match RGBA Object result of " + value + " at 0% opacity",
			function() {
				expect(parsedObjectTransparent.rgb).toEqual(
					parsedColorTransparent.rgb
				);
			}
		);
		it(
			"should match HSLA Object result of " + value + " at 0% opacity",
			function() {
				expect(parsedObjectTransparent.hsl).toEqual(
					parsedColorTransparent.hsl
				);
			}
		);
		it(
			"should match RGBA string result of " + value + " at 0% opacity",
			function() {
				expect(parsedObjectTransparent.rgba).toEqual(
					parsedColorTransparent.rgba
				);
			}
		);
		it(
			"should match HSLA string result of " + value + " at 0% opacity",
			function() {
				expect(parsedObjectTransparent.hsla).toEqual(
					parsedColorTransparent.hsla
				);
			}
		);
		it(
			"should match HEX string result of " + value + " at 0% opacity",
			function() {
				expect(parsedObjectTransparent.hex).toEqual(
					parsedColorTransparent.hex
				);
			}
		);
	});
});
