import { omit } from "./helpers.js";

function IconObject(canvas, markerOpts) {
	this.url = canvas.toDataURL();
	this.fillColor = canvas.fillColor;
	this.markerOpts = markerOpts;
	Object.assign(this, markerOpts);
	return this;
}

IconObject.prototype.toJSON = function() {
	return omit(this.markerOpts, function(prop) {
		return prop.indexOf("gm_") === 0 || prop === "url";
	});
};

export { IconObject };
