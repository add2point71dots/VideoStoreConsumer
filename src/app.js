// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';
import Movie from './models/movie.js';
import MovieList from './collections/movie_list.js';
import MovieView from './views/movie_view.js';
import MovieListView from './view/movie_list_view.js';

// ready to go
$(document).ready(function() {

  $('section.main-content').append('<p>Hello World!</p>');

});
