import Backbone from 'backbone';
import Movie from '../models/movie.js';

var MovieList = Backbone.Collection.extend({
    model: Movie,
    url: 'http://localhost:3000/movies'
})

export default MovieList;
