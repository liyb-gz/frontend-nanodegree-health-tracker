/* globals Backbone, _ */
var app = app || {};

(function (app) {
	'use strict';
	app.RecordedCollection = Backbone.Collection.extend({
		model: app.RecordedFood,
		localStorage: new Backbone.LocalStorage('food-records'),

		initialize: function () {
			_.bindAll(this, 'updateSumNutrition');

			// Keeps tracks of the total nutrition data of the food in the list
			// And updates when food data is added, deleted or edited
			this.sumNutrition = {
				sumCalories: 0,
				sumCarbo: 0,
				sumFat: 0,
				sumProtein: 0
			};

			this.on('change:servingNumber update', this.updateSumNutrition);

			this.fetch();
			this.updateSumNutrition();
		},

		updateSumNutrition: function () {
			var newSumNutrition = {
				sumCalories: 0,
				sumCarbo: 0,
				sumFat: 0,
				sumProtein: 0
			};

			this.models.forEach(function (model) {
				newSumNutrition.sumCalories += model.get('totalCalories');
				newSumNutrition.sumCarbo += model.get('totalCarbo');
				newSumNutrition.sumFat += model.get('totalFat');
				newSumNutrition.sumProtein += model.get('totalProtein');
			});

			this.sumNutrition = newSumNutrition;

			// Event for the nutrition goals view to update accordingly
			this.trigger('updateSum');
		}
	});

	app.recordedCollection = new app.RecordedCollection();
})(app);
