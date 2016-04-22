/* globals Backbone, _, console, $*/
var app = app || {};

(function (app) {
	'use strict';
	app.RecordedFoodView = Backbone.View.extend({
		// tagName: 'div',
		// className: 'panel panel-default food-item',
		template: _.template($('#recorded-food-item-template').html()),

		events: {
			'click .btn-add': 'addToRecord',
			'click .btn-detail': 'toggleDetails',
			'click .btn-edit' : 'edit',
			'click .btn-drop' : 'drop',
			'click .btn-submit' : 'submit',
			'click .btn-cancel' : 'cancel'
		},

		initialize: function (options) {
			_.bindAll(this,
				'render',
				'getRenderParams',
				'getGraphPercentages',
				'toggleDetails',
				'edit',
				'drop',
				'submit',
				'cancel',
				'endEdit'
			);

			this.nutritionGoals = options.nutritionGoals;
			this.hundredPercentLine = options.hundredPercentLine || 80; // 100% line position, default: 80%

			// Status markers
			this.editing = false;
			this.showingDetails = false;

			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.nutritionGoals, 'change', this.render);

			this.render();
		},

		render: function () {
			console.log('render');
			this.$el.html(this.template(this.getRenderParams()));
			return this;
		},

		getRenderParams: function () {
			var params = _.extend({},
				this.model.attributes,
				{showingDetails: this.showingDetails},
				this.getGraphPercentages(this.hundredPercentLine));
			return params;
		},

		getGraphPercentages: function (hundredPercentLine) {
			return {
				hundredPercentLine: hundredPercentLine,
				carboPercentage: this.model.get('totalCarbo') / this.nutritionGoals.get('carbo') * hundredPercentLine,
				fatPercentage: this.model.get('totalFat') / this.nutritionGoals.get('fat') * hundredPercentLine,
				proteinPercentage: this.model.get('totalProtein') / this.nutritionGoals.get('protein') * hundredPercentLine
			};
		},

		toggleDetails: function () {
			console.log('toggleDetails');
			this.showingDetails = !this.showingDetails;
			this.$('.nutrition-facts').toggle('fast');
			this.$('.btn-detail')
				.find('.glyphicon')
				.toggleClass('glyphicon-resize-full glyphicon-resize-small');
		},

		edit: function () {
			// Mark status
			this.editing = true;

			// Toggle the buttons
			this.$('.btn-submit, .btn-cancel').show();
			this.$('.btn-drop, .btn-edit').hide();

			// Toggle the input boxes
			this.$('.food-name input').show().val(this.model.get('foodName'));
			this.$('.food-name span').hide();
			this.$('.calories input').show().val(this.model.get('servingQty'));
			this.$('.calories span').hide();

			// Focus edit
			this.$('input').first().focus();
		},

		drop: function () {
			this.model.destroy();
		},

		submit: function () {
			this.model.set({
				foodName: this.$('.food-name input').val().trim(),
				servingQty: parseFloat(this.$('.calories input').val())
			});
			this.endEdit();
		},

		cancel: function () {
			this.endEdit();
		},

		endEdit: function () {
			// Mark status
			this.editing = false;

			// Toggle the buttons
			this.$('.btn-submit, .btn-cancel').hide();
			this.$('.btn-drop, .btn-edit').show();

			// Toggle the input boxes
			this.$('.food-name input').hide();
			this.$('.food-name span').show();
			this.$('.calories input').hide();
			this.$('.calories span').show();
		}
	});
})(app);


// TODO: delete this testing var

var testingRecordedFoodView = new app.RecordedFoodView({
	model: testingRecordedFood,
	nutritionGoals: app.nutritionGoals,
	el: '#testing-food-view'
});