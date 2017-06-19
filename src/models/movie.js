import Backbone from 'backbone';

var Movie = Backbone.Model.extend({
    sync: function(method, model, options) {
        console.log('method::  ', method);
        if (method=='read'){
            options.url = model.collection.url + '/' + model.attributes.title;
        }
        return Backbone.sync(method, model, options);
    }
});

export default Movie;
