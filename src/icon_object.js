function IconObject(canvas, markerOpts) {
	this.url = canvas.toDataURL();
	this.fillColor = canvas.fillColor;
	this.markerOpts = markerOpts;
	Object.assign(this, markerOpts);
	return this;
}

IconObject.prototype.toJSON = function() {
	return {
		url: null,
		markerOpts: this.markerOpts
	};
};

export { IconObject };
