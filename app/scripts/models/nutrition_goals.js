/*globals Backbone*/
var app = app || {};

(function (app) {
	'use strict';
	app.NutritionGoals = Backbone.Model.extend({
		defaults: {
			// Default values based on "Daily Intake Levels"
			// http://www.mydailyintake.net/daily-intake-levels/
			calories: 2080,
			carbo: 310,
			fat: 70,
			protein: 50,
			id: 0
		},

		localStorage: new Backbone.LocalStorage('nutrition-goals')
	});

	// I need to assign nutrition goals an ID
	// in order for the localStorage to work on a single model
	app.nutritionGoals = new app.NutritionGoals();
})(app);
