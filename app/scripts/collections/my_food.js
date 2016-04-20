var app = app || {};

app.MyFood = Backbone.Collection.extend({
	model: app.Food
});

var testingMyFood = new app.MyFood();