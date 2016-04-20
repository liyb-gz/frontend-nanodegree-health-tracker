var app = app || {};

app.SearchedCollection = Backbone.Collection.extend({
	model: app.SearchedFood
});

app.searchedCollection = new app.SearchedCollection();