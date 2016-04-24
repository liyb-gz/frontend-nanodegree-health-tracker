/*globals _, Backbone, ENTER_KEY*/
var app = app || {};

(function (app) {
	'use strict';
	app.NutritionGoalsView = Backbone.View.extend({
		el: '.stats',

		events: {
			'click .btn-edit': 'edit',
			'click .btn-submit': 'submit',
			'click .btn-cancel': 'cancel',
			'keyup .goals-edit input': 'keyHandler'
		},

		initialize: function (options) {
			_.bindAll(this,
				'render',
				'getGraphPercentages',
				'edit',
				'submit',
				'cancel',
				'endEdit',
				'round',
				'keyHandler'
			);

			// Keep the possibility to move the 100% percent line
			options = options || {};
			this.hundredPercentLine = options.hundredPercentLine || 80;

			// Personally I want to avoid directly using 'app.something', so make a reference here
			this.recordedCollection = app.recordedCollection;

			// Nutrition panel
			this.$nutritionFacts = this.$('.nutrition-facts');

			// Buttons
			this.$editBtn = this.$('.btn-edit');
			this.$submitBtn = this.$('.btn-submit');
			this.$cancelBtn = this.$('.btn-cancel');

			// Progress Bars
			this.$caloriesBar = this.$nutritionFacts.find('.calories .progress-bar');
			this.$carboBar = this.$nutritionFacts.find('.carbo .progress-bar');
			this.$fatBar = this.$nutritionFacts.find('.fat .progress-bar');
			this.$proteinBar = this.$nutritionFacts.find('.protein .progress-bar');

			// Bind events
			this.listenTo(this.recordedCollection, 'updateSum', this.render);
			this.listenTo(this.model, 'change', this.render);

			// Get Datas
			this.model.fetch();

			// Set interface. 100% percent line is not supposed to update using render()
			this.$('.bar-step').attr('style', 'padding-left: ' + this.hundredPercentLine + '%');
			this.render();
		},

		render: function () {
			var graphPercentages = this.getGraphPercentages(this.hundredPercentLine);

			this.$caloriesBar
				.width(graphPercentages.caloriesPercentage + '%')
				.find('.quantity').html(this.round(this.recordedCollection.sumNutrition.sumCalories));
			this.$carboBar
				.width(graphPercentages.carboPercentage + '%')
				.find('.quantity').html(this.round(this.recordedCollection.sumNutrition.sumCarbo));
			this.$fatBar
				.width(graphPercentages.fatPercentage + '%')
				.find('.quantity').html(this.round(this.recordedCollection.sumNutrition.sumFat));
			this.$proteinBar
				.width(graphPercentages.proteinPercentage + '%')
				.find('.quantity').html(this.round(this.recordedCollection.sumNutrition.sumProtein));
		},

		getGraphPercentages: function (hundredPercentLine) {
			return {
				caloriesPercentage: this.recordedCollection.sumNutrition.sumCalories / this.model.get('calories') * hundredPercentLine,
				carboPercentage: this.recordedCollection.sumNutrition.sumCarbo / this.model.get('carbo') * hundredPercentLine,
				fatPercentage: this.recordedCollection.sumNutrition.sumFat / this.model.get('fat') * hundredPercentLine,
				proteinPercentage: this.recordedCollection.sumNutrition.sumProtein / this.model.get('protein') * hundredPercentLine
			};
		},

		edit: function () {
			// Show edit panel
			this.$nutritionFacts.find('.progress').hide();
			this.$nutritionFacts.find('.goals-edit').show();

			// Change buttons
			this.$editBtn.hide();
			this.$cancelBtn.show();
			this.$submitBtn.show();

			// Takes in the current data
			this.$('.calories input').val(this.model.get('calories'));
			this.$('.carbo input').val(this.model.get('carbo'));
			this.$('.fat input').val(this.model.get('fat'));
			this.$('.protein input').val(this.model.get('protein'));
		},

		submit: function () {
			this.model.save({
				calories: this.$('.calories input').val().trim() || this.model.get('calories'),
				carbo: this.$('.carbo input').val().trim() || this.model.get('carbo'),
				fat: this.$('.fat input').val().trim() || this.model.get('fat'),
				protein: this.$('.protein input').val().trim() || this.model.get('protein')
			});

			this.endEdit();
		},

		cancel: function () {
			this.endEdit();
		},

		endEdit: function () {
			// Change panel
			this.$nutritionFacts.find('.progress').show();
			this.$nutritionFacts.find('.goals-edit').hide();

			// Change buttons
			this.$editBtn.show();
			this.$cancelBtn.hide();
			this.$submitBtn.hide();
		},

		// Utility function
		// Takes in a number
		// Returns an interger or a float rounded up to 2 decimals
		round: function (number) {
			return Math.round(number * 100) / 100;
		},

		// Submits when a user press 'enter'
		keyHandler: function (e) {
			if (e.which !== ENTER_KEY) {
				return;
			} else {
				this.submit();
			}
		}
	});
})(app);

