import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Customer from '../models/customer.js';
import CustomerList from '../collections/customer_list.js';
import Movie from '../models/movie.js';

var CreateRentalView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
  },
  render: function() {
    console.log("RENDERING A MOVIE RENTAL THINGY");
    var compiledTemplate = this.template( { movie: this.model.toJSON()});
    console.log(compiledTemplate);
    this.$('#rental-creation').html(compiledTemplate);
    return this;
  }
});

export default CreateRentalView;
