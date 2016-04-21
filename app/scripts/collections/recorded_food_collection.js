var app = app || {};

app.RecordedCollection = Backbone.Collection.extend({
	model: app.RecordedFood
});

app.recordedCollection = new app.RecordedCollection();