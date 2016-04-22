/* globals Backbone */
var app = app || {};

(function (app) {
	'use strict';
	app.SearchedCollection = Backbone.Collection.extend({
		model: app.SearchedFood
	});

	app.searchedCollection = new app.SearchedCollection();
})(app);
