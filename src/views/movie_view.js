import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Movie from '../models/movie.js';

var MovieView = Backbone.View.extend({
    initialize: function(params){
        this.template = params.template;
        this.searched = params.searched;
        this.$el.addClass('column');
        this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
        var compiledTemplate = this.template({movie: this.model.toJSON(), searched: this.searched, detailsClicked: this.detailsClicked});

        this.$el.html(compiledTemplate);
        return this;
    },
    events: {
      'click .add-movie': 'clickedAddMovie',
      'click .movie_image_details': 'showDetails',
      'click .rental-button': 'clickedSetUpRental',
      'click .checkin-button': 'clickedSetUpCheckIn'
    },

    clickedSetUpRental: function(){
        this.trigger('setUpRental', this.model);
    },

    clickedSetUpCheckIn: function() {
      this.trigger('setUpCheckIn', this.model);
    },

    clickedAddMovie: function() {
      this.trigger('addMovie', this.model);
    },

    showDetails: function() {
        if (this.model.attributes.id) {
            var that = this;
            this.model.fetch({
                success: function(){
                    console.log(that.detailsClicked);
                    that.detailsClicked = !that.detailsClicked;
                    that.render();
                },
                error: function(){
                    that.$(".no-details").html("Couldn't show movie details");
                }
            });
        }

    }
});

export default MovieView;
