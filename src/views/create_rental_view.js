import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Customer from '../models/customer.js';
import CustomerList from '../collections/customer_list.js';
import CustomerListView from './customer_list_view.js';
import Movie from '../models/movie.js';



var CreateRentalView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.collection, 'update', this.render);
  },
  render: function() {
      console.log("Collection", this.collection);
    this.$('#messages').empty();

    var compiledTemplate = this.template( { movie: this.model.toJSON(), customers: this.collection.toJSON() });
    this.$('#rental-creation').html(compiledTemplate);

    return this;
  }
});

export default CreateRentalView;
