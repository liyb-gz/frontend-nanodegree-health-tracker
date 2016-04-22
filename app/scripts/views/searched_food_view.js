/* globals Backbone, $, _, console*/
var app = app || {};

(function (app) {
	'use strict';
	app.SearchedFoodView = Backbone.View.extend({
		tagName: 'div',
		className: 'panel panel-default food-item',
		template: _.template($('#searched-food-item-template').html()),

		events: {
			'click .btn-add': 'addToRecord',
			'click .btn-detail': 'toggleDetails'
		},

		initialize: function () {
			_.bindAll(this, 'render', 'addToRecord', 'toggleDetails');

			this.listenTo(this.model, 'destroy', this.remove);

			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		},

		addToRecord: function () {
			console.log('add to record');
		},

		toggleDetails: function () {
			this.$('.nutrition-facts').toggle('fast');
			this.$('.btn-detail')
				.find('.glyphicon')
				.toggleClass('glyphicon-resize-full glyphicon-resize-small');
		}
	});
})(app);