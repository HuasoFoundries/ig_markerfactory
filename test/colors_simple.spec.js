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
		rgba: "rgba(204,68,0,1)",
		hsl: {
			h: 20,
			s: 100,
			l: 40,
			a: 1
		},
		hsla: "hsla(20,100%,40%,1)",
		hex: "#cc4400"
	};

describe("Parsing color, basic example", function() {
	_.each(testColors, function(value) {
		var parsedObject = MarkerFactory.parseColorString(value);
		it("should match HEX result of parsed " + value + " color", function() {
			expect(parsedObject.hex).toEqual(parsedColor.hex);
		});
		it(
			"should match RGBA Object result of parsed " + value + " color",
			function() {
				expect(parsedObject.rgb).toEqual(parsedColor.rgb);
			}
		);
		it(
			"should match HSLA Object result of parsed " + value + " color",
			function() {
				expect(parsedObject.hsl).toEqual(parsedColor.hsl);
			}
		);
		it(
			"should match RGBA string result of parsed " + value + " color",
			function() {
				expect(parsedObject.rgba).toEqual(parsedColor.rgba);
			}
		);
		it(
			"should match HSLA string result of parsed " + value + " color",
			function() {
				expect(parsedObject.hsla).toEqual(parsedColor.hsla);
			}
		);
	});
});
