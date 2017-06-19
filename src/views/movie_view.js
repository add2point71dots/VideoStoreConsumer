import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Movie from '../models/movie.js';

var MovieView = Backbone.View.extend({
    initialize: function(params){
        this.template = params.template;
        this.searched = params.searched;
        this.detailsClicked = params.detailsClicked;
        this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
        var compiledTemplate = this.template({movie: this.model.toJSON(), searched: this.searched, detailsClicked: this.detailsClicked});

        this.$el.html(compiledTemplate);
        return this;
    },
    events: {
      'click .add-movie': 'clickedAddMovie',
      'click .movie_image_details': 'showDetails'
    },
    clickedAddMovie: function() {
      console.log("clicked add movie");
      this.trigger('addMovie', this.model);
    },

    showDetails: function() {
        if (this.model.attributes.id) {
            this.model.fetch();
            this.detailsClicked = !this.detailsClicked;
            this.render();
            console.log(this.detailsClicked);
        }

    //   console.log('model',this.model);
    }
});

export default MovieView;
