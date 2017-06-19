import Backbone from 'backbone';

var Movie = Backbone.Model.extend({
  sync: function(method, model, options) {
    options.url = model.collection.url + '/' + model.attributes.title;
    return Backbone.sync(method, model, options);
  }
});

export default Movie;
