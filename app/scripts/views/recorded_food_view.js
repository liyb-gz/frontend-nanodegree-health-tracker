var app = app || {};

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
			'toggleDetails',
			'edit',
			'drop',
			'submit',
			'cancel'
		);

		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.render);

		this.render();
	},

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	toggleDetails: function () {
		this.$('.nutrition-facts').toggle('fast');
		this.$('.btn-detail')
			.find('.glyphicon')
			.toggleClass('glyphicon-resize-full glyphicon-resize-small');
	},

	edit: function () {
		console.log('edit');

		// Toggle the buttons
		this.$('.btn-submit, .btn-cancel').show('fast');
		this.$('.btn-drop, .btn-edit').hide('fast');

		// Toggle the input boxes
		this.$('.food-name input').show('fast').val(this.model.get('foodName'));
		this.$('.food-name span').hide('fast');
		this.$('.calories input').show('fast').val(this.model.get('servingQty'));
		this.$('.calories span').hide('fast');

		// Focus edit
		this.$('input').first().focus();
	},

	drop: function () {
		console.log('drop');
		this.model.destroy();
	},

	submit: function () {
		console.log((this.$('.calories input').val());
		console.log((this.$('.calories input').val().trim());
		console.log(parseFloat(this.$('.calories input').val().trim()));
		this.model.set('foodName', this.$('.food-name input').val().trim());
		this.model.set('servingQty', parseFloat(this.$('.calories input').val()));
		this.endEdit();
	},

	cancel: function () {
		this.endEdit();
	},

	endEdit: function () {
		console.log('endEdit');

		// Toggle the buttons
		this.$('.btn-submit, .btn-cancel').hide('fast');
		this.$('.btn-drop, .btn-edit').show('fast');

		// Toggle the input boxes
		this.$('.food-name input').hide('fast');
		this.$('.food-name span').show('fast');
		this.$('.calories input').hide('fast');
		this.$('.calories span').show('fast');
	}
});

// TODO: delete this testing var

var testingRecordedFoodView = new app.RecordedFoodView({
	model: testingRecordedFood,
	el: '#testing-food-view'
});