/* global _:true, jQuery:true, icons_fontello:true,icons_fontawesome:true,icons_material:true */

jQuery(document).ready(function () {

	_.delay(function () {



		_.each(icons_fontello, function (obj, name) {
			var theimage = jQuery('<img>');
			var icon = MarkerFactory.autoIcon(obj);
			theimage.attr('src', icon.url);
			console.log(name, icon, obj);
			jQuery('#fontello.transparent').find('.' + name).append(theimage);
		});

		_.each(icons_fontawesome, function (obj, name) {
			var theimage = jQuery('<img>');
			var icon = MarkerFactory.autoIcon(obj);
			theimage.attr('src', icon.url);
			console.log(name, icon, obj);
			jQuery('#fontawesome.transparent').find('.' + name).append(theimage);
		});

		_.each(icons_material, function (obj, name) {
			var theimage = jQuery('<img>');
			var icon = MarkerFactory.autoIcon(obj);
			theimage.attr('src', icon.url);
			console.log(name, icon, obj);
			jQuery('#materialicons.transparent').find('.' + name).append(theimage);
		});


		_.each(icons_fontello, function (obj, name) {
			var theimage = jQuery('<img>');
			obj.fontsize = 20;
			obj.transparent_background = false;
			var icon = MarkerFactory.autoIcon(obj);
			theimage.attr('src', icon.url);
			console.log(name, icon, obj);
			jQuery('#fontello.marker').find('.' + name).append(theimage);
		});

		_.each(icons_fontawesome, function (obj, name) {
			var theimage = jQuery('<img>');
			obj.fontsize = 20;
			obj.transparent_background = false;
			var icon = MarkerFactory.autoIcon(obj);
			theimage.attr('src', icon.url);
			console.log(name, icon, obj);
			jQuery('#fontawesome.marker').find('.' + name).append(theimage);
		});

		_.each(icons_material, function (obj, name) {
			obj.transparent_background = false;
			obj.fontsize = 26;
			var theimage = jQuery('<img>');
			var icon = MarkerFactory.autoIcon(obj);
			console.log(name, icon, obj);
			theimage.attr('src', icon.url);
			jQuery('#materialicons.marker').find('.' + name).append(theimage);
		});


	}, 1000);
});