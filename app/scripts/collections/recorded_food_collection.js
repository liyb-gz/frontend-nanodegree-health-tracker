/* globals Backbone */
var app = app || {};

(function (app) {
	'use strict';
	app.RecordedCollection = Backbone.Collection.extend({
		model: app.RecordedFood
	});

	app.recordedCollection = new app.RecordedCollection();
})(app);