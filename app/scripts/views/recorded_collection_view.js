var app = app || {};

(function (app) {
	'use strict';
	app.RecordedCollectionView = Backbone.View.extend({
		el: '.food-list',

		initialize: function () {
			_.bindAll(this,
				'render',
				'addOne'
			);

			this.nutritionGoals = app.nutritionGoals;

			this.listenTo(this.collection, 'add', this.addOne);

			this.render();
		},

		render: function () {
			this.collection.each(this.addOne);
		},

		addOne: function (model) {
			var self = this;

			var newView = new app.RecordedFoodView({
				model: model,
				nutritionGoals : self.nutritionGoals
			});

			this.$el.append(newView.render().el);
		},
	});

	app.recordedCollectionView = new app.RecordedCollectionView({
		collection: app.recordedCollection
	});
})(app);