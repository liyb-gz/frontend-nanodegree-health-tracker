var app = app || {};

(function (app) {
	'use strict';
	app.RecordedCollectionView = Backbone.View.extend({
		el: '.food-list',

		initialize: function () {
			_.bindAll(this,
				'render'
			);

			this.render();
			console.log('init');
		},

		render: function () {
			console.log('render');
			var self = this;

			this.collection.each(function (model) {
				var newView = new app.RecordedFoodView({
					model: model,
					nutritionGoals: app.nutritionGoals
				});

				self.$el.append(newView.render().el);
			});
		}
	});

	app.recordedCollectionView = new app.RecordedCollectionView({
		collection: app.recordedCollection
	});
})(app);