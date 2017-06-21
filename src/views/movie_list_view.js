import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Movie from '../models/movie.js';
import MovieList from '../collections/movie_list.js';
import MovieView from '../views/movie_view.js';
import CreateRentalView from '../views/create_rental_view.js';

var MovieListView = Backbone.View.extend({
    initialize: function(params) {
        this.template = params.template;
        this.listenTo(this.model, 'update', this.render);
    },
    render: function() {
        this.$('#movie-list').empty();
        var that = this;

        this.model.each(function(movie) {
            var myMovieView = new MovieView({
                model: movie,
                template: that.template,
                searched: that.searched,
                tagName: 'li'
            });
            that.$('#movie-list').append(myMovieView.render().el);
            that.listenTo(myMovieView, 'addMovie', that.createMovie);
            that.listenTo(myMovieView, 'setUpRental', that.goToSetUpRental);
        });
        return this;
    },
    events: {
        'click #search-button': 'searchMovies',
        'click #home-button': 'homeButton',
    },
    goToSetUpRental: function(movie) {
      var myCreateRentalView = new CreateRentalView({
          model: movie,
          template: _.template($('#rental-creation-template').html()),
          el: 'body'
      });
      myCreateRentalView.render();
      this.$('#movie-list').empty();
    },
    createMovie: function(movie) {
      var newMovie = new Movie(movie);
      var that = this;

      this.model.create(
        newMovie,
        {
          success: function(response) {
            that.searched = false;
            that.model.fetch();
            that.$('#messages').html(newMovie.attributes.attributes.title + " was Added");
            that.$("#query").val("");
          },
          error: function(response){
            that.$('#messages').html("Could not add " + newMovie.attributes.attributes.title);
          }
        }
      );
    },
     homeButton: function(){
        var that = this;
        this.searched = false;
         this.$('#rental-creation').empty();
        this.model.fetch({
            success: function(){
                that.$("#query").val("");
                that.$("#messages").empty();
            },
            error: function(){
                that.$('#messages').html('Error: Could not load inventory.');
            }
        });

    },

    searchMovies: function() {
        var that = this;
        this.searched = true;
        this.$('#rental-creation').empty();

        this.model.fetch({
            data: this.getFormData(),
            success: function(data) {
              that.$('#messages').empty();
              if (that.$('#movie-list').is(':empty')) {
                that.$('#messages').html('No movies found.');
              }
              console.log("WE SEARCHED", data);
            },
            error: function(data) {
              that.$('#messages').html('Error: Search function malfunctioned.');
              console.log("WE DID NOT SEARCH!!!!!!!", data);
            }
        });


    },

    getFormData: function() {
        return {
            query: this.$('#query').val()
        };
    }
});

export default MovieListView;
