/*globals _*/
var app = app || {};

(function (app) {
	'use strict';
	app.RecordedFood = app.SearchedFood.extend({
		defaults: _.extend({}, app.SearchedFood.prototype.defaults, {
			totalCalories: 0,
			totalCarbo: 0,
			totalFat: 0,
			totalProtein: 0
		}),

		initialize: function () {
			_.bindAll(this,
				'changeServing',
				'recalculateNutrition'
			);

			//It can be simple on('change'), but I think being more specific is good.
			this.on('change:servingQty', this.changeServing);

			this.recalculateNutrition();
		},

		changeServing: function () {
			this.recalculateNutrition();
		},

		recalculateNutrition: function () {
			this.set('totalCalories', this.round(this.get('unitCalories') * this.get('servingQty')));
			this.set('totalCarbo', this.round(this.get('unitCarbo') * this.get('servingQty')));
			this.set('totalFat', this.round(this.get('unitFat') * this.get('servingQty')));
			this.set('totalProtein', this.round(this.get('unitProtein') * this.get('servingQty')));
		},

		// Utility function
		// Takes in a number
		// returns an interger or a float rounded up to 2 decimals
		round: function (number) {
			return Math.round(number * 100) / 100;
		}
	});
})(app);

// TODO: delete testing var

var testingSearchedFood = new app.SearchedFood({
	foodName: 'Super Burger',
	brandName: 'McDonald',
	unitCalories: 200,
	unitCarbo: 0,
	unitFat: 18,
	unitProtein: 11,
	servingQty: 1,
	servingUnit: 'patty'
});

var testingSearchedFood2 = new app.SearchedFood({
	foodName: 'Chicken Burger',
	brandName: 'KFC',
	unitCalories: 320,
	unitCarbo: 30,
	unitFat: 18,
	unitProtein: 14,
	servingQty: 1,
	servingUnit: 'burger'
});

var testingRecordedFood = new app.RecordedFood(testingSearchedFood.attributes);
var testingRecordedFood2 = new app.RecordedFood(testingSearchedFood2.attributes);