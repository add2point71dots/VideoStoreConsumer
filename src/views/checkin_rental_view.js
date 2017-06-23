import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Customer from '../models/customer.js';
import CustomerList from '../collections/customer_list.js';
import CustomerListView from './customer_list_view.js';
import Movie from '../models/movie.js';
import Rental from '../models/rental.js';
import RentalList from '../collections/rental_list.js';

var CheckInRentalView = Backbone.View.extend({
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
    'submit #checkin-form': 'checkInRental'
  },

  checkInRental: function(e) {
    e.preventDefault();
    var that = this;
    var rental = new Rental({'customer_id': this.$('#customer-menu').val() });
    var rentalList = new RentalList(rental);
    var movieTitle = this.model.attributes.title;
    console.log("RENTALLIST TITLE IS ", rentalList);
    rentalList.create(
      rental,
      { title: movieTitle,
        checkin: true,
        success: function() {
          that.$('#messages').html(movieTitle + ' was successfully returned!');
        },
        error: function(response) {
          that.$('#messages').html('Could not return movie. :(');
          console.log("ERROR: Could not return movie.");
        }
      }
    );
  }
});

export default CheckInRentalView;
