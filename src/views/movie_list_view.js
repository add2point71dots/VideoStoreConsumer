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
        console.log("movie is ", movie);
        var newMovie = new Movie(movie);
        this.model.create(newMovie);
      });
    });
    return this;
  },
  events: {
    'click #search-button': 'searchMovies'
  },
  searchMovies: function() {
    // var myMovieSearch = new MovieList();
    // this.model.create(myMovieSearch);
    this.model.fetch({ data: this.getFormData() });
    console.log();
    this.searched = true;
    // var myMovieSearchView = new MovieListView({
    //   model: myMovieSearch,
    //   template: _.template($('#movie-item-template').html()),
    //   el: 'body',
    //   searched: true
    // });
    // myMovieSearchView.render();
  },
  getFormData: function() {
    return {
      query: this.$('#query').val()
    };
  }
});

export default MovieListView;
