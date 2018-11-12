import { omit } from "./helpers.js";

function IconObject(url, fillColor, markerOpts) {
	this.url = url;
	this.fillColor = fillColor;
	this.markerOpts = markerOpts;
	Object.assign(this, markerOpts);
	if (window && window.google && window.google.maps) {
		this.origin = new google.maps.Point(
			this.markerOpts.origin.x,
			this.markerOpts.origin.y
		);
		this.anchor = new google.maps.Point(
			this.markerOpts.anchor.x,
			this.markerOpts.anchor.y
		);
		this.size = new google.maps.Size(
			this.markerOpts.size.width,
			this.markerOpts.size.height
		);
		this.scaledSize = new google.maps.Size(
			this.markerOpts.scaledSize.width,
			this.markerOpts.size.height
		);
	}
	return this;
}

IconObject.prototype.toJSON = function() {
	var serialized = omit(this.markerOpts, function(prop) {
		return prop.indexOf("gm_") === 0 || prop === "url";
	});
	serialized.fillColor = this.fillColor;
	return serialized;
};

export { IconObject };
