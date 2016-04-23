/*globals _*/
var app = app || {};

(function (app) {
	'use strict';
	app.NutritionGoalsView = Backbone.View.extend({
		el: '.stats',

		events: {
			'click .btn-edit': 'edit',
			'click .btn-submit': 'submit',
			'click .btn-cancel': 'cancel',
			'keyup input': 'keyHandler'
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

			options = options || {};
			this.hundredPercentLine = options.hundredPercentLine || 80;
			this.recordedCollection = app.recordedCollection;

			this.$nutritionFacts = this.$('.nutrition-facts');
			this.$editBtn = this.$('.btn-edit');
			this.$submitBtn = this.$('.btn-submit');
			this.$cancelBtn = this.$('.btn-cancel');

			this.$caloriesBar = this.$nutritionFacts.find('.calories .progress-bar');
			this.$carboBar = this.$nutritionFacts.find('.carbo .progress-bar');
			this.$fatBar = this.$nutritionFacts.find('.fat .progress-bar');
			this.$proteinBar = this.$nutritionFacts.find('.protein .progress-bar');

			this.listenTo(this.recordedCollection, 'updateSum', this.render);
			this.listenTo(this.model, 'change', this.render);

			this.$('.bar-step').attr('style', 'padding-left: ' + this.hundredPercentLine + '%');
			this.model.fetch();
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
			this.$nutritionFacts.find('.progress').hide();
			this.$nutritionFacts.find('.goals-edit').show();

			this.$('.calories input').val(this.model.get('calories'));
			this.$('.carbo input').val(this.model.get('carbo'));
			this.$('.fat input').val(this.model.get('fat'));
			this.$('.protein input').val(this.model.get('protein'));

			this.$editBtn.hide();
			this.$cancelBtn.show();
			this.$submitBtn.show();
		},

		submit: function () {
			this.model.save({
				calories: this.$('.calories input').val().trim(),
				carbo: this.$('.carbo input').val().trim(),
				fat: this.$('.fat input').val().trim(),
				protein: this.$('.protein input').val().trim()
			});

			this.endEdit();
		},

		cancel: function () {
			this.endEdit();
		},

		endEdit: function () {
			this.$nutritionFacts.find('.progress').show();
			this.$nutritionFacts.find('.goals-edit').hide();
			this.$editBtn.show();
			this.$cancelBtn.hide();
			this.$submitBtn.hide();
		},

		round: function (number) {
			return Math.round(number * 100) / 100;
		},

		keyHandler: function (e) {
			if (e.which !== ENTER_KEY) {
				return;
			} else {
				this.submit();
			}
		}
	});

	app.nutritionGoalsView = new app.NutritionGoalsView({
		model: app.nutritionGoals
	});
})(app);

