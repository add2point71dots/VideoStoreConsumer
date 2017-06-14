// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';
import Movie from './models/movie.js';
import MovieList from './collections/movie_list.js';
import MovieView from './views/movie_view.js';
import MovieListView from './views/movie_list_view.js';

var myMovieList = new MovieList();
myMovieList.fetch();

// ready to go
$(document).ready(function() {
  var myMovieListView = new MovieListView({
    model: myMovieList,
    template: _.template($('#movie-item-template').html()),
    el: 'body'
  });
  myMovieListView.render();
});
