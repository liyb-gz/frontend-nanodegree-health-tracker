/*globals Backbone*/
var app = app || {};

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
		this.on('change:servingQty', this.changeServing);

		this.recalculateNutrition();
	},

	changeServing: function () {
		this.recalculateNutrition();
	},

	recalculateNutrition: function () {
		this.set('totalCalories', this.get('unitCalories') * this.get('servingQty'));
		this.set('totalCarbo', this.get('unitCarbo') * this.get('servingQty'));
		this.set('totalFat', this.get('unitFat') * this.get('servingQty'));
		this.set('totalProtein', this.get('unitProtein') * this.get('servingQty'));
	}
});

// TODO: delete testing var

var testingSearchedFood = new app.SearchedFood({
	foodName: 'Burger',
	brandName: 'McDonald',
	unitCalories: 200,
	unitCarbo: 0,
	unitFat: 18,
	unitProtein: 11,
	servingQty: 1,
	servingUnit: 'patty'
});

var testingRecordedFood = new app.RecordedFood(testingSearchedFood.attributes);