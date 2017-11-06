define(['jquery', 'lodash', 'ig_markerfactory/markerfactory.esm.js'], function (jQuery, _, MarkerFactory) {

	MarkerFactory = MarkerFactory.default;
	console.debug('jQuery is', jQuery, 'MarkerFactory is', MarkerFactory);

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
			console.log(name, icon.toJSON());
		});

		var icons_fontello_transparent = {
			camera: MarkerFactory.autoIcon({
				label: 'e810',
				font: 'fontello',
				color: '#CC0000',
			}),
			retail: MarkerFactory.autoIcon({
				label: 'e896',
				font: 'fontello',
				color: '#33CCCC',
			}),
			plane: MarkerFactory.autoIcon({
				label: 'e892',
				font: 'fontello',
				color: '#CC00FF',
			}),
			taxi: MarkerFactory.autoIcon({
				label: 'e88c',
				font: 'fontello',
				color: '#33CC33',
			})


		};


		_.each(icons_fontello_transparent, function (icon, name) {
			var theimage = jQuery('<img>');
			theimage.attr('src', icon.url);
			jQuery('#fontello_transparent').find('.' + name).append(theimage);
			console.log(name, icon.toJSON());
		});





	});


});
