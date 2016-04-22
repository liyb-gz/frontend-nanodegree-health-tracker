/*globals _*/
var app = app || {};

(function (app) {
	'use strict';
	app.NutritionGoalsView = Backbone.View.extend({
		el: '.stats',

		events: {

		},

		initialize: function (options) {
			_.bindAll(this,
				'render',
				'getGraphPercentages'
			);

			options = options || {};
			this.hundredPercentLine = options.hundredPercentLine || 80;
			this.recordedCollection = app.recordedCollection;

			this.$nutritionFacts = this.$('.nutrition-facts');
			this.$caloriesBar = this.$nutritionFacts.find('.calories .progress-bar');
			this.$carboBar = this.$nutritionFacts.find('.carbo .progress-bar');
			this.$fatBar = this.$nutritionFacts.find('.fat .progress-bar');
			this.$proteinBar = this.$nutritionFacts.find('.protein .progress-bar');

			this.listenTo(this.recordedCollection, 'updateSum', this.render);

			console.log('NutritionGoalsView');
			this.$('.bar-step').attr('style', 'padding-left: ' + this.hundredPercentLine + '%');
			this.render();
		},

		render: function () {
			var graphPercentages = this.getGraphPercentages(this.hundredPercentLine);
			console.log(graphPercentages);

			this.$caloriesBar
				.width(graphPercentages.caloriesPercentage + '%')
				.find('.quantity').html(this.recordedCollection.sumNutrition.sumCalories);
			this.$carboBar
				.width(graphPercentages.carboPercentage + '%')
				.find('.quantity').html(this.recordedCollection.sumNutrition.sumCarbo);
			this.$fatBar
				.width(graphPercentages.fatPercentage + '%')
				.find('.quantity').html(this.recordedCollection.sumNutrition.sumFat);
			this.$proteinBar
				.width(graphPercentages.proteinPercentage + '%')
				.find('.quantity').html(this.recordedCollection.sumNutrition.sumProtein);
		},

		getGraphPercentages: function (hundredPercentLine) {
			return {
				caloriesPercentage: this.recordedCollection.sumNutrition.sumCalories / this.model.get('calories') * hundredPercentLine,
				carboPercentage: this.recordedCollection.sumNutrition.sumCarbo / this.model.get('carbo') * hundredPercentLine,
				fatPercentage: this.recordedCollection.sumNutrition.sumFat / this.model.get('fat') * hundredPercentLine,
				proteinPercentage: this.recordedCollection.sumNutrition.sumProtein / this.model.get('protein') * hundredPercentLine
			};
		}
	});

	app.nutritionGoalsView = new app.NutritionGoalsView({
		model: app.nutritionGoals
	});
})(app);