import { omit } from "./helpers.js";

function IconObject(url, fillColor, markerOpts) {
	this.url = url;
	this.fillColor = fillColor;
	this.markerOpts = markerOpts;
	Object.assign(this, markerOpts);
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
