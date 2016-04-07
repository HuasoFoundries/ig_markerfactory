# IG MarkerFactory

[![Build Status](https://scrutinizer-ci.com/g/HuasoFoundries/ig_markerfactory/badges/build.png?b=master)](https://scrutinizer-ci.com/g/HuasoFoundries/ig_markerfactory/build-status/master) [![Code Climate](https://codeclimate.com/github/HuasoFoundries/ig_markerfactory/badges/gpa.svg)](https://codeclimate.com/github/HuasoFoundries/ig_markerfactory)

Uses canvas to dynamically generate marker images suitable for use with google maps. It
renders nice looking badges in the front by combining overlaying text on top of canvas
rendered background. Those text can be SVG images such as [Font-Awesome](https://fortawesome.github.io/Font-Awesome/), Fontello, etc.

## Installation

Install it with jspm like so:

```js
jspm install github:huasofoundries/ig_markerfactory
```

This will install also its only dependency (lodash@3). If you don't use jspm, you can
as well clone this repo and copy `src/markerfactory.js` to your project. If you do that, 
please remember to install also lodash. You can also use unsercore and add a mapping in
your config to be able to require it with the 'lodash' alias.


## Usage

This is a simple example using AMD loading:

```js
	define(['jquery', 'huasofoundries/ig_markerfactory'], function(jQuery, MarkerFactory) {

		var myimage = MarkerFactory.autoIcon({
			label: 'f1b9',
			font: 'fontawesome-webfont',
			color: '#CC0000',
			fontsize: 20
			});

		console.log({myimage:myimage});

	});

```

You'll see that `myimage.url` is a data url you can use as the SRC attribute of the image.


