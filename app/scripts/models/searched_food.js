/*globals Backbone*/
var app = app || {};

(function (app) {
	'use strict';
	app.SearchedFood = Backbone.Model.extend({
		defaults: {
			foodName: '',
			brandName: '',
			unitCalories: 0,
			unitCarbo: 0,
			unitFat: 0,
			unitProtein: 0,
			servingQty: 1,
			servingUnit: 'serving',
			servingNumber: 1
		}
	});
})(app);
