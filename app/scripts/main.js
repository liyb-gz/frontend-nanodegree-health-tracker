/* global app, $*/
/* exported ENTER_KEY*/

var ENTER_KEY = 13;
var	app = app || {};

(function (app) {
	'use strict';
	$(function () {
		app.nutritionGoalsView = new app.NutritionGoalsView({
			model: app.nutritionGoals
		});

		app.searchedCollectionView = new app.SearchedCollectionView({
			collection: app.searchedCollection
		});

		app.recordedCollectionView = new app.RecordedCollectionView({
			collection: app.recordedCollection
		});
	});
})(app);
