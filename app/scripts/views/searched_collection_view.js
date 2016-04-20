var app = app || {};
var ENTER_KEY = 13;

app.SearchedCollectionView = Backbone.View.extend({
	el: '.search',

	events: {
		'mouseover .search-form': 'focusOnSearch',
		'keyup .search-form' : 'newSearch'
	},

	initialize: function () {
		_.bindAll(this, 'focusOnSearch', 'clearAll', 'newSearch');

		this.$list = this.$('.search-results-items');
		this.$loadingBar = this.$('.loading');
		this.$form = this.$('.search-form');
		this.$searchBar = this.$('.search-form input');
		this.$noResultBar = this.$('.no-result');
		this.ajaxRequest = undefined;


		this.$form.submit(function (e) {
			e.preventDefault();
		});

		this.listenTo(this.collection, 'add', this.addOne);

		this.collection.each(function (item) {
			var newView = new app.SearchedFoodView({
				model: item
			});
			this.$list.append(newView.render().el);
		}, this);
	},

	render: function () {
		if (this.collection.length === 0) {
			this.$noResultBar.show('fast');
		} else {
			this.$noResultBar.hide('fast');
		}
	},

	addOne: function (item) {
		var newView = new app.SearchedFoodView({
			model: item
		});

		this.$list.append(newView.render().el);
	},

	focusOnSearch: function () {
		this.$searchBar.focus();
	},

	toggleLoading: function (status, speed) {
		var speed = speed || 'fast';

		switch(status) {
			case 'load':
				this.$loadingBar.show(speed);
				this.$list.hide(speed);
				break;
			case 'show':
				this.$list.show(speed);
				this.$loadingBar.hide(speed);
				break;
			default:
				this.$list.toggle(speed);
				this.$loadingBar.toggle(speed);
		}
	},

	clearAll: function () {
		_.each(_.clone(this.collection.models), function (model) {
			model.destroy();
		});
	},

	getSearchURL: function (keyword) {
		var URLPrefix = 'https://api.nutritionix.com/v1_1/search/';
		var URLSuffix = '&fields=item_name,brand_name,item_id,nf_calories,nf_total_carbohydrate,nf_total_fat,nf_protein,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams';
		var resultRange = '0:20'
		var ID = '8a3b278b';
		var KEY = 'c2b176dfe053caed76d3baea5818c350';
		return URLPrefix
			+ keyword
			+ '?results=' + resultRange
			+ URLSuffix
			+ '&appId=' + ID
			+ '&appKey=' + KEY;
	},

	getSearchedFoodModel: function (item) {
		var model = {
			foodName: item.fields.item_name,
			brandName: item.fields.brand_name,
			unitCalories: item.fields.nf_calories,
			unitCarbo: item.fields.nf_total_carbohydrate,
			unitFat: item.fields.nf_total_fat,
			unitProtein: item.fields.nf_protein,
			servingQty: item.fields.nf_serving_size_qty,
			servingUnit: item.fields.nf_serving_size_unit
		};

		return model;
	},

	newSearch: function (e) {
		var self = this;

		// Do nothing when enter key is pressed.
		if (e.which !== ENTER_KEY) {
			return;
		}

		this.clearAll();
		this.toggleLoading('load');

		if(this.ajaxRequest) {
			this.ajaxRequest.abort();
		}

		this.ajaxRequest = $.getJSON(this.getSearchURL(this.$searchBar.val()), function(json, textStatus) {
			json.hits.forEach(function (item) {
				self.collection.add(self.getSearchedFoodModel(item));
			});
		}).fail(function (jqXHR, textStatus, errorThrown) {
			// If the error is caused by our abortion, then don't worry about it
			if (textStatus !== 'abort') {
				console.log('Search result failed to load.');
			}
		}).always(function () {
			self.toggleLoading('show');
			self.render();
		});
	}
});

app.searchedCollectionView = new app.SearchedCollectionView({
	collection: app.searchedCollection
});