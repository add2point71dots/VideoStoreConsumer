import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Customer from '../models/customer.js';
import CustomerList from '../collections/customer_list.js';
import CustomerListView from './customer_list_view.js';
import Movie from '../models/movie.js';
import Rental from '../models/rental.js';
import RentalList from '../collections/rental_list.js';



var CreateRentalView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.collection, 'update', this.render);
  },
  render: function() {
    this.$('#messages').empty();
    var that = this;

    var compiledTemplate = this.template( { movie: this.model.toJSON(), customers: this.collection.toJSON() });

    this.collection.each(function(customer){
        that.$('customer-menu').append('<option>' + customer.attributes.name + '</option>');
    });

    this.$('#rental-creation').html(compiledTemplate);

    return this;
  },
  events: {
    'submit form': 'createRental'
  },
  createRental: function(e) {
    e.preventDefault();
    var rental = new Rental({'customer_id': this.$('#customer-menu').val(), 'movie_id': this.model.attributes.id, 'due_date': '2017-07-03'});
    var rentalList = new RentalList(rental);

    console.log("RENTAL LOOKS LIKE", rental);
    rentalList.create(rental);
  }
});

export default CreateRentalView;
