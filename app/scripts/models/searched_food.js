/*globals Backbone*/
var app = app || {};

app.SearchedFood = Backbone.Model.extend({
	defaults: {
		foodName: '',
		brandName: '',
		unitCalories: 0,
		unitCarbo: 0,
		unitFat: 0,
		unitProtein: 0,
		servingQty: 1,
		servingUnit: 'serving'
	}
});