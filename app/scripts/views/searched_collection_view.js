/* global Backbone, _, $, ENTER_KEY, alert */

var app = app || {};

(function (app) {
	'use strict';
	app.SearchedCollectionView = Backbone.View.extend({
		el: '.search',

		events: {
			'mouseover .search-form': 'focusOnSearch',
			'keyup .search-form': 'newSearch',
			'click .btn-loadmore': 'loadMore',
			'click .btn-clear': 'reset'
		},

		initialize: function () {
			_.bindAll(this,
				'render',
				'addOne',
				'focusOnSearch',
				'toggleLoading',
				'toggleLoadMoreBtn',
				'setTotal',
				'getTotal',
				'clearAll',
				'reset',
				'getSearchURL',
				'getSearchedFoodModel',
				'newSearch',
				'loadedSearch',
				'loadMore',
				'sendAjaxRequest',
				'isAbleLoadMore'
			);

			// Panels
			this.$list = this.$('.search-results-items');

			// Information
			this.$loadingBar = this.$('.loading');
			this.$noResultBar = this.$('.no-result');
			this.$searchResultsNumber = this.$('.search-results-number');

			// Buttons
			this.$loadMoreBtn = this.$('.btn-loadmore');
			this.$clearBtn = this.$('.btn-clear');

			// Search feature
			this.$form = this.$('.search-form');
			this.$searchBar = this.$('.search-form input');

			// Vars to track of searches
			this.searchKeyword = '';
			this.ajaxRequest = undefined;
			this.setTotal(0);

			// Prevent search form from submitting
			this.$form.submit(function (e) {
				e.preventDefault();
			});

			// Bind to collection and view property changes
			this.on('change:ajaxTotal', this.changeTotal);
			this.on('loadedSearch', this.loadedSearch);
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'update', this.render);

			// Load initial items, if any
			// (mainly for future extensibility, as in the current version, I don't intend to keep the search result)
			this.collection.each(function (model) {
				var newView = new app.SearchedFoodView({
					model: model
				});
				this.$list.append(newView.render().el);
			}, this);

			this.render();
		},

		render: function () {
			if (this.collection.length === 0) {
				this.$loadMoreBtn.hide('fast');
				this.$clearBtn.prop('disabled', true);
			} else {
				this.$clearBtn.prop('disabled', false);
			}
		},

		// Listens to collections' add event, and add an item view accordingly
		addOne: function (item) {
			var newView = new app.SearchedFoodView({
				model: item
			});

			this.$list.append(newView.render().el);
		},

		// When user mouse over the search bar, it focuses automatically without clicking
		focusOnSearch: function () {
			this.$searchBar.focus();
		},

		toggleLoading: function (status, speed) {
			speed = speed || 'fast'; //default value: fast

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

		toggleLoadMoreBtn: function (status, speed) {
			speed = speed || 'fast'; //default value: fast

			switch(status) {
				case 'load':
					this.$loadMoreBtn.find('.done').hide(speed);
					this.$loadMoreBtn.find('.loading').show(speed);
					break;
				case 'show':
					this.$loadMoreBtn.find('.done').show(speed);
					this.$loadMoreBtn.find('.loading').hide(speed);
					break;
				default:
					this.$loadMoreBtn.find('.done').toggle(speed);
					this.$loadMoreBtn.find('.loading').toggle(speed);
			}
		},

		// Setter of the total_hits value, trigger the change event
		// So the 'xxx result found' span updates itself accordingly
		setTotal: function (value) {
			this.ajaxTotal = value;
			this.trigger('change:ajaxTotal');
		},

		getTotal: function () {
			return this.ajaxTotal;
		},

		// Updates the 'XXX results found' span
		changeTotal: function () {
			if (this.getTotal() > 0) {
				this.$searchResultsNumber.show('fast').find('.number').html(this.getTotal());
			} else {
				this.$searchResultsNumber.hide('fast');
			}
		},

		clearAll: function () {
			_.each(_.clone(this.collection.models), function (model) {
				model.destroy();
			});
		},

		// Response to 'clear search result' button click
		reset: function () {
			this.clearAll();
			this.$searchResultsNumber.hide('fast');
			this.$searchBar.val('');
		},

		getSearchURL: function () {
			var URLPrefix = 'https://api.nutritionix.com/v1_1/search/';
			var URLSuffix = '&fields=item_name,brand_name,item_id,nf_calories,nf_total_carbohydrate,nf_total_fat,nf_protein,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams';

			// resultRange should be '0:20' if it is a new search
			var resultRange = this.collection.length + ':' + (this.collection.length + 20);

			var ID = '8a3b278b';
			var KEY = 'c2b176dfe053caed76d3baea5818c350';

			return URLPrefix +
				this.searchKeyword +
				'?results=' + resultRange +
				URLSuffix +
				'&appId=' + ID +
				'&appKey=' + KEY;
		},

		// Reads data from the JSON files
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
			// Do nothing when other keys are pressed.
			if (e.which !== ENTER_KEY) {
				return;
			}

			// Store this 'searchKeyword' var,
			// so that we can use the old keyword for 'loadMore' button
			// insteading of always using the search bar's value
			this.searchKeyword = this.$searchBar.val();

			// Without this, on iPhone, the keyboard won't disappear
			this.$searchBar.blur();

			this.clearAll();
			this.toggleLoading('load');
			this.sendAjaxRequest();
		},

		loadMore: function () {
			this.toggleLoadMoreBtn('load');
			this.sendAjaxRequest();
		},

		// This being called means the search results has been returned
		loadedSearch: function () {
			var self = this;

			// load contents
			this.setTotal(this.ajaxRequest.responseJSON.total_hits);
			this.ajaxRequest.responseJSON.hits.forEach(function (item) {
				self.collection.add(self.getSearchedFoodModel(item));
			});

			this.toggleLoading('show');
			this.toggleLoadMoreBtn('show');

			// Toggle "No result" message bar
			if (this.collection.length === 0) {
				this.$noResultBar.show('fast');
			} else {
				this.$noResultBar.hide('fast');
			}

			// Toggle "Load more" button
			if (this.isAbleLoadMore()) {
				// Move the loadMore button to the last
				this.$list.append(this.$loadMoreBtn);
				this.$loadMoreBtn.show('fast');
			} else {
				this.$loadMoreBtn.hide('fast');
			}
		},

		sendAjaxRequest: function () {
			var self = this;

			if(this.ajaxRequest) {
				// Abort the current ajax request
				// There should be 1 ajax request only at the same time.
				this.ajaxRequest.abort();
			}

			this.ajaxRequest = $.getJSON(this.getSearchURL(), function() {
				self.trigger('loadedSearch');
			}).fail(function (jqXHR, textStatus) {
				// If the error is caused by our abortion, then don't worry about it
				if (textStatus !== 'abort') {
					alert('Search result failed to load.');
					self.setTotal(0);
				}
			});
		},

		isAbleLoadMore: function () {
			return this.collection.length < this.getTotal();
		}
	});
})(app);
