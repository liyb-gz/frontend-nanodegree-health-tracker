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
			protein: 50
		}
	});

	app.nutritionGoals = new app.NutritionGoals();
})(app);
