var ENTER_KEY = 13;
var ESC_KEY = 27;

(function (app) {
	var app = app || {};

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