/* global _:true, jQuery:true */

import {
	MarkerFactory
} from '../dist/markerfactory.es6.js';



jQuery(document).ready(function () {

	var icons_fontello = {
		camera: MarkerFactory.autoIcon({
			label: 'e810',
			font: 'fontello',
			color: '#CC0000',
			transparent_background: false
		}),
		retail: MarkerFactory.autoIcon({
			label: 'e896',
			font: 'fontello',
			color: '#33CCCC',
			transparent_background: false
		}),
		plane: MarkerFactory.autoIcon({
			label: 'e892',
			font: 'fontello',
			color: '#CC00FF',
			transparent_background: false
		}),
		taxi: MarkerFactory.autoIcon({
			label: 'e88c',
			font: 'fontello',
			color: '#33CC33',
			transparent_background: false
		})
	};

	_.each(icons_fontello, function (icon, name) {
		var theimage = jQuery('<img>');
		theimage.attr('src', icon.url);
		jQuery('#fontello').find('.' + name).append(theimage);

	});

	var icons_fontello_transparent = {
		camera: MarkerFactory.autoIcon({
			label: 'e810',
			font: 'fontello',
			color: '#CC0000',
			transparent_background: true
		}),
		retail: MarkerFactory.autoIcon({
			label: 'e896',
			font: 'fontello',
			color: '#33CCCC',
			transparent_background: true
		}),
		plane: MarkerFactory.autoIcon({
			label: 'e892',
			font: 'fontello',
			color: '#CC00FF',
			transparent_background: true
		}),
		taxi: MarkerFactory.autoIcon({
			label: 'e88c',
			font: 'fontello',
			color: '#33CC33',
			transparent_background: true
		})


	};


	_.each(icons_fontello_transparent, function (icon, name) {
		var theimage = jQuery('<img>');
		theimage.attr('src', icon.url);
		jQuery('#fontello_transparent').find('.' + name).append(theimage);

	});





});