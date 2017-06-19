import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Movie from '../models/movie.js';
import MovieList from '../collections/movie_list.js';
import MovieView from '../views/movie_view.js';

var MovieListView = Backbone.View.extend({
    initialize: function(params) {
        this.template = params.template;
        this.searched = params.searched;
        this.listenTo(this.model, 'update', this.render);
        this.listenTo(this.model, 'sync', this.render);
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
            that.listenTo(myMovieView, 'addMovie', function(movie) {
                var newMovie = new Movie(movie);
                this.model.create(newMovie);
                that.model.fetch();
            });
        });
        return this;
    },
    events: {
        'click #search-button': 'searchMovies'
    },

    searchMovies: function() {
        var that = this;
        // this.model.fetch({ data: this.getFormData() });
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

        this.searched = true;
    },

    getFormData: function() {
        return {
            query: this.$('#query').val()
        };
    }
});

export default MovieListView;
