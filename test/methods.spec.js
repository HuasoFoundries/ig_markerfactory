describe("Generated icons", function() {
	beforeAll(function() {
		spyOn(MarkerFactory, "createTransparentMarkerIcon").and.callThrough();
		spyOn(MarkerFactory, "createFatMarkerIcon").and.callThrough();
		spyOn(MarkerFactory, "createTextMarker").and.callThrough();
	});
	var transparentIcon = {
			character: "f011",
			font: "fontello",
			label: "f011",
			color: "#FFCC00",
			scale: 1,
			no_cache: true,
			transparent_background: true
		},
		fatIcon = {
			character: "f011",
			font: "fontello",
			label: "f011",
			color: "#FFCC00",
			scale: 1,
			no_cache: true,
			transparent_background: false
		},
		textIcon = {
			character: "A",
			label: "A",
			color: "#FFCC00",
			scale: 1,
			no_cache: true
		};

	it("should call createTransparentMarkerIcon when transparent_background is true", function() {
		var newIcon = MarkerFactory.autoIcon(transparentIcon); // eslint-disable-line

		return expect(
			MarkerFactory.createTransparentMarkerIcon
		).toHaveBeenCalled();
	});
	it("should call createFatMarkerIcon when transparent_background is false", function() {
		var newIcon = MarkerFactory.autoIcon(fatIcon); // eslint-disable-line

		return expect(MarkerFactory.createFatMarkerIcon).toHaveBeenCalled();
	});
	it("should call createTextMarker when font is undefined", function() {
		var newIcon = MarkerFactory.autoIcon(textIcon); // eslint-disable-line

		return expect(MarkerFactory.createTextMarker).toHaveBeenCalled();
	});

	it("should serialize icons correctly for transparent_background", function() {
		var newIcon = MarkerFactory.autoIcon(transparentIcon);

		//console.log(newIcon.toJSON());
		expect(newIcon.toJSON().markerOpts).toEqual(
			jasmine.objectContaining(transparentIcon)
		);

		expect(newIcon.toJSON().markerOpts.type).toBe("transparent");
	});
	it("should serialize icons correctly for fat marker icons", function() {
		var newIcon = MarkerFactory.autoIcon(fatIcon);

		//console.log(newIcon.toJSON());
		expect(newIcon.toJSON().markerOpts).toEqual(
			jasmine.objectContaining(fatIcon)
		);

		expect(newIcon.toJSON().markerOpts.type).toBe("fatmarker");
	});
	it("should serialize icons correctly for text marker icons", function() {
		var newIcon = MarkerFactory.autoIcon(textIcon);

		//console.log(newIcon.toJSON());
		expect(newIcon.toJSON().markerOpts).toEqual(
			jasmine.objectContaining(textIcon)
		);

		expect(newIcon.toJSON().markerOpts.type).toBe("textmarker");
	});
});
