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

_.each(testColors, function(value, key) {
	describe("Parsing of " + key + " color", function() {
		var parsedObject = MarkerFactory.parseColorString(value),
			parsedObjectWO = MarkerFactory.parseColorString(value, 0.5),
			parsedObjectDarker = MarkerFactory.parseColorString(
				value,
				0.5,
				0.25
			);

		it("should match HEX result of parsed " + key + " color", function() {
			expect(parsedObject.hex).toEqual(parsedColor.hex);
		});

		it(
			"should match RGBA Object result of parsed " + key + " color",
			function() {
				expect(parsedObject.rgb).toEqual(parsedColor.rgb);
			}
		);

		it(
			"should match HSLA Object result of parsed " + key + " color",
			function() {
				expect(parsedObject.hsl).toEqual(parsedColor.hsl);
			}
		);

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
			"should match RGBA Object result of parsed " +
				key +
				" color with 50% opacity and darkened to 25%",
			function() {
				expect(parsedObjectDarker.rgb).toEqual(parsedColorDarker.rgb);
			}
		);

		it(
			"should match HSLA Object result of parsed " +
				key +
				" color with 50% opacity and darkened to 25%",
			function() {
				expect(parsedObjectDarker.hsl).toEqual(parsedColorDarker.hsl);
			}
		);

		it(
			"should match RGBA string result of parsed " + key + " color",
			function() {
				expect(parsedObject.rgba).toEqual(parsedColor.rgba);
			}
		);

		it(
			"should match HSLA string result of parsed " + key + " color",
			function() {
				expect(parsedObject.hsla).toEqual(parsedColor.hsla);
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

		it(
			"should match RGBA string result of parsed " +
				key +
				" color with 50% opacity and darkened to 25%",
			function() {
				expect(parsedObjectDarker.rgba).toEqual(parsedColorDarker.rgba);
			}
		);

		it(
			"should match HSLA string  result of parsed " +
				key +
				" color with 50% opacity and darkened to 25%",
			function() {
				expect(parsedObjectDarker.hsla).toEqual(parsedColorDarker.hsla);
			}
		);
	});
});
