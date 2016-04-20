var app = app || {};

app.SearchFood = Backbone.Collection.extend({
	model: app.Food
});

// TODO: delete testing part
var testingSearchFood = new app.SearchFood();