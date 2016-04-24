/*globals _*/
var app = app || {};

(function (app) {
	'use strict';

	// Extends the simpler 'search result' view
	app.RecordedFood = app.SearchedFood.extend({
		defaults: _.extend({}, app.SearchedFood.prototype.defaults, {
			totalCalories: 0,
			totalCarbo: 0,
			totalFat: 0,
			totalProtein: 0,
			servingNumber: 1
		}),

		initialize: function () {
			_.bindAll(this,
				'changeServing',
				'recalculateNutrition'
			);

			//If the serving number is changed, update the total nutritions immediately
			this.on('change:servingNumber', this.changeServing);

			this.recalculateNutrition();
		},

		changeServing: function () {
			this.recalculateNutrition();
		},

		recalculateNutrition: function () {
			this.set({
				totalCalories: this.round(this.get('unitCalories') * this.get('servingNumber')),
				totalCarbo: this.round(this.get('unitCarbo') * this.get('servingNumber')),
				totalFat: this.round(this.get('unitFat') * this.get('servingNumber')),
				totalProtein: this.round(this.get('unitProtein') * this.get('servingNumber'))
			});
		},

		// Utility function
		// Takes in a number
		// Returns an interger or a float rounded up to 2 decimals
		round: function (number) {
			return Math.round(number * 100) / 100;
		}
	});
})(app);
