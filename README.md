# IG MarkerFactory

This is a zero dependencies library that uses a canvas element to generate valid [google.maps.Marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker) Icons from graphic-fonts, such as [Font-Awesome](https://fontawesome.github.io/Font-Awesome/), [Material-Icons](https://material.io/icons/) or [Fontello](http://fontello.com/).

[![Travis Build Status](https://img.shields.io/travis/HuasoFoundries/ig_markerfactory.svg?logo=travis)](https://travis-ci.org/HuasoFoundries/ig_markerfactory)
[![Code Climate](https://codeclimate.com/github/HuasoFoundries/ig_markerfactory/badges/gpa.svg)](https://codeclimate.com/github/HuasoFoundries/ig_markerfactory)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/44d15485b93e43cf86356e56a8bfb7d1)](https://www.codacy.com/app/amenadiel/ig_markerfactory)
[![npm](https://img.shields.io/npm/dm/ig_markerfactory.svg?logo=npm)](https://www.npmjs.com/package/ig_markerfactory)
[![Scrutinizer Build](https://img.shields.io/scrutinizer/build/g/HuasoFoundries/ig_markerfactory.svg?logo=scrutinizer)](https://scrutinizer-ci.com/g/HuasoFoundries/ig_markerfactory/?branch=master)
[![Scrutinizer Code Quality](https://img.shields.io/scrutinizer/g/HuasoFoundries/ig_markerfactory.svg?logo=scrutinizer)](https://scrutinizer-ci.com/g/HuasoFoundries/ig_markerfactory/?branch=master)

## Why?

Because some libraries, like google maps API, expect its Markers to have an valid [google.maps.Icon](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Icon) to be shown on the map:

```js
var mymarker = new google.maps.Marker({
	position: myMap.getCenter(),
	map: myMap
});

mymarker.setIcon({
	url: "/img/some_image.png",
	size: new google.maps.Size(54, 48),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(27, 24)
});
```

(Actually, it would be enough to set)

```js
mymarker.setIcon("/img/some_image.png");
```

But still, you need an image. You'll need to **host every icon and color combination** thay might ever be.

With MarkerFactory, you generate those icons on the fly.

## Example

See the example running at [http://huasofoundries.github.io/ig_markerfactory/](http://huasofoundries.github.io/ig_markerfactory/)
and you'll be presented with three graphical fonts variations, both in their CSS render as well as their PNG rendering generated by IG_Markerfactory.

![screenshot from 2016-07-06 12-00-51](https://cloud.githubusercontent.com/assets/238439/16625228/7ac42b58-4371-11e6-9b44-6bdde4098958.png)

Feel free to play with `examples/example.js` to see what happens when you try different colors, icons and scales.

## Installation

### Including it with a script tag

Include this package in your HTML file directly with a script tag using [unpkg](https://unpkg.com/#/) or [jsdelivr](https://www.jsdelivr.com/)

```html
<script src="https://unpkg.com/ig_markerfactory/dist/markerfactory.min.js"></script>
```

**or**

```html
<script src="https://cdn.jsdelivr.net/npm/ig_markerfactory/dist/markerfactory.min.js"></script>
```

### Install with npm

Install it with npm like so:

```sh
npm install ig_markerfactory
```

### Install with [JSPM](https://github.com/jspm/jspm-cli)

Or include it in your [JSPM](https://github.com/jspm/jspm-cli)/[SystemJS](https://github.com/systemjs/systemjs) project doing:

```sh
jspm install npm:ig_markerfactory
```

## Usage

This is a simple example using AMD loading. It assumes you're using a font that's already present in the DOM.

### AMD Style

```js
define(["ig_markerfactory"], function(MarkerFactory) {
	var myIcon = MarkerFactory.autoIcon({
		label: "f1b9",
		font: "FontAwesome",
		color: "#CC0000",
		fontsize: 20
	});

	console.log(myIcon);
});
```

### CommonJS Style

Require the library it with CommonJS format.

```js
var MarkerFactory = require("ig_markerfactory");
var myIcon = MarkerFactory.autoIcon({
	label: "f1b9",
	font: "FontAwesome",
	color: "#CC0000",
	fontsize: 20
});

console.log(myIcon);
```

### ES6 Style

If you're using an ES6 module bundler/transpiler (and you should!) import the ES6 version doing:

```js
import { MarkerFactory } from "ig_markerfactory/dist/markerfactory.es6";

const myIcon = MarkerFactory.autoIcon({
	label: "f1b9",
	font: "FontAwesome",
	color: "#CC0000",
	fontsize: 20
});

console.log(myIcon);
```

You will see that `myIcon` object is a valid [google.maps.Icon](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Icon) object,
but of course you might want the image for other purposes so you can just use `myIcon.url` which is a [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs)
