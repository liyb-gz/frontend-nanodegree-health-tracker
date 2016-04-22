/*globals _*/
var app = app || {};

(function (app) {
	'use strict';
	app.NutritionGoalsView = Backbone.View.extend({
		el: '.stats',

		events: {

		},

		initialize: function () {
			this.$nutritionFacts = this.$('.nutrition-facts');
			this.$caloriesBar = this.$nutritionFacts.find('.calories .progress-bar');
			this.$carboBar = this.$nutritionFacts.find('.carbo .progress-bar');
			this.$fatBar = this.$nutritionFacts.find('.fat .progress-bar');
			this.$proteinBar = this.$nutritionFacts.find('.protein .progress-bar');

			console.log('NutritionGoalsView');
			this.render();
		},

		render: function () {
			this.$caloriesBar.width('30%');
		}
	});

	app.nutritionGoalsView = new app.NutritionGoalsView();
})(app);