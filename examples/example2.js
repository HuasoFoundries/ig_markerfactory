define(['jquery', 'lodash', 'ig_markerfactory'], function (jQuery, _, MarkerFactory) {

	console.debug('jQuery is', jQuery, 'MarkerFactory is', MarkerFactory);

	jQuery(document).ready(function () {

		var icons_fontello = {
				camera: MarkerFactory.autoIcon({
					label: 'e810',
					font: 'fontello',
					color: '#CC0000',
					fontsize: 30,
					scale: 1,
					transparent_background: true
				}),
				retail: MarkerFactory.autoIcon({
					label: 'e896',
					font: 'fontello',
					color: '#33CCCC',
					fontsize: 30,
					scale: 1,
					transparent_background: true
				}),
				plane: MarkerFactory.autoIcon({
					label: 'e892',
					font: 'fontello',
					color: '#CC00FF',
					fontsize: 30,
					scale: 1,
					transparent_background: true
				}),
				taxi: MarkerFactory.autoIcon({
					label: 'e88c',
					font: 'fontello',
					color: '#33CC33',
					fontsize: 30,
					scale: 1,
					transparent_background: true
				})
			},
			icons_fontawesome = {
				camera: MarkerFactory.autoIcon({
					label: 'f030',
					font: 'FontAwesome',
					color: '#CC0000',
					fontsize: 30,
					scale: 1,
					transparent_background: true
				}),
				retail: MarkerFactory.autoIcon({
					label: 'f07a',
					font: 'FontAwesome',
					color: '#33CCCC',
					fontsize: 30,
					scale: 1,
					transparent_background: true
				}),
				plane: MarkerFactory.autoIcon({
					label: 'f072',
					font: 'FontAwesome',
					color: '#CC00FF',
					fontsize: 30,
					scale: 1,
					transparent_background: true
				}),
				taxi: MarkerFactory.autoIcon({
					label: 'f1ba',
					font: 'FontAwesome',
					color: '#33CC33',
					fontsize: 30,
					scale: 1,
					transparent_background: true
				})
			},
			icons_material = {
				camera: MarkerFactory.autoIcon({
					label: 'E3B0',
					font: 'Material Icons',
					color: '#CC0000',
					fontsize: 40,
					scale: 1,
					transparent_background: true
				}),
				retail: MarkerFactory.autoIcon({
					label: 'E8CC',
					font: 'Material Icons',
					color: '#33CCCC',
					fontsize: 40,
					scale: 1,
					transparent_background: true
				}),
				plane: MarkerFactory.autoIcon({
					label: 'E195',
					font: 'Material Icons',
					color: '#CC00FF',
					fontsize: 40,
					scale: 1,
					transparent_background: true
				}),
				taxi: MarkerFactory.autoIcon({
					label: 'e531',
					font: 'Material Icons',
					color: '#33CC33',
					fontsize: 40,
					scale: 1,
					transparent_background: true
				})
			};


		_.each(icons_fontello, function (icon, name) {
			var theimage = jQuery('<img>');
			theimage.attr('src', icon.url);
			jQuery('#fontello').find('.' + name).append(theimage);
		});

		_.each(icons_fontawesome, function (icon, name) {
			var theimage = jQuery('<img>');
			theimage.attr('src', icon.url);
			jQuery('#fontawesome').find('.' + name).append(theimage);
		});

		_.each(icons_material, function (icon, name) {
			var theimage = jQuery('<img>');
			theimage.attr('src', icon.url);
			jQuery('#materialicons').find('.' + name).append(theimage);
		});




	});


});
