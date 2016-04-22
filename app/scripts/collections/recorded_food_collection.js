/* globals Backbone */
var app = app || {};

(function (app) {
	'use strict';
	app.RecordedCollection = Backbone.Collection.extend({
		model: app.RecordedFood,

		initialize: function () {
			_.bindAll(this, 'updateSumNutrition');

			this.sumNutrition = {
				sumCalories: 0,
				sumCarbo: 0,
				sumFat: 0,
				sumProtein: 0
			},

			this.on('change:servingQty update', this.updateSumNutrition);

			this.updateSumNutrition();
		},

		updateSumNutrition: function () {
			var self = this;

			var newSumNutrition = {
				sumCalories: 0,
				sumCarbo: 0,
				sumFat: 0,
				sumProtein: 0
			}

			this.models.forEach(function (model) {
				newSumNutrition.sumCalories += model.get('totalCalories');
				newSumNutrition.sumCarbo += model.get('totalCarbo');
				newSumNutrition.sumFat += model.get('totalFat');
				newSumNutrition.sumProtein += model.get('totalProtein');
			});

			this.sumNutrition = newSumNutrition;
		}
	});

	app.recordedCollection = new app.RecordedCollection();
})(app);

// TODO: delete this testing var
app.recordedCollection.add(testingRecordedFood);