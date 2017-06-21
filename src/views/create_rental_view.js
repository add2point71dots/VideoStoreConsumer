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
  },
  render: function() {
    this.$('#messages').empty();
    console.log("RENDERING A MOVIE RENTAL THINGY");

    var compiledTemplate = this.template( { movie: this.model.toJSON(), customers: myCustomerList});
    console.log("My Customers", myCustomerList);
    console.log(compiledTemplate);
    this.$('#rental-creation').html(compiledTemplate);

    var myCustomerList = new CustomerList();
    myCustomerList.fetch();
    
    var myCustomerListView = new CustomerListView({
        model: myCustomerList,
        template: _.template($('#customer-listing-template').html()),
        el: 'body'
    });
    myCustomerListView.render();


    return this;
  }
});

export default CreateRentalView;
