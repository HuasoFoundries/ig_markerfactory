var testColors = {
		hex3: "#C40",
		hex6: "#CC4400",
		hsl: "hsl(20,100,40)",
		hsla: "hsla(20,100,40,1)",
		rgb: "rgb(204,68,0)",
		rgba: "rgba(204,68,0,1)"
	},
	parsedColorDarker = {
		rgb: {
			r: 51,
			g: 17,
			b: 0,
			a: 0.5
		},
		rgba: "rgba(51,17,0,0.5)",
		hsl: {
			h: 20,
			s: 100,
			l: 10,
			a: 0.5
		},
		hsla: "hsla(20,100%,10%,0.5)",
		hex: "#cc4400"
	};

describe("Parsing color, using darkening", function() {
	_.each(testColors, function(value) {
		var parsedObjectDarker = MarkerFactory.parseColorString(
			value,
			0.5,
			0.25
		);
		it(
			"should match RGBA Object result of " +
				value +
				" at 50% opacity, darkened to 25%",
			function() {
				expect(parsedObjectDarker.rgb).toEqual(parsedColorDarker.rgb);
			}
		);
		it(
			"should match HSLA Object result of " +
				value +
				" at 50% opacity, darkened to 25%",
			function() {
				expect(parsedObjectDarker.hsl).toEqual(parsedColorDarker.hsl);
			}
		);
		it(
			"should match RGBA string result of " +
				value +
				" at 50% opacity, darkened to 25%",
			function() {
				expect(parsedObjectDarker.rgba).toEqual(parsedColorDarker.rgba);
			}
		);
		it(
			"should match HSLA string  result of " +
				value +
				" at 50% opacity, darkened to 25%",
			function() {
				expect(parsedObjectDarker.hsla).toEqual(parsedColorDarker.hsla);
			}
		);
	});
});
