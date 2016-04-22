# IG MarkerFactory

[![Build Status](https://travis-ci.org/HuasoFoundries/ig_markerfactory.svg)](https://travis-ci.org/HuasoFoundries/ig_markerfactory) [![Code Climate](https://codeclimate.com/github/HuasoFoundries/ig_markerfactory/badges/gpa.svg)](https://codeclimate.com/github/HuasoFoundries/ig_markerfactory) [![Codacy Badge](https://api.codacy.com/project/badge/grade/44d15485b93e43cf86356e56a8bfb7d1)](https://www.codacy.com/app/amenadiel/ig_markerfactory)

Uses canvas to dynamically generate marker images suitable for use with google maps. It
renders nice looking badges in the front by combining overlaying text on top of canvas
rendered background. Those text can be SVG images such as [Font-Awesome](https://fontawesome.github.io/Font-Awesome/), [Fontello](http://fontello.com/), etc.

## Installation

Install it with jspm like so:

```js
jspm install github:huasofoundries/ig_markerfactory
```

If you don't use jspm, you can as well clone this repo and copy 
`dist/markerfactory.js` to your project. 

## Usage

This is a simple example using AMD loading:

```js
	define(['huasofoundries/ig_markerfactory'], function(MarkerFactory) {

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


