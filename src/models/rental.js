import Backbone from 'backbone';

var Rental = Backbone.Model.extend({
  sync: function(method, model, options) {
      if (method=='create'){
          options.url = model.collection.url + '/Psycho/check-out';
      }
      return Backbone.sync(method, model, options);
  }
});

export default Rental;
