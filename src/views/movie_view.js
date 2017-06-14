import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Movie from '../models/movie.js';

var MovieView = Backbone.View.extend({
    initialize: function(params){
        this.template = params.template;
        this.searched = params.searched;
        this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
        var compiledTemplate = this.template({movie: this.model.toJSON(), searched: this.searched});

        this.$el.html(compiledTemplate);
        return this;
    },
    events: {
      'click .add-movie': 'clickedAddMovie'
    },
    clickedAddMovie: function() {
      console.log("clicked add movie");
      this.trigger('addMovie', this.model);
    }
});

export default MovieView;
