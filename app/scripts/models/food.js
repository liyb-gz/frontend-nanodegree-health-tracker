/*globals Backbone*/
var app = app || {};

app.Food = Backbone.Model.extend({
	defaults: {
		foodName: '',
		brandName: '',
		unitCalories: 0,
		unitCarbo: 0,
		unitFat: 0,
		unitProtein: 0,
		servingQty: 1,
		servingUnit: 'serving'
	},

	getTotalCalories: function () {
		return this.get('unitCalories') * this.get('servingQty');
	},

	getTotalCarbo: function () {
		return this.get('unitCarbo') * this.get('servingQty');
	},

	getTotalFat: function () {
		return this.get('unitFat') * this.get('servingQty');
	},

	getTotalProtein: function () {
		return this.get('unitProtein') * this.get('servingQty');
	},

	setServingQty: function (quantity) {
		this.set('servingQty', quantity);
		return this;
	}
});

// TODO: delete this testing var
var testingFood = new app.Food({
	foodName: 'testingFood',
	brandName: 'testingBrand',
	unitCalories: 180,
	unitCarbo: 20,
	unitFat: 5,
	unitProtein: 10,
	servingQty: 2.5,
	servingUnit: '100 gram'
});